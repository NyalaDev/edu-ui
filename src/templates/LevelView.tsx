import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import CourseCard from "../components/Courses/CourseCard";
import { getYoutubeThumbnail } from "../common/util";
import { Course } from "../types/api.types";
type LevelViewProps = {
  data: {
    allStrapiCourse: { edges: { node: Course}[] }
  },
  pageContext: {
    level: string
  }
};
const LevelView: React.FC<LevelViewProps> = ({ data, pageContext }) => {
  const { allStrapiCourse: { edges: courses = [] } } = data;
  const { level } = pageContext;
  return (
    <Layout>
      <div>
        <div className="bg-gray-800 text-white text-center font-bold uppercase text-md px-4 py-4 my-8 rounded shadow hover:shadow-md outline-none focus:outline-none">
          {`${level} courses`}
        </div>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
        {courses.map(course => {
          const { lectures } = course.node;
          const { url: imageUrl } = lectures[0] || {};
          return (
            <CourseCard
              key={course.node.id}
              course={course.node}
              image={getYoutubeThumbnail(imageUrl)}
            />
          );
        })}
      </div>
    </Layout>
  );
};
export default LevelView;
export const pageQuery = graphql`
  query CoursesByLevel($level: String!) {
    allStrapiCourse(filter: { level: { eq: $level } }) {
      edges {
        node {
          id
          title
          description
          slug
          level
          lectures {
            url
          }
          language {
            id
            name
          }
        }
      }
    }
  }
`;

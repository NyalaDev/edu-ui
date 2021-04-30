import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import CourseCard from "../components/Courses/CourseCard";
import { getYoutubeThumbnail } from "../common/util";
import { Course } from "../types/api.types";

type InstructorViewProps = {
  data: {
    allStrapiCourse: { edges: { node: Course}[] },
  }
};
const InstructorView: React.FC<InstructorViewProps> = ({ data }) => {
  const { allStrapiCourse: { edges: courses = [] } } = data;
  const { t } = useTranslation();
  const instructorName = courses[0].node.instructor.profile.name;
  return (
    <Layout title={`${t("courses")} | ${instructorName}`}>
      <div>
        <div className="bg-gray-800 text-white text-center font-bold uppercase text-md px-4 py-4 my-8 rounded shadow hover:shadow-md outline-none focus:outline-none">
          {instructorName}
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
export default InstructorView;
export const pageQuery = graphql`
  query CoursesByInstructor($language: String!, $instructor: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInfo
    }
    allStrapiCourse(
      filter: { instructor: { profile: { github: { eq: $instructor } } } }
    ) {
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
          instructor {
            profile {
              name
            }
          }
        }
      }
    }
  }
`;

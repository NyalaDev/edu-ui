import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import CourseCard from "../components/Courses/CourseCard";
import { getYoutubeThumbnail } from "../common/util";
import CourseCardUpcoming from "../components/Courses/CourseCardUpcoming";
import { appLanguages } from "../common/constants";
import { Course } from "../types/api.types";

type LanguageViewProps = {
  data: {
    allStrapiCourse: { edges: { node: Course}[] }
  },
  pageContext: {
    language: string
  }
};
const LanguageView: React.SFC<LanguageViewProps> = ({ data, pageContext }) => {
  const { allStrapiCourse: { edges: courses = [] } } = data;
  const { language } = pageContext;
  const { label } = appLanguages.find(lang => lang.locale === language) || {};
  return (
    <Layout>
      <div>
        <div className="bg-gray-800 text-white text-center font-bold uppercase text-md px-4 py-4 my-8 rounded shadow hover:shadow-md outline-none focus:outline-none">
          {`${label}`}
        </div>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
        {courses.map(course => {
          const { lectures, status } = course.node;
          const { url: imageUrl } = lectures[0] || {};
          if (status === "Upcoming") {
            return (
              <CourseCardUpcoming key={course.node.id} course={course.node} />
            );
          }
          return (
            <CourseCard
              key={course.node.id}
              course={course.node}
              lectureToPlayNext={lectures[0]}
              image={getYoutubeThumbnail(imageUrl)}
            />
          );
        })}
      </div>
    </Layout>
  );
};
export default LanguageView;
export const pageQuery = graphql`
  query CoursesByLanguage($language: String!, $languageToDisplay: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInfo
    }
    allStrapiCourse(
      filter: { language: { name: { eq: $languageToDisplay } } }
    ) {
      edges {
        node {
          id
          title
          description
          slug
          level
          status
          lectures {
            url
            slug
          }
          language {
            id
            name
            iso2
          }
        }
      }
    }
  }
`;

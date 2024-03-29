const path = require('path')
const { uniq, orderBy } = require('lodash')

const siteLanguages = [`en`, `ar`, `am`, 'sw']

exports.createPages = async ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions

  const CourseLevels = ['Beginner', 'Intermediate', 'Advanced']

  const templatesBase = './src/templates'
  const lectureViewTemplate = path.resolve(
    `${templatesBase}/LectureView/index.tsx`
  )
  const tagViewTemplate = path.resolve(`${templatesBase}/TagView.tsx`)
  const levelViewTemplate = path.resolve(`${templatesBase}/LevelView.tsx`)
  const languageViewTemplate = path.resolve(`${templatesBase}/LanguageView.tsx`)
  const instructorViewTemplate = path.resolve(
    `${templatesBase}/InstructorView.tsx`
  )

  const {
    data: {
      allStrapiCourse: { edges: courses },
      allStrapiLecture: { edges: lectures },
      allStrapiTag: { edges: tags },
    },
  } = await graphql(`
    {
      allStrapiCourse(limit: 1000) {
        edges {
          node {
            id
            slug
            status
            thumbnail
            instructor {
              profile {
                github
              }
            }
            language {
              id
              name
              iso2
            }
            tags {
              tagName
            }
            resources {
              type
              text
            }
          }
        }
      }

      allStrapiLecture(limit: 1000) {
        edges {
          node {
            id
            strapiId
            position
            slug
            course {
              id
              slug
              status
              thumbnail
              resources {
                type
                text
              }
            }
          }
        }
      }
      allStrapiTag {
        edges {
          node {
            id
            tagName
          }
        }
      }
    }
  `)

  courses.forEach(edge => {
    const {
      node: { status, slug },
    } = edge

    const courseLectures = lectures.filter(lecture => {
      const {
        node: { course },
      } = lecture
      return course.slug === slug
    })

    if (status === 'Upcoming' || !courseLectures || !courseLectures.length)
      return

    const [firstLecture] = orderBy(
      courseLectures.map(c => c.node),
      'position',
      'asc'
    )

    siteLanguages.forEach(language => {
      createRedirect({
        fromPath: `/${language}/courses/${slug}`,
        isPermanent: false,
        redirectInBrowser: true,
        toPath: `/${language}/courses/${slug}/lectures/${firstLecture.slug}`,
      })

      // FIXME: Keep the old url using the ID for now. Remove this after indexing the new url
      createRedirect({
        fromPath: `/${language}/courses/${slug}`,
        isPermanent: false,
        redirectInBrowser: true,
        toPath: `/${language}/courses/${slug}/lectures/${firstLecture.strapiId}`,
      })
    })

    // add a redirect for the case no language is selected (i.e default language)
    createRedirect({
      fromPath: `/courses/${slug}`,
      isPermanent: false,
      redirectInBrowser: true,
      toPath: `/courses/${slug}/lectures/${firstLecture.slug}`,
    })

    // FIXME: Keep the old url using the ID for now. Remove this after indexing the new url
    createRedirect({
      fromPath: `/courses/${slug}`,
      isPermanent: false,
      redirectInBrowser: true,
      toPath: `/courses/${slug}/lectures/${firstLecture.strapiId}`,
    })
  })

  lectures.forEach(edge => {
    const {
      node: { id, strapiId, slug, course },
    } = edge

    createPage({
      component: lectureViewTemplate,
      path: `/courses/${course.slug}/lectures/${slug}`,
      context: {
        id,
        courseSlug: course.slug,
      },
    })

    // FIXME: Keep the old url using the ID for now. Remove this after indexing the new url
    createPage({
      component: lectureViewTemplate,
      path: `/courses/${course.slug}/lectures/${strapiId}`,
      context: {
        id,
        courseSlug: course.slug,
      },
    })
  })

  tags.forEach(edge => {
    const {
      node: { id, tagName },
    } = edge

    createPage({
      component: tagViewTemplate,
      path: `/tags/${tagName}`,
      context: {
        id,
      },
    })
  })

  CourseLevels.forEach(level => {
    createPage({
      component: levelViewTemplate,
      path: `/levels/${level}`,
      context: {
        level,
      },
    })
  })

  const courseLanguages = ['Arabic', 'Swahili', 'English', 'Amharic']
  courseLanguages.forEach(language => {
    createPage({
      component: languageViewTemplate,
      path: `/languages/${language}`,
      context: {
        languageToDisplay: language,
      },
    })
  })

  const coursesWithInstructors = courses.filter(c => !!c.node.instructor)

  const instructors = uniq(
    coursesWithInstructors.map(
      course => course.node.instructor.profile.github || ''
    )
  )

  instructors.forEach(instructor => {
    createPage({
      component: instructorViewTemplate,
      path: `/instructors/${instructor}`,
      context: {
        instructor,
      },
    })
  })
}

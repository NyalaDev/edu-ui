const path = require('path')
const { uniq, orderBy } = require('lodash')

const siteLanguages = [`en`, `ar`, `am`, 'sw']

exports.createPages = async ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions

  const CourseLevels = ['Beginner', 'Intermediate', 'Advanced']

  const templatesBase = './src/templates'
  const lectureViewTemplate = path.resolve(
    `${templatesBase}/LectureView/index.js`
  )
  const tagViewTemplate = path.resolve(`${templatesBase}/TagView.js`)
  const levelViewTemplate = path.resolve(`${templatesBase}/LevelView.js`)
  const languageViewTemplate = path.resolve(`${templatesBase}/LanguageView.js`)
  const instructorViewTemplate = path.resolve(
    `${templatesBase}/InstructorView.js`
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
            course {
              id
              slug
              status
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

    const [firstLecture] = orderBy(courseLectures, 'position', 'asc')

    siteLanguages.forEach(language => {
      createRedirect({
        fromPath: `/${language}/courses/${slug}`,
        isPermanent: false,
        redirectInBrowser: true,
        toPath: `/${language}/courses/${slug}/lectures/${firstLecture.node.strapiId}`,
      })
    })
  })

  lectures.forEach(edge => {
    const {
      node: { id, strapiId, course },
    } = edge

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

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/^\/dashboard/)) {
    createPage({ ...page, matchPath: '/dashboard/*' })
  }
}

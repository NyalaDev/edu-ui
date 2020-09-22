const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const courseViewTemplate = path.resolve('./src/templates/CourseView.js')
  const lectureViewTemplate = path.resolve(
    './src/templates/LectureView/index.js'
  )
  const tagViewTemplate = path.resolve('./src/templates/TagView.js')
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
            tags {
              tagName
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
      node: { id, slug, tags },
    } = edge

    const [firstTag = {}] = tags
    const { tagName = '' } = firstTag
    createPage({
      component: courseViewTemplate,
      path: `/courses/${slug}`,
      context: {
        id,
        tagName,
      },
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
}

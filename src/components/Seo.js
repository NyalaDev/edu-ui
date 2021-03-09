import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ description, lang, meta, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <style type="text/css">
        {`
          @font-face {
            font-family: Noto;
            src: url('/fonts/NotoSansArabicUI-Regular.woff') format('woff'),
                  url('/fonts/NotoSansArabicUI-Regular.ttf') format('truetype');
          }
          @font-face {
              font-family: Noto;
              font-weight: 700;
              src: url('/fonts/NotoSansArabicUI-Bold.woff') format('woff'),
                    url('/fonts/NotoSansArabicUI-Bold.ttf') format('truetype');
          }
          @font-face {
              font-family: Noto;
              font-weight: 300;
              src: url('/fonts/NotoSansArabicUI-Light.woff') format('woff'),
                    url('/fonts/NotoSansArabicUI-Light.ttf') format('truetype');
          }
          @font-face {
            font-family: NotoKufi;
            src: url('/fonts/NotoKufiArabic-Regular.woff') format('woff'),
                  url('/fonts/NotoKufiArabic-Regular.ttf') format('truetype');
          }
          @font-face {
            font-family: NotoKufi;
            font-weight: 700;
            src: url('/fonts/NotoKufiArabic-Bold.woff') format('woff'),
                  url('/fonts/NotoKufiArabic-Bold.ttf') format('truetype');
          }
        `}
      </style>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `ar`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO

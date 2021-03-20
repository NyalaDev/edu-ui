import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({
  description,
  image,
  lang,
  meta,
  title,
  twitterCardType = 'summary_large_image',
}) => {
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
          content: twitterCardType,
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
        {
          name: 'twitter:image',
          content:
            image || 'https://cdn.nyaladev.com/barmaga.io/barmaga_logo_sm.png',
        },
        {
          property: 'og:image',
          content:
            image || 'https://cdn.nyaladev.com/barmaga.io/barmaga_logo_sm.png',
        },
        {
          name: 'charset',
          content: 'utf-8',
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
        `}
      </style>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `ar`,
  meta: [],
  description: ``,
  twitterCardType: '',
  image: 'https://cdn.nyaladev.com/barmaga.io/barmaga_logo_sm.png',
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  twitterCardType: PropTypes.string,
  image: PropTypes.string,
}

export default SEO

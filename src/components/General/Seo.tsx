import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import useLanguage from '../../hooks/useLanguage'
import { AppLocale } from '../../types/api.types'

type SEOProps = {
  description?: string
  lang?: string
  meta?: (({ name: string } | { property: string }) & { content: string })[]
  title: string
  twitterCardType?: string
  image?: string
}
const SEO: React.FC<SEOProps> = ({
  description,
  image,
  lang,
  meta = [],
  title,
  twitterCardType = 'summary_large_image',
}) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)
  const fontsMap = {
    ar: `
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
        }`,
    am: `@font-face {
      font-family: NotoEthio;
      src: url('/fonts/NotoSansEthiopic-Regular.woff') format('woff'),
            url('/fonts/NotoSansEthiopic-Regular.ttf') format('truetype');
    }
    @font-face {
      font-family: NotoEthio;
      font-weight: 700;
      src: url('/fonts/NotoSansEthiopic-Bold.woff') format('woff'),
            url('/fonts/NotoSansEthiopic-Bold.ttf') format('truetype');
    }`,
  }
  const defaultFont = `
    @font-face {
      font-family: NotoSwahili;
      src: url('/fonts/NotoSans-Regular.woff') format('woff'),
            url('/fonts/NotoSans-Regular.ttf') format('truetype');
    }
    @font-face {
      font-family: NotoSwahili;
      font-weight: 700;
      src: url('/fonts/NotoSans-Bold.woff') format('woff'),
            url('/fonts/NotoSans-Bold.ttf') format('truetype');
    }
  `
  const { language } = useLanguage()
  const fonts = fontsMap[language as keyof typeof fontsMap] || defaultFont
  const metaDescription = description || site.siteMetadata.description
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      defer={false}
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
          content: '@BarmagaIO',
        },
        {
          name: `twitter:site`,
          content: '@BarmagaIO',
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
            image ||
            'https://cdn.nyaladev.com/barmaga.io/barmaga_social_media.png',
        },
        {
          property: 'og:image',
          content:
            image ||
            'https://cdn.nyaladev.com/barmaga.io/barmaga_social_media.png',
        },
        {
          name: 'charset',
          content: 'utf-8',
        },
      ].concat(meta)}
    >
      <style type="text/css">{fonts}</style>
      <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async />
      <script>
        {`
        window.OneSignal = window.OneSignal || [];
        OneSignal.push(function() {
          OneSignal.init({
            appId: "0e1e509b-4f7d-4863-805f-30a72c61b42b",
          })
        });
        `}
      </script>
    </Helmet>
  )
}
SEO.defaultProps = {
  lang: `ar`,
  meta: [],
  description: ``,
  twitterCardType: 'summary_large_image',
  image: 'https://cdn.nyaladev.com/barmaga.io/barmaga_social_media.png',
}
export default SEO

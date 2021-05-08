module.exports = {
  siteMetadata: {
    title: `Barmaga.io`,
    description: `Learn coding in Amharic, Arabic and Swahili`,
    author: `barmaga.io`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        redirect: false,
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`en`, `ar`, `am`, 'sw'],
        defaultLanguage: `en`,
        ns: ['messages'],
        defaultNS: 'messages',
        generateDefaultLanguagePage: true,
        // if you are using Helmet, you must include siteUrl, and make sure you add http:https
        siteUrl: process.env.GATSBY_SITE_URL || `https://barmaga.io/`,
        // you can pass any i18next options
        // pass following options to allow message content as a key
        i18nextOptions: {
          lng: 'en',
          fallbackLng: 'en',
        },
        pages: [
          // {
          //   matchPath: '/:lang?/blog/:uid',
          //   getLanguageFromPath: true,
          //   // excludeLanguages: ['es']
          // },
          // {
          //   matchPath: '/preview',
          //   languages: ['en']
          // }
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/logo_no_text.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.GATSBY_STRAPI_API_URL || 'http://localhost:1437',
        contentTypes: ['course', 'lecture', 'tag'],
        queryLimit: 1000,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: process.env.GATSBY_S3_BUCKET || 's3://s3-bucket',
        generateRoutingRules: false,
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: (process.env.GATSBY_SITE_URL || '').replace(
          /http(s)?:\/\//,
          ''
        ),
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

module.exports = {
  siteMetadata: {
    title: `Barmaga.io`,
    description: `Learn coding in Arabic, Amharic and Swahili`,
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
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          process.env.GOOGLE_ANALYTICS || 'G-ANALYTICS', // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          // optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          // head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          // exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

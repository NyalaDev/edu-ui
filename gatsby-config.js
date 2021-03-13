module.exports = {
  siteMetadata: {
    title: `Barmaga.io`,
    description: `Learn coding in Arabic, Amharic and Swahili`,
    author: `nyala.dev`,
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
        bucketName: process.env.GATSBY_S3_BUCKET || 'https://barmaga.io',
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
        endpoint: `https://dev.us1.list-manage.com/subscribe/post?u=${process.env.GATSBY_MAILCHIMP_ACCOUNT_ID}&amp;id=${process.env.GATSBY_MAILCHIMP_AUDIENCE_ID}`,
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

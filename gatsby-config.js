const config = require('./_config');
module.exports = {
  pathPrefix: `/tech`,
  siteMetadata: config.siteMetadata,
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          'UA-52574938-4', // Google Analytics / GA
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
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `hiitea-tech`,
      },
    },
    {
      resolve: 'gatsby-theme-replica',
      options: {
        contentPath: 'source/_posts',
      },
    },
  ],
};

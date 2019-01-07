const pkg = require('./package')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [<% if (modules.includes('event-bus')) { %>
    '~plugins/eventBus.js',<% } %><% if (modules.includes('filters')) { %>
    '~plugins/filters.js',<% } %><% if(modules.includes('headroom')) { %>
    '~plugins/headroom.js',<% } %><% if(modules.includes('scrollto')) { %>
    { src: '~plugins/scrollto.js', ssr: false },<% } %><% if(modules.includes('gmap')) { %>
    { src: '~plugins/gmap.js', ssr: false },<% } %><% if(modules.includes('gtm')) { %>
    { src: '~plugins/gtm.js', ssr: false },<% } %>
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [<% if (modules.includes('axios')) { %>
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'<% } %>
  ],<% if (modules.includes('axios')) { %>
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },<% } %>

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      <% if (modules.includes('eslint')) { %>// Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }<% } %>
    }
  }
}

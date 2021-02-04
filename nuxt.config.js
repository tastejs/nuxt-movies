export default {
  modern: process.env.NODE_ENV === 'production',

  serverMiddleware: {
    '/': '~/api/swr.js',
    '/_ipx': '~/api/ipx.js'
  },

  /*
  ** App bundle process.env
  */
  env: {
    FRONTEND_URL: process.env.FRONTEND_URL || '',
    API_KEY: process.env.API_KEY || '',
    API_LANG: process.env.API_LANG || 'en-US',
    API_COUNTRY: process.env.API_COUNTRY || 'GB',
    API_YOUTUBE_KEY: process.env.API_YOUTUBE_KEY || '',
    GA: process.env.GA || ''
  },

  /*
  ** Build-only modules
  */
  buildModules: [
    // '@nuxt/sigma',
    '@nuxtjs/pwa',
    '@nuxt/image',
    '@nuxtjs/svg'
  ],

  image: {
    provider: 'ipx',
    ipx: {}
  },

  /*
  ** Global Plugins
  */
  plugins: [
    '~/plugins/filters',
    '~/plugins/ga.client',
    '~/plugins/search'
  ],

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/global.scss'
  ],

  /*
  ** Headers of the page
  */
  // TODO: should review and update properly
  head: {
    title: 'Browse Movies, TV Shows and People',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Browse Movies, TV Shows and People' },
      { hid: 'author', name: 'author', content: 'The Nuxt Movies authors' },
      { hid: 'og:locale', property: 'og:locale', content: 'en_GB' },
      { hid: 'og:title', property: 'og:title', content: 'Movies App' },
      { hid: 'og:description', property: 'og:description', content: 'Browse Movies, TV Shows and People' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://movies.jason.codes/' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Movies' },
      { name: 'twitter:description', content: 'Browse Movies, TV Shows and People' },
      { name: 'twitter:site', content: '@jasonujmaalvis' },
      { name: 'twitter:creator', content: '@jasonujmaalvis' },
      { name: 'twitter:image', content: 'https://movies.jason.codes/icon-medium.png' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
      // TODO: fallback to the system fonts
      // {
      //   rel: 'stylesheet',
      //   href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500'
      // },
      // {
      //   rel: 'preconnect',
      //   href: 'http://fonts.gstatic.com'
      // },
      // {
      //   rel: 'preconnect',
      //   href: 'https://image.tmdb.org'
      // }
    ]
  },

  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#2196f3'
  },

  /*
   * Customize manifest.json
   */
  manifest: {
    name: 'Movies',
    short_name: 'Movies',
    description: 'Browse Movies, TV Shows and People',
    theme_color: '#2196f3',
    background_color: '#000000'
  }
};

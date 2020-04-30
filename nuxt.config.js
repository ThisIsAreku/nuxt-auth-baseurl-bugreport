import path from 'path'
import fs from 'fs'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
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
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  axios: {
    debug: true,
    proxy: true,
    prefix: '/api/',
  },
  router: {
    middleware: ['auth']
  },
  auth: {
    resetOnError: true,
    strategies: {
      facebook: {
        client_id: process.env.FB_CLIENT_ID,
        scope: ['public_profile', 'email', 'user_birthday'],
        response_type: 'code',
        access_token_endpoint: '/auth/social?type=facebook',
        userinfo_endpoint: '/users/me',
      },
    }
  },
  proxy: {
    '/api/': { target: process.env.API_URL, pathRewrite: { '^/api/': '/' } }
  },
  server: {
      ...(process.env.HTTPS ? {
          https: {
              key: fs.readFileSync(path.resolve(__dirname, 'server-key.pem'), { encoding: 'utf-8' }),
              cert: fs.readFileSync(path.resolve(__dirname, 'server.pem'), { encoding: 'utf-8' })
          }
      } : {})
  }
}

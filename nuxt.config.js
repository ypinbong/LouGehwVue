export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Lou Geh Supermarket',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    script: [
      // {
      //   src: "https://code.jquery.com/jquery-3.3.1.min.js"
      // },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
      },
      // {
      //   src: "https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      // }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      {
        rel: "stylesheet",
        href: "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap');",
      },
    ],
    
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // "@/plugins/Vuelidate",
    "@/plugins/fontawesome",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // '@nuxtjs/fontawesome',
  ],

  // fontawesome: {
  //   component: 'fa',
  //   icons: {
  //     solid: true,
  //     brands: true
  //   }
  // },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    //nuxtjs-authentication
    // '@nuxtjs/auth-next',
    //@nuxt/content
    '@nuxt/content',
    //MDB
    // 'mdbvue/nuxt',
  ],

  // router: {
  //   middleware: ['auth']
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: "http://172.16.4.211:24",
    // baseURL: "http://172.16.4.211:28",
    baseURL: "http://localhost:28",
  },

  // auth: {
  //   // Options
  //   redirect:{
  //     login: '/shop',
  //     logout: '/shop',
  //     // callback: '/',
  //     home: '/suppliers',
  //   },
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { 
  //           url:'/login',
  //           method: 'post',
  //           propertyName: 'token'
  //         },
  //         logout: {},
  //         user: {url:'/customers/list'}
  //       }
  //     }
  //   }
  // },
  // mdbvue: {
  //   icons: true, // FA5
  //   roboto: true, // font Roboto
  //   css: false, // MDB CSS
  //   bootstrap: true // Bootstrap CSS
  // },

  content: {
    //options
  },


  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    host: 'localhost',
    port: 333
  }
}

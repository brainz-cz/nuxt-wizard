import Vue from 'vue'

Vue.mixin({
  head: {
    script: [{
      src: '//www.googletagmanager.com/gtm.js?id=' + process.env.gtmId,
      async: true
    }]
  },
  methods: {
    /**
     * Send a GTM event
     * @param  {Object} options - Data to populate event with
     * @example gtm({ event: 'btnClick', customParameter: '123' })
     */
    gtm(options) {
      if (typeof dataLayer !== 'undefined') {
        if (!('event' in options)) {
          // eslint-disable-next-line no-console
          console.error('[GTM] No event specified', options)
          return
        }

        const obj = {
          url: this.$route.path,
          appSection: this.$route.name.replace(/__.*/, ''),
          ...options
        }

        setTimeout(() => {
          // eslint-disable-next-line no-console
          console.log(obj)
          // dataLayer.push(obj)
        }, 0)
      }
    }
  }
})

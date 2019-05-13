export default ({ app }) => {
  const excludedSections = []

  app.router.afterEach((to, from, next) => {
    const obj = {
      event: 'pageview',
      url: to.path,
      appSection: to.name.replace(/__.*/, '')
    }

    if (!excludedSections.includes(obj.appSection)) {
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log(obj)
        // dataLayer.push(obj)
      }, 0)
    }
  })
}

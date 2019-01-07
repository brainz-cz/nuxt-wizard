export default async ({ app }) => {
  const excludedSections = []

  app.router.afterEach((to, from, next) => {
    const obj = {
      event: 'pageview',
      url: to.path,
      appSection: to.name.replace(/__.*/,'')
    }

    if(!excludedSections.includes(obj.appSection)) {
      setTimeout(() => {
        console.log(obj)
        // dataLayer.push(obj)
      }, 0)
    }
  })
}

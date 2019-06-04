const buildVueConfig = require('corteza-webapp-compose/vue.config-builder')

module.exports = buildVueConfig({
  appName: 'compose',
  appLabel: 'Crust Compose',
  theme: 'crust-base',
  packageAlias: 'crust-webapp-compose',
})

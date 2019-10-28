import Vue from 'vue'

import app from 'corteza-webapp-compose/src/app'
import TheSubscriptionAlert from './components/TheSubscriptionAlert'
import './themes'

// When you run this in development mode with corteza repository/package linked
// (yarn link ...) it tries to work with 2 instances of vue and throws:
//
// Unknown custom element: <the-subscription-alert> - did you register the component
// correctly? For recursive components, make sure to provide the "name" option.
Vue.component('the-subscription-alert', TheSubscriptionAlert)

app({
  // Extending base Compose app with an additional header to handle
  // subscription notifications
  template: '<div><the-subscription-alert /><router-view/></div>',
})

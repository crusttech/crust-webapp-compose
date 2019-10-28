<template>
  <b-navbar v-show="!valid" class="bg-danger alert mb-0 p-3 shadow-sm text-white">
    <div v-html="decorate(status)"></div>
  </b-navbar>
</template>
<script>

const emailFinder = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
const domainFinder = /\/\/(.+)\//

/**
 * Simple component that fetches & renders current subscription info
 *
 * We will not bother with status polling for now - users will have to
 * refresh their browsers if they want to get new status
 *
 * Similar component is used in Messaging & Admin apps
 */
export default {
  data () {
    return {
      valid: true,
      status: undefined,
    }
  },

  beforeCreate () {
    this.$SystemAPI.subscriptionCurrent().then(() => {
      // Valid subscription, keep navbar hidden
    }).catch(({ message }) => {
      this.valid = false
      this.status = message
    })
  },

  methods: {
    decorate (txt) {
      // Generate subject with domain name in case sender
      // forgets to include it in the message body
      const subject = `Crust subscription for ${this.discoverDomain()}`

      // Decorate email found in the error message with HTML link
      return txt.replace(emailFinder, `<a href="mailto:$1?subject=${subject}" class="text-white">$1</a>`)
    },

    /**
     * Tries to get domain from baseURL string from the SystemAPI
     * If that is not possible (relative url used), use host value from the
     * current location
     *
     * @returns {string}
     */
    discoverDomain () {
      const apiURL = this.$SystemAPI.baseURL
      let [, domain] = apiURL.match(domainFinder) || [undefined, undefined]
      if (!domain) {
        domain = location.host
      }
      return domain
    },
  },
}
</script>

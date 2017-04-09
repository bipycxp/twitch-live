const { fullName: name, description, author, version } = require(`../../package.json`)

module.exports = {
  manifest_version: 2,

  name,
  description,
  author,
  version,

  icons: {
    16: `/assets/images/icons/16.png`,
    48: `/assets/images/icons/48.png`,
    128: `/assets/images/icons/128.png`,
  },

  content_security_policy: `script-src 'self' https://ssl.google-analytics.com; object-src 'self'`,

  browser_action: {
    default_icon: {
      19: `/assets/images/icons/19.png`,
      38: `/assets/images/icons/38.png`,
    },
    default_title: name,
    default_popup: `popup.html`,
  },

  background: {
    page: `background.html`,
  },

  permissions: [
    `notifications`,
    `https://www.twitch.tv/*`, // @TODO: get it from config or Twitch class.
  ],
}

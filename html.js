import React from 'react'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import Helmet from 'react-helmet'

const BUILD_TIME = new Date().getTime()

module.exports = React.createClass({
  displayName: 'HTML',
  propTypes: {
    body: React.PropTypes.string,
  },
  render() {
    let css
    let favicon
    if (process.env.NODE_ENV === 'production') {
      css = <style dangerouslySetInnerHTML={{__html: require('!raw!./public/styles.css')}} />
      favicon = <link rel="shortcut icon" href={prefixLink('/favicon.ico')} />
    }

    const head = Helmet.rewind()

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=5.0" />
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {favicon}
          { css }
        </head>
        <body>
          <div id="react-mount" dangerouslySetInnerHTML={{__html: this.props.body}} />
          <script src={ prefixLink(`/bundle.js?t=${BUILD_TIME}`) } />
        </body>
      </html>
    )
  },
})

import React from 'react'

export default function Icon ({ src, ...props }) {
  let Result = null

  if (typeof src === 'function') {
    // guess this as component composed by svg-react-loader
    let SvgIcon = src
    Result = <SvgIcon {...props} />
  } else if (typeof src === 'string') {
    // just an url
    Result = <img {...props} src={src} />
  }

  return Result
}

Icon.propTypes = {
  src: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.string
  ]).isRequired
}

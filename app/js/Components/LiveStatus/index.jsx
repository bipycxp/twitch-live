import React from 'react'
import PanoramaFishEye from 'material-ui/svg-icons/image/panorama-fish-eye'
import Lens from 'material-ui/svg-icons/image/lens'
import { red500 } from 'material-ui/styles/colors'

LiveStatus.propTypes = {
  live: React.PropTypes.bool.isRequired,
  size: React.PropTypes.string,
}

LiveStatus.defaultProps = {
  size: `1em`,
}

export default function LiveStatus (props) {
  const { live, size } = props
  const Icon = live ? Lens : PanoramaFishEye
  const style = {
    width: size,
    height: size,
  }

  return (<Icon color={red500} style={style} />)
}

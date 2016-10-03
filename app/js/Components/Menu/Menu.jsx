import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'

export default function Menu (props) {
  const { handleChange, slideIndex } = props

  return (
    <Tabs onChange={handleChange} value={slideIndex}>
      <Tab label="Live" value={0} />
      <Tab label="Offline" value={1} />
    </Tabs>
  )
}

Menu.propTypes = {
  slideIndex: React.PropTypes.number.isRequired,
  handleChange: React.PropTypes.func.isRequired
}

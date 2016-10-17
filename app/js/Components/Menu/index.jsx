import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'

import Label from './Label'

export default function Menu (props) {
  const { counters, slideIndex, handleChange } = props

  let items = [
    {
      title: 'Online',
      count: counters.live
    },
    {
      title: 'Offline',
      count: counters.offline
    }
  ]

  return (
    <Tabs onChange={handleChange} value={slideIndex}>
      {items.map(({ title, count }, index) => {
        let label = (<Label active={slideIndex === index} title={title} count={count} />)

        return (<Tab key={index} label={label} value={index} />)
      })}
    </Tabs>
  )
}

Menu.propTypes = {
  counters: React.PropTypes.shape({
    live: React.PropTypes.number.isRequired,
    offline: React.PropTypes.number.isRequired
  }).isRequired,
  slideIndex: React.PropTypes.number.isRequired,
  handleChange: React.PropTypes.func.isRequired
}

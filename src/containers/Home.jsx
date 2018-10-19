import React from 'react'
import api from '../modules/api'

import {
  Checkbox,
  Form,
  Segment,
  Grid,
  Button,
  Input,
  Icon
} from 'semantic-ui-react'


export default class extends React.Component {
  
  constructor(props) {
    super(props);    
    this.state = {}
  }

  componentDidMount() {
    /*
    api('GET', '/api/something').then((data) => {
      if (data) 
        this.setState({categories: data})
    })  
    */
  }
  
  logout() {
    sessionStorage.clear()
    location.href = "/login"
  }

  render(){
    const {categories} = this.state
    
    return pug`
      if !categories
        .ui.loader
      else
        .ui.segment
          | Hello Signed in User 
          .ui.small.button.black(onClick=${() => this.logout()}) Sign Out
        .ui.basic.segment
          each category in categories
            .ui.label(key=${category}) ${category}
            br
            br
    `
  }
  
}

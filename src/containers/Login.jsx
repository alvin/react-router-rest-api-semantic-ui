import api from '../modules/api'
import React from 'react'

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
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.state = { 
    }
    
  }
  
  handleSubmit(event) {
    event.preventDefault();
    
    alert("Submit your login form here.")
    
    /*
    const formData = new FormData(event.target);
    
    for (const [key, value]  of formData.entries()) {
        loginRequest[key] = value;
    }
    console.log('loginRequest', loginRequest)
    
    api('POST', '/o/token/', loginRequest).then((authResponse) => {
      if (authResponse && authResponse.access_token)  {
        sessionStorage.setItem("access_token", authResponse.access_token)
        location.href = "/"        
      } else {
        this.setState({error: "Sorry, please try again."})
      }
        
    })
    */
    
  }
  render(){
    
    const {error} = this.state
    
    return pug`
      .ui.middle.aligned.centered.grid.container.ui.transition.fade.in.login-form(style=${{marginTop: '15%'}})
        .fourteen.wide.mobile.six.wide.tablet.six.wide.computer.column
          .ui.basic.very.padded.segment(style=${{background: '#bbb'}})
            h2.ui.center.aligned.header Sign in to your account.
          if error
            .ui.message
              | ${error}
          form.ui.form(onSubmit=${this.handleSubmit} style=${{margin: '2rem 0'}})
            .field
              label Email Address
              input(name="username")
            .field
              label Password
              input(name="password" id='password' type='password')
            .ui.two.column.middle.aligned.grid
              .column
                button.ui.black.button(type="submit")
                    Icon(name='sign in')
                    | Sign In
              .right.aligned.column
                a(href='/recover-password') Forgot your password?
        .ui.hidden.divider
    `
  }
  
}

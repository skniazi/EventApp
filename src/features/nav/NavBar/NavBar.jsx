import React, {Component} from 'react';
import {Menu,Container,Button} from 'semantic-ui-react'
import { NavLink,Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

class NavBar extends Component{

    //Adding State
    state={
      authenticated:false
    };

    //handling SignIn
    handleSignIn = () =>{this.setState({authenticated:true})}

    //handling SignOut
    handleSignOut = () =>{
      this.setState({authenticated:false})
      
      //push the location back to homepage
      this.props.history.push('/');

    }

    render(){

      const {authenticated} = this.state;

        return(
                  <Menu  inverted fixed="top">

                    <Container>
                      
                      <Menu.Item as={NavLink} exact to='/' header>
                        <img src="assets/logo.png" alt="logo" />
                        Re-vents
                      </Menu.Item>


                      <Menu.Item as={NavLink} exact to='/events' name="Events" />

                      <Menu.Item as={NavLink} exact to='/people' name="People" />

                      <Menu.Item>
                        <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
                      </Menu.Item>

                      {authenticated?(<SignedInMenu  signOut={this.handleSignOut}/>):
                      (<SignedOutMenu signIn={this.handleSignIn}/>)}
                     
                    </Container>

                  </Menu>
        )
    }
}

//using higher order component i-e withRouter
export default withRouter(NavBar);
import React from 'react';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
} from 'carbon-components-react/es/components/UIShell';
import { Login24, User24 } from "@carbon/icons-react";
import { Link, withRouter } from 'react-router-dom';
import { AuthService } from '../../services/session-service';
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import socketIOClient from "socket.io-client";


var socket;


class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openMenu: false,
      socket: "http://locahost:3001/"
    }
    socket=this.state.socket
  }



  render() {


    return (
      <Header aria-label="Carbon Tutorial">
        <SkipToContent />
        <HeaderName element={Link} to="/" prefix="">
          Camp Party
        </HeaderName>
        <HeaderNavigation aria-label="Carbon Tutorial">
          <HeaderMenuItem element={Link} to="/camps">
            Campamentos
          </HeaderMenuItem>
          <HeaderMenuItem element={Link} to="/create">
            Crear
          </HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar>
          {/* <HeaderGlobalAction aria-label="Notifications" style={{color:"whitesmoke",width:"auto"}}>
            {(AuthService.isLoggedIn()) ? <p>{()=><div>lll</div>}</p>: <p>fe</p>}
            
          </HeaderGlobalAction> */}
          <HeaderGlobalAction aria-label="User Avatar">
            <OverflowMenu
              ariaLabel="user menu"
              iconDescription={(AuthService.isLoggedIn()) ? "usuario" : "cerrar sesión"}
              flipped
              light
              open={this.state.openMenu}
              renderIcon={() => { return ((AuthService.isLoggedIn()) ? <User24 fill="whitesmoke" /> : <Login24 fill="whitesmoke" />) }}
              onClick={() => {
                if (!AuthService.isLoggedIn()){
                  this.setState({ openMenu: false })
                  this.props.history.push('/login')
                  return
                }
                this.setState({ openMenu: true })
                console.log("cmnnln")
              }} >
              <OverflowMenuItem
                title="Cerrar Sesión"
                isDelete
                onClick={() => {
                  AuthService.removeUserData();
                  this.props.history.push('/')
                }} />
            </OverflowMenu>
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    )
  }
}

export default withRouter(Navbar);
export {socket};



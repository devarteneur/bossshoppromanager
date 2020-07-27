import React, { Component } from 'react';
import { Navbar,Icon, Dropdown, Nav } from 'rsuite';
import { withRouter, Link } from "react-router-dom";

class Navigation extends Component {
    render(){
        return(
        <Navbar>
            <Navbar.Header>
              
            </Navbar.Header>
            <Navbar.Body>
              <Nav>

               <Link to="/"><Nav.Item icon={<Icon icon="home" />}><strong>BossShopPro Manager</strong></Nav.Item></Link>
               <Link to="/shop-creator"><Nav.Item>shop creator</Nav.Item></Link>
               <Link to="/support-a-creator-shop"> <Nav.Item>support a creator Shop</Nav.Item></Link>
               <Link to="/weekly-shop"> <Nav.Item>weekly shop</Nav.Item></Link>
                <Dropdown title="about">
                    <Link to="/"> <Dropdown.Item>the dev</Dropdown.Item></Link>
                    <Link to="/"><Dropdown.Item>the project</Dropdown.Item></Link>
                </Dropdown>
              </Nav>
              <Nav pullRight>
              <Link to="/"> <Nav.Item icon={<Icon icon="cog" />} >settings</Nav.Item></Link>
              </Nav>
            </Navbar.Body>
            </Navbar>
            )
    }
}

export default Navigation;
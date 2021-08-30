import React, {Component} from "react";
import classes from "./Drawer.module.scss"
import Background from "../../UI/background/Background";
import {NavLink} from "react-router-dom";



class Drawer extends Component {

  renderLinks(links) {
    return links.map((link, item) => {
      return <li key={item}>
        <NavLink
          to={link.to}
          exact={link.exact}
          activeClassName={classes.active}
          onClick={this.props.onToggleHandler}
        >
          {link.label}
        </NavLink>
      </li>
    })
  }

  render() {

    const links = [
      {to: '/', label: 'List of test', exact: true}
    ]

    if(this.props.isAuthenticated){
      links.push({to: '/quiz-creator', label: 'Create test ', exact: false})
      links.push({to: '/logout', label: 'Log out ', exact: false})
    }else {
      links.push({to: '/auth', label: 'Auth', exact: false})
    }

    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen ? <Background onClick={this.props.onToggleHandler}/> : null}
      </React.Fragment>

    )
  }
}

export default Drawer
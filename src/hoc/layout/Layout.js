import React, {Component} from "react";
import classes from "./Layout.module.scss"
import MenuToggle from "../../components/navigation/menuToggle/MenuToggle";
import Drawer from "../../components/navigation/drawer/Drawer";
import {connect} from "react-redux";


class Layout extends Component {

  state = {
    isOpen: false
  }

  onToggleHandler = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div className={classes.Layout}>

        <Drawer
          isOpen={this.state.isOpen}
          onToggleHandler={this.onToggleHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <MenuToggle onToggleHandler={this.onToggleHandler}
                    isOpen={this.state.isOpen}/>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    isAuthenticated : !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout)
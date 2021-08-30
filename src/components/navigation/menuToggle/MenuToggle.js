import React from "react";
import classes from "./MenuToggle.module.scss"


const MenuToggle = props => {
  const cls = [
    classes.MenuToggle,
    'fas'
  ]

  if (props.isOpen) {
    cls.push('fa-times-circle')
    cls.push(classes.open)
  } else {
    cls.push('fa-hamburger')
  }


  return (
    <i className={cls.join(' ')}
       onClick={props.onToggleHandler}
    />
  )
}


export default MenuToggle
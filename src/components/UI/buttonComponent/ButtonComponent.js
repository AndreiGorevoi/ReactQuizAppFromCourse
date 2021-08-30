import React from "react";
import classes from './ButtonComponent.module.scss'


const ButtonComponent = props => {

  const cls = [classes.ButtonComponent]

  if(props.type){
    cls.push(classes[props.type])
  }

  return (
    <button
      className={cls.join(' ')}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}


export default ButtonComponent
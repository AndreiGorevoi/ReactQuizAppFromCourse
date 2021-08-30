import React from "react";
import classes from "./Input.module.scss"

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = props => {

  const inputType = props.type || 'text'
  const htmlFor = `${inputType}-${Math.random()}`
  const cls = [classes.Input]

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        type={inputType}
      />

      {isInvalid(props) ? <span>{props.errorMessage || 'Put correct value please'} </span> : null}
    </div>
  )
}

export default Input
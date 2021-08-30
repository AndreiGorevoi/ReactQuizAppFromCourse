import React, {Component} from "react";
import classes from "./Auth.module.scss"
import ButtonComponent from "../../components/UI/buttonComponent/ButtonComponent";
import Input from "../../components/UI/input/Input";
import is from "is_js";
import {connect} from "react-redux";
import {auth} from "../../store/actions/AuthActions";

class Auth extends Component {

  state = {
    isFormValid: false,
    formControl: {
      email: {
        value: '',
        label: 'Email',
        type: 'email',
        errorMessage: 'Please, put correct email address',
        touched: false,
        valid: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        label: 'Password',
        type: 'password',
        errorMessage: 'Please, put correct password',
        touched: false,
        valid: false,
        validation: {
          required: true,
          minLength: 6
        }
      }

    }
  }


  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  signInHandler = () =>{
    this.props.auth(this.state.formControl.email.value,this.state.formControl.password.value, true)
  }

  signUpHandler = async () => {
    this.props.auth(this.state.formControl.email.value,this.state.formControl.password.value, false)
  }


  onChangedInputHandler = (controlName, e) => {

    const formControl = {...this.state.formControl}
    const control = {...formControl[controlName]}


    control.value = e.target.value
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation)

    formControl[controlName] = control;

    let isFormValid = true
    Object.keys(formControl).forEach((control) => {
      isFormValid = formControl[control].valid && isFormValid
    })

    this.setState({
      formControl, isFormValid
    })
  }

  renderInputFields() {
    return Object.keys(this.state.formControl).map((controlName, item) => {
      const control = this.state.formControl[controlName]
      return (
        <Input
          key={controlName + item}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          errorMessage={control.errorMessage}
          type={control.type}
          shouldValidate={!!control.validation}
          label={control.label}
          onChange={this.onChangedInputHandler.bind(this, controlName)}
        />
      )
    });
  }

  submitHandler = e => {
    e.preventDefault();
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Auth</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputFields()}
            <ButtonComponent onClick={this.signInHandler} disabled={!this.state.isFormValid} type="Successes">Sign in</ButtonComponent>
            <ButtonComponent onClick={this.signUpHandler} disabled={!this.state.isFormValid} type="Primary">Registration</ButtonComponent>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (login,password,isLogin) => dispatch(auth(login,password,isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth);
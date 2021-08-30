import React, {Component} from "react";
import classes from "./QuizCreator.module.scss"
import {createDefaultControl, validateControl, validateForm} from "../../formControlCreator/FromControlCreator"
import Input from "../../components/UI/input/Input";
import ButtonComponent from "../../components/UI/buttonComponent/ButtonComponent";
import Select from "../../components/UI/select/Select";
import {connect} from "react-redux";
import {createQuestion, createQuiz} from "../../store/actions/CreateQuizActions";

function createOptionControl(number) {
  return createDefaultControl({
    label: `Option ${number}`,
    errorMessage: 'This field can\' be empty ',
    id: number
  }, {required: true})
}

function createFormControl() {
  return {
    question: createDefaultControl({
      label: 'Write your question',
      errorMessage: 'This field can\' be empty '
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreator extends Component {

  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControl()
  }

  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.value = value
    control.touched = true
    control.valid = validateControl(value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })

  }

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <React.Fragment key={index}>
          <Input
            label={control.label}
            value={control.value}
            touched={control.touched}
            valid={control.valid}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            onChange={e => this.changeHandler(e.target.value, controlName)}
          />
          {(index === 0) ? <hr/> : null}
        </React.Fragment>
      )
    })
  }

  submitHandler = event => {
    event.preventDefault();
  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  createQuestionHandled = () => {

    const {question, option1, option2, option3, option4} = this.state.formControls

    const questionItem = {
      question: question.value,
      rightAnswerId: this.state.rightAnswerId,
      id: this.props.quiz.length+1,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }

    this.props.createQuestion(questionItem)

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControl()
    })
  }

  createQuizHandler =  () => {

    this.props.createQuizAction();

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControl()
    })
  }

  render() {
    const select = <Select
      label={'Select right answer id'}
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
    />

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Quiz creator</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderInputs()}
            {select}
            <ButtonComponent
              disabled={!this.state.isFormValid}
              type={"Primary"}
              onClick={this.createQuestionHandled}
            >Create question</ButtonComponent>
            <ButtonComponent
              disabled={this.props.quiz.length === 0}
              type={"Successes"}
              onClick={this.createQuizHandler}
            >
              Create quiz</ButtonComponent>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz : state.createQuiz.quiz
  }
}

function mapDispatchToProps(dispatch){
  return {
    createQuestion : item => dispatch(createQuestion(item)),
    createQuizAction : () => dispatch(createQuiz())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizCreator)
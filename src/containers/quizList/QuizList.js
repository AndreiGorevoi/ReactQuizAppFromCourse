import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import classes from "./QuizList.module.scss"
import {connect} from "react-redux";
import Spinner from "../../components/UI/spinner/Spinner";
import {getQuizzesFromServerAction} from "../../store/actions/actions";


class QuizList extends Component {


  componentDidMount() {
    this.props.getQuizzesFromServer()
    console.log(this.props)
  }

  renderQuestList() {
    return (
      this.props.quizzes.map((quiz, index) => {
        return (
          <li key={index}>
            <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
          </li>
        )
      })
    )

  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>List of tests</h1>
          {

            this.props.isLoading && this.props.quizzes !== 0
              ? <Spinner/>
              : <ul>
                {this.renderQuestList()}
              </ul>

          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoading : state.quiz.isLoading,
    quizzes: state.quiz.quizzes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getQuizzesFromServer : () => dispatch(getQuizzesFromServerAction())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizList)
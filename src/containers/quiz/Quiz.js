import React, {Component} from "react";
import classes from './Quiz.module.scss'
import ActiveQuize from "../../components/activeQuiz/ActiveQuize";
import FinishedQuiz from "../../components/activeQuiz/finishedQuiz/FinishedQuiz";
import Spinner from "../../components/UI/spinner/Spinner";
import {connect} from "react-redux";
import {fetchClickAnswer, fetchQuizById, fetchRefreshQuiz} from "../../store/actions/actions";

class Quiz extends Component {

   componentDidMount() {
     this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
     this.props.refreshQuiz()
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Test N1</h1>

          {
            this.props.isLoading || !this.props.quiz
              ? <Spinner/>
              :
                this.props.quizIsFinished
                ?
                <FinishedQuiz
                  quiz={this.props.quiz}
                  results={this.props.results}
                  onRetry={this.props.refreshQuiz}
                />
                :
                <ActiveQuize
                  answers={this.props.quiz[this.props.activeQuestion].answers}
                  question={this.props.quiz[this.props.activeQuestion].question}
                  clickAnswer={this.props.clickAnswerHandler}
                  quizLength={this.props.quiz.length}
                  quizActiveQuestion={this.props.activeQuestion + 1}
                  answerState={this.props.answerState}
                />
          }


        </div>
      </div>
    )
  }
}

function mapStateTeProps(state){
  return {
    results: state.quiz.results,
    quizIsFinished: state.quiz.quizIsFinished,
    answerState: state.quiz.answerState,
    activeQuestion: state.quiz.activeQuestion,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}


function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    clickAnswerHandler : answerId => dispatch(fetchClickAnswer(answerId)),
    refreshQuiz : () => dispatch(fetchRefreshQuiz())
  }
}

export default connect(mapStateTeProps,mapDispatchToProps)(Quiz)
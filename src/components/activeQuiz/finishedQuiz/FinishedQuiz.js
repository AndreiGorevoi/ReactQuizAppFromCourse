import React from "react";
import classes from './FinishedQuiz.module.scss';
import '@fortawesome/fontawesome-free/css/all.css'
import ButtonComponent from "../../UI/buttonComponent/ButtonComponent";
import {Link} from "react-router-dom";


const FinishedQuiz = props => {

  const countOfSuccesses = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'Successes') {
      total++
    }
    return total
  }, 0)

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, key) => {
          let cls = ['fa']
          cls.push(classes[props.results[quizItem.id]])
          if (props.results[quizItem.id] === 'Successes') {
            cls.push('fa-check')
          } else {
            cls.push('fa-times')
          }
          return (
            <li
              key={key}
            >
              {quizItem.question}
              <i className={cls.join(' ')}/>
            </li>
          )
        })}
      </ul>

      <p>{countOfSuccesses} of {props.quiz.length}</p>
      <ButtonComponent onClick={props.onRetry} type={'Primary'}>Retry</ButtonComponent>
      <Link to="/">
        <ButtonComponent type={'Successes'}>Go to all tests</ButtonComponent>
      </Link>
    </div>
  )
}

export default FinishedQuiz
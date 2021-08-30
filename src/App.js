import Layout from "./hoc/layout/Layout";
import Quiz from "./containers/quiz/Quiz";
import {Redirect, Route, Switch} from "react-router-dom";
import Auth from "./containers/auth/Auth";
import QuizCreator from "./containers/quizCreator/QuizCreator";
import QuizList from "./containers/quizList/QuizList";
import Logout from "./components/logout/Logout";
import {connect} from "react-redux";
import React, {Component} from "react";
import {autoLogin} from "./store/actions/AuthActions";

class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let route = (
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/quiz/:id" component={Quiz}/>
          <Route path="/" exact component={QuizList}/>
          <Redirect to="/"/>
        </Switch>
      </Layout>
    )

    if(this.props.isAuthenticated){
      route = (
        <Layout>
          <Switch>
            <Route path="/quiz-creator" component={QuizCreator}/>
            <Route path="/quiz/:id" component={Quiz}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" exact component={QuizList}/>
            <Redirect to="/"/>
          </Switch>
        </Layout>
      )
    }
    return route
  }



}

function mapStateToProps(state){
  return {
    isAuthenticated : !! state.auth.token
  }
}

function mapDispatchToProps(dispatch){
  return {
    autoLogin : () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

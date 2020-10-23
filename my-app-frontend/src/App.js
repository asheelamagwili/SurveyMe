import React from 'react';
import Register from './Auth/register';
import Login from './Auth/login';
import Home from './Home/home';
import Profile from './Profile/profile';
import Create from './Survey/new';
import SurveyDashboard from './Survey/survey_dashboard'
import Questions from './Survey/survey_questions';
import Navigation from './Navigation/navigation';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div>
        <Navigation></Navigation>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/surveys">Dashboard</Link>
            </li>
            <li>
              <Link to="/surveys/create">Create</Link>
            </li>
            <li>
              <Link to="/surveys/create/questions">Questions</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/surveys/create/questions" component={Questions} />
          <Route exact path="/surveys/create" component={Create} />
          <Route path="/surveys" component={SurveyDashboard} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

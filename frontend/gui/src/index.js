import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//import './froala/css/froala_blocks.min.css'
//import './datepicker/style.css'
//import './datePicker/picker.css'
//import './formTemplate/css/style.css'
//import './bootstrap/dist/css/bootstrap.css'
//import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'
//import './css/app.css';
//import './css/normalize.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "Components/dashboard";
import About from "Components/about";
import Contact from "Components/contact";
import Faq from "Components/faq";
import Home from "Components/home";
import Privacy from "Components/privacy";
import Signin from "Components/signin";
import Signup from "Components/signup";
import Terms from "Components/terms";

import Store from "Store/store";

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router>
          <div>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/faq" component={Faq} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
              <Route path="/terms" component={Terms} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/dashboard/:page" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

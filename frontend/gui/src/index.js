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
import Download from "Components/download";
import About from "Components/about";
import Contact from "Components/contact";
import Faq from "Components/faq";
import Home from "Components/home";
import Privacy from "Components/privacy";
import Signin from "Components/signin";
import Signup from "Components/signup";
import Terms from "Components/terms";
import EmailVerification from "Components/emailVerification";
import PasswordReset from "Components/passwordReset";
import ProtectedRoute from "Components/protectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";

import { store, persistor } from "Store/store";
import { PersistGate } from "redux-persist/integration/react";
import "react-calendar/dist/Calendar.css";

//react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <PersistGate persistor={persistor}>
            <div>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/faq" exact component={Faq} />
                <Route path="/privacy" exact component={Privacy} />
                <Route path="/verify-email" component={EmailVerification} />
                <Route path="/reset-password" component={PasswordReset} />
                <ProtectedRoute path="/signin" exact component={Signin} />
                <ProtectedRoute path="/signup" exact component={Signup} />
                <Route path="/terms" exact component={Terms} />
                <ProtectedRoute path="/dashboard" exact component={Dashboard} />
                <ProtectedRoute path="/download" exact component={Download} />
                <ProtectedRoute
                  path="/dashboard/:page"
                  exact
                  component={Dashboard}
                />
                <Route path="*" component={() => "404 Page Not Found "} />
              </Switch>
            </div>
          </PersistGate>
        </Router>
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

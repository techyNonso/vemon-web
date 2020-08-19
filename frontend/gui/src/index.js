import React , {Component} from 'react';
import ReactDOM from 'react-dom';
//import './froala/css/froala_blocks.min.css'
//import './datepicker/style.css'
//import './datePicker/picker.css'
//import './formTemplate/css/style.css'
//import './bootstrap/dist/css/bootstrap.css'
//import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'
//import './css/app.css';
//import './css/normalize.css';

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Dashboard from '../components/dashboard'
import About from '../components/about'
import Contact from '../components/contact'
import Faq from '../components/faq'
import Home from '../components/home'
import Privacy from '../components/privacy'
import Signin from '../components/signin'
import Signup from '../components/signup'
import Terms from '../components/terms'





class App extends(Component){
    render() {
        return(
            <Router>
            <div> 

                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/faq/:id" component={Faq} />
                    <Route path="/privacy" component={Privacy} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/terms" component={Terms} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
                
            </div>
            </Router>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

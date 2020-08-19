import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import './froala/css/froala_blocks.min.css'
import './datepicker/style.css'
import './datePicker/picker.css'
import './bootstrap/dist/css/bootstrap.css'
//import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import './css/app.css';




class App extends(Component){
    render() {
        return(
            <div> 
                <h1>We start</h1>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

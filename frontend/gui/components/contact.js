import React,{Component} from 'react';
import Header from './header';
import Footer from './footer';

class Contact extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return(
            <div>
   <Header />

    
   <section
      className="fdb-block pt-0"
      style={{backgroundImage: "url(/src/froala/imgs/shapes/8.svg)"}}
    >
      <div className="bg-gray">
        <div className="container">
          <div className="row-100"></div>
          <div className="row text-left">
            <div className="col-8">
              <h1>Contact Us</h1>
              <p className="lead">
                We are always here to attend to your needs as soon as possible.
                You can contact any division of the company concerning a
                corresponding complaint or enquiry and we will do well to reply
                you.
              </p>
            </div>
          </div>
          <div className="row-100"></div>
        </div>
      </div>
      <div className="container bg-r">
        <div className="row-100"></div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-5">
            <h2>Call or email</h2>
            <p className="text-large">
              Support, Sales, and Account Management services are currently
              available in English
            </p>

            <p className="h3 mt-4 mt-lg-5">
              <strong>Support</strong>
            </p>
            <p>
              +234 813 183 2011
            </p>
            <p>Support@vemon.com</p>

            <p>
              Our technical support is available by phone or email from 8am to
              7pm GMT, Monday through Friday.
            </p>

            <p className="h3 mt-4 mt-lg-5">
              <strong>Sales</strong>
            </p>
            <p>
              +234 813 183 2011
            </p>
            <p>Sales@vemon.com</p>

            <p>
              Our technical support is available by phone or email from 11am to
              11pm BST, Monday through Friday.
            </p>
          </div>

          <div className="col-12 col-md-6 ml-auto">
            <h2>Drop us a message</h2>
            <form>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <select className="form-control" required="">
                    <option value="">Select Department</option>
                    <option value="1">Support</option>
                    <option value="2">Sales</option>
                    <option value="3">Accounting</option>
                  </select>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <textarea
                    className="form-control"
                    name="message"
                    rows="5"
                    placeholder="How can we help?"
                  ></textarea>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <button type="submit" className="btn myBtn">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>


   

    <Footer/>
    </div>
        )
    }


}


export default Contact
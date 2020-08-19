import React from 'react'

function Footer() {
    return(
        <div>
        
    <footer className="fdb-block footer-large bg-dark">
      <div className="container" style={{backgroundColor: "inherit"}}>
        <div className="row align-items-top text-center">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 text-sm-left">
            <strong>Quick Link</strong>
            <nav className="nav flex-column">
              <a className="nav-link active" href="https://www.froala.com">Home</a>

              <a className="nav-link" href="https://www.froala.com">Features</a>
              <a className="nav-link" href="https://www.froala.com">Pricing</a>

              <a className="nav-link" href="https://www.froala.com">Contact Us</a>
            </nav>
          </div>

          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 mt-5 mt-sm-0 text-sm-left"
          >
            <strong>Other Links</strong>
            <nav className="nav flex-column">
              <a className="nav-link active" href="https://www.froala.com"
                >Privacy Policy</a
              >
              <a className="nav-link" href="https://www.froala.com">Terms</a>
              <a className="nav-link" href="https://www.froala.com">FAQ</a>
              <a className="nav-link" href="https://www.froala.com">Support</a>
            </nav>
          </div>

          <div className="col-12 col-md-4 col-lg-3 text-md-left mt-5 mt-md-0">
            <strong>About Us</strong>
            <p>
              We are an African Company working with Africa in mind. We are
              Focused on developing softwares to aid business growth.
            </p>
          </div>

          <div className="col-12 col-lg-2 ml-auto text-lg-left mt-4 mt-lg-0">
            <strong>Follow Us</strong>
            <p className="lead">
              <a href="https://www.froala.com" className="mx-2"
                ><i className="fab fa-twitter" aria-hidden="true"></i
              ></a>
              <a href="https://www.froala.com" className="mx-2"
                ><i className="fab fa-facebook" aria-hidden="true"></i
              ></a>
              <a href="https://www.froala.com" className="mx-2"
                ><i className="fab fa-instagram" aria-hidden="true"></i
              ></a>
              <a href="https://www.froala.com" className="mx-2"
                ><i className="fab fa-pinterest" aria-hidden="true"></i
              ></a>
              <a href="https://www.froala.com" className="mx-2"
                ><i className="fab fa-google" aria-hidden="true"></i
              ></a>
            </p>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col text-center">
            © 2020 Vemon. All Rights Reserved
          </div>
        </div>
      </div>
    </footer>

        </div>
    )
}

export default Footer;
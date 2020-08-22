import React, { Component } from "react";

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="row  mb-4">
          <div className="col-lg-6  pr-4 pl-4 mb-4">
            <div className="boardBearer p-3">
              <div className="border border-top-0 border-right-0 border-left-0">
                <h5>Stock settings</h5>
              </div>

              <form action="" className="form mt-3">
                <div className="form-field mb-3">
                  <input
                    type="number"
                    id="stockPerc"
                    min="1"
                    className="form-control"
                    placeholder="stock limit"
                  />
                  <span className="settingSpan">
                    This is maximum percentage stock volume required to triger
                    stock exhaustion alert
                  </span>
                </div>

                <div className="form-field">
                  <input
                    type="number"
                    id="stockExp"
                    min="1"
                    className="form-control"
                    placeholder="expiration limit"
                  />
                  <span className="settingSpan">
                    This is maximum number of days required to triger stock
                    expiration alert
                  </span>
                </div>

                <div className="border border-right-0 border-left-0 border-bottom-0 mt-3 text-right">
                  <a href="#" className="btn btn-sm btn-primary mt-2">
                    Save
                  </a>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-6  pr-4 pl-4 mb-4">
            <div className="boardBearer p-3">
              <div className="border border-top-0 border-right-0 border-left-0">
                <h5>User settings</h5>
              </div>

              <form action="" className="form mt-3">
                <div className="form-field mb-3">
                  <input
                    type="text"
                    id="fname"
                    className="form-control"
                    placeholder="Firstname"
                  />
                </div>

                <div className="form-field mb-3">
                  <input
                    type="text"
                    id="lname"
                    className="form-control"
                    placeholder="Lastname"
                  />
                </div>

                <div className="form-field mb-3">
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>

                <div className="border border-right-0 border-left-0 border-bottom-0 mt-3 text-right">
                  <a href="#" className="btn btn-sm btn-primary mt-2">
                    Save
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;

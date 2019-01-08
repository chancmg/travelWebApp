import React from 'react';

const SignUp = () => {
    return ( <div>
    <main className="signin-main">
      <center>

        <div className="section">
        <h1 className="black-text">Travel App Dashboard</h1>
        </div>

        <h5 className="black-text">Please, login into your account</h5>
        <div className="section"></div>

        <div className="container">
          <div className="z-depth-1 grey lighten-2 row loginbox">

            <form className="col s12" method="post">
              <div className="row">
                <div className="col s12">
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input className="validate" type="email" name="email" id="email" />
                  <label htmlFor="email">Enter your email</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input className="validate" type="password" name="password" id="password" />
                  <label htmlFor="password">Enter your password</label>
                </div>
                <label className="right">
                <a className="pink-text" href="#!"><b>Forgot Password?</b></a>
                </label>
              </div>

              <br />
              <center>
                <div className="row">
                  <button type="submit" name="btn_login" className="col s12 btn btn-large waves-effect black">Login</button>
                </div>
              </center>
            </form>
          </div>
        </div>

      </center>

      <div className="section"></div>
      <div className="section"></div>
    </main></div>);
};

export default SignUp;

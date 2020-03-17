import React, { useState } from "react";
import FormError from "./FormError";
import { navigate } from "@reach/router";

function Login({ firebase }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = event => {
    const itemName = event.target.name;
    const itemValue = event.target.value;
    switch (itemName) {
      case "email":
        setEmail(itemValue);
        break;
      case "password":
        setPassword(itemValue);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    const registrationInfo = {
      email: email,
      password: password
    };
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        navigate("/meetings");
      })
      .catch(error => {
        error !== null ? setErrorMsg(error.message) : setErrorMsg(null);
      });
  };

  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card bg-light">
              <div className="card-body">
                <h3 className="font-weight-light mb-3">Log in</h3>
                <section className="form-group">
                  {errorMsg !== null ? (
                    <FormError errMessage={errorMsg} />
                  ) : null}
                  <label className="form-control-label sr-only" htmlFor="Email">
                    Email
                  </label>
                  <input
                    required
                    className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </section>
                <section className="form-group">
                  <input
                    required
                    className="form-control"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </section>
                <div className="form-group text-right mb-0">
                  <button className="btn btn-primary" type="submit">
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;

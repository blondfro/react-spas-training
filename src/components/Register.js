import React, { useEffect, useState } from "react";
import FormError from "./FormError";

function Register({ firebase }) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [passOne, setPassOne] = useState("");
  const [passTwo, setPassTwo] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    passwordCheck();
  }, [passOne, passTwo]);

  const handleChange = event => {
    const itemName = event.target.name;
    const itemValue = event.target.value;
    switch (itemName) {
      case "displayName":
        setDisplayName(itemValue);
        break;
      case "email":
        setEmail(itemValue);
        break;
      case "passOne":
        setPassOne(itemValue);
        break;
      case "passTwo":
        setPassTwo(itemValue);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    const registrationInfo = {
      displayName,
      email,
      password: passOne
    };
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .catch(error => {
        error !== null ? setErrorMsg(error.message) : setErrorMsg(null);
      });
  };

  const passwordCheck = () => {
    if (passOne !== passTwo) {
      setErrorMsg("Passwords do not match");
    } else setErrorMsg(null);
  };

  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card bg-light">
              <div className="card-body">
                <h3 className="font-weight-light mb-3">Register</h3>
                <div className="form-row">
                  {errorMsg !== null ? (
                    <FormError errMessage={errorMsg} />
                  ) : null}
                  <section className="col-sm-12 form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="displayName"
                    >
                      Display Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="displayName"
                      placeholder="Display Name"
                      name="displayName"
                      value={displayName}
                      onChange={handleChange}
                      required
                    />
                  </section>
                </div>
                <section className="form-group">
                  <label className="form-control-label sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    required
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </section>
                <div className="form-row">
                  <section className="col-sm-6 form-group">
                    <input
                      className="form-control"
                      type="password"
                      name="passOne"
                      value={passOne}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                  </section>
                  <section className="col-sm-6 form-group">
                    <input
                      className="form-control"
                      type="password"
                      required
                      name="passTwo"
                      placeholder="Repeat Password"
                      value={passTwo}
                      onChange={handleChange}
                    />
                  </section>
                </div>
                <div className="form-group text-right mb-0">
                  <button className="btn btn-primary" type="submit">
                    Register
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

export default Register;

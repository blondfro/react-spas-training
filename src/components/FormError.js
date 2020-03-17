import React from "react";

function FormError({ errMessage, ...props }) {
  return <div className="col-12 alert alert-danger px-3">{errMessage}</div>;
}

export default FormError;

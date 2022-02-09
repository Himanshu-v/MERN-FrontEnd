import React from "react";

const Alert = (props) => {
  const capitalise = (message) => {
    let word = message.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <div style={{ height: "40px" }}>
      {" "}
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalise(props.alert.type)}!</strong> {props.alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;

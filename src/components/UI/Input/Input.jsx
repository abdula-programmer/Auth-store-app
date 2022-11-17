import React from "react";
import styles from './Input.module.css';



const Input = ({isValid, value, id, changeHandler, validateHandler, label}) => {
  return (
    <div
      className={`${styles.control} ${
        isValid === false ? styles.invalid : ""
      }`}
    >
      <label htmlFor="id">{label}</label>
      <input
        type={id}
        id={id}
        value={value}
        onChange={changeHandler}
        onBlur={validateHandler}
      />
    </div>
  );
};

export default Input;

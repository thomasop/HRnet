import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../../Home.module.scss";

interface Proptype {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  labelName: string;
  typeInput: string;
  nameInput: string;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  regex: RegExp;
  regexErrorMessage: string;
}

const DefaultInput = ({
  labelName,
  inputValue,
  setInputValue,
  typeInput,
  nameInput,
  errorMessage,
  setErrorMessage,
  regex,
  regexErrorMessage,
}: Proptype) => {
  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (regex.test(e.target.value)) {
      setErrorMessage("");
    } else if (e.target.value.length === 0) {
      setErrorMessage("");
    } else {
      setErrorMessage(`${labelName} ${regexErrorMessage}`);
    }
  };
  console.log(errorMessage);
  return (
    <>
      <div className={styles.home__form__group}>
        <label className={styles.home__form__group__label} htmlFor="firstname">
          {labelName}
        </label>
        <input
          className={styles.home__form__group__input}
          type={typeInput}
          name={nameInput}
          id={nameInput}
          value={inputValue}
          onChange={(e) => handlerInput(e)}
        />
        <div className={styles.home__form__group__error}>
          {errorMessage}
        </div>
      </div>
    </>
  );
};

export default DefaultInput;

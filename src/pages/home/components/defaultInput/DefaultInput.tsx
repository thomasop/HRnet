import React, { Dispatch, SetStateAction } from "react";
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

/**
 * React component - Display a default input
 * @param {Proptype} Props
 * @param {string} Props.inputValue - display input value
 * @param {Dispatch<SetStateAction<string>>} Props.setInputValue - edit input value
 * @param {string} Props.labelName - display the label name
 * @param {string} Props.typeInput - type of input
 * @param {string} Props.nameInput - display name of input
 * @param {string} Props.errorMessage - display error message
 * @param {Dispatch<SetStateAction<string>>} Props.setErrorMessage - edit error message
 * @param {RegExp} Props.regex - regex to check input value
 * @param {string} Props.regexErrorMessage - regex error message
 * @return {JSX.Element}
 */
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
}: Proptype): JSX.Element => {
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
  return (
    <>
      <div className={styles.home__form__group}>
        <label className={styles.home__form__group__label} htmlFor={nameInput}>
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
        <div className={styles.home__form__group__error}>{errorMessage}</div>
      </div>
    </>
  );
};

export default DefaultInput;

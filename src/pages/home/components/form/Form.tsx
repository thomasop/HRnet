import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultInput from "../defaultInput/DefaultInput";
import SelectInput from "../selectInput/SelectInput";
import { RootState } from "../../../../store";
import styles from "./Form.module.scss";
import DatePicker from "thomasop-date-picker";

const Form = () => {
  const dispatch = useDispatch();

  const [firstnameInput, setFirstnameInput] = useState<string>("");
  const [lastnameInput, setLastnameInput] = useState<string>("");
  const [birthInput, setBirthInput] = useState<string[]>(["", ""]);
  const [startInput, setStartInput] = useState<string[]>(["", ""]);
  const [streetInput, setStreetInput] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");
  const [zipInput, setZipInput] = useState<string>("");
  const [departementInput, setDepartementInput] = useState<string>("Sales");
  const [stateInput, setStateInput] = useState<string>("Alabama");
  const { data } = useSelector((state: RootState) => state.Array);

  const [firstnameInputError, setFirstnameInputError] = useState<string>("");
  const [lastnameInputError, setLastnameInputError] = useState<string>("");
  const [birthInputError, setBirthInputError] = useState<string>("");
  const [startInputError, setStartInputError] = useState<string>("");
  const [streetInputError, setStreetInputError] = useState<string>("");
  const [cityInputError, setCityInputError] = useState<string>("");
  const [zipInputError, setZipInputError] = useState<string>("");

  const clearInput = () => {
    setFirstnameInput("");
    setLastnameInput("");
    setBirthInput(["", ""]);
    setStartInput(["", ""]);
    setStreetInput("");
    setCityInput("");
    setZipInput("");
    setDepartementInput("");
    setStateInput("");
  };
  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employees = [];
    for (let i = 0; i < 100; i++) {
      const employee = {
        firstName: "firstname" + i,
        lastName: "lastname" + i,
        dateOfBirth: new Date().toDateString(),
        startDate: new Date().toDateString(),
        department: i,
        street: "rue" + i + "exemple",
        city: "paris",
        state: "Alabama",
        zipCode: i,
      };
      employees.push(employee);
    }
    /* dispatch({
      type: "Array/storeData",
      payload: { data: { data: employees } },
    }); */
    dispatch({
      type: "Data/storeData",
      payload: { data: { data: employees } },
    });
    if (
      firstnameInput.length > 0 &&
      lastnameInput.length > 0 &&
      birthInput[0].length > 0 &&
      startInput[0].length > 0 &&
      streetInput.length > 0 &&
      cityInput.length > 0 &&
      zipInput.length > 0
    ) {
      const employees = [];
      const employee = {
        firstName: firstnameInput,
        lastName: lastnameInput,
        dateOfBirth: birthInput[0],
        startDate: startInput[0],
        department: departementInput,
        street: streetInput,
        city: cityInput,
        state: stateInput,
        zipCode: zipInput,
      };
      employees.push(employee);
      setFirstnameInputError("");
      setLastnameInputError("");
      setBirthInputError("");
      setStartInputError("");
      setStreetInputError("");
      setCityInputError("");
      setZipInputError("");
      dispatch({
        type: "Modal/open",
      });
      if (data && data["data"]) {
        /* dispatch({
          type: "Array/storeData",
          payload: { data: { data: [...data["data"], employees[0]] } },
        }); */
        dispatch({
          type: "Data/storeData",
          payload: { data: { data: [...data["data"], employees[0]] } },
        });
        clearInput();
      } else {
        /* dispatch({
          type: "Array/storeData",
          payload: { data: { data: employees } },
        }); */
        dispatch({
          type: "Data/storeData",
          payload: { data: { data: employees } },
        });
        clearInput();
      }
    } else {
      console.log(firstnameInput);
      if (firstnameInput.length === 0) {
        setFirstnameInputError("Firstname can't be empty");
      } else {
        setFirstnameInputError("");
      }
      if (lastnameInput.length === 0) {
        setLastnameInputError("Lastname can't be empty");
      } else {
        setLastnameInputError("");
      }
      if (birthInput[0].length === 0) {
        setBirthInputError("Birth can't be empty");
      } else {
        setBirthInputError("");
      }
      if (startInput[0].length === 0) {
        setStartInputError("Start can't be empty");
      } else {
        setStartInputError("");
      }
      if (streetInput.length === 0) {
        setStreetInputError("Street can't be empty");
      } else {
        setStreetInputError("");
      }
      if (cityInput.length === 0) {
        setCityInputError("City can't be empty");
      } else {
        setCityInputError("");
      }
      if (zipInput.length === 0) {
        setZipInputError("Zip code can't be empty");
      } else {
        setZipInputError("");
      }
    }
  };
  return (
    <>
      <form
        className={styles.form}
        onSubmit={(e) => {
          handlerSubmit(e);
        }}
      >
        <DefaultInput
          inputValue={firstnameInput}
          setInputValue={setFirstnameInput}
          labelName={"First Name"}
          typeInput={"text"}
          nameInput={"firstname"}
          errorMessage={firstnameInputError}
          setErrorMessage={setFirstnameInputError}
          regex={/[a-zA-Z]{2,}/}
          regexErrorMessage={"must have a minimum of 2 characters"}
        />
        <DefaultInput
          inputValue={lastnameInput}
          setInputValue={setLastnameInput}
          labelName={"Last Name"}
          typeInput={"text"}
          nameInput={"lastname"}
          errorMessage={lastnameInputError}
          setErrorMessage={setLastnameInputError}
          regex={/[a-zA-Z]{2,}/}
          regexErrorMessage={"must have a minimum of 2 characters"}
        />
        <DatePicker
          labelElement={"Date of Birth"}
          nameElement={"birth"}
          cssClass={"birth"}
          setterValueInput={setBirthInput}
          valueInput={birthInput}
          mainColor={"#93ad18"}
          secondColor={"#5a6f08"}
        />
        <div className={styles.form__group__error}>{birthInputError}</div>

        <DatePicker
          labelElement={"Start Date"}
          nameElement={"start"}
          cssClass={"start"}
          setterValueInput={setStartInput}
          valueInput={startInput}
          mainColor={"#93ad18"}
          secondColor={"#5a6f08"}
        />
        <div className={styles.form__group__error}>{startInputError}</div>
        <div className={styles.form__div}>
          <p className={styles.form__div__p}>Address</p>
          <DefaultInput
            inputValue={streetInput}
            setInputValue={setStreetInput}
            labelName={"Street"}
            typeInput={"text"}
            nameInput={"street"}
            errorMessage={streetInputError}
            setErrorMessage={setStreetInputError}
            regex={/[a-zA-Z]{2,}/}
            regexErrorMessage={"must have a minimum of 2 characters"}
          />
          <DefaultInput
            inputValue={cityInput}
            setInputValue={setCityInput}
            labelName={"City"}
            typeInput={"text"}
            nameInput={"city"}
            errorMessage={cityInputError}
            setErrorMessage={setCityInputError}
            regex={/[a-zA-Z]{2,}/}
            regexErrorMessage={"must have a minimum of 2 characters"}
          />
          <SelectInput
            labelName={"State"}
            inputValue={stateInput}
            setInputValue={setStateInput}
            className={"stateClass"}
            datas={[
              "Alabama",
              "Alaska",
              "American Samoa",
              "Arizona",
              "California",
              "Colorado",
              "Connecticut",
              "Delaware",
              "District Of Columbia",
              "Federated States Of Micronesia",
              "Florida",
              "Georgia",
              "Guam",
              "Hawaii",
              "Idaho",
              "Illinois",
              "Indiana",
              "Lowa",
              "Kansas",
              "Kentucky",
              "Louisiana",
              "Maine",
              "Marshall Islands",
              "Maryland",
              "Massachusetts",
              "Michigan",
              "Minnesota",
              "Mississippi",
              "Missouri",
              "Montana",
              "Nebraska",
              "Nevada",
              "New Hampshire",
              "New Jersey",
              "New Mexico",
              "New York",
              "North Dakota",
              "Northern Mariana Islands",
              "Ohio",
              "Oklahoma",
              "Oregon",
              "Palau",
              "Pennsylvania",
              "Puerto Rico",
              "Rhode Island",
              "South Carolina",
              "South Dakota",
              "Tennessee",
              "Texas",
              "Utah",
              "Vermont",
              "Virgin Islands",
              "Virginia",
              "Washington",
              "West Virginia",
              "Wisconsin",
              "Wyoming",
            ]}
          />
          <DefaultInput
            inputValue={zipInput}
            setInputValue={setZipInput}
            labelName={"Zip Code"}
            typeInput={"number"}
            nameInput={"code"}
            errorMessage={zipInputError}
            setErrorMessage={setZipInputError}
            regex={/[0-9]{5,5}/}
            regexErrorMessage={"must be five digits"}
          />
        </div>
        <SelectInput
          labelName={"Department"}
          inputValue={departementInput}
          setInputValue={setDepartementInput}
          className={"departementClass"}
          datas={[
            "Sales",
            "Marketing",
            "Engineering",
            "Human Resources",
            "Legal",
          ]}
        />

        <div className={styles.form__submit}>
          <input
            className={styles.form__submit__btn}
            type="submit"
            value="Save"
          />
        </div>
      </form>
    </>
  );
};

export default Form;

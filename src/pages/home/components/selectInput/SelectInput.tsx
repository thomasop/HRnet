import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../Home.module.scss";

interface PropType {
  labelName: string;
  datas: string[];
  setInputValue: Dispatch<SetStateAction<string>>;
  inputValue: string;
  className: string;
}

/**
 * React component - Display a select input
 * @param {Proptype} Props
 * @param {string} Props.labelName - display the label name
 * @param {string[]} Props.datas - display the label name
 * @param {Dispatch<SetStateAction<string>> | null} Props.setInputValue - edit select value
 * @param {string} Props.inputValue - display select value
 * @param {string} Props.className - display className value
 * @return {JSX.Element}
 */
const SelectInput = ({
  labelName,
  datas,
  setInputValue,
  inputValue,
  className,
}: PropType): JSX.Element => {
  const [userClickDropdownMenu, setUserClickDropdownMenu] =
    useState<boolean>(false);
  const handlerClick = (data: string) => {
    setInputValue(data);
    setUserClickDropdownMenu(false);
  };
  document.addEventListener("click", (e) => {
    let htmlElement = e.target as HTMLElement;
    if (htmlElement && !htmlElement.classList.contains(className)) {
      if (userClickDropdownMenu === true) {
        setUserClickDropdownMenu(false);
      }
    }
  });
  return (
    <>
      <div className={`${className} ${styles.home__form__group}`}>
        <label className={styles.home__form__group__label}>{labelName}</label>
        <div className={className}>
          <ul className={`${className} ${styles.home__form__group__div__ul}`}>
            <li
              className={`${className} ${
                userClickDropdownMenu === true
                  ? styles.home__form__group__div__ul__li__main__open
                  : styles.home__form__group__div__ul__li__main
              }`}
              onClick={() => setUserClickDropdownMenu(!userClickDropdownMenu)}
            >
              {inputValue.length === 0 ? datas[0] : inputValue}
              <span
                className={`${className} ${styles.home__form__group__div__ul__li__main__span}`}
              ></span>
            </li>
            {userClickDropdownMenu && (
              <>
                <ul
                  className={`${className} ${styles.home__form__group__div__ul__ul}`}
                >
                  {datas &&
                    datas.map((data: string, index: number) => {
                      return (
                        <li
                          key={index}
                          className={`${className} ${styles.home__form__group__div__ul__ul__li}`}
                          onClick={() => {
                            handlerClick(data);
                          }}
                        >
                          {data}
                        </li>
                      );
                    })}
                </ul>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SelectInput;

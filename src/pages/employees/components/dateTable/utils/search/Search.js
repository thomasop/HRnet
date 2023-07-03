import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Search.module.scss";

const Search = () => {
  const [keyAr, setKeyAr] = useState([]);
  const [displayCancel, setDisplayCancel] = useState(false);
  const { onSearch, data, initialData } = useSelector((state) => state.Array);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handlerInputSearch = (e) => {
    if (data) {
      if (e.target.value.length === 0) {
        setDisplayCancel(false);
        if (onSearch === true) {
          dispatch({
            type: "Array/storeDataSearchInv",
            payload: { data: { data: initialData.data } },
          });
        }
      } else {
        setDisplayCancel(true);
        let ar = [];
        initialData.data.filter((data) => {
          for (let i = 0; i < keyAr.length; i++) {
            if (
              data[keyAr[i]]
                .toString()
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            ) {
              ar.push(data);
              continue;
            }
          }
          return null;
        });
        let newar = [...new Set(ar)];
        dispatch({
          type: "Array/storeDataSearch",
          payload: { data: { data: newar } },
        });
      }
    } else {
      if (e.target.value.length === 0) {
        setDisplayCancel(false);
      } else {
        setDisplayCancel(true);
      }
    }
  };
  useEffect(() => {
    if (data && data.data.length > 0) {
      setKeyAr(Object.keys(data.data[0]));
    }
  }, [data]);
  return (
    <div className={styles.search__div}>
      <label htmlFor="search">Search : </label>
      <input
        ref={inputRef}
        type="text"
        name="search"
        id="search"
        onChange={(e) => handlerInputSearch(e)}
      />
      {displayCancel === true && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className={styles.search__div__cancel}
        >
          <path
            fill="gray"
            onClick={() => {
              if (data) {
                inputRef.current.value = "";
                setDisplayCancel(false);
                dispatch({
                  type: "Array/storeDataSearchInv",
                  payload: { data: { data: initialData.data } },
                });
              } else {
                inputRef.current.value = "";
                setDisplayCancel(false);
              }
            }}
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
          />
        </svg>
      )}
    </div>
  );
};

export default Search;

import React, { useEffect, useState, useRef, MutableRefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Search.module.scss";
import { RootState } from "../../../../../store";

/**
 * React component - Display the search bar
 * @return {JSX.Element}
 */
const Search = (): JSX.Element => {
  const [keyAr, setKeyAr] = useState<string[]>([]);
  const [displayCancel, setDisplayCancel] = useState(false);

  const { currentPage } = useSelector(
    (state: RootState) => state.DataTableFilter
  );
  const { data, initialData } = useSelector(
    (state: RootState) => state.DataTable
  );
  const dispatch = useDispatch();
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const handlerInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (data) {
      if (e.target.value.length === 0) {
        setDisplayCancel(false);
        dispatch({
          type: "DataTable/storeDataTableSearch",
          payload: { data: { data: initialData?.data } },
        });
      } else {
        setDisplayCancel(true);
        let arDataFilter: any = [];
        initialData?.data.filter((data) => {
          for (let i = 0; i < keyAr.length; i++) {
            if (
              data[keyAr[i]]
                .toString()
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            ) {
              arDataFilter.push(data);
              continue;
            }
          }
          return null;
        });
        let copyArDataFilter = [...new Set(arDataFilter)];
        dispatch({
          type: "DataTable/storeDataTableSearch",
          payload: { data: { data: copyArDataFilter } },
        });
        if (currentPage !== 1) {
          dispatch({
            type: "DataTableFilter/selectPage",
            payload: { page: 1 },
          });
        }
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
                if (inputRef.current) {
                  inputRef.current.value = "";
                  setDisplayCancel(false);
                  dispatch({
                    type: "DataTable/storeDataTableSearch",
                    payload: { data: { data: initialData?.data } },
                  });
                }
              } else {
                if (inputRef.current) {
                  inputRef.current.value = "";
                  setDisplayCancel(false);
                }
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

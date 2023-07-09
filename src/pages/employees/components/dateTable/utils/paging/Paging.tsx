import React, { useEffect, useState } from "react";
import styles from "./Paging.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../store";

/**
 * React component - Display the paging
 * @return {JSX.Element}
 */
const Paging = (): JSX.Element => {
  const dispatch = useDispatch();
  const [see, setSee] = useState<any[]>([]);
  const { currentPage, nbShow } = useSelector(
    (state: RootState) => state.Array
  );
  const { data } = useSelector((state: RootState) => state.Data);
  let countPage = data ? Math.ceil(data.data.length / nbShow) : 0;

  useEffect(() => {
    const push = (
      array: any[],
      start: number | null,
      end: number | null,
      type: string,
      page: number | null,
      key: number | null
    ) => {
      if (type === "for") {
        if (start && end) {
          for (let i = start; i < end; i++) {
            if (i === currentPage) {
              array.push(
                <span
                  className={styles.paging__div__div__span__current}
                  onClick={() => {
                    dispatch({
                      type: "Array/selectPage",
                      payload: { page: i },
                    });
                  }}
                  key={i}
                >
                  {i}
                </span>
              );
            } else {
              array.push(
                <span
                  className={styles.paging__div__div__span}
                  onClick={() => {
                    dispatch({
                      type: "Array/selectPage",
                      payload: { page: i },
                    });
                  }}
                  key={i}
                >
                  {i}
                </span>
              );
            }
          }
        }
      } else if (type === "point") {
        array.push(
          <span key={key} className={styles.paging__div__div__span__point}>
            ...
          </span>
        );
      } else {
        array.push(
          <span
            key={key}
            className={styles.paging__div__div__span}
            onClick={() => {
              dispatch({
                type: "Array/selectPage",
                payload: { page: page },
              });
            }}
          >
            {page}
          </span>
        );
      }
    };
    let ar: any[] = [];
    if (countPage > 8) {
      if (currentPage <= 4) {
        push(ar, 1, 6, "for", null, null);
        push(ar, null, null, "point", null, nbShow + 1);
        push(ar, null, null, "end", countPage, nbShow + 2);
      } else if (currentPage >= countPage - 3) {
        push(ar, null, null, "start", 1, nbShow + 1);
        push(ar, null, null, "point", null, nbShow + 2);
        push(ar, countPage - 4, countPage + 1, "for", null, null);
      } else {
        push(ar, null, null, "start", 1, nbShow + 1);
        push(ar, null, null, "point", null, nbShow + 2);
        push(ar, currentPage - 1, currentPage + 2, "for", null, null);
        push(ar, null, null, "point", null, 2);
        push(ar, null, null, "end", countPage, nbShow + 3);
      }
    } else {
      push(ar, 1, countPage + 1, "for", null, null);
    }
    setSee(ar);
  }, [countPage, currentPage, dispatch, nbShow]);

  return (
    <div className={styles.paging}>
      {!data && <p>Showing 0 to 0 of 0 entries </p>}
      {data && (
        <p>
          Showing {(currentPage - 1) * nbShow + 1} to{" "}
          {data && data.data.length < currentPage * nbShow
            ? data.data.length
            : currentPage * nbShow}{" "}
          of {data && data.data.length} entries
        </p>
      )}
      <div className={styles.paging__div}>
        <span
          className={`${
            data ? styles.paging__div__span__click : styles.paging__div__span
          }`}
          onClick={() => {
            if (data) {
              if (currentPage > 1) dispatch({ type: "Array/previousPage" });
            }
          }}
        >
          previous
        </span>
        {data && data.data && (
          <div className={styles.paging__div__div}>{see}</div>
        )}
        <span
          className={`${
            data ? styles.paging__div__span__click : styles.paging__div__span
          }`}
          onClick={() => {
            if (data) {
              if (currentPage < Math.ceil(data.data.length / nbShow))
                dispatch({ type: "Array/nextPage" });
            }
          }}
        >
          next
        </span>
      </div>
    </div>
  );
};

export default Paging;

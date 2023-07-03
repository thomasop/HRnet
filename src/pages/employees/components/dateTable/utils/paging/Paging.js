import React, { useEffect, useState } from "react";
import styles from "./Paging.module.scss";
import { useDispatch, useSelector } from "react-redux";

const Paging = () => {
  const dispatch = useDispatch();
  const [see, setSee] = useState([]);
  const { data, currentPage, nbShow } = useSelector((state) => state.Array);
  let countPage = data ? Math.ceil(data.data.length / nbShow) : 0;

  useEffect(() => {
    const push = (array, start, end, type, page, key) => {
      if (type === "for") {
        for (let i = start; i < end; i++) {
          if (i === currentPage) {
            array.push(
              <span
                className={styles.paging__div__div__span__current}
                onClick={() => {
                  dispatch({ type: "Array/selectPage", payload: { page: i } });
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
                  dispatch({ type: "Array/selectPage", payload: { page: i } });
                }}
                key={i}
              >
                {i}
              </span>
            );
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
    let ar = [];
    console.log(ar)
    if (countPage > 8) {
      if (currentPage <= 4) {
        push(ar, 1, 6, "for", null, null);
        push(ar, null, null, "point", null, 7118791789);
      } else if (currentPage >= countPage - 3) {
        push(ar, null, null, "start", 1, 878197198);
        push(ar, null, null, "point", null, 9116716611);
        push(ar, countPage - 4, countPage + 1, "for", null, null);
      } else {
        push(ar, null, null, "start", 1, 311919911);
        push(ar, null, null, "point", null, 122222222);
        push(ar, currentPage - 1, currentPage + 2, "for", null, null);
        push(ar, null, null, "point", null, 2);
        push(ar, null, null, "end", countPage, 10118910);
      }
    } else {
      push(ar, 1, countPage + 1, "for", null, null);
    }
console.log(ar)
    setSee(ar);
  }, [countPage, currentPage, dispatch]);

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

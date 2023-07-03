import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Display from "./Display";
import styles from "./Display.module.scss";

const keyArTest = [
  "First Name",
  "Last Name",
  "Start Date",
  "Department",
  "Date of Birth",
  "Street",
  "City",
  "State",
  "Zip Code",
];
const DisplayAll = () => {
  const [keyAr, setKeyAr] = useState([]);
  const [see, setSee] = useState(null);
  const dispatch = useDispatch();
  const { data, currentPage, nbShow, sortBy } = useSelector(
    (state) => state.Array
  );

  useEffect(() => {
    if (data && data.data.length > 0) {
      setKeyAr(Object.keys(data.data[0]));
    }
  }, [data]);
  useEffect(() => {
    if (sortBy[0] === "" && sortBy[1] === "") {
      if (keyAr[0]) {
        dispatch({
          type: "Array/changeSortBy",
          payload: { sortBy: [keyAr[0], "ASC"] },
        });
      }
    }
  }, [dispatch, keyAr, sortBy]);

  useEffect(() => {
    if (data && data.data) {
      if (sortBy[0] === "" && sortBy[1] === "" && keyAr[0]) {
        dispatch({
          type: "Array/changeSortBy",
          payload: { sortBy: [keyAr[0], "ASC"] },
        });
        let copyData = data.data;
        let newat = Object.entries(copyData).sort(function (a, b) {
          return a[1][keyAr[0]] > b[1][keyAr[0]];
        });

        let test = [];
        for (let i = 0; i < newat.length; i++) {
          test.push(newat[i][1]);
        }
        dispatch({
          type: "Array/storeData",
          payload: { data: { data: test } },
        });
        let arDisplay = [];
        for (
          let i = (currentPage - 1) * nbShow;
          i < currentPage * nbShow;
          i++
        ) {
          if (i < data.data.length) {
            arDisplay.push(<Display key={i} i={i} />);
          }
        }
        setSee(arDisplay);
      }
    }
    let arDisplay = [];
    if (data && data.data.length > 0) {
      for (let i = (currentPage - 1) * nbShow; i < currentPage * nbShow; i++) {
        if (i < data.data.length) {
          arDisplay.push(<Display key={i} i={i} />);
        }
      }
    } else {
      arDisplay.push(
        <tr key={1} className={styles.table__body__tr__td}>
          <td
            colSpan={9}
            className={`${styles.table__body__tr__td__odd__first} ${styles.table__body__tr__td__norecord}`}
          >
            No matching records found
          </td>
        </tr>
      );
    }

    setSee(arDisplay);
  }, [currentPage, data, dispatch, keyAr, nbShow, sortBy]);

  const handlerSortBy = (e) => {
    if (e.target.textContent === sortBy[0]) {
      if (sortBy[1] === "DESC") {
        dispatch({
          type: "Array/changeSortBy",
          payload: { sortBy: [e.target.textContent, "ASC"] },
        });
        sortByF(e.target.textContent, "ASC");
      } else {
        dispatch({
          type: "Array/changeSortBy",
          payload: { sortBy: [e.target.textContent, "DESC"] },
        });
        sortByF(e.target.textContent, "DESC");
      }
    } else {
      dispatch({
        type: "Array/changeSortBy",
        payload: { sortBy: [e.target.textContent, "ASC"] },
      });
      sortByF(e.target.textContent, "ASC");
    }
  };

  const sortByF = (element, sort) => {
    if (sortBy[0] !== "" && sortBy[1] !== "" && keyAr[0]) {
      let copyData = data.data;
      let sortData = Object.entries(copyData).sort(function (a, b) {
        console.log(element)
        if (sort === "ASC") {
          return a[1][element].toString().localeCompare(b[1][element].toString(), undefined, {numeric: true, sensitivity: 'base'});
        } else {
          return b[1][element].toString().localeCompare(a[1][element].toString(), undefined, {numeric: true, sensitivity: 'base'});
        }
      });
      let newData = [];
      for (let i = 0; i < sortData.length; i++) {
        newData.push(sortData[i][1]);
      }
      dispatch({
        type: "Array/storeData",
        payload: { data: { data: newData } },
      });
    }
  };
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.table__head}>
          <tr className={styles.table__head__tr}>
            {keyAr &&
              keyAr.length > 0 &&
              keyAr.map((key, index) => {
                if (key === sortBy[0]) {
                  if (sortBy[1] === "ASC") {
                    return (
                      <th
                        className={`${styles.table__head__tr__th} ${styles.table__head__tr__th__asc}`}
                        onClick={(e) => handlerSortBy(e)}
                        key={index}
                      >
                        {key}
                      </th>
                    );
                  } else {
                    return (
                      <th
                        className={`${styles.table__head__tr__th} ${styles.table__head__tr__th__desc}`}
                        onClick={(e) => handlerSortBy(e)}
                        key={index}
                      >
                        {key}
                      </th>
                    );
                  }
                } else {
                  return (
                    <th
                      className={`${styles.table__head__tr__th} ${styles.table__head__tr__th__both}`}
                      onClick={(e) => handlerSortBy(e)}
                      key={index}
                    >
                      {key}
                    </th>
                  );
                }
              })}
            {keyAr &&
              keyAr.length === 0 &&
              keyArTest.map((key, index) => {
                if (key === sortBy[0]) {
                  if (sortBy[1] === "ASC") {
                    return (
                      <th
                        className={`${styles.table__head__tr__th} ${styles.table__head__tr__th__asc}`}
                        onClick={(e) => handlerSortBy(e)}
                        key={index}
                      >
                        {key}
                      </th>
                    );
                  } else {
                    return (
                      <th
                        className={`${styles.table__head__tr__th} ${styles.table__head__tr__th__desc}`}
                        onClick={(e) => handlerSortBy(e)}
                        key={index}
                      >
                        {key}
                      </th>
                    );
                  }
                } else {
                  return (
                    <th
                      className={`${styles.table__head__tr__th} ${styles.table__head__tr__th__both}`}
                      onClick={(e) => handlerSortBy(e)}
                      key={index}
                    >
                      {key}
                    </th>
                  );
                }
              })}
          </tr>
        </thead>
        <tbody className={styles.table__body}>{see}</tbody>
      </table>
    </div>
  );
};

export default DisplayAll;

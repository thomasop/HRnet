import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Display from "./DisplayRow";
import styles from "./Display.module.scss";
import { RootState } from "../../../../store";

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

/**
 * React component - Display table
 * @return {JSX.Element}
 */
const DisplayAll = (): JSX.Element => {
  const [keyAr, setKeyAr] = useState<string[]>([]);
  const [displayTrElement, setDisplayTrElement] = useState<any[] | null>(null);
  const dispatch = useDispatch();
  const { currentPage, nbShow, sortBy } = useSelector(
    (state: RootState) => state.DataTableFilter
  );
  const { data, initialData } = useSelector(
    (state: RootState) => state.DataTable
  );
  useEffect(() => {
    dispatch({
      type: "DataTableFilter/resetData",
    });
    dispatch({
      type: "DataTable/resetDataTable",
    });
  }, [dispatch]);
  useEffect(() => {
    if (data && data.data.length > 0) {
      setKeyAr(Object.keys(data.data[0]));
    }
  }, [data]);

  useEffect(() => {
    if (data && data.data && initialData && initialData.data) {
      if (sortBy[0] === "" && sortBy[1] === "" && keyAr[0]) {
        let copyData = initialData.data;

        let newat = Object.entries(copyData).sort(function (a, b): any {
          return a[1][keyAr[0]] > b[1][keyAr[0]];
        });

        let test = [];
        for (let i = 0; i < newat.length; i++) {
          test.push(newat[i][1]);
        }

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

        setDisplayTrElement(arDisplay);
        dispatch({
          type: "DataTableFilter/changeSortBy",
          payload: { sortBy: [keyAr[0], "ASC"] },
        });
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
    setDisplayTrElement(arDisplay);
  }, [currentPage, data, dispatch, initialData, keyAr, nbShow, sortBy]);
  const handlerSortBy = (e: React.MouseEvent<HTMLElement>) => {
    let element = e.target as HTMLElement;
    if (element.textContent === sortBy[0]) {
      if (sortBy[1] === "DESC") {
        dispatch({
          type: "DataTableFilter/changeSortBy",
          payload: { sortBy: [element.textContent, "ASC"] },
        });
        sortByF(element.textContent, "ASC");
      } else {
        dispatch({
          type: "DataTableFilter/changeSortBy",
          payload: { sortBy: [element.textContent, "DESC"] },
        });
        sortByF(element.textContent, "DESC");
      }
    } else {
      dispatch({
        type: "DataTableFilter/changeSortBy",
        payload: { sortBy: [element.textContent, "ASC"] },
      });
      sortByF(element.textContent!, "ASC");
    }
  };

  const sortByF = (element: string, sort: string) => {
    if (sortBy[0] !== "" && sortBy[1] !== "" && keyAr[0]) {
      let copyData = data?.data;
      let sortData;
      if (copyData) {
        sortData = Object.entries(copyData).sort(function (a, b) {
          if (sort === "ASC") {
            return a[1][element]
              .toString()
              .localeCompare(b[1][element].toString(), undefined, {
                numeric: true,
                sensitivity: "base",
              });
          } else {
            return b[1][element]
              .toString()
              .localeCompare(a[1][element].toString(), undefined, {
                numeric: true,
                sensitivity: "base",
              });
          }
        });
        let newData = [];
        for (let i = 0; i < sortData.length; i++) {
          newData.push(sortData[i][1]);
        }
        dispatch({
          type: "DataTable/changeDataTable",
          payload: { data: { data: newData } },
        });
      }
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
        <tbody className={styles.table__body}>{displayTrElement}</tbody>
      </table>
    </div>
  );
};

export default DisplayAll;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Display.module.scss";

const Display = ({ i }) => {
  const { data } = useSelector((state) => state.Array);
  const [keyAr, setKeyAr] = useState([]);
  useEffect(() => {
    if (data && data.data.length > 0) {
      setKeyAr(Object.keys(data.data[0]));
    }
  }, [data]);
  return (
    <>
      {data && data.data.length > 0 && (
        <tr
          className={
            i === 0 ? styles.table__body__tr : styles.table__body__tr__border
          }
        >
          {keyAr &&
            keyAr.map((p, index) => {
              if (data.data[i] !== undefined) {
                if (i % 2 === 0) {
                  if (i === 0) {
                    if (p === keyAr[0]) {
                      return (
                        <td
                          className={`${styles.table__body__tr__td__even__first} ${styles.table__body__tr__td__border}`}
                          key={index}
                        > <div className={styles.table__body__tr__td__div}>{data.data[i][p]}</div>
                          
                        </td>
                      );
                    }
                    return (
                      <td
                        className={`${styles.table__body__tr__td__even} ${styles.table__body__tr__td__border}`}
                        key={index}
                      >
                        <div className={styles.table__body__tr__td__div}>{data.data[i][p]}</div>
                       
                      </td>
                    );
                  } else {
                    if (p === keyAr[0]) {
                      return (
                        <td
                          className={`${styles.table__body__tr__td__even__first} ${styles.table__body__tr__td}`}
                          key={index}
                        >
                          <div className={styles.table__body__tr__td__div}>{data.data[i][p]}</div>
                        </td>
                      );
                    }
                    return (
                      <td
                        className={`${styles.table__body__tr__td__even} ${styles.table__body__tr__td}`}
                        key={index}
                      >
                        <div className={styles.table__body__tr__td__div}>{data.data[i][p]}</div>
                      </td>
                    );
                  }
                } else {
                  if (p === keyAr[0]) {
                    return (
                      <td
                        className={`${styles.table__body__tr__td__odd__first} ${styles.table__body__tr__td}`}
                        key={index}
                      >
                        <div className={styles.table__body__tr__td__div}>{data.data[i][p]}</div>
                      </td>
                    );
                  }
                  return (
                    <td
                      className={`${styles.table__body__tr__td__odd} ${styles.table__body__tr__td}`}
                      key={index}
                    >
                      <div className={styles.table__body__tr__td__div}>{data.data[i][p]}</div>
                    </td>
                  );
                }
              } else {
                return null;
              }
            })}
        </tr>
      )}
    </>
  );
};

export default Display;

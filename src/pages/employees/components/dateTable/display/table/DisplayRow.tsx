import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Display.module.scss";
import { RootState } from "../../../../../../store";

interface PropsType {
  i: number;
}

/**
 * React component - Display row in the table
 * @param {PropsType} Props
 * @param {number} Props.i - number of the current line
 * @return {JSX.Element}
 */
const Display = ({ i }: PropsType): JSX.Element => {
  const { sortBy } = useSelector((state: RootState) => state.Array);
  const { data } = useSelector((state: RootState) => state.Data);
  const [keyAr, setKeyAr] = useState<string[]>([]);
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
                if (sortBy[0] === p) {
                  if (i % 2 === 0) {
                    return (
                      <td
                        className={`${styles.table__body__tr__td__even__first} ${styles.table__body__tr__td__border}`}
                        key={index}
                      >
                        {" "}
                        {data.data[i][p]}
                      </td>
                    );
                  } else {
                    return (
                      <td
                        className={`${styles.table__body__tr__td__odd__first} ${styles.table__body__tr__td}`}
                        key={index}
                      >
                        {data.data[i][p]}
                      </td>
                    );
                  }
                }
                if (i % 2 === 0) {
                  if (i === 0) {
                    return (
                      <td
                        className={`${styles.table__body__tr__td__even} ${styles.table__body__tr__td__border}`}
                        key={index}
                      >
                        {data.data[i][p]}
                      </td>
                    );
                  } else {
                    return (
                      <td
                        className={`${styles.table__body__tr__td__even} ${styles.table__body__tr__td}`}
                        key={index}
                      >
                        {data.data[i][p]}
                      </td>
                    );
                  }
                } else {
                  return (
                    <td
                      className={`${styles.table__body__tr__td__odd} ${styles.table__body__tr__td}`}
                      key={index}
                    >
                      {data.data[i][p]}
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

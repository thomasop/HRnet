import { useEffect, useState } from "react";
import styles from "./Paging.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store";

/**
 * React component - Display the paging
 * @return {JSX.Element}
 */
const Paging = (): JSX.Element => {
  const dispatch = useDispatch();
  const [displayPagingElement, setDisplayPagingElement] = useState<any[]>([]);
  const { currentPage, nbShow } = useSelector(
    (state: RootState) => state.DataTableFilter
  );
  const { data } = useSelector((state: RootState) => state.DataTable);
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
                      type: "DataTableFilter/selectPage",
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
                      type: "DataTableFilter/selectPage",
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
                type: "DataTableFilter/selectPage",
                payload: { page: page },
              });
            }}
          >
            {page}
          </span>
        );
      }
    };
    let arPaging: any[] = [];
    if (countPage > 7) {
      if (currentPage <= 4) {
        push(arPaging, 1, 6, "for", null, null);
        push(arPaging, null, null, "point", null, nbShow + 1);
        push(arPaging, null, null, "end", countPage, nbShow + 2);
      } else if (currentPage >= countPage - 3) {
        push(arPaging, null, null, "start", 1, nbShow + 3);
        push(arPaging, null, null, "point", null, nbShow + 2);
        push(arPaging, countPage - 4, countPage + 1, "for", null, null);
      } else {
        push(arPaging, null, null, "start", 1, nbShow + 1);
        push(arPaging, null, null, "point", null, nbShow + 2);
        push(arPaging, currentPage - 1, currentPage + 2, "for", null, null);
        push(arPaging, null, null, "point", null, 2);
        push(arPaging, null, null, "end", countPage, nbShow + 3);
      }
    } else {
      push(arPaging, 1, countPage + 1, "for", null, null);
    }
    setDisplayPagingElement(arPaging);
  }, [countPage, currentPage, dispatch, nbShow]);

  return (
    <div className={styles.paging}>
      {!data && <p>Showing 0 to 0 of 0 entries </p>}
      {data && (
        <p>
          Showing{" "}
          {data &&
            ((data.data.length > 0 && (currentPage - 1) * nbShow + 1) ||
              0)}{" "}
          to{" "}
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
              if (currentPage > 1)
                dispatch({ type: "DataTableFilter/previousPage" });
            }
          }}
        >
          previous
        </span>
        {data && data.data && (
          <div className={styles.paging__div__div}>{displayPagingElement}</div>
        )}
        <span
          className={`${
            data ? styles.paging__div__span__click : styles.paging__div__span
          }`}
          onClick={() => {
            if (data) {
              if (currentPage < Math.ceil(data.data.length / nbShow))
                dispatch({ type: "DataTableFilter/nextPage" });
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

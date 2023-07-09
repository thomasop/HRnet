import styles from "./Modal.module.scss";
import { useDispatch } from "react-redux";

/**
 * React component - Display the modal
 * @return {JSX.Element}
 */
const Modal = (): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <div
      className={styles.modal}
      onClick={(e: any) => {
        if (!e.target.classList.contains("Modal_modal__p__hKdSZ")) {
          dispatch({
            type: "Modal/close",
          });
        }
      }}
    >
      <div className={styles.modal__p}>
        Employee Created!
        <span
          onClick={() => {
            dispatch({
              type: "Modal/close",
            });
          }}
          className={styles.modal__span}
        >
          &times;
        </span>
      </div>
    </div>
  );
};

export default Modal;

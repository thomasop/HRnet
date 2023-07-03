import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import Modal from "./components/modal/Modal";
import styles from "./Home.module.scss";
import Form from "./components/form/Form";
import Header from "../../components/Header";

const Home = () => {
  const { display } = useSelector((state: RootState) => state.Modal);

  return (
    <>
      {display && <Modal />}
      <Header />
      <main className={styles.main}>
        <div className={styles.home}>
          <h2 className={styles.home__h2}>Create Employee</h2>
          <Form />
        </div>
      </main>
    </>
  );
};

export default Home;

import Search from "./components/dateTable/utils/search/Search";
import NbShow from "./components/dateTable/utils/nbShow/NbShow";
import styles from "./Employees.module.scss";
import Display from "./components/dateTable/display/table/DisplayAll";
import Paging from "./components/dateTable/utils/paging/Paging";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const Employees = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.app}>
          <div className={styles.container}>
          
            <>
            <h1 className={styles.container__h1}>Current Employees</h1>
              <div className={styles.container__div}>
                <div className={styles.container__div__div}>
                  <NbShow />
                  <Search />
                </div>
              </div>
              <Display />
              <Paging />
              <div className={styles.container__bottom}>
                <Link className={styles.container__bottom__link} to={"/"}>Home</Link>
              </div>
            </>
          </div>
        </div>
      </main>
    </>
  );
};

export default Employees;

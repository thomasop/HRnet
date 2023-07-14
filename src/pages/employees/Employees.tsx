import { Suspense, lazy } from "react";
import styles from "./Employees.module.scss";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
const Display = lazy(() => import("./components/displayTable/DisplayAll"));
const Paging = lazy(() => import("./components/utils/paging/Paging"));
const NbShow = lazy(() => import("./components/utils/nbShow/NbShow"));
const Search = lazy(() => import("./components/utils/search/Search"));

/**
 * React component - Display the employees page
 * @return {JSX.Element}
 */
const Employees = (): JSX.Element => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
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
                  <Link className={styles.container__bottom__link} to={"/"}>
                    Home
                  </Link>
                </div>
              </>
            </div>
          </div>
        </main>
      </Suspense>
    </>
  );
};

export default Employees;

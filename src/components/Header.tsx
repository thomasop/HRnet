import React from 'react'
import styles from "./Header.module.scss"
import { Link } from 'react-router-dom'

/**
 * React component - Display the header
 * @return {JSX.Element}
 */
const Header = (): JSX.Element => {
  return (
    <>
    <header className={styles.header}>
        <figure className={styles.header__figure}>
            <Link to={"/"}>
            <img width={"120px"} height={"110px"} className={styles.header__figure__img} src="../img/logo.jpg" alt="" />
            </Link>
            
        </figure>
        <nav className={styles.header__nav}>
            <ul className={styles.header__nav__ul}>
                <li className={styles.header__nav__ul__li}>
                    <Link className={styles.header__nav__ul__li__a} to={"/employees"}>View Current Employees</Link>
                </li>
            </ul>
        </nav>
    </header>
    </>
  )
}

export default Header
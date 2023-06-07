import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home">
      <h1 className="home__h1">HRnet</h1>
      <p className="home__link">
        <Link to={"/employees"}>View Current Employees</Link>
      </p>
      <h2 className="home__h2">Create Employee</h2>
      <form className="home__form" action="">
        <div className="home__form__group">
          <label htmlFor="firstname">First Name</label>
          <input
            className="home__form__group__input"
            type="text"
            name="firstname"
            id="firstname"
          />
        </div>
        <div className="home__form__group">
          <label htmlFor="lastname">Last Name</label>
          <input
            className="home__form__group__input"
            type="text"
            name="lastname"
            id="lastname"
          />
        </div>
        <div className="home__form__group">
          <label htmlFor="birth">Date of Birth</label>
          <input
            className="home__form__group__input"
            type="date"
            name="birth"
            id="birth"
          />
        </div>
        <div className="home__form__group">
          <label htmlFor="start">Start Date</label>
          <input
            className="home__form__group__input"
            type="date"
            name="start"
            id="start"
          />
        </div>
        <div className="home__form__div">
          <p className="home__form__div__p">Address</p>
          <div className="home__form__div__group">
            <label htmlFor="street">Street</label>
            <input className="home__form__div__group__input" type="text" name="street" id="street" />
          </div>
          <div className="home__form__div__group">
            <label htmlFor="city">City</label>
            <input className="home__form__div__group__input" type="text" name="city" id="city" />
          </div>
          <div className="home__form__div__group">
            <label htmlFor="state">State</label>
            <select className="home__form__div__group__input" name="" id="">
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Arizona">Arizona</option>
                <option value="Arkansas">Arkansas</option>
                <option value="California">California</option>
                <option value="Colorado">Colorado</option>
            </select>
          </div>
          <div className="home__form__div__group">
            <label htmlFor="code">Zip Code</label>
            <input className="home__form__div__group__input" type="number" name="code" id="code" />
          </div>
        </div>

        <div className="home__form__group">
          <label htmlFor="departement">Departement</label>
          <select className="home__form__group__input" name="" id="">
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Engineering">Engineering</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Legal">Legal</option>
            </select>
        </div>
        <div className="home__form__submit">
          <input type="submit" value="Save" />
        </div>
      </form>
    </main>
  );
};

export default Home;

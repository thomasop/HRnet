import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <h1>HRnet</h1>
      <Link to={"/employees"}>View Current Employees</Link>
      <h2>Create Employee</h2>
      <form action="">
        <div>
          <label htmlFor="firstname">First Name</label>
          <input type="text" name="firstname" id="firstname" />
        </div>
        <div>
          <label htmlFor="lastname">Last Name</label>
          <input type="text" name="lastname" id="lastname" />
        </div>
        <div>
          <label htmlFor="birth">Date of Birth</label>
          <input type="text" name="birth" id="birth" />
        </div>
        <div>
          <label htmlFor="start">Start Date</label>
          <input type="text" name="start" id="start" />
        </div>
        <div>
          <div>
            <label htmlFor="street">Street</label>
            <input type="text" name="street" id="street" />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input type="text" name="state" id="state" />
          </div>
          <div>
            <label htmlFor="code">Zip Code</label>
            <input type="text" name="code" id="code" />
          </div>
        </div>

        <div>
          <label htmlFor="departement">Departement</label>
          <input type="text" name="departement" id="departement" />
        </div>
        <div>
          <input type="submit" value="Save" />
        </div>
      </form>
    </main>
  );
};

export default Home;

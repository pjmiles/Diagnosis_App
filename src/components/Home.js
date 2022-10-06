import "../styles/Home.css";
import { symptoms_url } from "../api/axios";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  // get symptoms data for testing
  const [symptom, setSymptom] = useState([]);
  const getSymptoms = async () => {
    try {
      const { data } = await axios.get(symptoms_url);
      setSymptom(JSON.stringify(data));
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSymptoms();
  }, []);

  return (
    <section className="home-section">
      <form className="symptom-section">
        <div className="heading">
          <h1>Checker</h1>
          <p>Please kindly provide your details in the fields below</p>
        </div>
        <div className="form-control">
          <div className="input-control">
            <label htmlFor="symptoms">
              <input
                type="text"
                name="symptoms"
                placeholder="enter symptoms here"
                className="input-field"
                required
              />
            </label>
          </div>
          <div className="input-control">
            <label htmlFor="age">
              <input
                type="number"
                name="age"
                min="1"
                placeholder="age"
                className="input-field"
                required
              />
            </label>
          </div>
          <div className="input-control">
            <label htmlFor="gender">
              Select your gender
              <select name="gender" className="input-field" required>
                <option value="none" selected>
                  Gender
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </label>
          </div>
          <div className="submit ">
            <button className="symptopm-btn">Submit</button>
          </div>
        </div>
      </form>

      <div className="result-view">
        symptoms view will be rendered later
        <p>{symptom}</p>
      </div>
    </section>
  );
};

export default Home;

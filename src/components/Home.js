import "../styles/Home.css";
import { symptoms_url } from "../api/axios";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  // get symptoms data for testing 
  const [symptom, setSymptom] = useState([])
  const getSymptoms = async () => {
    try {
        const { data } = await axios.get(symptoms_url)
        setSymptom(JSON.stringify(data))
        console.log(data)
    } catch (e) {
        console.log(e)
    }
  }

  useEffect(() => {
    getSymptoms()
  },[]);

  return (
    <section className="home-section">
      <form className="symptom-section">
        <div className="input-control">
          <input
            type="text"
            placeholder="enter symptoms here"
            className="input-field"
          />
        </div>
        <div className="submit ">
          <button className="symptopm-btn">Submit</button>
        </div>
      </form>

      <div className="result-view">symptoms view will be rendered later
      <p>{symptom}</p>
      </div>
    </section>
  );
};

export default Home;

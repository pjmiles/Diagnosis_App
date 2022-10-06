import "../styles/Home.css";
import { symptoms_url } from "../api/axios";
import { diagnosis_url } from "../api/axios";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  // states declaration
  const [symptom, setSymptom] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  const [patientDetaiils, setPatientDetails] = useState({
    symptoms: "",
    year_of_birth: "",
    gender: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // This is to get the patient's details in the form section
  const handleInputChange = (e) => {
    setPatientDetails((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  // function to get priliminary diagnosis from patient
  const getDiagnosis = async (patientDetaiils) => {
    let newUrl = "https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=[30]&gender=male&year_of_birth=60&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InBvbm1pbGVhZGViaXNpQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMTEyNDIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ZlcnNpb24iOiIyMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xpbWl0IjoiOTk5OTk5OTk5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwIjoiUHJlbWl1bSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjItMTAtMDUiLCJpc3MiOiJodHRwczovL3NhbmRib3gtYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTY2NTA4ODgzNSwibmJmIjoxNjY1MDgxNjM1fQ.eGH_esopXJ2PJxz2O4nLtLYD1nnXuPRLdEA1xlOW_cg&format=json&language=en-gb"  
      try {
      // const result = await axios.get(
      //   diagnosis_url +
      //     `${patientDetaiils.symptoms}&${patientDetaiils.gender}&${patientDetaiils.year_of_birth}`
      // );
      const { data } = await axios.get(newUrl);
      setDiagnosis(JSON.stringify(data));
      console.log(data[0]);
      setIsLoading(true);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  // const getSymptoms = async () => {
  //   try {
  //     const { data } = await axios.get(symptoms_url);
  //     setSymptom(JSON.stringify(data));
  //     console.log(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    // getSymptoms();
    getDiagnosis();
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
                value={patientDetaiils.symptoms}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="input-control">
            <label htmlFor="year_of_birth">
              <input
                type="number"
                name="year_of_birth"
                min="1"
                placeholder="your age"
                className="input-field"
                value={patientDetaiils.year_of_birth}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="input-control">
            <label htmlFor="gender">
              Select your gender
              <select
                name="gender"
                className="input-field"
                value={patientDetaiils.gender}
                onChange={handleInputChange}
                required
              >
                <option value="none">Gender</option>
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
        {/* <p>{symptom}</p> */}
        <div className="diagnosis result">
          {isLoading ? (
            <div>
              {/* {diagnosis.map(item => {
                return (
                  <div key={item.ID}>
                    <div>{item.Issue}</div>
                  </div>
                )
              })} */}
              <div>{diagnosis}</div>
            </div>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;

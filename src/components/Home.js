import "../styles/Home.css";
import { symptoms_url } from "../api/axios";
import { diagnosis_url, token } from "../api/axios";
import { newSymptoms_url } from "../api/axios";
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
    console.log("Hello");
  };

  // function to get priliminary diagnosis from patient
  const getSymptoms = async () => {
    try {
      const { data } = await axios.get(newSymptoms_url);
      setSymptom(data);
    } catch (e) {
      console.log(e);
    }
  };

  // handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const getDiagnosis = async () => {
      let newUrl = "";
      try {
        // const result = await axios.get(
        //   diagnosis_url +
        //     `${patientDetaiils.symptoms}&${patientDetaiils.gender}&${patientDetaiils.year_of_birth}`
        // )
        // console.log(result)
        const { data } = await axios.get(newUrl, {
          headers: { Authorization: `${token}` },
        });
        setDiagnosis(JSON.stringify(data));
        console.log(data[0]);
        setIsLoading(true);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };
    getDiagnosis();
  };

  useEffect(() => {
    getSymptoms();
  }, []);

  // if (!symptom.length) return ".....";

  return (
    <section className="home-section">
      <form className="symptom-section" onSubmit={handleSubmit}>
        <div className="heading">
          <h1>Checker</h1>
          <p>Please kindly provide your details in the fields below</p>
        </div>
        <div className="form-control">
          <div className="input-control">
            <label htmlFor="symptoms">
              <select
                placeholder="Select symptom"
                className="input-field"
                required
              >
                <option>Select symptom</option>
                {symptom.map((option) => (
                  <option key={option.ID} value={option.ID}>
                    {option.Name}
                  </option>
                ))}
              </select>
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
        Your result is here
        {/* <p>{symptom}</p> */}
        <div className="diagnosis result">
          {isLoading ? (
            <div>
              <div>{diagnosis}</div>
              {/* {diagnosis.map((item) => (
                <div key={item.Issue}>
                  {item.Issue}
                </div>
              ))} */}
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

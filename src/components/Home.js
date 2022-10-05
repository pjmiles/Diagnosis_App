import '../styles/Home.css'

const Home = () => {
  return (
    <section className='home-section'>
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

      <div className="result-view">
        symptoms view will be rendered later
      </div>
    </section>
  );
};

export default Home;

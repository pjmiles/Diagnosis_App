import '../styles/NavBar.css'

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Diagnosis</div>
      <ul>
        <li>Home</li>
        <li>Diagnose</li>
        <li>Appointment</li>
      </ul>
    </nav>
  );
};

export default NavBar;

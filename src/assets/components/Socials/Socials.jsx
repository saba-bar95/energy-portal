import facebook from "/src/assets/images/header/facebook-icon.svg";
import linkedin from "/src/assets/images/header/linkedin-icon.svg";
import x from "/src/assets/images/header/x-icon.svg";

const Socials = () => {
  const openFacebook = () => {
    window.open("https://www.facebook.com/geostat.ge/", "_blank"); // Open Facebook in a new tab
  };

  const openX = () => {
    window.open("https://x.com/Geostat100", "_blank"); // Open X in a new tab
  };

  const openLinkedIn = () => {
    window.open(
      "https://ge.linkedin.com/company/national-statistics-office-of-georgia",
      "_blank"
    ); // Open LinkedIn in a new tab
  };

  return (
    <div className="icons">
      <img src={facebook} alt="facebook-icon" onClick={openFacebook} />
      <img src={x} alt="x-icon" onClick={openX} />
      <img src={linkedin} alt="linkedin-icon" onClick={openLinkedIn} />
    </div>
  );
};

export default Socials;

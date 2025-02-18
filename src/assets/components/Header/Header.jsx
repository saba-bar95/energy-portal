import "./Header.scss";
import text from "../../../../text";
import sakstatLogo from "/src/assets/images/header/sakstat-logo.svg";
import sakstatText from "/src/assets/images/header/sakstat-text.svg";
import facebook from "/src/assets/images/header/facebook-icon.svg";
import linkedin from "/src/assets/images/header/linkedin-icon.svg";
import x from "/src/assets/images/header/x-icon.svg";
import georgianFlag from "/src/assets/images/header/georgian-flag.svg";
import downVectorBlack from "/src/assets/images/header/down-vector-black.svg";
import upVectorBlack from "/src/assets/images/header/up-vector-black.svg";
import downVectorGray from "/src/assets/images/header/down-vector-gray.svg";

const Header = () => {
  return (
    <>
      <header>
        <div className="header-container">
          <div className="right">
            <img src={sakstatLogo} alt="sakstat-logo" />
            <img src={sakstatText} alt="sakstat-text" className="text" />
          </div>
          <div className="left">
            <div className="texts">
              <h1>{text.ka.header.header1}</h1>
              <h1 className="choose-section">
                {text.ka.header.header2}
                <img src={downVectorBlack} alt="" />
                {/* <img src={upVectorBlack} alt="" /> */}
              </h1>
            </div>
            <div className="socials">
              <img src={facebook} alt="facebook-icon" />
              <img src={x} alt="x-icon" />
              <img src={linkedin} alt="linkedin-icon" />
              <button>
                <img src={georgianFlag} alt="georgian-flag" />
                {text.ka.header.ka}
                <img src={downVectorGray} alt="down-vector" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

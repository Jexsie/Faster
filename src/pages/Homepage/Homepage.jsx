import Card from "../../Card/Card";
import "./Homepage.scss";

const Homepage = () => {
  const buttons = [
    { name: "Add Github", func: () => {} },
    { name: "Add LinkedIn", func: () => {} },
    { name: "Add Twitter", func: () => {} },
    { name: "Add Instagram", func: () => {} },
  ];
  return (
    <>
      <Card />

      <div className="container">
        <div>
          <h1>Connect to all your socials fast and easy with FASTER</h1>
          <p>Increase your productivity as a developer or an influencer</p>
        </div>
        <div className="buttons">
          {buttons.map((button, index) => (
            <button key={index} onClick={button.func}>
              {button.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;

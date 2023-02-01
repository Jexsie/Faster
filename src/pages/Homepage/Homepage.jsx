import { ClickAwayListener } from "@mui/base";
import { useState } from "react";
import Modal from "../../Card/Modal";
import Login from "../LoginPage/Login";
import "./Homepage.scss";

const Homepage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className="container">
        <div className="home-text">
          <h2>
            Connect to all your socials fast and easy with FASTER. Manage your
            profile and brand plus increasing your productivity more
            efficiently. Upgrade to FASTER now!!!
          </h2>
        </div>
        <div className="home-button">
          <button className="button" onClick={handleOpenModal}>
            Get started
          </button>
        </div>
      </div>
      {modalOpen && (
        <Modal>
          <ClickAwayListener onClickAway={() => setModalOpen(false)}>
            <Login />
          </ClickAwayListener>
        </Modal>
      )}
    </>
  );
};

export default Homepage;

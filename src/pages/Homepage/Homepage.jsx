import { ClickAwayListener } from "@mui/base";
import { useEffect, useRef, useState } from "react";
import Modal from "../../Card/Modal";
import Signup from "../SignupPage/Signup";
import "./Homepage.scss";
import { db } from "../../FirebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Homepage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const passwordRef = useRef();
  const nameRef = useRef();

  async function addUserDoc() {
    await addDoc(usersCollectionRef, {
      name: nameRef.current.value,
      password: passwordRef.current.value,
    });
  }

  useEffect(() => {
    async function getUsers() {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUsers();
  }, []);

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
          {JSON.stringify(users)}
        </div>
        <div className="home-button">
          <button className="button" onClick={handleOpenModal}>
            Get started
          </button>
        </div>
      </div>
      <input type="text" placeholder="password" ref={passwordRef} />
      <input type="text" placeholder="name" ref={nameRef} />
      <button onClick={addUserDoc}>Add user</button>
      {modalOpen && (
        <Modal>
          <ClickAwayListener onClickAway={() => setModalOpen(false)}>
            <Signup />
          </ClickAwayListener>
        </Modal>
      )}
    </>
  );
};

export default Homepage;

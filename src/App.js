import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./App.css";
import {
  FaEnvelope,
  FaCalendarAlt,
  FaUser,
  FaMapPin,
  FaPhone,
  FaLock,
} from "react-icons/fa";

//  storing the API
const apiUrl = `https://randomuser.me/api/`;
const imgDefault = `https://randomuser.me/api/portraits/men/60.jpg`;

function App() {
  // setting our  state
  
  const [person, setPerson] = useState(null);
  const [value, setValue] = useState("random person");
  const [title, setTitle] = useState("name");

  const fetchPerson = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);
    const user = data.results[0];
    // destructuring the data
    const { phone, email } = user;
    const { large: image } = user.picture;
    const {
      login: { password },
    } = user;
    const { first, last } = user.name;
    const {
      dob: { age },
    } = user;
    const {
      street: { number, name },
    } = user.location;

    const newUser = {
      image,
      phone,
      password,
      email,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };
    setPerson(newUser);
    setTitle("name");
    setValue(newUser.name);
  };
  useEffect(() => {
    fetchPerson();
  }, []);

  // everytime we hover over the buttons we can get the values
  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const newVal = e.target.dataset.label;
      console.log(person);
      console.log(newVal);
      // on hover, set the new value on the page
      setTitle(newVal);
      setValue(person[newVal]);
    }
  };

  return (
    <main>
      <div className="block">
      <div class="bg"></div>
<div class="bg bg2"></div>
<div class="bg bg3"></div>
        <motion.h1
          className="main-heading"
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: -150, opacity: 1 }}
          transition={{
            delay: 1.5,
            duration: 0.3,
            type: "spring",
            stiffness: 200,
          }}
        >
          Randomizer
        </motion.h1>
        <motion.div
          initial={{ y: -250, opacity: 0 }}
          animate={{ y: -50, opacity: 1 }}
          transition={{
            delay: 1,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
          className="container"
        >
          {/* if the person is not null go for default image */}
          <img
            src={(person && person.image) || imgDefault}
            alt="random user"
            className="user-img"
          ></img>
          {/* we pass in the title state  */}
          <p className="user-title">My {title} is:</p>
          {/* we pass in the value state */}
          <p className="user-value">{value}</p>
          {/* Button section */}
          {/* on mouseOver we oass in the handleValue function to render the API info about the user */}
          <div className="values-info">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelope />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMapPin />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarAlt />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          {/*  we pass in the fetchPerson function so everytime we click on the button, new user is generated */}
          <button className="btn" type="button" onClick={fetchPerson}>
            Randomize
          </button>
        </motion.div>
      </div>
    </main>
  );
}

export default App;

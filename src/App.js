// Framework for some animations
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./index.css";

import Heading from "./Heading";

// installed react-icons to be able to tap into the fontawesome icons 
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
  
  // setting up a useEffect so we can pass the fetchPerson function in it and get the Api information 
  useEffect(() => {
    fetchPerson();
  }, []);
  // using an asynch function to fetch the data then later i destructure the data to get the values i need
  const fetchPerson = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
     const user = data.results[0];
    // destructuring the data
    const { phone, email } = user;
    // look for "large" property and calling it image
    const { large: image } = user.picture;
    // getting the password from the "login" , nested object
    const { login: { password }} = user;
    const { title, first, last } = user.name;
    const {dob: { age }} = user;
    const {street: { number, name }, city} = user.location;

    // create a new object with the new poperties
    const newUser = {
      image,
      phone,
      password,
      email,
      age,
      street: `${number} ${name} , ${city}`,
      name: `${title}. ${first} ${last}`,
    };
    //setting our new state
    setPerson(newUser);
    // setting the default state on initial start
    setTitle("name");
    setValue(newUser.name);
  };

  // everytime we hover or click over the buttons we can get the values
  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const newVal = e.target.dataset.label;
      // on hover, set the new value on the page
      setValue(person[newVal]);
      setTitle(newVal);
    }
  };
//  we set up the JSX return below
  return (
    <main>
      <div className="block">
      {/* emty divs for the animated background */}
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
{/* I used a little bit of a framework called Framer motion to add some cool animations */}
        <Heading />
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
              // added onClick for smaller screen size that are touch screen
              onClick={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
              // added onClick for smaller screen size that are touch screen
              onClick={handleValue}
            >
              <FaEnvelope />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
              // added onClick for smaller screen size that are touch screen
              onClick={handleValue}
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
              // added onClick for smaller screen size that are touch screen
              onClick={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
              // added onClick for smaller screen size that are touch screen
              onClick={handleValue}
              
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

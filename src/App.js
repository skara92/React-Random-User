
import { useEffect, useState } from 'react';
import './App.css';
import {FaEnvelopeOpen, FaCalendarTimes, FaUser, FaMap, FaPhone, FaLock} from 'react-icons/fa'

const apiUrl = `https://randomuser.me/api/`;
const imgDefault = `https://randomuser.me/api/portraits/men/60.jpg`

function App() {
const [loading, setLoading] = useState(true);
const [person, setPerson] = useState(null);
const [value, setValue] = useState('random person');
const [title, setTitle] = useState('name');


const fetchPerson = async () => {
  const res = await fetch(apiUrl);
  const data = await res.json()
  console.log(data);
  const user = data.results[0]
  // destructuring the data
  const {phone,email} = user;
  const { large: image } = user.picture
  const {login: { password },} = user
  const { first, last } = user.name
  const {dob: { age },} = user
  const {street: { number, name},} = user.location


const newUser = {
  image,
  phone,
  password,
  email,
  age,
  street: `${number} ${name}`,
  name: `${first} ${last}`
}
setPerson(newUser);
setLoading(false)
setTitle('name');
setValue(newUser.name)
}
useEffect(() => {
fetchPerson()

}, [])

// everytime we hover over the buttons we can get the values
const handleValue = (e) => {
  if (e.target.classList.contains('icon')) {
    const newVal = e.target.dataset.label
    console.log(person);
    console.log(newVal);
    setTitle(newVal)
    setValue(person[newVal])
  }
}


  return (
    <main>
      <div className="block bcg-black"></div>
        <div className="block">
          <div className="container">
             {/* if the person is not null go for default image */}
            <img src={(person && person.image) || imgDefault} alt="random user" className="user-img"></img>
            {/* we pass in the title state  */}
            <p className="user-title">my {title} is</p>
            {/* we pass in the value state */}
            <p className="user-value">{value}</p>
            <div className="values-list">
              <button className="icon" data-label="name" onMouseOver={handleValue}><FaUser /></button>
              <button className="icon" data-label="email" onMouseOver={handleValue}><FaEnvelopeOpen /></button>
              <button className="icon" data-label="street" onMouseOver={handleValue}><FaMap /></button>
              <button className="icon" data-label="age" onMouseOver={handleValue}><FaCalendarTimes /></button>
              <button className="icon" data-label="phone" onMouseOver={handleValue}><FaPhone /></button>
              <button className="icon" data-label="password" onMouseOver={handleValue}><FaLock /></button>
            </div>
            {/*  we pass in the fetchPerson function so everytime we click on the button, new user is generated */}
            <button className="btn" type="button" onClick= {fetchPerson}>
              {loading? 'Loading...' : 'randomize'}
            </button>
          </div>
        </div>

    </main>
  );
}

export default App;

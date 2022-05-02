import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from "react";


var accesstoken=null

function login(username, password) {
  fetch('https://splendedapi.herokuapp.com/auth/login', { method: 'POST', headers: { accept: 'application/json', body: JSON.stringify(
    { 
    username: username,//"john", 
    password: password,//"changeme" 
    })}})
    .then(data => data.json()) // Parsing the data into a JavaScript object
    .then(json => accesstoken=json.access_token)
    .then(json => alert(JSON.stringify(json)))
    
}


function callApiWith() {
 // alert('Bearer '+ accesstoken)
  fetch('https://splendedapi.herokuapp.com/profile', { method: 'GET', headers: {accept: 'application/json', Authorization:'Bearer '+ accesstoken} })
    .then(response => response.json())
    .then(json => alert(JSON.stringify(json)))
}

function callApiWithout() {
  fetch('https://splendedapi.herokuapp.com/profile', { method: 'GET' })
    .then(response => response.json())
    .then(json => alert(JSON.stringify(json)))
}

function App() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    login(inputs.username, inputs.password)
  }

  return (
    <div className='App-header'>
    <form onSubmit={handleSubmit}>
      <label>Enter your name:
      <input 
        type="text" 
        name="username" 
        value ={inputs.username || "john"} 
        onChange={handleChange}
      />
      </label>
      <label>Enter your password:
        <input 
          type="password" 
          name="age" 
          value={inputs.age || "changeme"} 
          onChange={handleChange}
        />
        </label>
        <input type="submit" />
    </form>
    <button onClick={callApiWith}>Call API With Token</button>
    <button onClick={callApiWithout}>Call API Without Token</button>
    </div>
  )
}

export default App;

import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [robotData, setRobotData] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('1');

  const handleDropdownChange = (event: any) => {
    setSelectedOption(event.target.value);
  }

  const submitBatches = (event: any) => {
    console.log("Submitting input: " + selectedOption);
    let input = inputs[Number(selectedOption) - 1];
    fetch("/api/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }


  const getRobotVacuumData = (input: any) => {
    setRobotData('Getting data');
    fetch("/api/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setRobotData(JSON.stringify(data)))
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <h1>Robot Vacuum Cleaner</h1>
      <h4>Input options:</h4>
      <div>
        {inputs.map((input, index) => {
          return (
            <div key={index + 1}>
              Input {index + 1}
              <p>{JSON.stringify(input)}</p>
            </div>
          )
        })}
        <label>
          Submit input:
          <br></br>
          <select value={selectedOption} onChange={handleDropdownChange}>
            {inputs.map((input, index) => {
              return (
                <option key={index + 1} value={index + 1}>Input {index + 1}</option>
              )
            })}
          </select>
        </label>
        <button onClick={submitBatches}>Submit</button>
      </div>
      <br></br>
      <div>
        <button onClick={getRobotVacuumData}>Get Robot Vacuum Data</button>
        <p>{robotData}</p>
      </div>
    </div>
  );
}

export default App;

// Hardcoding some input values:
const input1 = {
  batches: [[3, 2, 4], [2, 8, 4], [4, 6, 4, 9]],
  priorityRooms: [1, 4, 8]
}
const input2 = {
  batches: [[4, 6, 4, 9]],
  priorityRooms: [6]
}
const input3 = {
  batches: [[3, 2, 4], [4, 6, 4, 9], [2, 8, 4]],
  priorityRooms: [2]
}

const input4 = {
  batches: [[100, 20, 1, 50], [10, 1, 1, 50]],
  priorityRooms: [1]
}

const inputs = [input1, input2, input3, input4];

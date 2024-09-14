import React from 'react';
import logo from './logo.svg';
import './App.css';

import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className="container mt-5">
      <h1 className="text-center">Task Manager</h1>
      <AddTask />
      <TaskList />
    </div>
  );
}

export default App;

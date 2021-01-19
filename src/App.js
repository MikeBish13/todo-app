import './styles/App.css';
import { startData } from './components/startData';
import Input from './components/input';
import List from './components/list';
import Control from './components/control';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Sun from './images/icon-sun.svg';
import Moon from './images/icon-moon.svg';

function App() {

  const [ input, setInput ] = useState('');
  const [ toDos, addToDos ] = useState([]);
  const [ active, setActive ] = useState(false);
  const [ complete, setComplete ] = useState(false);
  const [ all, setAll ] = useState(true);
  const [ lightMode, isLightMode] = useState(true);

  useEffect(() => {
    addToDos(startData)
  }, []);

  // Change the class of the header for light or dark mode
  const lightToggle = clsx('App', { 'day': lightMode, 'night': !lightMode});

  return (
    <div className={lightToggle}>
      <div className="header">
        <div className="header-content container">
        <h1 className="page-title">Todo</h1>
        <button onClick={() => isLightMode(!lightMode)}>{lightMode ? <img src={Moon} alt="moon"></img> : <img src={Sun} alt="sun"></img>}</button>
        </div>
      </div>
      <Input toDos={toDos} addToDos={addToDos} input={input} setInput={setInput} lightMode={lightMode} />
      <List toDos={toDos} addToDos={addToDos} active={active} complete={complete} all={all} lightMode={lightMode} />
      <Control toDos={toDos} addToDos={addToDos} active={active} setActive={setActive} complete={complete} setComplete={setComplete} all={all} setAll={setAll} />
      <p className="drag-text container">Drag and drop to reorder list</p>
    </div>
  );
}

export default App;

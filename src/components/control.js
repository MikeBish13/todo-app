import React from 'react';

export default function Control({ toDos, addToDos, active, setActive, complete, setComplete, all, setAll }) {

   // Set up the relevant filters depening on which button has been pressed 
   const handleAll = () => {
       setAll(all = true);
       setActive(active = false);
       setComplete(complete = false);
   }

   const handleActive = () => {
        setActive(active = true);
        setAll(all = false);
        setComplete(complete = false);
   }

   const handleComplete = () => {
       setComplete(complete = true);
       setAll(all = false);
       setActive(active = false);
   }

    // Clear the completed tasks by filtering the exisintg list and updating it
    const handleClear = () => {
        let clearedList = toDos.filter(i => i.checked !== true);
        addToDos(toDos = clearedList);
    }
    // Store the tasks that need to be completed so the total number remaninng can be displayed
    const completedTasks = toDos.filter(i => i.checked === false);

    return (
        <div className="control-bar container">
            {completedTasks.length === 1 ? <p className="footer-text remaining-item">1 item left</p> : <p className="footer-text remaining-item">{completedTasks.length} items left</p>}
            <div className="buttons">
            <button className={all ? 'active' : null} onClick={handleAll}>All</button>
            <button className={active ? 'active' : null} onClick={handleActive}>Active</button>
            <button className={complete ? 'active' : null}onClick={handleComplete}>Completed</button>
            </div>
            <button className="footer-text clear-complete" onClick={handleClear}>Clear Completed</button>
        </div>
    )
}
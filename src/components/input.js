import React from 'react';
import nextId from "react-id-generator";

export default function input({ toDos, addToDos, input, setInput, lightMode }){


    // New ToDo list item is stored in input when the user types into the input field
    function handleChange(e){
        setInput(e.target.value);
    }

    // On pressing enter, the ToDo list item is added to the array along with an ID and a variabe to track whether it has been completed. Input is then reset to blank
    function handleSubmit(e){
        addToDos([...toDos, 
            {
            id: nextId(),    
            name: input,
            checked: false, 
            }
        ]);
        setInput('');
    }

    return (
    <div className="input-bar container">
        <div className="circle"></div>
        <form action="#" onSubmit={handleSubmit}>
            <input type="text" className="input" value={input} onChange={handleChange} placeholder="Create a new todo..."></input>
        </form>
    </div>
    
    )
};
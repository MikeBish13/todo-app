import React from 'react';
import Cross from '../images/icon-cross.svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function List({ toDos, addToDos, active, complete, all, lightMode }) {

    
    // Map through Todo list and change check value 
    const handleCheck = (e) => {
        let updatedList = toDos.map((i => {
            if (i.id === e.target.value) {
                return {...i, checked: !i.checked};
            } else {
                return i;
            }
        }));

        addToDos(toDos = updatedList);
    }

    // Delete item from Todo list 
    const deleteItem = (e) => {
        addToDos(toDos = toDos.filter(i => i.id !== e.target.value));
    }

    // Create an empty array to be populated by the generated ToDoList
    let populatedList = [];

    // Generare the ToDo List on initial render and every time a filter button is pressed
    const generateToDoList = () => {
        if (all) {
            populatedList = toDos;
        } else if (active) {
            populatedList = toDos.filter(i => i.checked === false);
        } else if (complete) {
            populatedList = toDos.filter(i => i.checked === true);
        }
    };

    // Call the generate ToDoList on every render
    generateToDoList();

    //Function to ensure that when the ToDo is dragged and dropped, the order of the list is updated so that it stays in place on re-render
    // Create a new array of Todos, find the place where the todo was moved from and splice it from the list, then splice it back into the list at the position where it was dragged, finally updating ToDos with new list
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(toDos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        addToDos(items);
    }


    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todo-items">
                {(provided) => (
                <ul className="list-container container" {...provided.droppableProps} ref={provided.innerRef}>
                    {populatedList.map((item, index) => 
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                                <li className="list-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <div className="start-details">
                                    <input checked={item.checked} value={item.id} type="checkbox" className="checkbox" onChange={handleCheck}></input>
                                    <p className={item.checked ? "text checked" : "text"}>{item.name}</p>
                                    </div>
                                    <input type="image" alt="cross" src={Cross} value={item.id} onClick={deleteItem} className="close-button"></input>
                                </li>
                            )}
                        </Draggable>  
                    )}
                    {provided.placeholder}
                </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
};
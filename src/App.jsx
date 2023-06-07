import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskUrgency, setNewTaskUrgency] = useState('high');
  const [newTaskImportance, setNewTaskImportance] = useState('high');

  // Load tasks from local storage on initial component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Update local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Get the task that was dragged
    const draggedTask = tasks[source.index];

    // Create a new task object with the updated quadrant
    const updatedTask = {
      ...draggedTask,
      quadrant: destination.droppableId,
    };

    // Update the tasks array with the updated task
    const updatedTasks = [...tasks];
    updatedTasks.splice(source.index, 1); // Remove the task from the source quadrant
    updatedTasks.splice(destination.index, 0, updatedTask); // Insert the task at the destination quadrant

    setTasks(updatedTasks);
  };

  const createTask = () => {
    if (!newTaskTitle) return;

    let quadrant
    if (newTaskUrgency === 'high') {
      if (newTaskImportance === 'high') {
        quadrant = 'quadrant2'
      } else {
        quadrant = 'quadrant1'
      }
    } else {
      if (newTaskImportance === 'high') {
        quadrant = 'quadrant4'
      } else {
        quadrant = 'quadrant3'
      }
    }

    const newTask = {
      id: uuid(),
      title: newTaskTitle,
      urgency: newTaskUrgency,
      importance: newTaskImportance,
      quadrant,
      done: false
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskTitle('');
    setNewTaskUrgency('high');
    setNewTaskImportance('high');
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const markTaskAsDone = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {...t, done: true}
      } else {
        return t
      }
    }));
  }

  return (
    <>
      <h1>Task Manager</h1>
      <div className="app">

        <div className="quadrant-container">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="quadrant1">
              {(provided) => (
                <div
                  className="quadrant"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ backgroundColor: "#cc3300" }}
                >
                  <h2>Urgent but Not Important</h2>
                  {tasks.map((task, index) => {
                    if (task.quadrant === 'quadrant1') {
                      return (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              className="task"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                backgroundColor: snapshot.isDragging ? 'lightblue' : 'white',
                                ...provided.draggableProps.style
                              }}
                            >
                              <div className={task.done ? "done-task" : ""}>{task.title}</div>
                              {!task.done && (
                                <button className="done-button" onClick={() => markTaskAsDone(task.id)}>
                                  Done
                                </button>)}
                              <button className="delete-button" onClick={() => deleteTask(task.id)}>
                                Delete
                              </button>
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="quadrant2">
              {(provided) => (
                <div
                  className="quadrant"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ backgroundColor: "#669900" }}
                >
                  <h2>Urgent and Important</h2>
                  {tasks.map((task, index) => {
                    if (task.quadrant === 'quadrant2') {
                      return (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              className="task"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                backgroundColor: snapshot.isDragging ? 'lightblue' : 'white',
                                ...provided.draggableProps.style
                              }}
                            >
                              <div className={task.done ? "done-task" : ""}>{task.title}</div>
                              {!task.done && (
                                <button className="done-button" onClick={() => markTaskAsDone(task.id)}>
                                  Done
                                </button>)}
                              <button className="delete-button" onClick={() => deleteTask(task.id)}>
                                Delete
                              </button>
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="quadrant3">
              {(provided) => (
                <div
                  className="quadrant"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ backgroundColor: "#66ccff" }}
                >
                  <h2>Not Urgent and Not Important</h2>
                  {tasks.map((task, index) => {
                    if (task.quadrant === 'quadrant3') {
                      return (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              className="task"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                backgroundColor: snapshot.isDragging ? 'lightblue' : 'white',
                                ...provided.draggableProps.style
                              }}
                            >
                              <div className={task.done ? "done-task" : ""}>{task.title}</div>
                              {!task.done && (
                                <button className="done-button" onClick={() => markTaskAsDone(task.id)}>
                                  Done
                                </button>)}
                              <button className="delete-button" onClick={() => deleteTask(task.id)}>
                                Delete
                              </button>
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="quadrant4">
              {(provided) => (
                <div
                  className="quadrant"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ backgroundColor: "#993399" }}
                >
                  <h2>Not Urgent But Important</h2>
                  {tasks.map((task, index) => {
                    if (task.quadrant === 'quadrant4') {
                      return (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              className="task"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                backgroundColor: snapshot.isDragging ? 'lightblue' : 'white',
                                ...provided.draggableProps.style
                              }}
                            >
                              <div className={task.done ? "done-task" : ""}>{task.title}</div>
                              {!task.done && (
                                <button className="done-button" onClick={() => markTaskAsDone(task.id)}>
                                  Done
                                </button>)}
                              <button className="delete-button" onClick={() => deleteTask(task.id)}>
                                Delete
                              </button>
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="task-form">
          <h2>Create a Task</h2>
          <input
            type="text"
            placeholder="  Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <label htmlFor='taskUrgency'>Urgency:</label>
          <select
            id="taskUrgency"
            value={newTaskUrgency}
            onChange={(e) => setNewTaskUrgency(e.target.value)}
          >
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
          <label htmlFor='taskImportance'>Importance:</label>
          <select
            id="taskImportance"
            value={newTaskImportance}
            onChange={(e) => setNewTaskImportance(e.target.value)}
          >
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
          <button onClick={createTask}>Create</button>
        </div>
      </div>
    </>
  );
};

export default App;

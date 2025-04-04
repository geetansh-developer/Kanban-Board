import React, { useState, useEffect } from "react";
 import { DndProvider, useDrag, useDrop } from "react-dnd";
 import { HTML5Backend } from "react-dnd-html5-backend";
 import { X } from "lucide-react";
 import { motion } from "framer-motion";

 const COLUMN_NAMES = ["To Do", "In Progress", "Completed"];

 const Header = () => (
   <header className="kanban-header">
     <div className="logo">
       <a href="/"><img src="/images/Logo.png" alt="Beyond Labs" /></a>
     </div>
     <div className="header-right">
       <img src="/custom_icons/emai-1.png" className="icon" alt="E-Mail" />
       <img src="/custom_icons/Bell.png" className="icon" alt="Bell" />
       <img src="/images/UserProfile.png" className="user-profile" alt="User Profile" />
       <div className="user-info">
         <span className="user-name">Alexandra C.</span>
         <span className="user-role">Designer</span>
       </div>
     </div>
   </header>
 );

 const Task = ({ task, moveTask, editTask }) => {
   const [{ isDragging }, drag] = useDrag(() => ({
     type: "TASK",
     item: { id: task.id, status: task.status },
     collect: (monitor) => ({ isDragging: monitor.isDragging() }),
   }));

   return (
     <motion.div
       ref={drag}
       className="task-card"
       style={{ opacity: isDragging ? 0.5 : 1, userSelect: "none", cursor: "grab" }}
       layout
       onClick={() => editTask(task)}
     >
       <p>
         <strong>{task.title}</strong>
       </p>
       <p className="task-description">{task.description}</p>
     </motion.div>
   );
 };

 const Column = ({ title, tasks, moveTask, editTask }) => {
   const [{ isOver, canDrop }, drop] = useDrop(() => ({
     accept: "TASK",
     drop: (item, monitor) => {
       const didDrop = monitor.didDrop();
       if (didDrop) {
         return;
       }
       moveTask(item.id, title);
     },
     collect: (monitor) => ({
       isOver: monitor.isOver(),
       canDrop: monitor.canDrop(),
     }),
   }));

   const getColumnColor = (title) => {
     switch (title) {
       case "To Do":
         return "#F2CECE";
       case "In Progress":
         return "#E0CEF2";
       case "Completed":
         return "#CEF2CE";
       default:
         return "white";
     }
   };

   return (
     <div
       ref={drop}
       className="kanban-column"
       style={{
         backgroundColor: isOver && canDrop ? "rgba(0, 0, 0, 0.1)" : "transparent",
         borderRight: title !== "Completed" ? "1px solid #e0e0e0" : "none",
         padding: "16px 0px",
       }}
     >
       <div className="column-header-container">
         <h2 className="column-header" style={{ backgroundColor: getColumnColor(title) }}>
           {title}
         </h2>
         <div className="column-header-border"></div>
       </div>
       {tasks.map((task) => (
         <Task key={task.id} task={task} moveTask={moveTask} editTask={editTask} />
       ))}
     </div>
   );
 };

 const Modal = ({ isOpen, onClose, onSave, task, setTask }) => {
   if (!isOpen) return null;

   return (
     <div className="modal-overlay">
       <div className="modal-content">
         <div className="modal-header">
           <h2>{task.id ? "Edit Task" : "Add a New Task"}</h2>
           <X className="close-icon" onClick={onClose} />
         </div>
         <div className="modal-body">
           <label className="modal-label">Task Name</label>
           <input
             type="text"
             className="modal-input"
             value={task.title}
             onChange={(e) => setTask({ ...task, title: e.target.value })}
           />
           <label className="modal-label">Description</label>
           <textarea
             className="modal-textarea"
             value={task.description}
             onChange={(e) => setTask({ ...task, description: e.target.value })}
           ></textarea>
         </div>
         <div className="modal-footer">
           <button className="modal-button" onClick={onSave}>
             {task.id ? "Save Task" : "Add Task"}
           </button>
         </div>
       </div>
     </div>
   );
 };

 const KanbanBoard = () => {
   const [tasks, setTasks] = useState(() => {
     const savedTasks = localStorage.getItem("tasks");
     return savedTasks ? JSON.parse(savedTasks) : [];
   });

   const [modalOpen, setModalOpen] = useState(false);
   const [task, setTask] = useState({ title: "", description: "", status: "To Do" });

   useEffect(() => {
     localStorage.setItem("tasks", JSON.stringify(tasks));
   }, [tasks]);

   const addTask = () => {
     setTask({ title: "", description: "", status: "To Do" });
     setModalOpen(true);
   };

   const editTask = (task) => {
     setTask(task);
     setModalOpen(true);
   };

   const saveTask = () => {
     setTasks((prevTasks) => {
       const existingTask = prevTasks.find((t) => t.id === task.id);
       if (existingTask) {
         return prevTasks.map((t) => (t.id === task.id ? task : t));
       }
       return [...prevTasks, { ...task, id: Date.now() }];
     });
     setModalOpen(false);
   };

   const moveTask = (taskId, toStatus) => {
     setTasks((prevTasks) => {
       const taskToMove = prevTasks.find((task) => task.id === taskId);
       if (!taskToMove) return prevTasks;

       if (taskToMove.status === toStatus) {
         return prevTasks;
       }

       const filteredTasks = prevTasks.filter((task) => task.id !== taskId);
       const updatedTasks = filteredTasks.reduce((acc, task) => {
         if (task.status === toStatus) {
           acc.push(task);
         }
         return acc;
       }, []);

       const columnTasks = prevTasks.filter((task) => task.status === toStatus);
       const index = columnTasks.findIndex((task) => task.id === taskId);

       if (index === -1) {
         return [...filteredTasks, { ...taskToMove, status: toStatus }];
       } else {
         const sortedTasks = prevTasks.filter((task) => task.status !== toStatus);
         const tasksInColumn = prevTasks.filter((task) => task.status === toStatus);
         const updatedColumn = [...tasksInColumn];
         updatedColumn.splice(index + 1, 0, { ...taskToMove, status: toStatus });

         return [...sortedTasks, ...updatedColumn];
       }
     });
   };

   return (
     <DndProvider backend={HTML5Backend}>
       <Header />
       <div className="kanban-board">
         <button className="add-task-button" onClick={addTask}>
           Add Task +
         </button>
         <div className="kanban-columns">
           {COLUMN_NAMES.map((title) => (
             <Column
               key={title}
               title={title}
               tasks={tasks.filter((task) => task.status === title)}
               moveTask={moveTask}
               editTask={editTask}
             />
           ))}
         </div>
         <Modal
           isOpen={modalOpen}
           onClose={() => setModalOpen(false)}
           onSave={saveTask}
           task={task}
           setTask={setTask}
         />
       </div>
     </DndProvider>
   );
 };

 export default KanbanBoard;

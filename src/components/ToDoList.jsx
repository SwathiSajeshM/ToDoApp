import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import { MdDeleteForever, MdEdit, MdOutlineDoneOutline } from "react-icons/md";

const ToDoList = () => {
  
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId,setEditId] = useState(0)

  //____________________ Handle form submission
  const handlesubmit = (e) =>
  {
    e.preventDefault();
  };
  //_____________________ Add a new todo
  const addTodo = () => 
    {
      if (todo.trim())
      {  
        //____________________ Check if todo is not empty
        setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
        setTodo(""); //_______________________ Clear the input after adding
      }
      if(editId)
        {
          const editTodo = todos.find((todo)=>todo.id===editId)
          const updateTodo = todos.map((swa)=>swa.id===editTodo.id ? (swa ={id : swa.id , list : todo}) : (swa ={id : swa.id , list : swa.list}))
          setTodos(updateTodo)
          setEditId(0);
          setTodo('') 
        }
    };
  //_______________________ Focus on input
  const inputRef = useRef(null);
  useEffect(() =>
  {
    inputRef.current.focus();
  }, []); //___________ Empty dependency array to run only on initial render

  //_______________________ Delete a todo
  const onDelete = (id) =>
  {
    setTodos(todos.filter((swa) => swa.id !== id));
  };

  //____________________ Complete a todo (toggle status)
  const onComplete = (id) =>
    {
      let complete = todos.map((list) => {
        if (list.id === id) {
          return { ...list, status: !list.status }; }
        return list; });
      setTodos(complete); 
    };

  const onEdit = (id)=>{
  const editTodo =  todos.find((swa)=> swa.id === id)
  console.log('edit id'+ editTodo.list)
  setTodo(editTodo.list)
  setEditId(editTodo.id)
  console.log(editTodo) }

  return (
    <main>
      <div className="container">
        <h2 className="todohead"> TODO APP </h2>
        <form className="form-group" onSubmit={handlesubmit}>
          <input type="text" value={todo} ref={inputRef} placeholder="Enter your todo" className="form-control" onChange={(e) => setTodo(e.target.value)} />
          <button type="button" onClick={addTodo}> {editId?'Edit':'Add'} </button>
        </form>
        <ul className="list"> {todos.map((swa) => (
            <li key={swa.id} className="list-items">
              <div className={`list-item-list ${swa.status ? "completed" : ""}`}> {swa.list} </div>
              <span>
                <MdOutlineDoneOutline className="list-item-icons" id="complete" title="Complete" onClick={() => onComplete(swa.id)} />
                <MdEdit className="list-item-icons" id="edit" title="Edit" onClick={()=>onEdit(swa.id)} />
                <MdDeleteForever className="list-item-icons" id="delete" title="Delete" onClick={() => onDelete(swa.id)} />
              </span>
            </li> ))}
        </ul>
      </div>
    </main>
  );
};
export default ToDoList;


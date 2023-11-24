import { useRef, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TodoItem from "../components/TodoItem";

export const Homepage = () => {
  const todoInputRef = useRef();
  const timeInputRef = useRef();

  const [Todos, setTodos] = useState([
    { id: "1", title:  "Playing fudbool", time: "18:00", done: false},
    { id: "2", title: "Reading book", time: "10:00", done: true},
    { id: "3", title: "Swimming", time: "15:00", done: false},
    { id: "4", title: "Listening music", time: "12:00", done: true}
  ]);

  const [selected, setSelected] = useState(null);

  const submit = (e) => {
    e.preventDefault();

    const title = todoInputRef.current.value.trim();
    const time = timeInputRef.current.value.trim();
    if(title && time) {
      const todo = {
        id: Date.now(),
        title,
        time,
        done: false,
      };
      let newTodos;
      if (selected === null) {

        newTodos = [todo, ...Todos ];
      }else {
        newTodos = Todos.map((el) => (el.id === selected ? {...el, title, time} : el));
      setSelected(null);
      };
      setTodos(newTodos);
      e.target.reset();
    }else {
      window.alert('Iltimos to\'ldiring !');
    }
  };

  const doneTodo = (id) => {
    const newTodos = Todos.map(todo => todo.id === id ? {...todo, done: true} : todo);
    setTodos(newTodos);
  }

  const deleteTodo = (id) => {
const newTodos = Todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  const editTodo = (id) => {
const {title, time} = Todos.find(todo => todo.id === id);
      todoInputRef.current.value = title;
      timeInputRef.current.value = time;
      setSelected(id)
  }

  const mappingTodos = Todos.map((Todo, i) => (<TodoItem order={i + 1} key={i} {...Todo} doneTodo={doneTodo} deleteTodo={deleteTodo} editTodo={editTodo} />));
  const doneTodos = Todos.filter((todo) => todo.done).map((Todo, i) => (<TodoItem order={i + 1} key={i} {...Todo} doneTodo={doneTodo} deleteTodo={deleteTodo} editTodo={editTodo} />));
  const unDoneTodos = Todos.filter((todo) => !todo.done).map((Todo, i) => (<TodoItem order={i + 1} key={i} {...Todo} doneTodo={doneTodo} deleteTodo={deleteTodo} editTodo={editTodo} />));

  return (
    <>
    <div className="container">
    <h1 className="text-center my-4">TODO PROJECT</h1>
    <form onSubmit={submit} className='d-flex mb-3 gap-3'>
      <input ref={todoInputRef} type="text" className='form-control' />
      <input ref={timeInputRef} type="time" className='form-control' />
      <button className='btn btn-success'>
        {selected === null ? "Add" : "Save"}
      </button>
    </form>
    <Tabs
    variant='pills'
      defaultActiveKey="all"
      transition={true}
      id="todo"
      className="mb-3"
      justify
    >
      <Tab eventKey="all" title={`All todos (${Todos.length})`}>
         {mappingTodos}
      </Tab>
      <Tab eventKey="undone" title={`Undone todos (${unDoneTodos.length})`}>
        {unDoneTodos}
      </Tab>
      <Tab eventKey="done" title={`Done todos (${doneTodos.length})`}>
        {doneTodos}
      </Tab>
    </Tabs>
    </div>
    </>
  )
}
export default Homepage;

import TodoItem from "../components/TodoItem";
import "./Homepage.css";

export const Homepage = () => {

  return (
    <>
    <div className="container">
    <h1 className="todo_text">TODO PROJECT</h1>
    < TodoItem time="18:00" title="Playing fudbool"/>
    < TodoItem time="10:00" title="Reading book"/>
    < TodoItem time="15:00" title="Swimming"/>
    < TodoItem time="12:00" title="Listening music"/>
    </div>
    </>
  )
}
export default Homepage;
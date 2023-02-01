import logo from './logo.svg';
import './App.css';
import './styles.css';
import {useState} from 'react';
function Todoitem(props){
  const {name,completed,id,change}=props;
  return (<>
    <div style={{color:completed?"green":"red"}}>{name} <button onClick={function(){change(id);}}>toggle</button></div>
   </>);//updating in db using the innerfunction which passed props
}
function Todo(props)
{
  const {db,setdb}=props;
  function change(id) //this is a innerfunction which can access db & setdb
  {
    setdb(db.map(function(e){
      if(e.id===id)
       e.completed=true;
       return e;
    }));
  }
  return (<div className="todo-list">{db.map(function(x){
    return <Todoitem name={x.name} completed={x.completed} id={x.id} change={change}/>//passing props and innerfunction
  })
}</div>);
}

let Id=1;
function App() {
  const [db,setdb]=useState([]);
const [input,setInput]=useState("");//creating a variable "input" to get data from textbox
  return (<div className="app"><h1>Todo App</h1>
  <h4>Your task</h4>
  <input type="text" onChange={function(event){
    setInput(event.target.value);//"input" will update when we type something in textbox
  }}
                   //So that when we make change in 37th line,it will reflect in textboxie. valueof textbox is dependent on "input" variable
value={input}/>
  <button onClick={function(){
    if(input!==""){ //not allowing empty tasks
    setdb([...db,{name:input,completed:false,id:Id++}]);
    setInput("");//clearing textbox after adding one element
  }}} >Add todo</button>

  <Todo className="todo" db={db} setdb={setdb}/>
  </div>);/**passing both db and updatefn*/
}

export default App;

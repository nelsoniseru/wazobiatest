import {BrowserRouter, Route,Routes, Link,Navigate} from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import "./App.css"
import ProtectedRoute from './Components/privateRoute';

function App() {
  return (
  
    <main>
      <Routes>
      <Route path="/dashboard" element = {<ProtectedRoute />}/>
      <Route path="/" element = {<Register/>}/>
      <Route path="/login" element = {<Login/>}/>
      
    
      </Routes>
    </main>
   
  
  );
}

export default App;

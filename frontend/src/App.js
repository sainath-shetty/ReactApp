
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';

function App() {
  return (
    <div>
     
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;

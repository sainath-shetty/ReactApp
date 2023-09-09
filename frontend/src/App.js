
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Register from './Components/Register';
import Navbar from './Components/Navbar';
import Edit from './Components/Edit'
import Detail from './Components/Detail'
import Imagetext from './Components/Imagetext';
function App() {
  return (
    <div>

      <Routes><Route exact path='/signup' element={<Signup />} />
        <Route exact path='/login' element={<Login />} />
        </Routes>
        <Navbar />
      <Routes>
        
        <Route exact path='/' element={<Home />} />

        <Route exact path='/register' element={<Register />} />
        <Route exact path='/edit/:id' element={<Edit />} />
        <Route exact path='/detail/:id' element={<Detail />} />
        <Route exact path='/imagetext' element={<Imagetext />} />
      </Routes>
    </div>
  );
}

export default App;

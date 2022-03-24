import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';

function App() {
    return (

        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/AddUser" element={<AddUser/>}></Route>
            <Route path="/EditUser/:id" element={<EditUser/>}></Route>
        </Routes>

    );
}

export default App;

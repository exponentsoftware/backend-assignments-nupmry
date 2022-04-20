import { Route, Routes } from 'react-router';
import './App.css';
import Authentication from './Pages/Authentication';
import Tasks from './Pages/Tasks';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Authentication />} exact />
        <Route path="/home" element={<Tasks />} exact />
      </Routes>
    </div>
  );
}

export default App;
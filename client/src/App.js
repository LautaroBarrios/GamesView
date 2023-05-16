import './App.css';
import { LandingPage,HomePage } from './components/Components.js';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className='App'>
      <Routes>
        {/* <Route exact path="/" element={<LandingPage/>}/> */}
        <Route path="/home" element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;

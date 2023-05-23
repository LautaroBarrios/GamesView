import './App.css';
import { LandingPage,HomePage,DetailPage,FormPage } from './components/Components.js';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/detail/:id" element={<DetailPage/>}/>
        <Route path='/create' element={<FormPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

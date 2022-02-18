import s from  './App.module.css';
import Header from './Components/HeaderComponent/Header'
import Content from './Components/ContentComponent/Content'
import { useState } from 'react/cjs/react.development';
import {arrayRus, arrayEng} from './Utils/Words'
import { Routes, Route } from "react-router-dom";

function App() {
  
  const [language, setLanguage] = useState("Ru")

  return (
    <Routes>
       <Route path="/" element={<div className={s.page} >
          <Header />
          <Content language={language} setLanguage={setLanguage}  array={language === 'Ru' ? arrayRus : arrayEng } />
        </div>} /> 
      
    </Routes>
  );
}

export default App;

import React, { useState } from 'react'
import s from  './App.module.css';
import Header from './Components/HeaderComponent/Header'
import Content from './Components/ContentComponent/Content'
import {arrayRus, arrayEng} from './Utils/Words'
import {shuffle} from './Utils/RandomSortArray'

function App() {
  
  const [language, setLanguage] = useState("Ru")

  return (
        <div className={s.page} >
          <Header />
          <Content language={language} setLanguage={setLanguage}  array={shuffle(language === 'Ru' ? arrayRus : arrayEng )} />
        </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import s from './Content.module.css'
import Wrong from './../../Assets/wrong.png'
import Correct from './../../Assets/correct.png'
import Restart from './../../Assets/restart.png'

let timer = null
const Content = (props) => {

    const array = props.array

    const [wordToBeTested, setWordToBeTested] = useState(array[0]);
    const [countWords, setCountWords] = useState(0);
    const [valueInput, setValueInput] = useState("");
    const [rightWords, setRightWords] = useState(0); 
    const [wrongWords, setWrongWords] = useState(0);
    const [top, setTop] = useState(50);
    const [isFatching, setIsFatching] = useState(false)
    const [time, setTime] = useState(60);

    useEffect(() => {
        setWordToBeTested(array[countWords]);     
    }, [countWords]);

    useEffect(() => {
        restart()
    }, [props.language])
    
    const onClickTimer = () => {
        setIsFatching(true)
        let i = 60;
        const timeInterval = () => { 
            if (i < 0)  {
                clearInterval(timer)
                setIsFatching(false)
            } else {
                setTime((i--))
            }}
        
        timeInterval()
        timer = setInterval(timeInterval, 1000);
    }
    
    const onSubmitWord = () => {
        if (document.getElementById(countWords).offsetTop < document.getElementById(countWords + 1).offsetTop) {
            document.getElementById('words').style.marginTop='-' + top +'px'
            setTop(top+50)
        }
        if (valueInput === wordToBeTested) {
            setRightWords(rightWords + 1)
            document.getElementById(countWords).style.color="green";
        } else {
            setWrongWords(wrongWords + 1)
            document.getElementById(countWords).style.color='red';
        }   
        setCountWords(countWords+1)
        document.getElementById(countWords).style.backgroundColor='#00000000';
        document.getElementById(countWords+1).style.backgroundColor='#b9b7b7';
        
        setValueInput('')
       
    }
    const restart = () => {
        clearInterval(timer)
        setWordToBeTested(array[0])
        setCountWords(0)
        setValueInput('')
        setRightWords(0)
        setWrongWords(0)
        setTop(50)
        setIsFatching(false)
        setTime(60)
        document.getElementById('words').style.marginTop='0px'

        for (let i = 0; i < array.length; i++) {
            document.getElementById(i).style.backgroundColor="#00000000"
            document.getElementById(i).style.color="black"
        }

        document.getElementById(0).style.backgroundColor="#b9b7b7"

    }
    const onChangeValue = (e) => {
        if (time !== 0) {
            let array = wordToBeTested.split('')
            let array2 = e.target.value.split('')
            for (let i = 0; i < array2.length; i++) {
                if (array[i] !== array2[i]) {
                    document.getElementById(countWords).style.backgroundColor="red";
                } else {
                    document.getElementById(countWords).style.backgroundColor='#b9b7b7';
                }
            }
    
            if (!isFatching) {
                onClickTimer()
            }
            if (e.target.value.endsWith(' ')) {
                onSubmitWord()
            } else {
                setValueInput(e.target.value)
            }    
        }
        
    }
    return (
       <div className={s.content}>
           <div className={s.inputText}>
               <div id='words' className={s.words} >
                    {array.map((str, index) => (<span id={index} className={s.word}>{str}</span>))}
               </div>
           </div>
           <div className={s.inputBlock} >
                <input value={valueInput} onChange={onChangeValue} type="text"  />
           </div>
           <div className={s.descriptionBlock} >
                <div className={s.failedWordBlock} >
                    <img className={s.failedWordsImg} src={Wrong} alt="Wrong" />
                    <div className={s.failedWordCount} >{wrongWords}</div>
                    <div className={s.failedWord} >Неправльных слов</div>
                </div>
                <div className={s.timAndCountWordBlock} >
                    <div className={s.informationBlock} >
                        <div onClick={() => {restart()}} className={s.restartBlock} >
                            <img className={s.restartImg} src={Restart} alt="restart" />
                        </div>
                        <div className={s.timeBlock} >
                        <div className={s.time} >{time}</div>
                        <span className={s.second} >секунд</span>
                    </div>
                    <div onClick={() => {props.setLanguage(props.language === "Ru" ? "En" : "Ru" )}} className={s.languageBlock} >
                        <span className={s.language} >{props.language}</span>
                    </div>
                    </div>
                    
                    <div className={s.countWordBlock} >
                        <div className={s.countWord} >{countWords}</div>
                        <div className={s.countWordTitle} >Всего слов</div>  
                    </div>
                </div>
                <div className={s.correctWordsBlock} >
                    <img className={s.currectWordsImg} src={Correct} alt="Correct" />
                    <div className={s.correctWordsCount} >{rightWords}</div>
                    <div className={s.correctWords} >Правильных слов</div>
                </div>
           </div>
       </div>
    );
}
export default Content;
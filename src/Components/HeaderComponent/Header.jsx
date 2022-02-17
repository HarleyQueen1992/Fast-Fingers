import React from "react";
import s from './Header.module.css';

const Header = (props) => {
    return (
       <div className={s.header}>
           <div className={s.logoBlock} >
               Mosset
           </div>
       </div>
    );
}
export default Header;
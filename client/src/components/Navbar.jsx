import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles/navBar.css"


export default function Navbar () {

    const div = {
        height:"min-content",
        minWidth:"max-content",
        paddingLeft: "5px",
        paddingRight: "5px"
    }

    return (
        <div style={{
            height: "max-content", 
            backgroundColor:"rgb(0, 0, 0)", 
            position:"fixed", width:"100%", 
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            marginTop:"0px",
            }}>
            <div style={div}><NavLink activeClassName={"null"} to={"/"}><img style={{width:"30px"}} src="https://thumbs.dreamstime.com/b/icono-aislado-de-control-videojuegos-dise%C3%B1o-ilustraci%C3%B3n-vectorial-iconos-aislados-168257553.jpg" alt="" /></NavLink></div>
            <div style={div}><NavLink className={({isActive}) => isActive ? "active" : "noActive"} exact to={"/home"}>HOME</NavLink></div>
            <div style={div}><NavLink className={({isActive}) => isActive ? "active" : "noActive"} to={"/create"}  >CREATE VIDEOGAME</NavLink></div>
        </div>
    )
}
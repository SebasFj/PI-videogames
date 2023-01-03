import React from "react";


const titles = {
    margin:"0px",
    color: "white",
    padding:"30px"
}

export default function Error404() {
    return (
        <div style={{
            backgroundColor:"black",
            height:"100vh"
        }}>
            <h1 style={titles}>ERROR 404</h1>
            <h2 style={titles}>PAGE NOT FOUND</h2>
            <img src="https://res.cloudinary.com/lmn/image/upload/c_limit,h_360,w_640/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinnyc/g/a/m/game-over-c6639.png"/>
        </div>
    )
}
import React from "react";
import styled from "styled-components"

export default function Game (props){

    const Containt = styled.div `
        border-style: groove;
        border-width: 7px;
        margin: 10px;
        max-width: min-content;
        background-color: #0000008e;
        h2{
            color: white;
        }
        color: white;
        :hover{
            h2{
                color:black;
            }
            background-color: #989494bd;
            color: black;
        }
    `



    return (
        <Containt>
            <div>
                <div>
                    <a style={{textDecoration:"none"}}href={`/home/videogames/${props.id}`}>
                        <h2>{props.name.toUpperCase()}</h2>
                        <img style={{width:"50vh"}}src={props.image ? props.image : "https://previews.123rf.com/images/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-no-hay-icono-de-imagen-disponible-ilustraci%C3%B3n-vectorial-plana.jpg"} alt="" />
                    </a>
                </div>
                <div>
                    <span>Rating: {props.rating}</span><br />
                    Genres: <br />
                    {props.genres.map(genre=>(
                        <span key={genre.id}>-{genre.name}<br/></span>
                    ))}
                </div>
            </div>
        </Containt>
    )
}
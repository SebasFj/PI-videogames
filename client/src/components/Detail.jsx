import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameDetail} from "../reduce/actions";
import styl from "./styles/loading.css"
import styles from "./styles/Detail.css"
import { loading } from "./Videogames";
import Navbar from "./Navbar";
import styled from "styled-components";

const Container = styled.div`
    background-image : url('https://images5.alphacoders.com/540/540654.jpg');
    width: 100%;
    min-height: 670px;
    background-attachment: fixed;
    margin-top: 0px;
`
const DivContent = styled.div`
    padding-top: 50px;
    background-size: 100vh;
    display: flex;
    background-color: rgba(255, 255, 255, 0.21);
    min-height: 670px;
    @media screen and (max-width: 1200px){
        flex-direction: column;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
        img{
            width: 90%;
            align-self: center;
            max-width: 600px;
        }
    }
`

export default function Detail () {
    let {id} = useParams();
    const dispatch = useDispatch();
    useEffect( ()=>{
        dispatch(getGameDetail(id))
    },[])
    const gameDetail = useSelector(state=>state.gameDetail);
    return (
        <Container>
                <Navbar/>
            {
                (gameDetail.platforms&&typeof gameDetail !== "string") ? 
                    <DivContent>
                        <div className="detailImgName">
                            <img className="divDetailImg" src={gameDetail.image ? gameDetail.image : "https://previews.123rf.com/images/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-no-hay-icono-de-imagen-disponible-ilustraci%C3%B3n-vectorial-plana.jpg"}/>
                            <h2 className="detailName">{gameDetail.name}</h2>
                        </div>
                        <div>
                            <div className="detailBody">
                                <label style={{fontSize: "20px"}}>Description: </label><span dangerouslySetInnerHTML={{__html: gameDetail.description}}></span>
                                <div><label style={{fontSize: "20px"}}>Released:  </label>{gameDetail.released}</div>
                                <div><label style={{fontSize: "20px"}}>Rating:  </label>{gameDetail.rating}</div>
                                <label style={{fontSize: "20px"}}>Platforms:  </label>{gameDetail.platforms && gameDetail.platforms.map(platform=>(
                                    <span key={platform.id}>{platform.name}.  </span>
                                    ))}
                                    <br />
                                <label style={{fontSize: "20px"}}>Genres: </label>{gameDetail.genres && gameDetail.genres.map(genre=>(
                                    <span key={genre.id}>{genre.name}. </span>
                                ))} 
                            </div>
                            
                        </div>
                       <br /> 
                    </DivContent>
                : 
                    typeof gameDetail !== "string" 
                    ?
                        loading
                    :
                        <div>
                            <h1>{gameDetail}</h1>
                            <h3>ID not found</h3>
                        </div>
            }
        </Container>
    )
}
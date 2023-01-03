import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames} from "../reduce/actions";
import Pages from "./Pages";
import SearchBar from "./searchBar";
import Game from "./Videogame";
import styled from "styled-components"
import styles from "./styles/loading.css"
import Navbar from "./Navbar";


export const loading = (
    <section>
        <div className="loader-animation">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </section>
)

const Div = styled.div`
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   grid-gap: 10px;
   margin-top: 50px;
   margin: 5%;
   @media screen and (max-width: 1250px){
        grid-template-columns: repeat(2, 1fr);
   }
   @media screen and (max-width: 850px){
   display: flex;
   flex-direction: column;
   align-items: center;
   }
`

const Container = styled.div`
    background-image: url("https://articles-img.sftcdn.net/images/f_auto,q_auto/w_1024,h_576,c_scale/v1582492843/videojuegos_4_tomb_raider_psh48b/videojuegos_4_tomb_raider_psh48b-1024x576.jpg");
    width: 100%;
    background-size: 1600px;
    background-repeat: no-repeat;
    min-height: 900px;
    background-attachment: fixed;
`



export default function Videogames (props) {
    const dispatch = useDispatch();
    const games = useSelector(state=>state.games)
    const search = useSelector(state=>state.search)
    const homeInputs = useSelector(state=>state.homeInputs)
    const currentPage = useSelector(state=>state.currentPage)
    const itemPerPage = 15;
    useEffect(()=>{
        dispatch(getAllGames())
    },[])


    return (
        <Container>
            <div>
                <Navbar/>
                <SearchBar/>
                {games.length <= itemPerPage? null :<Pages itemPerPage = {itemPerPage} length={games.length}></Pages>}
                
                {
                    games[0] 
                    ? 
                        <Div>
                           { games.slice(currentPage*itemPerPage-itemPerPage, currentPage*itemPerPage).map((game,index)=>(
                                <Game fav={props.fav} key={game.id}
                                    {...game}
                                />
                            ))}
                        </Div>
                    :
                        search || (homeInputs.createdFilter!=="All"||homeInputs.genreFilter!=="All")
                        ?
                        <h3>No hay coincidencias</h3>
                        :
                        loading
                        
                    }
            {games.length<=itemPerPage ? null :<Pages itemPerPage = {itemPerPage} length={games.length}></Pages>}
            </div>
            
        </Container>
    )
}
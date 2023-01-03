import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getGenres, searchGame, setHomeInputs, updateSearch} from "../reduce/actions";
import styled from "styled-components";

const Div = styled.div`
    padding: 50px;
    display: flex;
    justify-content: space-between;
    input {
        margin-right: 20px;
    }
    div{
        color: white;
        background-color: #000000a0;
        border-style: solid;
        padding: 5px;
    }
    @media screen and (max-width: 1000px){
        display: grid;
        justify-content: center;
    }

`


export default function SearchBar (props){
    const dispatch = useDispatch();
    const genres = useSelector(state=>state.genres)
    const search = useSelector(state=>state.search);
    const homeInputs = useSelector(state=>state.homeInputs)
    let ratingOrder = document.querySelector("#ratingOrder");
    let nameOrder = document.querySelector("#nameOrder");
    let createdFilter = document.querySelector("#createdFilter");
    let genreFilter = document.querySelector("#genreFilter");
    useEffect(()=>{
        dispatch(getGenres());
        return ()=>{
            dispatch(updateSearch(""))
        }
    },[])

    useEffect(()=>{
        dispatch(searchGame(search))
    },[search])

    const handleSearch = (e) => {
        dispatch(updateSearch(e.target.value))
        ratingOrder.selectedIndex=0
        nameOrder.selectedIndex=0
        createdFilter.selectedIndex=0
        genreFilter.selectedIndex=0
    }

    const handleFilterAndOrder = (e) => {
        e.preventDefault();
        ratingOrder.addEventListener("change",()=>{
            nameOrder.selectedIndex = 0
        })
        nameOrder.addEventListener("change",()=>{
            ratingOrder.selectedIndex = 0
        })
        dispatch(setHomeInputs({
            ...homeInputs,
            [e.target.name]: e.target.value
        }))
    }


    return(
        <Div>
            <div>
                <label>Search: </label>
                <input id="Search" value={search} onChange={handleSearch} type="search"/> 
            </div>
            <div>
                <label>Genres filter: </label>
                <select id="genreFilter" name="genreFilter" onChange={handleFilterAndOrder}>
                    <option value="All">All</option>
                    {genres.map(gen=>(
                        <option value={gen.name} key={gen.id} id={gen.id}>{gen.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Created videogames filter: </label>
                <select id="createdFilter" name="createdFilter" onChange={handleFilterAndOrder}>
                    <option value="All">All</option>
                    <option value="Created">Created games</option>
                    <option value="Api games">Api games</option>
                </select>
            </div>
            <div>
                <label>Order by name: </label>
                <select id="nameOrder" name="nameOrder" onChange={handleFilterAndOrder}>
                    <option value="none">none</option>
                    <option value="Ascendant">Ascendant</option>
                    <option value="Descendant">Descendant</option> 
                </select>
            </div>
            <div>
                <label>Order by rating: </label>
                <select id="ratingOrder" name="ratingOrder" onChange={handleFilterAndOrder}>
                    <option value="none">none</option>
                    <option value="Ascendant">Ascendant</option>
                    <option value="Descendant">Descendant</option> 
                </select>
            </div>
        </Div>
    )
}





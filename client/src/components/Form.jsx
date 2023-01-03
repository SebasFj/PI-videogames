import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame, getGenres, getPlatforms, setActivePlatform, setInitialInputs } from "../reduce/actions";
import Navbar from "./Navbar";
import styled from "styled-components";

const Container = styled.div`
    background-image: url("https://i.pinimg.com/474x/50/72/58/50725805536e1f3d8d20570ed22669ce.jpg");
    height: 100%;
    display: flex;
    justify-content: center;
`

const activeButton = {
    backgroundColor: "red",
}

const inactiveButton = {
    backgroundColor:"black",
    color:"white"
}

const errorStyle = {
    color:"red",
    margin:"0px",
    padding:"0px"
}

const Formm = styled.form`
    background-color: #ffffffa5;
    margin-top: 50px;
    align-self: center;
    label {
        font-size: 20px;
    }
    button {
        margin: 5px;
        height: 30px;
        color: white;
        background-color: black;
        :hover{
            background-color: #8080807f;
        }
        :active{
            background-color: #575555;
        }
    }
    h3{
        font-size: 25px;
        margin: 10px;
        text-decoration: underline;
    }
`



export default function Form () {
    const dispatch = useDispatch();
    const activePlatform = useSelector(state=>state.activePlatform)
    const genres = useSelector(state=>state.genres)
    const platforms = useSelector(state=>state.platforms)
    const input = useSelector(state=>state.inputs)
    
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        image:""
    })
    
    const disabled = !input.name||!input.released||!input.description||!input.rating||errors.image||!input.genres.length||!input.platforms.length;

    useEffect(()=>{
        dispatch(getGenres());
        dispatch(getPlatforms());
        return ()=>{dispatch(setActivePlatform(null))}
    },[])
        
    const validate = (inputs) => {
        const errors = {};
        if (!inputs.name) errors.name = "A name is required";
        if (!inputs.description) errors.description = "A description is required";
        if (inputs.image.length>255) errors.image = "Max characters => 255"
        return errors;
    }

    const handleChange = (e) => {
        setErrors(validate({...input, [e.target.name]:e.target.value}))
        dispatch(setInitialInputs({
            ...input,
            [e.target.name]:e.target.value
        }))
    }

    const getChildPlatforms = (e) => {
        e.preventDefault()
        let platform = platforms.filter(platform=>platform.id===parseInt(e.target.id))
        dispatch(setActivePlatform(platform[0]))
    }

    const handleClick = (e) => {
        e.preventDefault();
        const id = parseInt(e.target.id)
        if (input[e.target.name].includes(id)){
            let filterArray = input[e.target.name].filter(elements=>elements!==id)
            dispatch(setInitialInputs({
                ...input,
                [e.target.name]:filterArray
            }))
        }else{
            dispatch(setInitialInputs({
                ...input,
                [e.target.name]: [...input[e.target.name],id]
            }))
        }
    }
    const handleSubmit = (e) => {
        dispatch(createGame(input))
        dispatch(setInitialInputs({
            name: "",
            image: "",
            genres: [],
            description: "",
            released: "",
            rating: 0,
            platforms: []
        }))
    }

    return (
        <Container>
            <Navbar/>
            <Formm style={{paddingTop:"50px"}} onSubmit={handleSubmit}>
                <label>Name:</label><br />
                <input type="text" name="name" value={input.name} onChange={handleChange}></input>
                {errors.name ?<div style={errorStyle}>{errors.name}</div> : null}
                <br/>
                <label>Released date: </label><br />
                <input type="date" min="1990-01-01" max="2022-12-28" name="released" value={input.released} onChange={handleChange}></input>
                <br/>
                <label>Rating: </label><br />
                <input type="number" min="1" max="5" step="0.01" name="rating" value={input.rating} onChange={handleChange}></input>
                <br/>
                <label>Image link (optional):</label><br />
                <input type="url" name="image" value={input.image} onChange={handleChange}></input>
                {errors.image ? <div style={errorStyle}>{errors.image}</div> : null}
                <br/>
                <label>Description:</label><br />
                <textarea name="description" value={input.description} onChange={handleChange}></textarea>
                {errors.description ?<div style={errorStyle}>{errors.description}</div> : null}
                <br/>
                <div>
                    <h3>Select the genres</h3>
                    {genres.map(genre=>(
                    <button style={input.genres.includes(genre.id) ? activeButton : inactiveButton} key={genre.id} id={genre.id} name="genres" onClick={handleClick}>{genre.name}</button>
                    ))}
                </div>
                <div>
                    <h3>Select parent platform</h3>
                    {platforms.map(platform=>(
                    <button key={platform.id} id={platform.id} onClick={getChildPlatforms}>{platform.name}</button>
                    ))}
                    {activePlatform && 
                        <div>
                            <h3>Select platform</h3>
                            {activePlatform.platforms.map(platform=>(
                                <button style={input.platforms.includes(platform.id) ? activeButton : inactiveButton} key={platform.id} id={platform.id} name="platforms" onClick={handleClick}>{platform.name}</button>
                            ))}
                        </div>
                    }
                </div>
                <br />
                <button className="boton" style={{
                    visibility: disabled ? "hidden" : null, 
                    fontSize: "25px" , margin:"10px",
                    marginBottom: "50px"
            }} disabled={disabled} type="submit">Create Videogame</button>
            </Formm>
        </Container>
    )

}

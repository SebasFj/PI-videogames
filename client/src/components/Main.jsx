import React from "react";
import styled from "styled-components"

const Container = styled.div`
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 710px;
`




export default function Main (props) {
    return (
        <Container>
            <a href="/home"><img style={{width:"90%", height:"auto"}}src="https://c.wallhere.com/photos/97/cc/video_games_digital_art_Space_Invaders_retro_games_black_background_minimalism_simple_background-258060.jpg!d" alt="" /></a>
        </Container>
    )
}
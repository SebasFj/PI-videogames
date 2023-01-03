import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPAge } from "../reduce/actions";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
    div {
        margin: 0 0 5px, 5px
    }
    button{
        font-size: 17px;
        margin: 0px 0px 5px 5px;
        background-color: transparent;
        border: none;
        :hover{
            font-size: 25px;
            color: white
        }
    }
    .number {
        text-decoration: underline;
    }
`

export default function Pages (props) {
    const dispatch = useDispatch();
    const length = props.length;
    const itemPerPage = props.itemPerPage;
    const numberPages = Math.ceil(length/itemPerPage)
    let arrayPages = [];
    const currentPage = useSelector(state=>state.currentPage)
    for (let i = 1; i<=numberPages; i++){
        arrayPages.push(i)
    }
    const handlePages = (e) => {
        dispatch(setCurrentPAge(parseInt(e.target.id)))
    }
    const handlePrevNext = (e) => {
        if (e.target.name ==="Prev"){
            if (currentPage>1){
                dispatch(setCurrentPAge(currentPage-1))
            }
        }else{
            if (currentPage<numberPages){
                dispatch(setCurrentPAge(currentPage+1))
            }
        }
    }

    return (
        <Container>
            <div><button name="Prev" onClick={handlePrevNext}>←</button></div>
            <div>
                {arrayPages.map(page=><button className="number" onClick={handlePages} key={page} id={page}>{page}</button>)}
            </div>
            <div><button name="Next" onClick={handlePrevNext}>→</button></div>
        </Container>
    )
}
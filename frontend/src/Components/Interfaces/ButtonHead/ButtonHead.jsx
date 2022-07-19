import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ButtonHead.css'

function ButtonHead(props) {
    const navigate = useNavigate()
    const HandleClick = () => {
        navigate(props.route)
    }
    return (
        <button className='Button-head' onClick={HandleClick}> { props.action } </button>
    )
}

export default ButtonHead
import React from 'react'
import '../styles/Cell.css'

const Cell = (props) => {
    const {isEgg, highlight} = props
    let className = highlight ? "highlighted-cell" : ""
    className += isEgg ? " egg" : ''
    return <div className={className} ></div>
}

export default Cell;

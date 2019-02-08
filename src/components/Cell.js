import React from 'react'
import '../styles/Cell.css'

const Cell = (props) => {
    const {i, j, highlight} = props
    const className = highlight ? "highlighted-cell" : ""
    return <div className={className}></div>
}

export default Cell;

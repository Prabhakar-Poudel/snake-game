import React, { Component } from 'react'
import '../styles/Home.css'

class Home extends Component {
    render() {
        return (
            <div className="home-screen">
                <button autoFocus onClick={this.props.handleStart}>Start</button>
                <p>or</p>
                <p>Just press Enter</p>
            </div>
        )
    }
}

export default Home

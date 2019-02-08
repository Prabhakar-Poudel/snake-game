import React, { Component } from 'react'

class Home extends Component {
    render() {
        return (
            <div className="home-screen">
                <button onClick={this.props.handleStart}>Start</button>
            </div>
        )
    }
}

export default Home

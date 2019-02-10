import React, { Component } from 'react'
import '../styles/Home.css'

class Home extends Component {

    handleSignIn = () => {
        window.ui.start('#firebaseui-auth-container', window.uiConfig);
    }

    render() {
        return (
            <div className="home-screen">
                <button autoFocus onClick={this.props.handleStart}>Play</button>
                <p></p>
                <div className="sign-in" onClick={this.handleSignIn}>Sign In</div>
            </div>
        )
    }
}

export default Home

import React, {Component} from 'react';
import Mesh from'./Mesh'
import Home from './Home'
import '../styles/Game.css'

const BOARD_SIZE = 20
const BASE_SCORE = 5

class Game extends Component {
    // TODO: Randomly generate snake coordinates
    // Generate starting coordinate and direction based on it
    constructor(props) {
      super(props)
      this.direction = {
        up: {x: -1, y: 0},
        down: {x: 1, y: 0},
        left: {x: 0, y: -1},
        right: {x: 0, y: 1}
      }
      this.state = {
        snake: null,
        egg: null,
        begin: false,
        currentScore: 0,
        gameOver: false
      }
    }

    isSamePosition = (a, b) => a.x === b.x && a.y ===b.y

    isCollision = (point, snake) => snake.some(position => this.isSamePosition(position, point))

    getSnake() {
      const initial = this.getRandomPoint(2, BOARD_SIZE-3)
      const direction = this.getPsudoRandomDirection(initial.x, initial.y)
      const snake = [initial]
      snake.unshift({x: initial.x + direction.x, y: initial.y + direction.y})
      snake.unshift({x: initial.x + 2*direction.x, y: initial.y + 2*direction.y})
      this.currentDirection = direction
      return snake
    }

    moveSnake() {
      const snake = this.state.snake;
      const {x, y} = snake[0]
      const head = {x: (x+this.currentDirection.x), y: (y+this.currentDirection.y)}
      if (head.x < 0 || head.x > BOARD_SIZE - 1 || head.y < 0 || head.y > BOARD_SIZE - 1) {
        clearInterval(this.timerID)
        return this.endGame()
      }
      if (this.isCollision(head, snake)) {
        clearInterval(this.timerID)
        return this.endGame()
      }
      snake.unshift(head)
      if (this.isSamePosition(this.state.egg, head)) {
        const newEgg = this.getNewEgg(snake)
        const score = this.state.currentScore + snake.length + BASE_SCORE
        this.setState({snake: snake, egg: newEgg, currentScore: score})
      } else {
        snake.pop()
        this.setState({snake: snake})
      }
    }

    startInterval = () => this.timerID = setInterval(() => this.moveSnake(), 200)
    
    endInterval = () => clearInterval(this.timerID)

    resetInterval() {
      this.endInterval()
      this.startInterval()
    }

    moveAndReset() {
      this.moveSnake()
      this.resetInterval()
    }

    beginGame = () => {
      const snake = this.getSnake()
      const egg = this.getNewEgg(snake)
      this.setState({begin: true, snake: snake, egg: egg, currentScore: 0})
      this.startInterval()
    }

    endGame = () => {
      this.endInterval()
      this.setState({gameOver: true})
      setTimeout(() => {
        this.setState({begin: false, gameOver: false})
      }, 3000)
    }
    
    componentWillUnmount = () => this.endInterval()

    getRandomPoint(min, max) {
      const x = Math.floor(Math.random() * max) + min
      const y = Math.floor(Math.random() * max) + min
      return {x: x, y: y}
    }

    getPsudoRandomDirection(x, y) {
      const half = BOARD_SIZE / 2
      if (x < half) {
        if (y < half) {
          return this.direction.right
        }
        return this.direction.down
      }
      if (x >= half) {
        if (y >= half) {
          return this.direction.left
        }
        return this.direction.up
      }
    }

    handleKeyPress = (key) => {
      if (this.state.gameOver || !this.state.begin) {
        return  // disable key events after the game is over
      }
      // eslint-disable-next-line default-case
      switch(key) {
        case 'ArrowLeft':
          if (this.currentDirection === this.direction.up || this.currentDirection === this.direction.down) {
            this.currentDirection = this.direction.left
            this.moveAndReset()
          }
          break
        case 'ArrowRight':
          if (this.currentDirection === this.direction.up || this.currentDirection === this.direction.down) {
            this.currentDirection = this.direction.right
            this.moveAndReset()
          }
          break
        case 'ArrowUp':
          if (this.currentDirection === this.direction.left || this.currentDirection === this.direction.right)
            this.currentDirection = this.direction.up
            this.moveAndReset()
          break
        case 'ArrowDown':
          if (this.currentDirection === this.direction.left || this.currentDirection === this.direction.right) {
            this.currentDirection = this.direction.down
            this.moveAndReset()
          }
      }
    }

    getNewEgg(snake) {
      while(true) {
        const point = this.getRandomPoint(0, BOARD_SIZE - 1)
        if (!this.isCollision(point, snake)) {
          return point
        }
      }
    }

    render() {
      let homePage = <Home handleStart={this.beginGame}/>
      let meshPage = (
        <div className="game">
          <Mesh 
            size={BOARD_SIZE} 
            snake={this.state.snake} 
            egg={this.state.egg}
            handleKeyPress={this.handleKeyPress}
            />
          <div className="score-board">
            Score: {this.state.currentScore}
          </div>
        </div>
      )
      const children = this.state.begin ? meshPage : homePage
      const overlayStyle = {display: this.state.gameOver ? 'block' : 'none'}
      return (
        <div className="game-area">
          <h1>Snake Mania!</h1>
          <div className="overlay"  style={overlayStyle}>
            Game Over
          </div>
          {children}
        </div>
      )
    }
}

export default Game

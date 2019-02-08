import React, {Component} from 'react'
import Cell from './Cell'
import '../styles/Mesh.css'

class Mesh extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cells: this.getCells()
        }

        this._meshRef = React.createRef();
    }

    getCells() {
        const size = this.props.size
        const cells = []
        for (let x=0; x < size; x++) {
            cells[x] = [];
            for (let y=0; y < size; y++) {
                cells[x][y] = <Cell key={x + '' + y} i={x} j={y}/>
            }
        }
        return cells
    }

    componentDidMount = () => this._meshRef.current.focus()

    handleKeyPress = event => this.props.handleKeyPress(event.key)

    
    render() {
        const cells = this.getCells()
        this.props.snake.forEach(cell => {
            const {x, y} = cell;
            cells[x][y] = <Cell key={x + '' + y}  i={x} j={y} highlight />
        });
        const egg = this.props.egg
        cells[egg.x][egg.y] = <Cell key={egg.x + '' + egg.y} i={egg.x} j={egg.y} highlight />
        return (
            <div
             className="mesh"
             onKeyDown={this.handleKeyPress} 
             tabIndex='0'
             ref={this._meshRef}
             >
                {cells}
            </div>
        )
      }    
}

export default Mesh

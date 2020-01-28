import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './images'
import images from './images'

var active = 0;
var recognize = [{"square" : null, "value" : null}, {"square" : null, "value" : null}]
var counter = 0;
var points = null;
var p = 0;

class Square extends React.Component {

    constructor(props) {
        super(props)

        do {
            var random = (Math.floor(Math.random()*50) + 1);
        } while (images[random].limes < 1)

        images[random].limes = images[random].limes - 1;

        this.state = {
            value: images[random].src,
            image: images[0].src,
            unknown: true,
        }

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick = () => {
        if(active < 2 && this.state.unknown) {
            this.setState({
                image: this.state.value,
            })

            recognize[counter%2] = {square : this, value : this.state.value};
            counter++;
            active++;

            setTimeout ( () => {
                if(this.state.unknown){
                    this.setState({
                        image: images[0].src
                    })
                    active = active - 1;
                }
            }, 2000);

            if (recognize[0].value === recognize[1].value){
                active = active - 2;
                p++;
                recognize[0].square.setState({
                    unknown: false,
                })
                recognize[1].square.setState({
                    unknown: false,
                })

                points.setState({
                    points: p,
                })
            }
        }
    }
    
    render (){
        return (
            <span className="square" id="square" >
                <img src={this.state.image} alt="flag" style={
                    {width: "100%", height: "100%"}}
                    onClick={
                        this.handleOnClick
                    }/>
            </span>
        );
    }
}

class Row extends React.Component {

    getSquare = (i) => {
        return <Square value={i} />
    }

    createRow = () => {
        let table = []

        for(var i = 0; i < 10; i++) {
            table.push(this.getSquare(i + this.props.value*10))
        }
        return table
    }

    render() {

        return  (
            <div className="board-row" class="row" >
                {this.createRow()}
            </div>
        );
    }
        
}

class GameSquares extends React.Component {

    getRow = (i) => {
        return <div className="board-row">
                    <Row value={i} />
                </div>
    }

    createGameSquare = () => {
        let table = []

        for(var i = 0; i < 10; i++) {
            table.push(this.getRow(i))

        }
        return table
    }

    render() {
        return (
            <div>
                {this.createGameSquare()}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            points: 0
        }
    }

    render() {
        points = this
        return (
            <div className="game">
                <GameSquares className="gameSquares" />
                <div className="gameOptions">
                    <span className="points">
                        <h1>Punkty: {this.state.points}</h1>
                    </span>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <Game />,
    document.getElementById('root'),
);
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
        } while (images[random].limes === 0)
        images[random].limes = images[random].limes - 1;
        this.state = {
            value: images[random].src,
            image: images[0].src,
            unknown: true,
        }
    }

    handleOnClick(square) {
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
                        () => this.handleOnClick(this)
                    }/>
            </span>
        );
    }
    
}

function getSquare(i) {
    return <Square value={i} />
}

class Row extends React.Component {

    render() {
        return  (
            <div className="board-row" class="row" >
                {getSquare(0 + this.props.value*10)}
                {getSquare(1 + this.props.value*10)}
                {getSquare(2 + this.props.value*10)}
                {getSquare(3 + this.props.value*10)}
                {getSquare(4 + this.props.value*10)}
                {getSquare(5 + this.props.value*10)}
                {getSquare(6 + this.props.value*10)}
                {getSquare(7 + this.props.value*10)}
                {getSquare(8 + this.props.value*10)}
                {getSquare(9 + this.props.value*10)}
            </div>
        );
    }
        
}

class GameSquares extends React.Component {

    render() {
        return (
            <div>
                <div className="board-row">
                    <Row value = {0}/>
                </div>
                <div className="board-row">
                    <Row value = {1}/>
                </div>
                <div className="board-row">
                    <Row value = {2}/>
                </div>
                <div className="board-row">
                    <Row value = {3}/>
                </div>
                <div className="board-row">
                    <Row value = {4}/>
                </div>
                <div className="board-row">
                    <Row value = {5}/>
                </div>
                <div className="board-row">
                    <Row value = {6}/>
                </div>
                <div className="board-row">
                    <Row value = {7}/>
                </div>
                <div className="board-row">
                    <Row value = {8}/>
                </div>
                <div className="board-row">
                    <Row value = {9}/>
                </div>
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
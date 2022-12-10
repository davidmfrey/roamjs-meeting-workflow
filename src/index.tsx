import toConfigPageName from "roamjs-components/util/toConfigPageName";
import runExtension from "roamjs-components/util/runExtension";
import { createConfigObserver } from "roamjs-components/components/ConfigPage";
import createButtonObserver from "roamjs-components/dom/createButtonObserver";
import * as React from 'react';
import ReactDOM from 'react-dom';




function Square(props: any) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}


class Board extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      squares: Array(9).fill('  '),
      nextMove: 'X',
      gameWinner: null,
    };
  }

  reset() {
    this.setState({
      squares: Array(9).fill('  '),
      nextMove: 'X',
      gameWinner: null,      
    });
  }
  
  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i: number) {
    if(this.state.gameWinner === null && 
       this.state.squares[i] === '  ') {
      const squares = this.state.squares.slice();
      squares[i] = this.state.nextMove;
      let gameWinner = null; 
      if(this.checkForWin(this.state.nextMove, squares)) {
          gameWinner = this.state.nextMove;
      }
      let nextMove = 'O';
      if(this.state.nextMove === 'O') {
        nextMove = 'X';
      }
      this.setState({
        squares: squares,
        nextMove: nextMove,
        gameWinner: gameWinner,
      });
    }
  }

  checkForWin(mark: any, squares: any) {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    for(const win of lines) {
      let won = true;
      for(const cell of win) {
        if(squares[cell] !== mark) {
          won = false;
          break
        }
      }
      if(won) {
        return true;
      }
    }
    return false;
  }

  
  render() {
    let status = "Next player: " + this.state.nextMove;
    if(this.state.gameWinner !== null) {
      status = this.state.gameWinner + " wins!!";
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button onClick={() => this.reset()}>
          Reset
        </button>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

function renderTicTacToe(b: any) {
    console.log("Trying to render Tic Tac Toe!");
    ReactDOM.render(<Game />, b.parentElement);
}

 

const extensionId = "meeting-workflow";
const CONFIG = toConfigPageName(extensionId);
export default runExtension({
    extensionId, 
    run: () => {
        createButtonObserver({
	    shortcut: "ttt",
	    attribute: "TTT",
	    render: renderTicTacToe
	});
	console.log("Registered a Button Observer for tic-tac-toe!!");
    }
});
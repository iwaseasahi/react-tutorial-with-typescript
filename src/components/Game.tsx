import React, { ReactElement } from 'react';

import Board from './Board';
import CalculateWinner from '../helpers/CalculateWinner';

type Props = {};

type State = {
  history: Array<Current>,
  stepNumber: number,
  xIsNext: boolean
};

interface Current {
  squares: Array<string | null>
}

class Game extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i: number) {
    const history: Array<Current> = this.state.history.slice(0, this.state.stepNumber + 1);
    const current: Current = history[history.length - 1];
    const squares: Array<string | null> = current.squares.slice();
    if (CalculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history: Array<Current> = this.state.history;
    const current: Current = history[this.state.stepNumber];
    const winner: null | string = CalculateWinner(current.squares);

    const moves: Array<ReactElement<"li">> = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status: string;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;

import React, { useReducer, useState, Fragment } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import StartChoose from './StartChoose';
const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cell: {
    width: '50px',
    height: '50px',
    border: '2px solid black',
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
    cursor: 'pointer'
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    width: '156px'
  }
};

const initS = {
  piece: '',
  board: Array(9).fill(''),
  phase: '',
  next: 'X',
  msg: ''
};
const wins = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
  [2, 5, 8],
  [1, 4, 7]
];



const Board = (props) => {
  const classes = useStyles(styles);
  let parsedBoard = [];
  let parsedRow = [];
  const [rows, setRows] = useState([]);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      parsedRow.push(<div
        id={3 * i + j}
        className={classes.cell}
        onClick={(event) => props.handleClick(event.target.id)}
        key={3*i + j}
      >{props.game.board[3 * i + j]}</div>);
    }
    parsedBoard.push(parsedRow);
    parsedRow = [];
  }

  // setRows(parsedBoard);
  return parsedBoard;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'START': {
      let can = '';
      let next = 'O';
      if (action.val === 'O') {
        can = 'X';
        next = 'X';
      }
      return {
        piece: action.val, board: ['', '', can, '', '', '', '', '', ''],
        phase: 'PLAY',
        next
      };
    }
    case 'LOSS': {
      return {...initS, msg:'You Lost!'}
    }
    case 'MOVE': {

      return { ...state, board: action.cpy, next: action.next };
    }
    case 'WIN': {
      return {...initS, msg:'You Won!'};
    }
    case 'TIE': {
      return {...initS, msg:'It\'s a Tie!'}
    }
    default:
      throw new Error('invalid type');
  }
};

const checkWin = (arr, piece) => {
  if (!arr.some((val) => val === ''))
    return null;
  return wins.some((win) => {
    return win.every((node) =>
      arr[node] === piece);
  });
};

const useStyles = makeStyles(styles);

export default function TTT() {
  const [game, dispatch] = useReducer(reducer, initS);

  const handleClick = (id) => {
    if (!game.board[id]) {
      let cpy = [...game.board];
      cpy[id] = game.piece;

      if (checkWin(cpy, game.piece)) {
        return dispatch({ type: 'WIN', });
      }
      const next = game.next;
      const ai = makeAIMove(id);
      cpy[ai] = game.piece === 'X' ? 'O' : 'X';
      if (checkWin(cpy, game.piece === 'X' ? 'O' : 'X'))
        return dispatch({ type: 'LOSS', });
      if (checkWin(cpy, game.piece === 'X' ? 'O' : 'X') === null || checkWin(cpy, game.piece) === null)
        return dispatch({type:'TIE'})
      // const next = game.next === 'X' ? 'O' : 'X';
      dispatch({ type: 'MOVE', next, cpy });

    } else return;
  };
  const handleStart = (val) => {
    dispatch({ type: 'START', val });
  };

  const makeAIMove = (id) => {
    const num = Math.floor(Math.random() * 9);
    if (game.board[num] || num == id)
      return makeAIMove(id);
    else return num;
  };

  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>TicTacToe</h4>
        <p className={classes.cardCategoryWhite}>
          Play against the computer
        </p>
      </CardHeader>
      <CardBody>
        {
          !game.piece ?
            <StartChoose
              handleStart={handleStart}
              msg={game.msg}
            />
            :
            <>
              <h2>Next up is {game.piece}</h2>
              <div className={classes.board}>
                <Board game={game}
                  handleClick={handleClick}
                />
              </div>
            </>
        }

      </CardBody>
    </Card>
  );
}

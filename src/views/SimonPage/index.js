import React, { useState, useEffect, useCallback } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Quote from "components/Typography/Quote.js";
import Muted from "components/Typography/Muted.js";
import Primary from "components/Typography/Primary.js";
import Info from "components/Typography/Info.js";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from '@material-ui/core/Button';

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
  }
};

const useStyles = makeStyles(styles);
const initGame = {
  step: 0,
  turn: false,
  wrong: false,
  msg: ''
};
const sleep = () => {
  return new Promise((res, rej) => setTimeout(res, 1000));
};

const mp3 = [
  'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
  'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
  'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
  'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
];
export default function SimonPage() {
  const classes = useStyles();
  const [seq, setSeq] = useState([]);
  const [game, setGame] = useState(initGame);
  const [current, setCurrent] = useState(-1);
  const [turn, setTurn] = useState(0);
  const [st, setSt] = useState(true);
  const generateMove = () => {
    const a = Math.floor(Math.random() * 4);
    setSeq(prev => [...prev, a]);
  };

  const gameStart = () => {
    setGame(initGame);
    setSeq([]);
    generateMove();
    setTurn(0);
  };

  const playSequence = async () => {
    for (const s of seq) {
      const aud = new Audio(mp3[s]);
      setCurrent(s);
      aud.play();
      await sleep();
    }

    setGame({ ...game, turn: true, wrong: false });
    setCurrent(-1);
  };
  const playOne = async (i) => {
    const aud = new Audio(mp3[i]);
    await aud.play();

  };

  const keyUp = e => {
    console.log('keyup');
    setCurrent(-1);
  };

  useEffect(() => {
    if (turn >= seq.length && seq.length > 0) {
      setTimeout(() => {
        setTurn(0);
        generateMove();
      }, 1500);
    }
    else if (game.wrong) {
      setGame({ ...game, wrong: false, msg: 'You got it wrong!' });
    }
  }, [turn]);
  useEffect(() => {
    playSequence();
  }, [seq]);

  const A = (e) => {
    console.log(e.key);
    if (game.turn) {
      if (e.key == 'w' && seq[turn] === 0) {
        setTurn(prev => prev + 1);
        setCurrent(0);
        const aud = new Audio(mp3[0]);
        aud.play();
      }
      else if (e.key == 'a' && seq[turn] === 1) {
        setTurn(prev => prev + 1);
        setCurrent(1);
        const aud = new Audio(mp3[1]);
        aud.play();

      }
      else if (e.key == 's' && seq[turn] === 2) {
        setTurn(prev => prev + 1);
        setCurrent(2);
        const aud = new Audio(mp3[2]);
        aud.play();

      } else if (e.key == 'd' && seq[turn] === 3) {
        setTurn(prev => prev + 1);
        setCurrent(3);
        const aud = new Audio(mp3[3]);
        aud.play();

      } else {
        setGame({ ...game, wrong: true });
        setTurn(0);
      }
    }
  };
  const mouseUp = (e) => {
    setCurrent(-1);
  };
  useEffect(() => {
    window.addEventListener('keydown', A);
    window.addEventListener('keyup', keyUp);
    window.addEventListener('mouseup', mouseUp);
    return () => {
      window.removeEventListener('keydown', A);
      window.removeEventListener('keyup', keyUp);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [A]);
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Simon Says</h4>
        <p className={classes.cardCategoryWhite}></p>
      </CardHeader>
      <CardBody style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <Button
            color={current === 0 ? 'primary' : 'default'}
            variant={current === 0 ? 'contained' : 'outlined'}
            onMouseDown={() => {
              const can = { key: 'w' };
              setCurrent(0);

              A(can);
            }}>
            W
          </Button>
          <div>
            <Button
              color={current === 1 ? 'primary' : 'default'}
              variant={current === 1 ? 'contained' : 'outlined'}

              onMouseDown={() => {
                const can = { key: 'a' };
                setCurrent(1);
                A(can);
              }}
            >
              A
            </Button>
            <Button
              color={current === 2 ? 'primary' : 'default'}
              variant={current === 2 ? 'contained' : 'outlined'}

              onMouseDown={() => {
                const can = { key: 's' };
                setCurrent(2);

                A(can);
              }}
            >
              S
          </Button>
            <Button
              color={current === 3 ? 'primary' : 'default'}
              variant={current === 3 ? 'contained' : 'outlined'}

              onMouseDown={() => {
                const can = { key: 'd' };
                setCurrent(3);

                A(can);
              }}
            >
              D
            </Button>

          </div>
          <div>
            {seq.length < 1 &&
              <Button onClick={gameStart}>Start</Button>
            }
            <Button onClick={gameStart}>Reset</Button>
          </div>
          {
            game.msg &&
            <div>
              {game.msg}
            </div>
          }
        </div>
        <div>
          <table>
            <tr style={{ fontSize: '18px' }}>
              <td ><strong>Score: </strong></td>
              <td>{Math.max(seq.length - 1, 0)}</td>
            </tr>

          </table>
        </div>
      </CardBody>
    </Card>
  );
}

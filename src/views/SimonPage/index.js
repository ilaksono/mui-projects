import React, { useState, useEffect } from "react";
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
  const generateMove = () => {
    const a = Math.floor(Math.random() * 4);
    setSeq([...seq, a]);
  };

  const gameStart = () => {
    setGame(initGame);
    setSeq([]);
  };

  const playSequence = () => {
    seq.forEach( (s) => {
      const aud = new Audio(mp3[s]);
      setCurrent(s);
      aud.play();
    });
    setGame({ ...game, turn: true, wrong: false });
  };
  const playOne = async (i) => {
    const aud = new Audio(mp3[i]);
    await aud.play();

  }
  useEffect(() => {
    if (game.turn > seq.length) {
      setGame({ ...game, turn: 0 });
      generateMove();
    }
    if (game.wrong) {
      setGame({...game, msg:'You got it wrong!'});
    }
  }, []);
  useEffect(() => {
    playSequence();
  }, [seq]);

  const A = (e) => {
    if (game.turn) {
      if (e.key === 'w' && seq[game.turn] === 0)
        setGame({ ...game, turn: game.turn + 1 });
      else if (e.key === 'a' && seq[game.turn] === 1)
        setGame({ ...game, turn: game.turn + 1 });
      else if (e.key === 's' && seq[game.turn] === 2)
        setGame({ ...game, turn: game.turn + 1 });
      else if (e.key === 'd' && seq[game.turn] === 3)
        setGame({ ...game, turn: game.turn + 1 });
      else setGame({ ...game, wrong: true });
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', e => A(e));

    return () => 
    window.removeEventListener('keydown', A);

  }, []);
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Simon Says</h4>
        <p className={classes.cardCategoryWhite}></p>
      </CardHeader>
      <CardBody>
        <div>
          <Button 
          color={current === 0 ? 'primary': 'default'}
          variant={current === 0 ? 'contained' : 'outlined'}
          onClick={() => {
            const can = {key: 'w'}
            A(can)
            }}>
            <i class="fas fa-arrow-up"></i>
          </Button>
          <div>
            <Button
              color={current === 1 ? 'primary' : 'default'}
              variant={current === 1 ? 'contained' : 'outlined'}

              onClick={() => {
                const can = { key: 'a' };
                A(can);
              }}
            >
              <i class="fas fa-arrow-left"></i>
            </Button>
            <Button
              color={current === 3 ? 'primary' : 'default'}
              variant={current === 3 ? 'contained' : 'outlined'}

              onClick={() => {
                const can = { key: 'd' };
                A(can);
              }}
            >
              <i class="fas fa-arrow-right"></i>
            </Button>
          </div>
          <Button
            color={current === 2 ? 'primary' : 'default'}
            variant={current === 2 ? 'contained' : 'outlined'}

            onClick={() => {
              const can = { key: 's' };
              A(can);
            }}
          >
            <i class="fas fa-arrow-down"></i>
          </Button>
        </div>
        <Button onClick={gameStart}>Start</Button>
        <Button onClick={gameStart}>Reset</Button>
        {
          game.msg && <div>
            {game.msg}
          </div>
        }
      </CardBody>
    </Card>
  );
}

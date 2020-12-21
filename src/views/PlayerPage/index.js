import { Button } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";

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
import AppContext from 'AppContext';
import Volume from 'components/Volume';

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

const PlayerPage = () => {
  const [repeat, setRepeat] = useState(false);
  const { togglePlay, play } = useContext(AppContext);
  const [audio, setAudio] = useState(new Audio('/inferno.mp3'));
  // const audio = new Audio('/inferno.mp3');
  audio.onended = function () {
    if (repeat)
      audio.play();
  };
  const classes = useStyles();


  const handlePlay = () => {
    audio.play();
    togglePlay();
  };
  const handlePause = () => {
    audio.pause();
    togglePlay();
  };
  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>An Audio Player</h4>
          <p className={classes.cardCategoryWhite}>Wear headphones</p>
        </CardHeader>
        <CardBody>
          <Button color={play ? "primary": 'default'} onClick={handlePlay}><i class="fas fa-play"></i></Button>
          <Button color={!play ? "primary" : 'default'} onClick={handlePause}><i class="fas fa-pause"></i></Button>
          <Button color={repeat ? 'primary' : 'default'}
            onClick={() => setRepeat(prev => !prev)}>
            <i class="fas fa-redo-alt"></i>
          </Button>
        <Volume audio={audio} setAudio={setAudio}/>

        </CardBody>
      </Card>


    </div>
  );

};
export default PlayerPage;
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

const formatTime = (num) => {
  const m = Math.floor(num / 60);
  num -= m * 60;
  const s = Math.floor(num);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export default function ContinuousSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [timer, setTimer] = React.useState(0);

  const handleChange = (event, newValue) => {
    // props.audio.volume(newValue);
    // props.setAudio(prev => ({...prev, volume: newValue / 100}))
    props.audio.currentTime = newValue / 100 * props.audio.duration;
    setValue(newValue);
  };
  useEffect(() => {
    const A = setInterval(() => {
      setValue(Math.floor(props.audio.currentTime / props.audio.duration * 100));
    }, 2000);
    return () => clearTimeout(A);
  }, []);
  useEffect(() => {
    const B = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearTimeout(B);
  }, [])

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        Duration
      </Typography>
      <Grid container spacing={2}>

        <Grid item xs>
          <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          {formatTime(props.audio.currentTime)}
        </Grid>
      </Grid>
    </div>
  );
}
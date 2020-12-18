import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from 'axios';
import Button from '@material-ui/core/Button';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

const users = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];
export default function TableList() {
  const classes = useStyles();
  const [streams, setStreams] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getTwitch2();
  }, [filter]);

  let parsedStreams = [];
  const getTwitch2 = async () => {
    const prom = users.map((user) => {
      return axios
        .get(`https://twitch-proxy.freecodecamp.rocks/helix/streams?user_login=${user.toLowerCase()}`);
    });
    const all = await Promise.all(prom);
    let cpy = [];
    parsedStreams = all.map((streamer, index) => {
      if (!filter) {
        if (!streamer.data.data) return cpy.push([users[index], '', '', 'Offline']);
        else if (!streamer.data.data.length) return cpy.push([users[index], '', '', 'Offline']);
        else return cpy.push([streamer.data.data[0].user_name, streamer.data.data[0].game_name,
        streamer.data.data[0].title,
        streamer.data.data[0].started_at]);
      }
      if (filter === 'offline') {
        if (!streamer.data.data) return cpy.push([users[index], '', '', 'Offline']);
        else if (!streamer.data.data.length) return cpy.push([users[index], '', '', 'Offline']);

        else return;
      }
      if (!streamer.data.data) {
        return null;
      }
      if (!streamer.data.data.length) return null;
      const stream = streamer.data.data[0];
      if (!stream.type) return null;
      if (stream.type !== 'live') return cpy
        .push([stream.user_name, '', '', 'Offline']);

      cpy.push([
        stream.user_name,
        stream.game_name,
        stream.title,
        stream.started_at
      ]);
      return (
        <div style={{
          border: '2px solid black',
          borderRadius: '4px',
          backgroundColor: stream.type === 'live'
            ? 'green' : 'blue'
        }}
          key={stream.type}>
          <tr>
            <td>
              {stream.user_name}
            </td>
            <td>
              {stream.type === 'live' ? stream.title : 'Offline'}
            </td>
          </tr>
        </div>
      );
    });
    setStreams(cpy);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Twitch Streams</h4>
            <p className={classes.cardCategoryWhite}>
              Click to open in new tab
            </p>
          </CardHeader>
          <CardBody style={{ display: 'flex', flexDirection: 'row' }}>
            <Button onClick={() => setFilter('')}>All</Button>
            <Button onClick={() => setFilter('live')}>Live</Button>
            <Button onClick={() => setFilter('offline')}>Offline</Button>

          </CardBody>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Game", "Title", "Started At"]}
              tableData={streams}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

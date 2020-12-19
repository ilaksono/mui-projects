import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "./WikiTable.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Search from "@material-ui/icons/Search";
import CustomInput from 'components/CustomInput/CustomInput';
import 'styles/Wiki.scss';

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
    },
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
    },

  }
};
const useStyles = makeStyles(styles);

export default function Wiki(props) {

  const [sea, setSea] = useState('');
  const [res, setRes] = useState([]);
  const handleSearch = async () => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${sea.toLowerCase()}`;
    const data = await axios.get(url);
    const result = data.data.query.search;
    const cpy = result.map((json) => {
      return [json.title, json.pageid, json.wordcount, json.snippet];
    });
    setRes(cpy);
  };

  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
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
          <CardBody style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button onClick={() => window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank', '')}>
              Random
            </Button>
            <div className='wiki-search-con'>

              <CustomInput
                formControlProps={{
                  className: classes.margin + " " + classes.search
                }}
                inputProps={{
                  placeholder: "Search",
                  inputProps: {
                    "aria-label": "Search"
                  },
                  value: sea,
                  onChange: (event) => setSea(event.target.value)
                }}
              />
              <Button onClick={handleSearch}>
                Search
            </Button>
            </div>
          </CardBody>
          <CardBody>
            {
              sea.length > 0 &&
              <Table
                tableHeaderColor="primary"
                tableHead={["Title", "id", "Word Count", "Snippet"]}
                tableData={res}
              />
            }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

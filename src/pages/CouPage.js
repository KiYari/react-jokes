import React from 'react';
import Country from '../components/CitySearch'
import Header from '../components/Header'
import {makeStyles, Container} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  bg: {
    height: "100vh",
    flexGrow: 1
  },
}));

export default function Main(props) {

  const classes = useStyles();

  return (<div className={classes.bg}>
    <Header/>
      <Country/>
  </div>);

}

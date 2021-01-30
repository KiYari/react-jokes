import React from 'react';
import Home from '../components/Home'
import Header from '../components/Header'
import { Container, Button } from "@material-ui/core"
import {withStyles} from '@material-ui/core/styles';
import { render } from "react-dom";
import request from "superagent";
import debounce from "lodash.debounce";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid black',
    marginTop: "5%",
  },
});


class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      count: [0, 1, 2]
    }
  }


  render(){
    const {classes} = this.props;
    return (<div className={classes.bg}>
      <Header/>
      {
        this.state.count.map((id) => (
          <Home key={id}/>
        ))
      }
    </div>);
  }
}

export default withStyles(useStyles)(Main)

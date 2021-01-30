import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, IconButton, Button} from '@material-ui/core';
import {ThumbUp, ThumbDown} from '@material-ui/icons'

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

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      quote: '',
      likes: {},
      liked: false,
      disliked: false,
    }

    this.getter()
  }

  getter = () => {
    fetch("https://joke3.p.rapidapi.com/v1/joke", {
    	"method": "GET",
    	"headers": {
    		"x-rapidapi-key": "1249a8ff14mshb731054b2c5bbafp1cfe67jsnd6c01eade771",
    		"x-rapidapi-host": "joke3.p.rapidapi.com"
    	}
      })
      .then(response => response.json())
      .then(response => {

      	this.setState({
          quote: response.content,
          likes: {
            upvotes: response.upvotes,
            downvotes: response.downvotes
          },
          id: response.id,
          liked: false,
          disliked: false,
        })
      })
      .catch(err => {
      	console.error(err);
      });
  }

  voter = () => {
    fetch('https://joke3.p.rapidapi.com/v1/joke/'+ this.state.id +'/upvote', {
    	"method": "POST",
    	"headers": {
    		"x-rapidapi-key": "1249a8ff14mshb731054b2c5bbafp1cfe67jsnd6c01eade771",
    		"x-rapidapi-host": "joke3.p.rapidapi.com"
    	}
    })
    .then(response => response.json())
    .then(response => {

      this.setState({likes: {upvotes: this.state.likes.upvotes + 1, downvotes: this.state.likes.downvotes}, liked: true})
    })
    .catch(err => {
    	console.error(err);
    });
  }

  res = () => {
    alert("You have already voted for this joke!")
  }

  voter2 = () => {
    fetch('https://joke3.p.rapidapi.com/v1/joke/'+ this.state.id +'/downvote', {
    	"method": "POST",
    	"headers": {
    		"x-rapidapi-key": "1249a8ff14mshb731054b2c5bbafp1cfe67jsnd6c01eade771",
    		"x-rapidapi-host": "joke3.p.rapidapi.com"
    	}
    })
    .then(response => response.json())
    .then(response => {
      this.setState({likes: {upvotes: this.state.likes.upvotes, downvotes: this.state.likes.downvotes+1}, disliked: true})
    })
    .catch(err => {
    	console.error(err);
    });
  }

  render() {
    const {classes} = this.props;

    return (<div className={classes.root}>
      <h1>Classical and simple jokes</h1>
      <div>{this.state.quote}</div>
      <div style={{display: 'flex', flexDirection:'row'}}>
        {
          this.state.liked == false && (
            <div>
            <IconButton onClick={() => this.voter()}><ThumbUp/></IconButton> {this.state.likes.upvotes}
            </div>
          )
        }
        {
          this.state.liked == true && (
            <div>
            <IconButton onClick={() => this.res()}><ThumbUp style={{color: 'blue'}}/></IconButton> {this.state.likes.upvotes}
            </div>
          )
        }
        {
          this.state.disliked == false && (
            <div>
            <IconButton onClick={() => this.voter2()}><ThumbDown/></IconButton>{this.state.likes.downvotes}
            </div>
          )
        }
        {
          this.state.disliked == true && (
            <div>
            <IconButton onClick={() => this.res()}><ThumbDown style={{color: 'blue'}}/></IconButton>{this.state.likes.downvotes}
            </div>
          )
        }
        </div>
      <div>
        <Button onClick={() => this.getter()} variant="contained" color="primary" style={{margin: 4}}>Request new joke</Button>
      </div>


    </div>);
  }
}

export default withStyles(useStyles)(Home)

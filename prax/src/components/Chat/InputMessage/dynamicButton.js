import React from 'react';
import axios from 'axios';
import "./inputmessage.scss";

import {
  Switch,
  Route,
  Link
} from "react-router-dom";
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'

import setAuthToken from "../../../services/setAuthToken";
import CreatePraxSpace from '../CreatePraxSpace/CreatePraxSpace';

import io from 'socket.io-client';



const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

const socket = io('http://localhost:5001',{transports: ['websocket']});


const styles = {
  button: {
    // backgroundColor: "#030303",
    color: "#dadcd7",
    height:40,
    width: "92%",
    marginRight: "4%",
    marginLeft: "4%",
    border: "solid",
    borderWidth: 2,
    borderColor: "#4797DE",
    marginBottom: 30,
    marginTop:20
  },
  openRoomGrid: {
margin:4
  },
  roomNameCard: {
    backgroundColor: "#212121",
    color: "#dadcd7",
    width: "100%",
      border: "solid",
    borderWidth: 2,
    borderColor: "#85b1d7",
 
  },
  openRoomsCard: {
  
    backgroundColor: "#212121",
    color: "#dadcd7",
  },
  openRoomsTitle: {
    backgroundColor: "#212121",
    color: "#dadcd7",
    zIndex: 3,
    width: "100%",
    height: 60,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "$headline_text",

  },
  openRoomsDescription: {
    backgroundColor: "#85b1d7",
    zIndex: 3
  },

  // dynamic1 : {
  //   backgroundColor: "pink"
  // },
h1: {
  backgroundColor: "#85b1d7",
  color: "#212121",
  width: '100%'
},

h3: {
  color: "#5e5d5d",
  paddingTop: 5,
  marginLeft: "5%"
},
textarea2: {
  color: "#dadcd7"
}
}


// let dynamicList=[]

var userID
var username;
var messages;
var instrument;



export default class DynamButtons extends React.Component {

  constructor(props){
    super(props);

    this.state = { 
      dynamicList: [],
      dynamicListDescription: []
    };
  
    
    // console.log(props.idUserLogged)
    userID = props.idUserLogged;
    username = props.username;
    instrument = props.instrument

    this.addListItem = this.addListItem.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
    this.addListItemDescription = this.addListItemDescription.bind(this);
    this.removeListItemDescription = this.removeListItem.bind(this);
    }

  addListItem(itemToAdd){
      let currentList = this.state.dynamicList;
      console.log(this.props);
      currentList.push(itemToAdd);
      this.setState({dynamicList : currentList});
      console.log(this.state.dynamicList)
      let dynamicList = this.state.dynamicList
      console.log(dynamicList)
      let origin = this.props.idUserLogged;
      
      var message = {
       content: itemToAdd, 
        origin: origin,
      }
      axios({
          method: 'post',
          url: 'http://localhost:5001/api/message',
          data: message
        })
    
        axios.get('/api/user/login', {
          params: {
            ID: origin
          }
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        
        let username = this.props.username;
        origin = this.props.idUserLogged
        socket.emit('username', {username: username})
        socket.emit('userID', {userID: origin})
        socket.emit('roomOption', {roomOption: itemToAdd})
        socket.on("username_Joined", usernameFunct)
        function usernameFunct(username){
          console.log("USERNAME joined: ", username);
          return username;
          }
        socket.on("userID_Joined", userIDFunct)
        function userIDFunct(userID){
          console.log("USERID joined: ", userID);
          }
        socket.on("roomOption_Joined", roomOptionFunct)
        function roomOptionFunct(roomOption){
          console.log("ROOM OPTION: ", roomOption);   
        }
        
    }

  addListItemDescription(itemToAddDescription){
      let currentListDescription = this.state.dynamicListDescription;
      currentListDescription.push(itemToAddDescription);
      // THIS WORKS ---> currentListDescription
     //tktk
// socket.on('connect', function newConnection(Camera){

      // console.log(currentListDescription)
      
      // socket.emit("toInputMessageDescription", currentListDescription)
  // }
  console.log(this.props.userID)
  
      this.setState({dynamicListDescription : currentListDescription});
      console.log(this.state.dynamicListDescription);
  // THIS WORKS ---> this.state.dynamicListDescription
      let dynamicListDescription  = this.state.dynamicListDescription
      console.log(dynamicListDescription)
    }


  removeListItem(itemToRemove){
      let currentList = this.state.dynamicList;
      currentList.splice(itemToRemove, 1);
      this.setState({dynamicList : currentList});
      // this.props.history.push("praxspace/" + username + "/" + currentList);
    }
  removeListItemDescription(itemToRemoveDescription){
      let currentListDescription = this.state.dynamicListDescription;
      currentListDescription.splice(itemToRemoveDescription, 1);
      this.setState({dynamicListDescription : currentListDescription});
    }
  handleSend = response => {
      this.props.getUsersRequest(response)
      console.log(this.props)
      console.log(response)
    }

  render(){
   
    return(
      <> 
      <div className="component-wrapper">
     
          <Card className="roomCard" style={styles.roomNameCard}> 
            <h1 style={styles.h1}>Create a Room</h1>
              <InputBoxDescription  addItem={this.addListItem} addItemDescription={this.addListItemDescription} style={styles.textarea2} /><br/>
          </Card>
       
    
      </div>
      <div>  
    
        <Card style={styles.openRoomsCard}> 
        <h3>Open Rooms</h3>
   
    {/*tk*/}    
      <DynamicList style={styles.openRoomsTitle} listItems={this.state.dynamicList} removeItem={this.removeListItem} />
  
          </Card>
     
     </div>
      </>
    );
  }
}


console.log(messages);
console.log(instrument);
console.log(userID);

let count = 0
let roomOptions=[];
export class DynamicList extends React.Component {

  render(){

    return (
      <>
        {  
          Object.keys(this.props.listItems).map( (index) => {
         
            
            return (
              <Link 
              // to={"praxspace/" + username + "/" + this.props.listItems[index]} 
              key={index}
              to={"praxspace/" + username + "/" + this.props.listItems[index]}
              onClick={(e)=>{
                e.preventDefault()
                window.open("praxspace/" + username + "/" + this.props.listItems[index])}}
            > 
              <li 
                className="joinRoomButton" 
                to={window.open("praxspace/" + username + "/" + this.props.listItems[index])}
                // onClick={
                //  window.open("praxspace/" + username + "/" + this.props.listItems[index]) 
                // }
                key={index}
                count={count++}
              >
                <Button style={styles.openRoomsTitle}  >
                    {this.props.listItems[index]}
                    </Button>
                </li>
              </Link>
            );
          })
        }
     <br/>
      <Switch>            
        <Route exact path="/praxspace/:username/:message" component={CreatePraxSpace}/> 
      </Switch>
      </>
      );
  }
}

export class DynamicListDescription extends React.Component {
 
  render(){
    return (
      <>
      <ul>
        {
          Object.keys(this.props.listItemsDescription).map( (indexDescription) => {
            return (
              <li style={styles.openRoomsDescription} 
              onClick={ () => this.props.removeItemDescription(indexDescription) } 
              key={indexDescription}>{this.props.listItemsDescription[indexDescription]}</li>
            );
          })
        }
      </ul>
      </>
    );
  }
}


export class InputBoxDescription extends React.Component {
  formSubmit2(e){
  e.preventDefault();  
    
    let itemToAdd = this.refs.item.value;
    if(itemToAdd !== ''){
      this.props.addItem(itemToAdd);
      this.refs.item.value = '';
      }
    }

  render(){
    return (
      <form ref="itemForm" onSubmit={e => this.formSubmit2(e)}>  
       
        <input className="inputCreateRoom" type="text" id="item" ref="item" placeholder="Name your Room"/>

        <Button  style={styles.button} type="submit" className="btn btn-primary roomDefineButton"
        > Join the Room
        </Button>
      </form>
      );
    }
  }
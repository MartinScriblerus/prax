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
let roomOption = [] 


export default class DynamButtons extends React.Component {

  constructor(props){
    super(props);
console.log(props)
    this.state = { 
      dynamicList: [],
      dynamicListDescription: [],
      rooms : [],
      username : '',
    };
  
    
    // console.log(props.idUserLogged)
   
    username = props.username;
    instrument = props.instrument;
    let rooms = props.rooms;
    
   
    this.addListItem = this.addListItem.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
    // this.addListItemDescription = this.addListItemDescription.bind(this);
    // this.removeListItemDescription = this.removeListItem.bind(this);
    }
    
    componentDidMount(){
 const {rooms} = this.state
      console.log(this.props)

      axios.get('http://localhost:5001/api/message')
                .then(res => {
                    const rooms = res.data;
                    this.setState({rooms});
                    return rooms
                });
                console.log(rooms)
      const socket = io('http://localhost:5001',{transports: ['websocket']});
    
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
    
  
    addListItem(itemToAdd){
    let currentList = this.state.dynamicList;
    // let msg = response.messages;
  async function addingItem(currentList){
    var r = await axios.get('http://localhost:5001/api/message')
      .then(function (response) {
      console.log(response.data.messages[0])    
    // return r
      })
      .catch(function(){
        console.log(("error in axios get of addListItem in dynamicButton"));
      });
    }addingItem();

      console.log(currentList); 
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
        username: this.props.username
      }
      axios({
          method: 'post',
          url: 'http://localhost:5001/api/message',
          data: message
        })
    
 
        
        let username = this.props.username;
        origin = this.props.idUserLogged
        socket.emit('username', {username: username})
        socket.emit('userID', {userID: origin})
        socket.emit('roomOption', {roomOption: itemToAdd})     
    }
 

  removeListItem(itemToRemove){
      let currentList = this.state.dynamicList;
      currentList.splice(itemToRemove, 1);
      this.setState({dynamicList : currentList});
      // this.props.history.push("praxspace/" + username + "/" + currentList);
    }

  handleSend = response => {
      this.props.getUsersRequest(response)
      console.log(this.props)
      console.log(response)
    }


  render(){
  let g = JSON.stringify(this.state.rooms.messages)

console.log(g);

    let roomOption = this.state.rooms.messages;
    let username = this.state.username;

let redsox; 
let baseball;   
console.log(roomOption)  
if(roomOption !== undefined || null){
redsox = roomOption.map(room=>room.content)
}
if (redsox !== undefined || null){
baseball = redsox.map(
  yankees=>yankees)
}
console.log(baseball);
console.log(username);
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
        <h1>{this.state.rooms.content}</h1>
      
    {/*tk*/}    
     
        <DynamicList style={styles.openRoomsTitle} listItems={this.state.dynamicList} removeItem={this.removeListItem} />
        {
          (baseball !== undefined || null)
          ? <DynamicList style={styles.openRoomsTitle} listItems={baseball} removeItem={this.removeListItem} />
        : null
      }
    
         
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


export class DynamicList extends React.Component {

  render(){
   console.log()
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



// export class DynamicListDescription extends React.Component {
 
//   render(){
//     return (
//       <>
//       <ul>
//         {
//           Object.keys(this.props.listItemsDescription).map( (indexDescription) => {
//             return (
//               <li style={styles.openRoomsDescription} 
//               onClick={ () => this.props.removeItemDescription(indexDescription) } 
//               key={indexDescription}>{this.props.listItemsDescription[indexDescription]}</li>
//             );
//           })
//         }
//       </ul>
//       </>
//     );
//   }
// }


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

        <Button style={styles.button} type="submit" className="btn btn-primary roomDefineButton"
        > Join the Room
        </Button>
      </form>
      );
    }
  }
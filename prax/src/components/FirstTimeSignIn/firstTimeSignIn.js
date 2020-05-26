import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios';
import './firsttimesignin.scss'
import {
    BrowserRouter as Router,
    useHistory,
    Link
  } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            // backgroundImage: "url(https://laughingsquid.com/wp-content/uploads/2013/10/21.jpg)",
            opacity: "90%",
            backgroundPosition: 'top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            overflow: 'auto',
        }}));

    const styles = ({
        input: {
         marginLeft: '10vw'
        },
        signup: {
        marginTop: 0,
        color: '#212121'
        },
        button: {
            width: 200,
            height: 50,
            borderStyle: "solid",
            backgroundColor: "#24a7a8",
            color: '#dadcd7',
            borderWidth: 2,
            borderColor: "#24a7a8",
            variant: "outlined",
            // justify: "right",
            margin: 10,
        },
        card: {
        borderStyle: "solid",
        backgroundColor: "#212121",
        borderWidth: 2,
        borderColor: "#85b1d7",
        variant: "outlined",
        marginRight: "10%",
        marginLeft: "10%",
        paddingRight: '5%',
        paddingLeft: '5%',
        marginTop: 60,
        zIndex: 5
        }
    })

export default function FirstTimeLogin(newUser){
  
    const auth = useSelector(state => state.auth)
    console.log(auth.user.id)
    const classes = useStyles();
    const history = useHistory();
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ bandName, setBandName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ instrument, setInstrument ] = useState("");

    const handleSubmit = (evt) => {

        var user = {
            username: username, 
            email: email,
            firstName : firstName,
            lastName : lastName,
            bandName: bandName,
            password : password,
            instrument : instrument,
    }
    
       console.log(user);
       console.log(user.username);
       history.push("/login");
      
    axios({
        method: 'post',
        url: 'http://localhost:5001/api/user',
        data: user
      })
    }

  return (
      <Router>
    <div className={classes.root}>
  
    <Card style={styles.card}>
    <h1 className='signupText'>Sign Up</h1>
    <form onSubmit={handleSubmit} noValidate autoComplete="off">  
        <TextField   
            className="inputPad"  
            type="username"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            autoFocus
            value={username}
            onChange={e => 
                setUsername(e.target.value)
            }
            label="Choose a Username" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField  
         
            className="inputPad"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            id="password"
            autoFocus
            value={password}
            onChange={e => 
            setPassword(e.target.value)
            }
            label="Choose a Password (7 char min)" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">  
    <TextField  
     
        className="inputPad"     
        type="text"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="firstName"
        name="firstName"
        autoFocus
        value={firstName}
        onChange={e => 
            setFirstName(e.target.value)
        }
        label="Enter Your First Name" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField       
            className="inputPad"
           
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            id="lastName"
            autoFocus
            value={lastName}
            onChange={e => 
            setLastName(e.target.value)
            }
            label="Enter Your Last Name" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField       
            
            className="inputPad"
            type="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoFocus
            value={email}
            onChange={e => 
            setEmail(e.target.value)
            }
            label="Enter your Email" 
        />
    </form>
  
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField       
            className="inputPad"
           
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="bandName"
            id="bandName"
            autoFocus
            value={bandName}
            onChange={e => 
            setBandName(e.target.value)
            }
            label="Name of your Band (if applicable)" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField       
            className="inputPad"
      
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="instrument"
            id="instrument"
            autoFocus
            value={instrument}
            onChange={e => 
            setInstrument(e.target.value)
            }
            label="Your Primary Instrument" 
        />
    </form>

            <Button 
                id="register_button"
                style={styles.button}
            >
            <Link 
                to="/login" 
                onClick={() => 
                handleSubmit()
            }
                style={{ textDecoration: 'none' }} 
            >
            Start Playing
            </Link>
            </Button> 

            <br/>
            <Link 
            to="/login"
            onClick={() => handleSubmit()}
            >
            Already have an account?</Link>              
        </Card>
    </div>
</Router>
)}
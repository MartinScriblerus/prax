import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios';
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
            backgroundImage: "url(https://laughingsquid.com/wp-content/uploads/2013/10/21.jpg)",
            opacity: "90%",
            backgroundPosition: 'top',
            
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            overflow: 'auto',
        }}));

    const styles = ({
        signup: {
        marginTop: 0,
        marginRight: "15%",
        marginLeft:  "15%",
        color: '#212121'
        },
            
        button: {
            width: 200,
            height: 50,
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: "#24a7a8",
            variant: "outlined",
            // justify: "right",
            margin: 10,
            marginTop: 10
        },
        card: {
        borderStyle: "solid",
        borderWidth: 5,
        borderColor: "#aaf",
        variant: "outlined",
        padding: 30,
        marginRight: "10%",
        marginLeft: "10%",
        marginTop: 100,
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
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit} noValidate autoComplete="off">  
        <TextField       
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
            label="Choose a Password (7 characters minimum)" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">  
    <TextField       
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
            label="Name of your Primary Band (leave blank if none)" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField       
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
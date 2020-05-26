import React, { useState, useEffect } from 'react';
import '../authlogin.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Welcome from '../../Layout/Welcome/Welcome'
import { loginUserRequest } from '../../../redux/auth/actions'
import { registerUserRequest, clearErrors } from '../../../redux/auth/actions'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const styles = ({
    button: {
        width: 200,
        height: 50,
        color: "#aaf",
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
    borderWidth: 2,
    borderColor: "030303",
    variant: "outlined",
    padding: 30,
    marginRight: 80,
    marginLeft: 80,
    marginTop: 10 
    }
})

export default function Login(props) {
    const auth = useSelector(state=> state.auth)
    const dispatch = useDispatch()

    const { isAuth, errors } = auth
    const { history } = props

    const [loginForm, setloginForm] = useState({
        username: '',
        password: ''
    })

    const [registerForm, setRegisterForm] = useState({
        registername: "",
        password: ""
      });
    
    const {username, password} = loginForm

    useEffect(()=>{
        if(isAuth) history.push('/')
    }, [isAuth, history])

    const handleChange = (e) =>{
        const {name, value} = e.target
        setloginForm({
            ...loginForm,
            [name]: value
        })
    }

    useEffect(() => {
        if (isAuth) history.push("/");
      }, [isAuth, history]);
    
      useEffect(()=>{
        return ()=> dispatch(clearErrors())
    }, [])

    const handleSubmit=(e)=>{
        e.preventDefault()
        const dataLogin  = {
            username,
            password
        }

        const { registername, registervalue } = e.target;
        setRegisterForm({
          ...registerForm,
          [registername]: registervalue
        });
        dispatch(loginUserRequest(dataLogin))
    }
    const handleChange2 = e => {
        e.preventDefault();
        const dataRegister = {
          username,
          password
     
        };
        console.log(dataRegister)
        dispatch(registerUserRequest(dataRegister));
      };

    return ( 
        <Welcome 
        >
            <div 
            className="auth-container"
            >
           <form onSubmit={handleSubmit} onChange={handleChange2}>
            
           <Typography variant="h4"
            >Log In</Typography>
            
            <label htmlFor="username">Username:</label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        value={username}
                        style={{border: errors && errors.user ? '1px solid red': undefined}}
                    ></input>
                    {errors && errors.user && <span className="show-error">{errors.user}</span>}
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={password}
                        style={{border: errors && errors.password ? '1px solid red': undefined}}
                    ></input>
                    {errors && errors.password && <span className="show-error">{errors.password}</span>}
                    <Button
                        className="submit-auth"
                       style={styles.button}
                        type="submit"
                        disabled={!username || !password ? true : false}
                    >Log In</Button>
                </form>
                <div className="question-form">
                    <p>Don't have an account? <Link to='/register' className="blue-link">Register</Link></p>
                </div>
            </div>
        </Welcome>
    )
}
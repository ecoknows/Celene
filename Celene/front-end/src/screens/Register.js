import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import {Form, Button} from 'react-bootstrap';

export default function Register(props) {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const confirm_password = useRef();

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (password.current.value !== confirm_password.current.value) {
          alert('Password and confirm password are not match');
        } else {
          dispatch(register(name.current.value, email.current.value, password.current.value));
        }
      };

    useEffect(() => {
        if (userInfo) {
        props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div style={styles.container}>
            <FixedTop/>
            <div style={{height: '100%',paddingTop:120, display:'flex', justifyContent:'center'}}>
                <div className='dashed_url signin_border'>
                    <FormSignUp name={name} confirm_password={confirm_password} email={email} password={password} submitHandler={submitHandler}/>
                </div>
            </div>
        </div>
    )
}


function FixedTop(){
    return(
        <div style={{backgroundColor:'white',position: 'fixed', width:'100%', height: '15%', zIndex: 3}}>
             <div  style={styles.topStyle}>
                <h1 style={{backgroundColor:'white', height:40, whiteSpace:'pre',
                            fontFamily:'Inter-Semi',
                            fontSize:30, }}>  Create Account  </h1>
                    
                <h1 style={{
                    fontFamily:'Inter',
                    fontSize: '110%',
                }}>Hello there our new costumer!</h1>
                
            </div>
        </div>
    )
}

function FormSignUp({ name, email, password, confirm_password, submitHandler}){
    return(
        <Form style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection: 'column',height:'100%'}}
        >
            <Form.Group>
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" ref={name} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref={email}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={password} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={confirm_password} />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Label>New Costumer?</Form.Label>
                <Form.Label style={{color:'#23689b', marginLeft: 4, cursor:'pointer' }}>Create Account</Form.Label>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitHandler}>
                Create Account
            </Button>
        </Form>
    )
}

const styles={
    container: {
        height:'95vh',
        padding:0,
        margin:0,
    },
    topStyle:{
        display:'flex',
        flexDirection:'column',
        height:20,
        width:'100%',
        alignItems:'center',
        borderBottom: '1px solid #D1CDCD',
    },
    dashesLine:{
        height: '100%',
        padding:10,
        width:213,
    },
    dashesPrice:{
        height: '100%',
        marginBottom: 10,
        padding:10,
        width:213,
    },
    item_title:{
        height:40,
        fontFamily:'Roboto-Med',
        fontSize: 16,
    },
    item_price:{
        fontFamily:'Roboto-Med',
        fontSize: 25,
        textAlign:'end',
        marginTop: 15,
    },
    item:{
        height:'100%',
        marginRight:15,
        marginBottom:20
    }
}


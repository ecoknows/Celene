import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser,updateUserProfile } from '../actions/userActions';
import {LoadingBox, MessageBox} from '../components';
import {Form, Button} from 'react-bootstrap';
import { USER_UPDATE_PROFILE_RESET } from '../constant/userConstants';
export default function Profile() {

        
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;


    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
          } else {
            setName(user.name);
            setEmail(user.email);
          }
    }, [dispatch, userInfo._id, user]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and Confirm Password Are Not Matched');
          } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
          }
    };

    return (
        <div style={styles.container}>
            <FixedTop />
            <div style={{height: '100%',paddingTop:120, display:'flex', justifyContent:'center'}}>
                <div className='dashed_url signin_border'>
                   {    loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                   <FormShipping user={user} submitHandler={submitHandler}
                   name={name} confirmPassword={confirmPassword} email={email} password={password} 
                   setName={setName}
                   setEmail={setEmail}
                   setPassword={setPassword}
                   setConfirmPassword={setConfirmPassword}
                   errorUpdate={errorUpdate}
                   successUpdate={successUpdate}
                   loadingUpdate={loadingUpdate}
                   />}
                </div>
            </div>
        </div>
    )
}



function FormShipping({ 
    name, 
    email, 
    password, 
    confirmPassword,
    setName,
    setEmail,
    setPassword,
    errorUpdate,
    successUpdate,
    setConfirmPassword,
    loadingUpdate,
    user,
    submitHandler}){

    return(
        <Form style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection: 'column',height:'100%'}}>  {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
          {successUpdate && (
            <MessageBox variant="success">
              Profile Updated Successfully
            </MessageBox>
          )}
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={name}
                onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" value={email}
                onChange={(e) => setEmail(e.target.value)}  />
            </Form.Group> 
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" value={password}
                onChange={(e) => setPassword(e.target.value)}  />
            </Form.Group>
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Confirm Password</Form.Label>
                <Form.Control type="text" placeholder="Enter Confrim Password" value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}/>
            </Form.Group>
            
            <Button variant="primary" type="submit" onClick={submitHandler}>
                Update
            </Button>
        </Form>
    )
}


function FixedTop(){
    return(
        <div style={{backgroundColor:'white',position: 'fixed', width:'100%', height: '15%', zIndex: 3}}>
             <div  style={styles.topStyle}>
                <h1 style={{backgroundColor:'white', height:40, whiteSpace:'pre',
                            fontFamily:'Inter-Semi',
                            fontSize:30, }}>  Profile </h1>
                    
                <h1 style={{
                    fontFamily:'Inter',
                    fontSize: '110%',
                }}>Hello! Our dear costumer</h1>
            </div>
        </div>
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



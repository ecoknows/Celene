import {Form, Button} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {LoadingBox, MessageBox} from '../components';
import { detailsUser, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constant/userConstants';


export default function UserListEdit(props) {
        const userId = props.match.params.id;
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [isSeller, setIsSeller] = useState(false);
        const [isAdmin, setIsAdmin] = useState(false);
        const userDetails = useSelector((state) => state.userDetails);
        const { loading, error, user } = userDetails;
      
        const userUpdate = useSelector((state) => state.userUpdate);
        const {
          loading: loadingUpdate,
          error: errorUpdate,
          success: successUpdate,
        } = userUpdate;
      
        const dispatch = useDispatch();
        useEffect(() => {
          if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            props.history.push('/userslist');
          }
          if (!user) {
            dispatch(detailsUser(userId));
          } else {
            setName(user.name);
            setEmail(user.email);
            setIsSeller(user.isSeller);
            setIsAdmin(user.isAdmin);
          }
        }, [dispatch, props.history, successUpdate, user, userId]);
      
        const submitHandler = (e) => {
          e.preventDefault();
          // dispatch update user
          dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
        };
    
    return loading ? <LoadingBox/> : error? <MessageBox>{error}</MessageBox> :(
        <div style={styles.container}>
            <FixedTop name={name}/>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
                <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            <div style={{height: '100%',paddingTop:120, display:'flex', justifyContent:'center'}}>
                <div className='dashed_url signin_border'>
                    <FormShipping 
                    name={name} 
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    isSeller={isSeller}
                    setIsSeller={setIsSeller}
                    isAdmin={isAdmin}
                    setIsAdmin={setIsAdmin}
                    submitHandler={submitHandler}
                    
                    />
                </div>
            </div>
        </div>
    )
}


function FixedTop({name}){
    return(
        <div style={{backgroundColor:'white',position: 'fixed', width:'100%', height: '15%', zIndex: 3}}>
             <div  style={styles.topStyle}>
                <h1 style={{backgroundColor:'white', height:40, whiteSpace:'pre',
                            fontFamily:'Inter-Semi',
                            fontSize:30, }}>  Edit User  </h1>
                    
                <h1 style={{
                    fontFamily:'Inter',
                    fontSize: '110%',
                }}>Name : {name}</h1>
            </div>
        </div>
    )
}

function FormShipping({
    name,
    setName,
    email,
    setEmail,
    isSeller,
    setIsSeller,
    isAdmin,
    setIsAdmin,
    submitHandler
}){
    return(
        <Form style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection: 'column',height:'100%', paddingTop: 20, paddingBottom:20}}>
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={name} 
                onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group> 
            <Form.Group>
                    <Form.Check
                    type='checkbox'
                    label='is Admin'
                    checked={isAdmin}
                    onChange={e=>setIsAdmin(e.target.checked)}
                    />
            </Form.Group>
            <Form.Group>
                    <Form.Check
                    type='checkbox'
                    label='is Seller'
                    checked={isSeller}
                    onChange={e=>{setIsSeller(e.target.checked)}}
                    />
            </Form.Group>

            <Button variant="primary" onClick={submitHandler}>
                Update
            </Button>
        </Form>
    )
}

const styles={
    container: {
        height:'fit-content',
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


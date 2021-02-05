
import { Link } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Form, Button} from 'react-bootstrap';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddress(props) {
    const fullName = useRef();
    const address = useRef();
    const city = useRef();
    const postal_code = useRef();
    const country = useRef();


    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!userInfo) {
        props.history.push('/signin');
    }
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
          saveShippingAddress({  fullName : fullName.current.value, 
            address :  address.current.value, 
            city: city.current.value, 
            postalCode:postal_code.current.value, 
            country: country.current.value })
        );
        props.history.push('/payment');
      };

    return (
        <div style={styles.container}>
            <FixedTop/>
            <div style={{height: '100%',paddingTop:120, display:'flex', justifyContent:'center'}}>
                <div className='dashed_url signin_border'>
                    <FormShipping fullName={fullName} address={address}
                    city={city} postal_code={postal_code} country={country}
                    
                    submitHandler={submitHandler}/>
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
                            fontSize:30, }}>  Shipping  </h1>
                    
                <h1 style={{
                    fontFamily:'Inter',
                    fontSize: '110%',
                }}>Don't worry, we are not stalker</h1>
                <CheckoutSteps step1 step2/>
            </div>
        </div>
    )
}

function FormShipping({ fullName, address, city, postal_code, country, submitHandler}){
    return(
        <Form style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection: 'column',height:'100%'}}>
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Fullname" ref={fullName}/>
            </Form.Group>
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter Address" ref={address}/>
            </Form.Group> 
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>City</Form.Label>
                <Form.Control type="text" placeholder="Enter City" ref={city}/>
            </Form.Group>
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Postal Code</Form.Label>
                <Form.Control type="text" placeholder="Enter Postal Code" ref={postal_code}/>
            </Form.Group>
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Country</Form.Label>
                <Form.Control type="text" placeholder="Enter Country" ref={country}/>
            </Form.Group>
            

            
            <Button variant="primary" type="submit" onClick={submitHandler}>
                Continue
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


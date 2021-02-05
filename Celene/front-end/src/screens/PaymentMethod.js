
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Form, Button, Col, Row} from 'react-bootstrap';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentMethod(props) {
    const [method, setMethod] = useState('PayPal');
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(method));
        props.history.push('/placeorder');
    };

    return (
        <div style={styles.container}>
            <FixedTop/>
            <div style={{height: '100%',paddingTop:120, display:'flex', justifyContent:'center'}}>
                <div className='dashed_url signin_border'>
                    <FormShipping setMethod={setMethod}
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
                            fontSize:30, }}>  Payment Method </h1>
                    
                <h1 style={{
                    fontFamily:'Inter',
                    fontSize: '110%',
                }}>How will you pay, our dear costumer?</h1>
                <CheckoutSteps step1 step2 step3/>
            </div>
        </div>
    )
}

function FormShipping({ submitHandler, setMethod}){
    return(
        <Form style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection: 'column',height:'100%'}}>
        <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter-Semi'}}>Choose Mode of payment</Form.Label>
            <Form.Group as={Row}>
                    <Form.Check
                    type="radio"
                    checked
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    onChange={e=>setMethod("PayPal")}
                    />
                    <img src='/Images/paypal.png' style={{height:27, width:100}}/>
            </Form.Group>
            <Form.Group as={Row}>
                    <Form.Check
                    type="radio"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    onChange={e=>setMethod("Stripe")}
                    />
                    <img src='/Images/stripe.png' style={{height:27, width:60}}/>
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


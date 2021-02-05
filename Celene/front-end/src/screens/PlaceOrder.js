
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Col, Row, Container} from 'react-bootstrap';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constant/orderConstants';

export default function PlaceOrder(props) {
    const cart = useSelector((state) => state.cart);
    
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;


    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();

    const placeOrderHandler = () => {
        // TODO: dispatch place order action
            console.log({ ...cart, orderItems: cart.cartItems },'eco');
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };
    
    useEffect(() => {
        if (success) {
        props.history.push(`/order/${order._id}`);
        dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);


    return (
        <div style={styles.container}>
            <FixedTop/>
            <div style={{height: '100%',paddingTop:120, display:'flex', justifyContent:'center'}}>
                <div className='dashed_url' style={{width:'90%'}}>
                    <Container fluid style={{height:'100%'}}>
                        <Row>
                            <Col style={{paddingLeft: 40, paddingTop: 20}}>
                                <h1 style={{fontFamily:'Inter-Semi', fontSize:  30}}>Shipping</h1>
                                <span style={{fontFamily:'Inter-Black', fontSize:  15}}>Name: </span>
                                <span style={{fontFamily:'Inter-Semi', fontSize:  15}}>{cart.shippingAddress.fullName}</span>
                                <br/>
                                <span style={{fontFamily:'Inter-Black', fontSize:  15}}>Address: </span>
                                <span style={{fontFamily:'Inter-Semi', fontSize:  15}}>
                                {cart.shippingAddress.address},
                                {cart.shippingAddress.city}, 
                                {cart.shippingAddress.postalCode},
                                {cart.shippingAddress.country}
                                </span>
                                <br/>
                                <br/>
                                <h1 style={{fontFamily:'Inter-Semi', fontSize:  30}}>Payment</h1>
                                <span style={{fontFamily:'Inter-Black', fontSize:  15}}>Method: </span>
                                <span style={{fontFamily:'Inter-Semi', fontSize:  15}}>{cart.paymentMethod}</span>
                            </Col>


                            {/* Order Summary */}
                            <Col style={{paddingTop: 20}}>
                                <h1 style={{fontFamily:'Inter-Semi', fontSize:  30, textAlign:'center'}}>Order Summary</h1>
                                <span style={{fontFamily:'Inter-Black', fontSize:  15}}>Items: </span>
                                <span style={{fontFamily:'Inter-Semi', fontSize:  15}}>₱ {parseFloat(cart.itemsPrice.toFixed(2)).toLocaleString()}</span>
                                <br/>
                                <span style={{fontFamily:'Inter-Black', fontSize:  15}}>Shipping: </span>
                                <span style={{fontFamily:'Inter-Semi', fontSize:  15}}>₱ {parseFloat(cart.shippingPrice.toFixed(2)).toLocaleString()}</span>
                                <br/>
                                <span style={{fontFamily:'Inter-Black', fontSize:  15}}>Tax: </span>
                                <span style={{fontFamily:'Inter-Semi', fontSize:  15}}>₱ {parseFloat(cart.taxPrice.toFixed(2)).toLocaleString()}</span>
                                <br/>
                                <span style={{fontFamily:'Inter-Black', fontSize:  15}}>Order Total: </span>
                                <span style={{fontFamily:'Inter-Semi', fontSize:  15}}>₱ {parseFloat(cart.totalPrice.toFixed(2)).toLocaleString()}</span>
                                <br/>
                                <div style={{display:'flex', justifyContent:'center'}}>
                                 <Button variant="primary" type="submit"style={{marginTop: 20}}
                                    onClick={placeOrderHandler}
                                 >Place Order</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            
                        <h1 style={{fontFamily:'Inter-Semi', fontSize:  30, textAlign:'center',width:'100%', marginTop: 40}}>Order Items</h1>
                                {
                                    cart.cartItems.map((item)=><OrderItem item={item}/>)
                                }
                                <br/>
                        </Row>
                    </Container>

                </div>
            </div>
        </div>
    )
}

function OrderItem({item}){
    return(
        <Container fluid>
            <Row>
                <Col lg='2' style={{padding:0, margin:0,display:'flex', justifyContent:'center', marginBottom: 10}}>
                    <img src={item.img} style={{height: 100, width:70}}/>
                </Col>
                <Col lg='5' style={{display:'flex',alignItems:'center',display:'flex', justifyContent:'center'}}>
                    <Link  to={`/product/${item.product}`} style={{color:'black'}}>
                        <h1 style={{fontFamily:'Inter-Black', fontSize:  14}}>{item.name}</h1>
                    </Link>
                </Col>
                <Col lg='5' style={{display:'flex',alignItems:'center',display:'flex', justifyContent:'center'}}>
                    <h1 style={{fontFamily:'Inter-Semi', fontSize:  12, color:'green'}}>
                         {item.qty} x ${item.price} = ${item.qty * item.price}
                    </h1>
                </Col>
            </Row>
        </Container>
    )
}

function FixedTop(){
    return(
        <div style={{backgroundColor:'white',position: 'fixed', width:'100%', height: '15%', zIndex: 3}}>
             <div  style={styles.topStyle}>
                <h1 style={{backgroundColor:'white', height:40, whiteSpace:'pre',
                            fontFamily:'Inter-Semi',
                            fontSize:30, }}>  Place Order </h1>
                    
                <h1 style={{
                    fontFamily:'Inter',
                    fontSize: '110%',
                }}>These are your orders!</h1>
                <CheckoutSteps step1 step2 step3 step4/>
            </div>
        </div>
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


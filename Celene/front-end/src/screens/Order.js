import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Col, Row, Container} from 'react-bootstrap';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import {LoadingBox, MessageBox} from '../components';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constant/orderConstants';
import { PayPalButton } from 'react-paypal-button-v2';

export default function PlaceOrder(props) {
    const orderId = props.match.params.id;
 
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;


  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
        const { data } = await Axios.get('/api/config/paypal');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      };
      if (
        !order ||
        successPay ||
        successDeliver ||
        (order && order._id !== orderId)
      ) {
        dispatch({ type: ORDER_PAY_RESET });
        dispatch({ type: ORDER_DELIVER_RESET });
        dispatch(detailsOrder(orderId));
      } else {
        if (!order.isPaid) {
          if (!window.paypal) {
            addPayPalScript();
          } else {
            setSdkReady(true);
          }
        }
      }
    }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

  
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };
    const deliverHandler = () => {
      dispatch(deliverOrder(order._id));
    };

    return loading ? (<LoadingBox/>) 
            : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ):
        (
        <div style={styles.container}>
            <FixedTop id={order._id}/>
            <div style={{height: '100%',paddingTop:120, display:'flex', justifyContent:'center'}}>
                <div className='dashed_url' style={{width:'90%'}}>
                    <Container fluid style={{height:'100%'}}>
                        <Row>
                            <Col style={{paddingLeft: 40, paddingTop: 20}}>
                                <h1 style={{fontFamily:'Inter-Semi', fontSize:  30}}>Shipping</h1>
                                <span style={{fontFamily:'Inter-Black', fontSize:  15}}>Name: </span>
                                <span style={{fontFamily:'Inter-Semi', fontSize:  15}}>{order.shippingAddress.fullName}</span>
                                <br/>
                                <span style={{fontFamily:'Inter-Black', fontSize:  15}}>Address: </span>
                                <span style={{fontFamily:'Inter-Semi', fontSize:  15}}>
                                {order.shippingAddress.address},
                                {order.shippingAddress.city}, 
                                {order.shippingAddress.postalCode},
                                {order.shippingAddress.country}
                                </span>
                                {order.isDelivered ? (
                                <MessageBox variant="success">
                                    Delivered at {order.deliveredAt}
                                </MessageBox>
                                ) : (
                                <MessageBox variant="danger">Not Delivered</MessageBox>
                                )}
                                <br/>
                                <br/>
                                <h1 style={{fontFamily:'Inter-Semi', fontSize:  30}}>Payment</h1>
                                <span style={{fontFamily:'Inter-Black', fontSize:  15}}>Method: </span>
                                <span style={{fontFamily:'Inter-Semi', fontSize:  15}}>{order.paymentMethod}</span>
                                {order.isPaid ? (
                                    <MessageBox variant="success">
                                        Paid at {order.paidAt}
                                    </MessageBox>
                                    ) : (
                                    <MessageBox variant="danger">Not Paid</MessageBox>
                                    )}
                            </Col>


                            {/* Order Summary */}
                            <Col style={{paddingTop: 20}}>
                                <h1 style={{fontFamily:'Inter-Semi', fontSize:  30, textAlign:'center'}}>Order Summary</h1>
                                <span style={{fontFamily:'Inter-Black', fontSize:  15}}>Items: </span>
                                <span style={{fontFamily:'Inter-Semi', fontSize:  15}}>₱ {parseFloat(order.itemsPrice.toFixed(2)).toLocaleString()}</span>
                                <br/>
                                <span style={{fontFamily:'Inter-Black', fontSize:  15}}>Shipping: </span>
                                <span style={{fontFamily:'Inter-Semi', fontSize:  15}}>₱ {parseFloat(order.shippingPrice.toFixed(2)).toLocaleString()}</span>
                                <br/>
                                <span style={{fontFamily:'Inter-Black', fontSize:  15}}>Tax: </span>
                                <span style={{fontFamily:'Inter-Semi', fontSize:  15}}>₱ {parseFloat(order.taxPrice.toFixed(2)).toLocaleString()}</span>
                                <br/>
                                <span style={{fontFamily:'Inter-Black', fontSize:  15}}>Order Total: </span>
                                <span style={{fontFamily:'Inter-Semi', fontSize:  15}}>₱ {parseFloat(order.totalPrice.toFixed(2)).toLocaleString()}</span>
                                <br/>
                                {!order.isPaid && (
                                    <li>
                                    {!sdkReady ? (
                                        <LoadingBox></LoadingBox>
                                    ) : (
                                        <>
                                         {errorPay && (
                                            <MessageBox variant="danger">{errorPay}</MessageBox>
                                        )}
                                        {loadingPay && <LoadingBox></LoadingBox>}
                                        
                                        <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={(details, data) => {
                                            alert("Transaction completed by " + details.payer.name.given_name);
                                   
                                            // OPTIONAL: Call your server to save the transaction
                                            return fetch("/paypal-transaction-complete", {
                                              method: "post",
                                              body: JSON.stringify({
                                                orderID: data.orderID
                                              })
                                            });
                                          }}
                                        onSuccess={successPaymentHandler}
                                        ></PayPalButton>
                                        </>
                                    )}
                                    </li>
                                )}
                                 {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <li>
                                    {loadingDeliver && <LoadingBox></LoadingBox>}
                                    {errorDeliver && (
                                        <MessageBox variant="danger">{errorDeliver}</MessageBox>
                                    )}
                                    <button
                                        type="button"
                                        className="primary block"
                                        onClick={deliverHandler}
                                    >
                                        Deliver Order
                                    </button>
                                    </li>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            
                        <h1 style={{fontFamily:'Inter-Semi', fontSize:  30, textAlign:'center',width:'100%', marginTop: 40}}>Order Items</h1>
                                {
                                    order.orderItems.map((item,index)=><OrderItem item={item} key={index.toString()}/>)
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

function FixedTop({id}){
    return(
        <div style={{backgroundColor:'white',position: 'fixed', width:'100%', height: '15%', zIndex: 3}}>
             <div  style={styles.topStyle}>
                <h1 style={{backgroundColor:'white', height:40, whiteSpace:'pre',
                            fontFamily:'Inter-Semi',
                            fontSize:30, }}>  Order </h1>
                    
                <h1 style={{
                    fontFamily:'Inter',
                    fontSize: '110%',
                }}>Order ID: {id}</h1>
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


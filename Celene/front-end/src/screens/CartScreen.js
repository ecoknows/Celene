import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,removeFromCart } from '../actions/cartActions';
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Rating } from '../components';


function FixedTop({checkoutHandler,cartItems}){
  return(
      <div style={{backgroundColor:'white',position: 'fixed', width:'100%', height: '15%', zIndex: 3}}>
           <div  style={styles.topStyle}>
              <h1 style={{backgroundColor:'white', height:40, whiteSpace:'pre',
                          fontFamily:'Inter-Semi',
                          fontSize:30, }}>  Shopping Cart </h1>
                  
              <h1 style={{
                  fontFamily:'Inter',
                  fontSize: '110%',
              }}>Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} Items ) :
              <span style={{color:'green'}}> 
                ₱ {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toLocaleString()}
              </span>

               </h1>
              <h1 style={{
                  fontFamily:'Inter-Semi',
                  fontSize: '100%',
                  color:'#23689b',
                  cursor: 'pointer'
              }}

              onClick={checkoutHandler}
              
              >
                  Proceed to Checkout
              </h1>
          </div>
      </div>
  )
}


export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();
    // localStorage.removeItem("cartItems"); 
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  
  return(
      <div style={styles.container}>
        <FixedTop cartItems={cartItems} checkoutHandler={checkoutHandler}/>
        <div style={{height: '150vh',paddingTop:120}}>
            <Container fluid>
                  <Row style={{display:'flex',justifyContent:'center'}}>
                      {
                              cartItems.map((item)=> 
                              <Col lg='0' style={styles.item} key={item._id} >
                                  <ProductItems item={item} dispatch={dispatch} removeFromCartHandler={removeFromCartHandler}/>
                                  
                              </Col>
                              )
                          }
                      
                  </Row>
              </Container>
        </div>
      </div>    
  )
}

function ProductItems({item, dispatch, removeFromCartHandler}){
  console.log('hakdog: ', item.product);
  return(
        <div  key={item._id}>
                
            <div style={styles.dashesPrice} className='dashed_url'>
                <Rating rating={4} numReview={10}/>
            </div>
            
           <Link to={`/products/${item._id}`} style={{textDecoration:'none', color:'black'}}> 
            <img src={item.img} style={{height:'45vh',width: 215,}}/>
            </Link>
            <div style={{height:118,paddingBottom:9,paddingTop:9}}>

            <div style={styles.dashesLine} className='dashed_url'>
                <div style={{display:'flex'}}>
                    <div style={{width:'100%'}}>
                        <h1 style={styles.item_title}>
                            Price:
                        </h1>
                    </div>
                    <div style={{width:'100%'}}>
                        <h1 style={styles.price}>
                            ₱ {(item.price * item.qty).toLocaleString()}
                        </h1>
                    </div>
                </div>
                <div style={{display:'flex'}}>
                    <div style={{width:'100%'}}>
                        <h1 style={styles.item_title}>
                            Status:
                        </h1>
                    </div>
                    <div style={{width:'100%'}}>
                        {item.countInStock > 0 ? <h1 style={styles.stock}>
                            In Stock
                        </h1>:
                        <h1 style={styles.out_stock}>
                            Out of Stock
                        </h1>}
                    </div>
                </div>  

                <div style={{display:'flex'}}>
                    <div style={{width:'100%'}}>
                        <h1 style={styles.item_title}>
                            Quantity:
                        </h1>
                    </div>
                    <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                        <select
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                            >
                            {[...Array(item.countInStock).keys()].map(
                                (x) => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                                )
                            )}
                        </select>
                    </div>
                </div>  

                <h1 style={styles.item_price} onClick={()=>removeFromCartHandler(item.product)}>
                   Delete
                </h1> 
            </div>
            </div>


        </div>
  );
}


const styles={
  container: {
      height:'100vh',
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
    height: 'fit-content',
    padding:10,
    width:213,
    cursor:'pointer',
  },
  dashesPrice:{
      height: '100%',
      marginBottom: 10,
      padding:10,
      width:213,
  },
  item_title:{
      fontFamily:'Roboto-Med',
      fontSize: 16,
      whiteSpace: 'pre',
  },
  price:{
      fontFamily:'Roboto-Med',
      fontSize: 16,
      whiteSpace: 'pre',
      textAlign:'end',
  },
  stock:{
      fontFamily:'Roboto-Med',
      fontSize: 16,
      whiteSpace: 'pre',
      color:'green',
      textAlign:'end',
  },
  out_stock:{
      fontFamily:'Roboto-Med',
      fontSize: 16,
      whiteSpace: 'pre',
      color:'red',
      textAlign:'end',
  },
  item_price:{
      fontFamily:'Roboto_Bold',
      fontSize: 17,
      textAlign:'center',
  },
  item:{
      height:'100%',
      marginRight:15,
      marginBottom:50
  }
}
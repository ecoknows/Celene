import {useEffect, useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Rating } from '../components';
import {useSelector, useDispatch} from 'react-redux';
import {LoadingBox, MessageBox} from '../components';
import {detailsProduct} from '../actions/productActions';


export default function ProductScreen(props) {
    
    const productDetail= useSelector( state => state.productDetail);
    const dispatch = useDispatch();
    const {loading, error, product} = productDetail;
    const productId = props.match.params.id;
    // const history = useHistory();
    const [qty, setQty] = useState(1);

    useEffect(()=>{
        dispatch(detailsProduct(productId));
    },[dispatch, productId]);
    
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
      };

    return(
        <>
      { loading ? <LoadingBox/> :
        error ? <MessageBox variant='danger'>{error}</MessageBox> :
        <Container fluid style={{height: '90vh'}}>
                <Row style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100%'}}>
                    <Col lg='3' style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                        <img src={product.img}/>
                    </Col>
                    <Col style={{marginTop:15}}>
                        <div style={{height: '50vh'}}>
                                <h1 style={{fontFamily:'Inter-Semi', fontSize:'3em'}}>{product.name}</h1>
                                <Rating rating={product.rating} numReview={product.numReview} />
                                <h1 style={{fontFamily:'Inter', fontSize:'1.5em'}}>{product.description}</h1>
                                <br/> 
                                <div style={styles.dashesLine} className='dashed_url'>
                                        <div style={{display:'flex'}}>
                                            <div style={{width:'100%'}}>
                                                <h1 style={styles.item_title}>
                                                    Price:
                                                </h1>
                                            </div>
                                            <div style={{width:'100%'}}>
                                                <h1 style={styles.price}>
                                                    ₱ {product.price.toLocaleString()}
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
                                                {product.countInStock > 0 ? <h1 style={styles.stock}>
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
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}
                                                >
                                                {[...Array(product.countInStock).keys()].map(
                                                    (x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                    )
                                                )}
                                            </select>
                                            </div>
                                        </div>  

                                        <h1 style={styles.item_price} onClick={addToCartHandler}>
                                            Add to Cart
                                        </h1> 
                                    </div>
                        </div>
                    </Col>
                </Row>
            </Container>
      }
    </>
    )
}

const styles ={
    dashesLine:{
        height: 'fit-content',
        padding:10,
        width:213,
        cursor:'pointer',
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
        marginTop: 5,
    }
}
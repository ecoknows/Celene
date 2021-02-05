import {Table} from 'react-bootstrap'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {LoadingBox,MessageBox} from '../components';
import { PRODUCT_CREATE_RESET,PRODUCT_DELETE_RESET, } from '../constant/productConstants';
import { createProduct, listProducts,
    deleteProduct } from '../actions/productActions';
import { useRouteMatch } from 'react-router-dom'

function ProductListScreen(props) {
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
        
    const { path } = useRouteMatch();
    const sellerMode = path.indexOf('/seller') >= 0;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;
    
    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;


    const dispatch = useDispatch();
    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
    }, [createdProduct, dispatch, props.history, successCreate, successDelete]);
    
    const deleteHandler = (product) => {
        if (window.confirm('Are you sure to delete?')) {
        dispatch(deleteProduct(product._id));
        }
    }


    const createHandler = () => {
        dispatch(createProduct());
    };
    return (
        <div style={styles.container}>
            <FixedTop createHandler={createHandler}/>
            <div style={{height: '100%',paddingTop:120, display:'flex', justifyContent:'center'}}>
                <HistoryTable products={products} history={props.history} loading={loading} error={error}
                deleteHandler={deleteHandler}
                errorCreate={errorCreate}
                loadingDelete={loadingDelete}
                errorDelete={errorDelete}
                successDelete={successDelete}
                loadingCreate={loadingCreate}
                />
            </div>
        </div>
    )
}


function FixedTop({createHandler}){
    return(
        <div style={{backgroundColor:'white',position: 'fixed', width:'100%', height: '15%', zIndex: 3}}>
             <div  style={styles.topStyle}>
                <h1 style={{backgroundColor:'white', height:40, whiteSpace:'pre',
                            fontFamily:'Inter-Semi',
                            fontSize:30, }}>  Product List </h1>
                    
                <h1 style={{
                    fontFamily:'Inter',
                    fontSize: '110%',
                }}>Your own products.</h1>
                
              <h1 style={{
                  fontFamily:'Inter-Semi',
                  fontSize: '100%',
                  color:'#23689b',
                  cursor: 'pointer'
              }}
                onClick={createHandler}
              >
                  Create Product
              </h1>
            </div>
        </div>
    )
}

function HistoryTable({products, history, loading, error,errorCreate,loadingCreate, deleteHandler,
    loadingDelete,
    errorDelete,
    successDelete,
}){
    return <div style={{width:'100%'}}>
                
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
           { loading ?  (
        <LoadingBox/>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : <Table striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                    <button
                        type="button"
                        className="small"
                        onClick={() =>
                        history.push(`/product/${product._id}/edit`)
                        }
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="small"
                        onClick={() => deleteHandler(product)}
                    >
                        Delete
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </Table>}
        </div>
}


export default ProductListScreen

const styles={
    container: {
        height:'90vh',
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


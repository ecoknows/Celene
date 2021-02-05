import {Table} from 'react-bootstrap'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {LoadingBox,MessageBox} from '../components';
import { listOrders,deleteOrder } from '../actions/orderActions';
import { ORDER_DELETE_RESET } from '../constant/orderConstants';
import { useRouteMatch } from 'react-router-dom'


function OrderListScreen(props) {
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;
    const orderDelete = useSelector((state) => state.orderDelete);
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = orderDelete;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const { path } = useRouteMatch();
    const sellerMode = path.indexOf('/seller') >= 0;
  
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch({ type: ORDER_DELETE_RESET });
      dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, successDelete]);
    const deleteHandler = (order) => {
      if (window.confirm('Are you sure to delete?')) {
          dispatch(deleteOrder(order._id));
        }
    };
    
    return (
        <div style={styles.container}>
            <FixedTop/>
            <div style={{height: '100%',paddingTop:120, display:'flex', justifyContent:'center'}}>
                <OrderListTable orders={orders} loading={loading} error={error} deleteHandler={deleteHandler} history={props.history}/>
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
                            fontSize:30, }}>  Orders List </h1>
                    
                <h1 style={{
                    fontFamily:'Inter',
                    fontSize: '110%',
                }}>Here are the orders, lucky you!</h1>
            </div>
        </div>
    )
}

function OrderListTable({orders, loading, error, deleteHandler, history}){
    return <div style={{width:'100%'}}>
                
           { loading ?  (
        <LoadingBox/>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : <Table striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user?.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                    <td>
                    {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : 'No'}
                    </td>
                    <td>
                    <button
                        type="button"
                        className="small"
                        onClick={() => {
                        history.push(`/order/${order._id}`);
                        }}
                    >
                        Details
                    </button>
                    <button
                        type="button"
                        className="small"
                        onClick={() => deleteHandler(order)}
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


export default OrderListScreen

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


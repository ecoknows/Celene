import {Table} from 'react-bootstrap'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {LoadingBox,MessageBox} from '../components';
import { listUsers,deleteUser } from '../actions/userActions';
import { USER_DETAILS_RESET } from '../constant/userConstants';


function UsersList(props) {
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;
  
    const userDelete = useSelector((state) => state.userDelete);
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = userDelete;
  
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(listUsers());
      dispatch({
          type: USER_DETAILS_RESET,
        });
  
    }, [dispatch, successDelete]);
    const deleteHandler = (user) => {
      if (window.confirm('Are you sure?')) {
        dispatch(deleteUser(user._id));
      }
    };
    return (
        <div style={styles.container}>
            <FixedTop/>
            <div style={{height: '100%',paddingTop:120, display:'flex', justifyContent:'center'}}>
                <OrderListTable users={users} loading={loading} error={error}
                loadingDelete={loadingDelete}
                errorDelete={errorDelete}
                successDelete={successDelete}
                deleteHandler={deleteHandler}
                history={props.history}
                />
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
                            fontSize:30, }}>  Users List </h1>
                    
                <h1 style={{
                    fontFamily:'Inter',
                    fontSize: '110%',
                }}>Here are the users, good luck!</h1>
            </div>
        </div>
    )
}

function OrderListTable({users, loading, error,
    loadingDelete,
    errorDelete,
    successDelete,  
    deleteHandler,
    history,
}){
    return <div style={{width:'100%'}}>
            {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {successDelete && (
            <MessageBox variant="success">User Deleted Successfully</MessageBox>
        )}
                    
           { loading ?  (
        <LoadingBox/>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>IS SELLER</th>
                    <th>IS ADMIN</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? 'YES' : ' NO'}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                <td>
                <button
                    type="button"
                    className="small"
                    onClick={() => history.push(`/user/${user._id}/edit`)}
                  >

                Edit
              </button>
                <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user)}
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


export default UsersList

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


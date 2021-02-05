
import {useState, useEffect} from 'react';
import './css/App.css'; 
import {Navbar, LatestShowCase, Womans, Mans, BestSeller, LoadingBox, MessageBox, PrivateRoute, AdminRoute} from './components';
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import { ProductScreen,
   ProductList,
    CartScreen, 
    SignIn,Register, 
    ShippingAddress,
    PaymentMethod, 
    PlaceOrder, 
    Order ,
    OrderHistory,
    Profile,
    ProductListScreen,
    ProductEditScreen,
    OrderListScreen,
    UsersList,
    UserListEdit
} from './screens';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { listProducts } from './actions/productActions';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <Router>
      <Navbar/> 
      <Switch>
        <Route path='/' component={HomePage} exact/>
        <Route path='/cart/:id' component={CartScreen} exact/>
        <Route path='/register' component={Register} exact/><Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
        <Route path='/signin' component={SignIn} exact/>
        <Route path='/shipping' component={ShippingAddress} exact/>
        <Route path='/payment' component={PaymentMethod} exact/>
        <Route path='/placeorder' component={PlaceOrder} exact/>
        <PrivateRoute path='/profile' component={Profile} exact/>
        <AdminRoute path="/productlist" component={ProductListScreen} />
        <AdminRoute path="/orderlist" component={OrderListScreen} />
        <AdminRoute path="/userslist" component={UsersList} />
        <AdminRoute path="/user/:id/edit" component={UserListEdit} />
        <Route path='/order/:id' component={Order} exact/>
        <Route path='/orderhistory' component={OrderHistory} exact/>
        <Route path='/:id' component={ProductList} exact/>
        <Route path='/products/:id' component={ProductScreen} exact/>
      </Switch>
    </Router>
  );
}

function HomePage(){
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const sellerMode = path.indexOf('/seller') >= 0;
  const productList = useSelector( state => state.productList);
  const {loading, error, products} = productList;
  
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  useEffect(()=>{
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }))
  },[dispatch])

  return(
    <>
      { loading ? <LoadingBox/> :
        error ? <MessageBox variant='danger'>{error}</MessageBox> :
        <div style={{overflow : 'hidden'}}>
          <LatestShowCase/>
          <Womans products={products}/>
          <Mans products={products}/>
          <BestSeller products={products}/>
        </div>
      }
    </>
  )
}

export default App;

import React from 'react'
import { Accordion, Dropdown } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../actions/userActions';
import { CartScreen } from '../screens';

let current = 'deym,';

function Navbar(props) {
    const history = useHistory();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
        history.push('./')
      };
    const location = useLocation();
    if(!location.pathname.includes('product'))
        current = location.pathname;
    return (
        <nav className='_navbar'> 
            <Accordion style={{position:'absolute', left:0, top:-3}}  className='menu_button'>
                <Accordion.Toggle eventKey="0" style={{ border: 'none', backgroundColor:'white', marginLeft: 20}} className='toggler'>
                    <img src='/Images/icons/menu.png' style={{height: 20,width: 20}}/>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0"    >
                    <div style={{width:'100vw', backgroundColor:'white'}}>
                        <a href='/New' style={{textDecoration:'none', color:'black'}}>
                            <h1 style={{fontFamily:'Inter', fontSize:22, textAlign:'center', paddingBottom:4,
                                borderBottom: '1px dashed #909090',
                            }}>New</h1>
                        </a>
                        <a href='/Top' style={{textDecoration:'none', color:'black'}}>
                            <h1 style={{fontFamily:'Inter', fontSize:22, textAlign:'center', paddingBottom:4,
                                borderBottom: '1px dashed #909090',
                            }}>Top</h1>
                        </a>

                        <a href='/Bottom' style={{textDecoration:'none', color:'black'}}>
                            <h1 style={{fontFamily:'Inter', fontSize:22, textAlign:'center', paddingBottom:4,
                                borderBottom: '1px dashed #909090',
                            }}>Bottom</h1>
                        </a>

                        <a href='/Dress' style={{textDecoration:'none', color:'black'}}>
                            <h1 style={{fontFamily:'Inter', fontSize:22, textAlign:'center', paddingBottom:4,
                                borderBottom: '1px dashed #909090',
                            }}>Dress</h1>
                        </a>

                        <a href='/Bikini' style={{textDecoration:'none', color:'black'}}>
                            <h1 style={{fontFamily:'Inter', fontSize:22, textAlign:'center', paddingBottom:4,
                                borderBottom: '1px dashed #909090',
                            }}>Bikini</h1>
                        </a>

                        <a href='/Monokini' style={{textDecoration:'none', color:'black'}}>
                            <h1 style={{fontFamily:'Inter', fontSize:22, textAlign:'center', paddingBottom:4,
                                borderBottom: '1px dashed #909090',
                            }}>Monokini</h1>
                        </a>

                        <a href='/BeachWear' style={{textDecoration:'none', color:'black'}}>
                            <h1 style={{fontFamily:'Inter', fontSize:22, textAlign:'center', paddingBottom:4,
                                borderBottom: '1px dashed #909090',
                            }}>BeachWear</h1>
                        </a>


                    </div>
                </Accordion.Collapse>
                
            </Accordion>
                
                <a href='/' className='logo' style={{textDecoration:'none'}}>
                    Celene
                </a>

            <ul className='nav-links'>
                <li><a href='/New' style={{textDecoration:'none', color: current === '/New' ? 'red' : 'black'}}>New</a></li>
                <div className='vl'/>
                <li><a href='/Top' style={{textDecoration:'none', color: current === '/Top' ? 'red' : 'black'}}>Top</a></li>
                <div className='vl'/>
                <li><a href='/Bottom' style={{textDecoration:'none', color: current === '/Bottom' ? 'red' : 'black'}}>Bottom</a></li>
                <div className='vl'/>
                <li><a href='/Dress' style={{textDecoration:'none', color: current === '/Dress' ? 'red' : 'black'}}>Dress</a></li>
                <div className='vl'/>
                <li><a href='/Bikini' style={{textDecoration:'none', color: current === '/Bikini' ? 'red' : 'black'}}>Bikini</a></li>
                <div className='vl'/>
                <li><a href='/Monokini' style={{textDecoration:'none', color: current === '/Monokini' ? 'red' : 'black'}}>Monokini</a></li>
                <div className='vl'/>
                <li><a href='/BeachWear' style={{textDecoration:'none', color: current === '/BeachWear' ? 'red' : 'black'}}>Beach Wear</a></li>
                <div className='vl'/>
            </ul>
                <span className='shopping-logo'>
                <span style={{backgroundColor:'#ec4646',paddingLeft:7, paddingRight:7, borderRadius:10,
                    display:'flex', justifyContent:'center',alignItems:'center',color:'white', marginTop: 5
                    }}>
                   {cartItems.length}
                </span>
                    <a href='/cart/empty'style={{textDecopration:'none'}}>
                            <img src={'/images/icons/shopping.png'}/>
                    </a>
                    {userInfo ? (
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className='dropdrop'>
                                {userInfo.name}
                            </Dropdown.Toggle>
                        
                            <Dropdown.Menu>
                            <Dropdown.Item onClick={signoutHandler} onClick={()=>history.push('/profile')}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={signoutHandler} onClick={()=>history.push('/orderhistory')}>Order History</Dropdown.Item>
                            <Dropdown.Item onClick={signoutHandler}>Sign Out</Dropdown.Item>
                            </Dropdown.Menu>
                      </Dropdown>
                    
                    ) : (
                        <Link to="/signin" style={{ color:'black'}}>Sign In</Link>
                    )}
                     {/* {userInfo && userInfo?.isSeller && (
                      
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className='dropdrop'>
                                Seller
                            </Dropdown.Toggle>
                        
                            <Dropdown.Menu>
                            <Dropdown.Item onClick={signoutHandler} onClick={()=>history.push('/productlist/seller')}>Products</Dropdown.Item>
                            <Dropdown.Item onClick={signoutHandler} onClick={()=>history.push('/orderlist/seller')}>Orders</Dropdown.Item>
                            <Dropdown.Item onClick={signoutHandler}>Sign Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )} */}
                     {userInfo && userInfo.isAdmin && (
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className='dropdrop'>
                                Admin
                            </Dropdown.Toggle>
                        
                            <Dropdown.Menu>
                            <Dropdown.Item onClick={signoutHandler} onClick={()=>history.push('/dashboard')}>Dashboard</Dropdown.Item>
                            <Dropdown.Item onClick={signoutHandler} onClick={()=>history.push('/productlist')}>Products</Dropdown.Item>
                            <Dropdown.Item onClick={signoutHandler} onClick={()=>history.push('/orderlist')}>Orders</Dropdown.Item>
                            <Dropdown.Item onClick={signoutHandler} onClick={()=>history.push('/userslist')}>Users</Dropdown.Item>
                            <Dropdown.Item onClick={signoutHandler}>Sign Out</Dropdown.Item>
                            </Dropdown.Menu>
                      </Dropdown>
                    
                    )}
                </span>

        </nav>
    )
}

export default Navbar
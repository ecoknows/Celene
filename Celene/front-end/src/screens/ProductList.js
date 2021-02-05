import {useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Rating } from '../components'
import  Product from './Product';
import { useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { listProducts } from '../actions/productActions';
import { useRouteMatch } from 'react-router-dom'

function getProductCategory(category,products){
    if(products)
        return products.filter(x => {
            return x.category.find((y) => y === category)
        })
    return[]
}
  

export default function ProductList(props) {
    const history = useHistory();
    const pageInfo = checkName(props.match.params.id,history);
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const dataFilter = getProductCategory(props.match.params.id,products);
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const { path } = useRouteMatch();
    const sellerMode = path.indexOf('/seller') >= 0;
    
    useEffect(()=>{
      dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }))
    },[dispatch])
  

    return (
        <div style={styles.container}>
            <FixedTop pageInfo={pageInfo}/>
            <div style={{height: '150vh',paddingTop:120}}>
                <Container fluid>
                    <Row style={{display:'flex',justifyContent:'center'}}>
                        {
                                dataFilter.map((item)=> 
                                <Col lg='0' style={styles.item} key={item._id} >
                                    <Product item={item} category={props.match.params.id}/>
                                    
                                </Col>
                                )
                            }
                        
                    </Row>
                </Container>
                    
            </div>
        </div>
    )
}


function checkName(name, history){
    let des = 'Check out our fresh newly arrive products';
    switch(name){
        case 'New':
            name = 'New Arrival'
            break;
        case 'Top':
            name = 'Top'
            des = 'Go forth & be fabulous!'
            break;
        case 'Bottom':
            name = 'Bottom'
            des = 'Forget the rules, if you like it, wear it'
            break;
        case 'Dress':
            name = 'Dress'
            des = 'Dress like you’re already famous';
        break;
        case 'Bikini':
            name = 'Bikini'
            des = 'Get Summer Time Ready.';
        break;
        case 'Monokini':
            name = 'Monokini'
            des = 'On The Corner of Hot and Sexy.';
        break;
        case 'BeachWear':
            name = 'Beach Wear'
            des = 'Dive into summertime.'
        break;
        default:
            history.push('/New');
            break;
    }
    return {name, des};
}

function FixedTop({pageInfo}){
    return(
        <div style={{backgroundColor:'white',position: 'fixed', width:'100%', height: '15%', zIndex: 3}}>
             <div  style={styles.topStyle}>
                <h1 style={{backgroundColor:'white', height:40, whiteSpace:'pre',
                            fontFamily:'Inter-Semi',
                            fontSize:30, }}>  {pageInfo.name}  </h1>
                    
                <h1 style={{
                    fontFamily:'Inter',
                    fontSize: '110%',
                }}>{pageInfo.des}</h1>
                <h1 style={{
                    fontFamily:'Inter',
                    fontSize: '105%',
                    whiteSpace:'pre'
                }}>W   O   M   A   N</h1>
                
            </div>
        </div>
    )
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

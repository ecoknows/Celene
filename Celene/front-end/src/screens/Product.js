import React from 'react'
import { Link } from 'react-router-dom'
import {Rating} from '../components'

function Product({item,key}) {
    return (
        <Link to={`products/${item._id}`} style={{textDecoration:'none', color:'black'}} key={key}>
            <div >
                    
                <div style={styles.dashesPrice} className='dashed_url'>
                    <Rating rating={item.rating} numReview={item.numReview}/>
                </div>
                <img src={item.img} style={{height:'45vh',width: 215,}}/>
                <div style={{height:118,paddingBottom:9,paddingTop:9}}>

                    <div style={styles.dashesLine} className='dashed_url'>
                        <h1 style={styles.item_title}>
                            {item.name}
                        </h1>
                        <h1 style={styles.item_price}>
                            ₱ {item.price.toLocaleString()}
                        </h1>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Product

const styles={
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

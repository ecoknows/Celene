import {useEffect, useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Product } from '../screens'
import {gsap} from 'gsap';

function getProductCategory(products){
    if(products)
        return products.filter(x => {
            return x.category.find((y) => y === 'Woman')
        })
    return[]
}
  

export default function Womans(props) {
    const {products} = props;

    const dataFilter = getProductCategory(products);
    useEffect(()=>{
        if(dataFilter.length != 0)
            gsap.to('.woman_image',{
                scrollTrigger: {
                trigger: '.woman_pic',
                },
                y: 0,
                x: 0,
                opacity: 1,
                rotation:0,
                duration:3,
            })
            gsap.to('.woman_item',{
                scrollTrigger: {
                trigger:'.woman_up'},
                y: 0,
                opacity: 1,
                duration:3,
            })
            
            gsap.to('.woman_text_anim',{
                scrollTrigger: '.woman_text_anim',
                x: 0,
                opacity: 1,
                duration:3,
            })
            
            gsap.to('.up_pic_anim',{
                scrollTrigger: '.up_pic_anim',
                y: 0,
                opacity: 1,
                duration:3,
            })
    },[dataFilter])

    return (
            <Container fluid style={styles.container}>
                <Row style={{height:'100%', margin:0}}>
                    <Col style={{margin:0, padding:0, paddingTop: 50,paddingLeft: 20, paddingRight: 20, width:'40%', height:'100%'}}>
                        <h1 style={styles.gender} className='woman_text_anim'>W  O  M  A  N  S</h1>
                        <h1 style={styles.title} className='up_pic_anim'>New Arrivals</h1>
                        <h1 style={styles.description} className='woman_text_anim'>The "super oversized cozy sweater" for your feet that's 100% vegan and 100% soft.</h1>
                        <ScrollContainer className="scroll-container"  style={styles.items}>
                            {
                                dataFilter.map((item)=> 
                                <div style={styles.item} key={item._id} className='woman_item'>
                                    <Product item={item} category='New'/>
                                </div>
                                )
                            }
                        </ScrollContainer>
                    </Col>
                    <Col lg='6' style={{margin:0, padding:0, transform: 'rotate(20deg) translateY(100px)', opacity: 0}} className='woman_image'>
                        <img src='/Images/homepage/woman.png' style={styles.images}/>
                    </Col>
                </Row>
            </Container>
    )
}

const styles = {
    container: {
        height: 'fit-content',
        margin: 0,
        padding: 0,
        marginBottom: 15,
    },
    dashesLine:{
        height: '100%',
        padding:10,
    },
    
    dashesPrice:{
        marginBottom: 10,
        padding:10,
        width:'100%',
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
    gender:{
        fontFamily: 'Inter',
        fontSize: 15,
        whiteSpace: 'pre',
        transform: 'translateX(-100px)',
        opacity: 0,
    },
    title:{
        fontFamily:'Inter-Semi',
        fontSize: 45,
        transform: 'translateY(100px)',
        opacity: 0,
    },
    description:{
        fontFamily: 'Inter',
        fontSize: 25,
        transform: 'translateX(-100px)',
        opacity: 0,
    },
    images:{
        height: '100%',
        width: '100%',
    },
    items:{
        display:'flex',
        height:'80vh',
        width:'100%',
    },
    item:{
        paddingTop: 20,
        width: 250,
        height:'100%',
        marginRight: 10,
        transform: 'translateY(100px)',
        opacity: 0
    }
}
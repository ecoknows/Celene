import React from 'react';
import {Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function LatestShowCase() {
    return (
        <Carousel>
            <Carousel.Item interval={4000} style={{height:'46vw'}}>
                    <div style={{height: '100%',
                            width: '100%',
                            backgroundAttachment: 'fixed',
                            backgroundImage:'url(images/homepage/first_slide_2.png)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100vw 50vw',

                    }}>
                    </div>
                <Carousel.Caption style={{left: 0, justifyConent: 'flex-start', paddingLeft: 16}}>
                    <h3 style={styles.title}>Ways to Stay Cozy</h3>
                    <p style={styles.paragraph}>Spread  comfort and comfort everywhere you go</p>
                    
                    <div style={styles.button}>
                        <div className="button_carousel"> 
                            <span style={styles.button_text}>Shop now</span>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            
            <Carousel.Item interval={4000} style={{height:'46vw'}}>
                    <div style={{height: '100%',
                            width: '100%',
                            backgroundAttachment: 'fixed',
                            backgroundImage:'url(images/homepage/second_slide.png)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100% 100%',
                            backgroundSize: '100vw 50vw',

                    }}>
                    </div>
                <Carousel.Caption style={{width: '100%', left: 0, justifyConent: 'flex-start', paddingLeft: 16}}>
                    <h3 style={styles.title}>New Year Fresh</h3>
                    <p style={styles.paragraph}>Start a new year with clean slate, literally</p>
                    
                    <div style={styles.button}>
                        <div className="button_carousel"> 
                            <span style={styles.button_text}>Shop now</span>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={4000} style={{height:'46vw'}}>
                    <div style={{height: '100%',
                            width: '100%',
                            backgroundAttachment: 'fixed',
                            backgroundImage:'url(images/homepage/third_slide.png)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100% 100%',
                            backgroundSize: '100vw 50vw',

                    }}>
                    </div>
                <Carousel.Caption style={{width: '100%', left: 0, justifyConent: 'flex-start', paddingLeft: 16}}>
                    <h3 style={styles.title}>Shop Your Style</h3>
                    <p style={styles.paragraph}>Be exclusive, Be devine, Be yourself.</p>
                    
                    <div style={styles.button}>
                        <div className="button_carousel"> 
                            <span style={styles.button_text}>Shop now</span>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default LatestShowCase

const styles ={
    images:{
        width:'100%',
        cursor: 'pointer',
    },
    title:{
        textAlign: 'start',
        fontSize: '5vw',
        fontFamily:'Roboto_Bold'
    },
    paragraph:{
        textAlign: 'start',
        fontSize: '3vw',
        fontFamily:'Roboto_Bold'
    },
    button:{
        backgroundColor:'white  ',
        display: 'flex',
        height: '4.5vw',
        width: '15.5vw',
        alignItems: 'center',
        justifyContent:'center'
    },
    button_text:{
        fontFamily:'Roboto_Slab',
        fontSize: '2vw',
        color: '#5E5353'
    }
}

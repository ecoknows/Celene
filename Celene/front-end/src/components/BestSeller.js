import {useEffect} from 'react'
import {gsap} from 'gsap';

export default function BestSeller({products}) {

    useEffect(()=>{
        gsap.to('.fade_anim',{
          scrollTrigger: '.fade_anim',
          opacity: 1,
          duration:4,
        })
    },[products]);

    return (
        <div style={styles.container}>
             <div style={{height: '50vw',
                        width: '100%',
                        backgroundAttachment: 'fixed',
                        backgroundImage:'url(images/homepage/best_seller.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100vw 50vw',
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center'

                }}>
                    <h1 style={styles.title} className='fade_anim'>Best Seller</h1>
                    <h1 style={styles.description} className='fade_anim'>Clothes  that  are  sure  to  heat  up  your  winter.</h1>
                    <h1 style={styles.shopnow} className='fade_anim'>Shop Now</h1>
                </div>
        </div>
    )
}

const styles={
    container: {
        height:'100vh'
    },
    title:{
        color:'white',
        fontFamily:'BerkshireSwash',
        fontSize: '11vw',
        lineHeight:1.5,
        opacity:0,
    },
    description:{
        color:'white',
        fontFamily:'Inter',
        fontSize: '2.5vw',
        whiteSpace:'pre',
        lineHeight:2,
        opacity:0,
    },
    shopnow:{
        color:'white',
        fontFamily:'Inter-Black',
        fontSize: '3vw',
        whiteSpace:'pre',
        lineHeight:2,
        opacity:0,
    }
}
import React from 'react'

export default function CheckoutSteps(props) {
    const {step1, step2,step3,step4} = props;
    return (
            <div className='signin_border'>
                <div className='row' style={{alignItems:'center'}}>
                    <div style={{backgroundColor: step1 ? '#e27802' : '#312c51', height: step1 ? 10 : 5, flex:1}}>
                    </div>
                    <div style={{backgroundColor: step2 ? '#e27802' : '#312c51', height: step2 ? 10 : 5, flex:1}}>
                    </div>
                    <div style={{backgroundColor: step3 ? '#e27802' : '#312c51', height: step3 ? 10 : 5, flex:1}}>
                    </div>
                    <div style={{backgroundColor: step4 ? '#e27802' : '#312c51', height: step4 ? 10 : 5, flex:1}}>
                    </div>
                </div>

                <div className='row' style={{alignItems:'center'}}>
                    <div style={{height:10, flex:1}}>
                        Sign in
                    </div>
                    <div style={{height:10, flex:1}}>
                        Shipping
                    </div>
                    <div style={{height:10, flex:1}}>
                        Payment
                    </div>
                    <div style={{height:10, flex:1}}>
                        Place Order 
                    </div>
                </div>
            </div>
    )
}

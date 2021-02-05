import React from 'react'

export default function Rating(props) {
    const { rating, numReview } = props
    return (
        <div className='rating'>
            <Heart half={rating >= 1 ? 1 : rating >= 0.5? 0: -1}/>
            <Heart half={rating >= 2 ? 1 : rating >= 1.5? 0: -1}/>
            <Heart half={rating >= 3 ? 1 : rating >= 2.5? 0: -1}/>
            <Heart half={rating >= 4 ? 1 : rating >= 3.5? 0: -1}/>
            <Heart half={rating >= 5 ? 1 : rating >= 4.5? 0: -1}/>
            <span>{numReview + ' reviews'}</span>
        </div>
      
        
    )
}


function Heart({half}){
    console.log(half);
    switch(half){
        case -1:
            return(
                <div className="rating-love">
                    <i className="fa fa-heart" style={{color:'#FF7D7D'}}></i>
                </div>
            )
        case 0:
            return(
                <div className="rating-love">
                    <span className="fa fa-heart" style={{color:'#FF7D7D'}}></span>
                    <span className="rate" style={{width:'50%'}}>
                        <span className="fa fa-heart full"></span>
                    </span>
                </div>
            )
        case 1:
            return(
                <div className="rating-love">
                    <i className="fa fa-heart" style={{color:'red'}}></i>
                </div>
            )

    }
}
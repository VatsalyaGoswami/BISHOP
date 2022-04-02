import React from "react";
const Rating=({val,text,color})=>{
    return (
        <>
        <div>
            <span>
                <i style={{color}} className={val>=1?'fas fa-star':val>=0.5?'fas fa-star-half-alt':'far fa-star'}></i>
            </span>
            <span>
                <i style={{color}}className={val>=2?'fas fa-star':val>=1.5?'fas fa-star-half-alt':'far fa-star'}></i>
            </span>
            <span>
                <i style={{color}}className={val>=3?'fas fa-star':val>=2.5?'fas fa-star-half-alt':'far fa-star'}></i>
            </span>
            <span>
                <i style={{color}} className={val>=4?'fas fa-star':val>=3.5?'fas fa-star-half-alt':'far fa-star'}></i>
            </span>
            <span>
                <i style={{color}} className={val>=5?'fas fa-star':val>=4.5?'fas fa-star-half-alt':'far fa-star'}></i>
            </span>
            <span>{text&&text}</span>
        </div>
        </>
    )
}
export default Rating;
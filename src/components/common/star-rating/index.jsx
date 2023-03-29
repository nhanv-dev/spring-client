import React from 'react';
import {UilStar} from '@iconscout/react-unicons';
import {UisStar, UisStarHalfAlt} from '@iconscout/react-unicons-solid';

function StarRating({rating, className}) {
    const classes = "text-rating " + className
    return (
        <div className="flex items-center justify-start gap-.5">
            {rating >= 1 ? <UisStar className={classes}/> :
                rating >= 0.4 ? <UisStarHalfAlt className={classes}/> :
                    <UilStar className={classes}/>
            }
            {rating >= 2 ? <UisStar className={classes}/> :
                rating >= 1.4 ? <UisStarHalfAlt className={classes}/> :
                    <UilStar className={classes}/>
            }
            {rating >= 3 ? <UisStar className={classes}/> :
                rating >= 2.4 ? <UisStarHalfAlt className={classes}/> :
                    <UilStar className={classes}/>
            }
            {rating >= 4 ? <UisStar className={classes}/> :
                rating >= 3.4 ? <UisStarHalfAlt className={classes}/> :
                    <UilStar className={classes}/>
            }
            {rating >= 5 ? <UisStar className={classes}/> :
                rating >= 4.4 ? <UisStarHalfAlt className={classes}/> :
                    <UilStar className={classes}/>
            }
        </div>
    );
}

export default StarRating;
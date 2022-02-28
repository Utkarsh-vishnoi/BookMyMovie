import React, { useState } from "react"
import StarBorderIcon from "@material-ui/icons/StarBorder"

import './starRatingBar.css'

const StarRatingBar = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(0)

  return (
    <div className="star-container">
      {[...Array(5)].map((star, index) => {
        index += 1
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => onRatingChange(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <StarBorderIcon />
          </button>
        )
      })}
    </div>
  )
}

export default StarRatingBar

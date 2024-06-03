import React from 'react'
import numeral from 'numeral'

function CurrencyFormat(price) {
    const formattedPrice = numeral(price).format("$0,0.00")
  return (
    <div>{formattedPrice}</div>
  )
}

export default CurrencyFormat
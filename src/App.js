import React, { useEffect, useState } from 'react'
import { Block } from './Block'
import './index.scss'

function App() {
  const [fromCurrency, setFromCurrency] = useState('HRN')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(0)
  const [rates, setRates] = useState({})
  const API_KEY = '28f72f08c78e48289a7bd08e1df0fe0e'
  //https://api.currencyfreaks.com/v2.0/rates/latest?apikey=
  useEffect(() => {
    fetch('http://localhost:8880/json')
      .then(res => res.json())
      .then(json => {
        setRates(json.rates)
        console.log(json.rates)
      })
      .catch(err => {
        console.warn(err)
      })
  }, [])

  const onChangeFromPrice = value => {
    const price = value / rates[fromCurrency]
    const result = price * rates[toCurrency]
    setToPrice(result)
    setFromPrice(value)
  }

  const onChangeToPrice = value => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value
    setFromPrice(result)
    setToPrice(value)
  }

  return (
    <div className='App'>
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  )
}

export default App

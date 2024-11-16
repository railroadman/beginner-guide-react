import React, { useEffect, useState } from 'react'
import { Block } from './Block'
import './index.scss'

function App() {
  const [fromCurrency, setFromCurrency] = useState('UAH')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(1)
  const [toPrice, setToPrice] = useState(1)
  //const [rates, setRates] = useState({})

  const ratesRef = React.useRef({})
  const API_KEY = '28f72f08c78e48289a7bd08e1df0fe0e'
  //https://api.currencyfreaks.com/v2.0/rates/latest?apikey=
  useEffect(() => {
    fetch('http://localhost:8880/json')
      .then(res => res.json())
      .then(json => {
        ratesRef.current = json.rates
        //setRates(json.rates)
      })
      .catch(err => {
        console.warn(err)
      })
  }, [])

  const onChangeFromPrice = value => {
    const price = value / ratesRef.current[fromCurrency]
    const result = price * ratesRef.current[toCurrency]
    setToPrice(result.toFixed(2))
    setFromPrice(value)
  }

  const onChangeToPrice = value => {
    const result =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value
    setFromPrice(result.toFixed(2))
    setToPrice(value)
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

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

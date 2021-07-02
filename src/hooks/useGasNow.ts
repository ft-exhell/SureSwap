import { useEffect, useState } from 'react'

let _wsObj: WebSocket

export function useGasNow(): number {
  const [gasPrice, setGasPrice] = useState(0)

  useEffect(() => {
    if (_wsObj === undefined) {
      _wsObj = new WebSocket('wss://www.gasnow.org/ws')
      _wsObj.onmessage = (evt) => {
        const data = JSON.parse(evt.data)
        if (data.type) {
          setGasPrice(data.data.gasPrices.fast)
        }
      }
    }
  })

  return gasPrice
}

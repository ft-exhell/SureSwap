import { useEffect, useState } from 'react'

const _wsObj: WebSocket = new WebSocket('wss://www.gasnow.org/ws')

export function useGasNow() {
  const [gasPrice, setGasPrice] = useState({ slow: 0, standard: 0, rapid: 0, fast: 0 })

  useEffect(() => {
    const onmessage = (evt: MessageEvent) => {
      const data = JSON.parse(evt.data)
      if (data.type) {
        setGasPrice(data.data.gasPrices)
      }
    }
    _wsObj.addEventListener('message', onmessage)
    return () => {
      _wsObj.removeEventListener('message', onmessage)
    }
  })

  return gasPrice
}

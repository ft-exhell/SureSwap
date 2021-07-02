class GasMonitor {
  private _gasPrice: number
  private _wsObj: WebSocket

  constructor() {
    this._gasPrice = 0
    this._wsObj = new WebSocket('wss://www.gasnow.org/ws')
    this._wsObj.onmessage = (evt) => {
      const data = JSON.parse(evt.data)
      if (data.type) {
        this._gasPrice = data.data.gasPrices.fast
      }
    }
  }

  public get gasPrice(): number {
    return this._gasPrice
  }
}

const gasMonitor: GasMonitor = new GasMonitor()

export function getGasNow(): number {
  return gasMonitor.gasPrice
}

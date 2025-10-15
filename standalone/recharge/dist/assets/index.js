const coins = [
  { icon: 'usdt', name: 'USDT - ERC20', address: '0x1234...ABCD' },
  { icon: 'btc', name: 'BTC', address: 'bc1q....xyz' },
  { icon: 'eth', name: 'ETH', address: '0x5678...EFGH' },
  { icon: 'trx', name: 'TRX', address: 'TX1234....5678' }
]

const iconMap = {
  usdt: './assets/icons/usdt.svg',
  btc: './assets/icons/btc.svg',
  eth: './assets/icons/eth.svg',
  trx: './assets/icons/trx.svg'
}

const arrowIcon = './assets/icons/jiantou.svg'

const listContainer = document.querySelector('[data-role="coin-list"]')

if (listContainer) {
  coins.forEach((coin) => {
    const item = document.createElement('div')
    item.className = 'listCoin'
    item.setAttribute('role', 'button')
    item.tabIndex = 0

    const left = document.createElement('div')
    left.className = 'left'

    const icon = document.createElement('img')
    icon.className = 'coin'
    icon.src = iconMap[coin.icon]
    icon.alt = coin.name

    const name = document.createElement('span')
    name.textContent = coin.name

    left.appendChild(icon)
    left.appendChild(name)

    const right = document.createElement('div')
    right.className = 'right'

    const arrow = document.createElement('img')
    arrow.className = 'jiantou'
    arrow.src = arrowIcon
    arrow.alt = '箭头'

    right.appendChild(arrow)

    item.appendChild(left)
    item.appendChild(right)

    item.addEventListener('click', () => {
      window.alert(`${coin.name} 地址: ${coin.address}`)
    })

    listContainer.appendChild(item)
  })
}

const backIcon = document.querySelector('[data-action="back"]')
if (backIcon) {
  backIcon.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back()
    }
  })
}

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
    item.className = 'item'
    item.setAttribute('role', 'button')
    item.tabIndex = 0

    const left = document.createElement('div')
    left.className = 'left'

    const icon = document.createElement('img')
    icon.className = 'icon'
    icon.src = iconMap[coin.icon]
    icon.alt = coin.name

    const name = document.createElement('span')
    name.className = 'name'
    name.textContent = coin.name

    left.appendChild(icon)
    left.appendChild(name)

    const arrow = document.createElement('img')
    arrow.className = 'arrow'
    arrow.src = arrowIcon
    arrow.alt = '查看'

    item.appendChild(left)
    item.appendChild(arrow)

    item.addEventListener('click', () => {
      window.alert(`${coin.name} 地址: ${coin.address}`)
    })

    item.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        item.click()
      }
    })

    listContainer.appendChild(item)
  })
}

const backButton = document.querySelector('[data-action="back"]')
if (backButton) {
  backButton.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      console.log('返回')
    }
  })
}

const serviceButton = document.querySelector('[data-action="service"]')
if (serviceButton) {
  serviceButton.addEventListener('click', () => {
    window.alert('联系客服，人工匹配商家')
  })
}

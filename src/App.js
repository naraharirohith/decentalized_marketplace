import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

import Marketplace from './abis/Marketplace.json'
import config from './config.json'

function App() {
  const [provider, setProvider] = useState(null)
  const [marketplace, setMarketplace] = useState(null)

  const [account, setAccount] = useState(null)

  const [item, setItem] = useState({})
  const [toggle, setToggle] = useState(false)
  const [items, setItems] = useState(null)

  const togglePop = (item) => {
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
  }

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()

    const marketplace = new ethers.Contract(config[network.chainId].marketplace.address, Marketplace, provider)
    setMarketplace(marketplace)

    const items = []

    for (var i = 0; i < 9; i++) {
      const item = await marketplace.items(i + 1)
      items.push(item)
    }

    setItems(items)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      {items && (
        <>
          <Section title={"Home"} items={items} togglePop={togglePop} />
        </>
      )}

      {toggle && (
        <Product item={item} provider={provider} account={account} marketplace={marketplace} togglePop={togglePop} />
      )}
    </div>
  );
}

export default App;

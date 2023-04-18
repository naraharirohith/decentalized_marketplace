import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, marketplace, togglePop }) => {
  const [order, setOrder] = useState(null)
  const [hasBought, setHasBought] = useState(false)
  const [supplyId , setSupplyId] = useState(null)
  const [isDelivered, setIsDelivered] = useState(false)
  const [boughtAt, setBoughtAt] = useState(null)

  const fetchDetails = async () => {
    const events = await marketplace.queryFilter("ItemBought")

    const orders = events.filter((event) => {
      // Check if the buyer's address matches the user account
      if (event.args.buyer !== account) {
        return false
      }
      // Check if the item ID matches the required item ID
      if (event.args.itemId.toString() !== item[0].toString()) {
        return false
      }
      // If both conditions are true, return true to include the event in the filtered list
      return true
    })

    console.log("order", orders);

    if (orders.length === 0) return

    const order = await marketplace.productDetails(orders[0].args.itemId, orders[0].args.supplyId)
    const supplyId = orders[0].args.supplyId
    setOrder(order)
    setSupplyId(supplyId)
    setIsDelivered(order.isDelivered)
  }

  const buyHandler = async () => {
    const signer = await provider.getSigner()

    // Buy item...
    let transaction = await marketplace.connect(signer).buyItem(item.itemId, { value: item.price })
    await transaction.wait()

    setHasBought(true)
    setBoughtAt(new Date().toDateString())
  }

  const deliverHandler = async () => {
    const signer = await provider.getSigner()

    // Call the ItemDelivered function...
    let transaction = await marketplace.connect(signer).deliverItem(item.itemId, supplyId)
    await transaction.wait()

    setIsDelivered(true)
    console.log("Item delivered!")
  }

  useEffect(() => {
    fetchDetails()
  }, [hasBought, isDelivered])

  return (
    <div className="product">
      <div className="product__details">
        <div className="product__image">
          <img src={item.imageHash} alt="Product" />
        </div>
        <div className="product__overview">
          <h1>{item.name}</h1>

          <hr />
          <p>{item.address}</p>
          <h2>{ethers.utils.formatUnits(item.price, 'ether')} ETH</h2>
          <hr />

          <h2>Overview</h2>
          <p> {item.description} </p>
        </div>

        <div className="product__order">
          <h1>{ethers.utils.formatUnits(item.price, 'ether')} ETH</h1>
          <p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </strong>
          </p>
          {item.supply > 0 ? (
            <p>In Stock.</p>
          ) : (
            <p>Out of Stock.</p>
          )}

          <button className='product__buy' onClick={buyHandler}>
            Buy Now
          </button>

          <p><small>Ships from</small> Amrita</p>
          <p><small>Sold by</small> Amrita</p>

          { order  && (
          <div className="product__bought">
            Item bought <br />
            <strong>
              { boughtAt }
            </strong>
            { order !== null ? (
              <p>Item Delivered</p>
            ) : (
              <button className='product__buy' onClick={deliverHandler}>
              Item Delivered
              </button>
            )}
            
          </div>
        )}
      </div>

        <button onClick={togglePop} className="product__close">
          <img src={close} alt="Close" />
        </button>
      </div>
    </div >
  );
}

export default Product;
import { ethers } from 'ethers'

const Section = ({ title, items, togglePop }) => {
    console.log(items);
    console.log("items in section")
    return (
        <div className='cards__section'>
            <h3 id={title}>{title}</h3>

            <hr />

            <div className='cards'>
                {items.map((item, index) => (
                    <div className='card' key={index} onClick={() => togglePop(item)}>
                        <div className='card__image'>
                            <img src={item.imageHash} alt="Item" />
                        </div>
                        <div className='card__info'>
                            <h4>{item.name}</h4>
                            <p>{ethers.utils.formatUnits(item.price.toString(), 'ether')} ETH</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Section;
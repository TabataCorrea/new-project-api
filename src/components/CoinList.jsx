    import React, {useState, useEffect} from 'react';
    import Coin from './Coin';

    const CoinList = () => {

        const[coinList, setCoinList] = useState([])
        const[coinName, setCoinName] = useState("")

        const mainContainer = {
            display: 'flex',
            flexDirection: 'column',
        }

        const url = "https://api.coinstats.app/public/v1/coins?skip=0"

        useEffect(
            () => {
                fetch(url)
                .then(
                    (result) => result.json()
                )
                .then(
                    (data) => setCoinList(data.coins)
                )
                .catch(
                    (err) => console.log(err))
            },[]
        )
    
        const filteredCoins = coinList.filter(
            (coin) => {
                console.log("NOME PESQUISADO: ", coin.name.toLowerCase())
                console.log("NOME COMPARADO: ", coin.name.toLowerCase())
                return coin.name.toLowerCase().includes(coinName.toLocaleLowerCase())
            }
        )
        return (

            <div style={mainContainer}>
    
                <div>
                    <input 
                        type="text" 
                        placeholder="Moeda" 
                        onChange={
                            (event) => {
                                setCoinName(event.target.value)
                            }
                        } 
                    />
                </div>
                <div>
                {
                    filteredCoins.map(
                        (coin) => {
                            return(
                                <Coin 
                                    name={coin.name}
                                    icon={coin.icon}
                                    price={coin.price}
                                    symbol={coin.symbol}
                                />
                            )                            
                        }
                    )
                }
            </div>

        </div>

    )
}

export default CoinList
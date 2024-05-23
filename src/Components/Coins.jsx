import React from 'react'
import {useState, useEffect} from 'react'
import Loader from './Loader'
import { baseURL } from './BaseUrl'
import axios from 'axios'
import Header from './Header'
import { Link } from 'react-router-dom'
import './Res.css'

const Coins = () => {

  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('inr')
  const [search, setSearch] = useState('');
  const currencySymbol = currency === 'inr' ? '₹' : '$'

  useEffect(()=>{
    const getCoinsData = async() => {
      try {
        const {data} = await axios.get(`${baseURL}/coins/markets?vs_currency=${currency}`);
        // console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    getCoinsData();
  },[currency])

  return (
    <>

    {
      loading ? <Loader/> : 
      <>
      <Header/>
      <div className="search-bar">
        <input type="text" 
        placeholder='Search Your Coins' 
        style={{height:'2rem', width:'20rem', position:'absolute', top:'1%', left:'35%', paddingLeft:'5px'}}
        onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      <div className="btns">
        <button onClick={()=>setCurrency('usd')}>usd</button>
        <button onClick={()=>setCurrency('inr')}>inr</button>
      </div>

      {
        coins.filter((data)=>{
          if(data === ''){
            return data;
          }else if(data.name.toLowerCase().includes(search.toLowerCase())){
            return data;
          }
        }).map((coinData, i)=>{
          return(
            <CoinCard item={coinData} i={i} currencySymbol={currencySymbol} id={coinData.id}/>
          )
        })
      }
      </>
    }
    </>
  )
}

const CoinCard = ({item, i, currencySymbol, id}) => {

  const profit = item.price_change_percentage_24h > 0;
  return(
    <Link to={`/coins/${id}`} style={{color:'white', textDecoration:'none'}}>
    <div key={i} className="ex-cards">
      <div className="image">
        <img height='80px' src={item.image} alt="" />
      </div>
      <div className="name">
        {item.name}
      </div>
      <div className="price">
        {currencySymbol} {item.current_price.toFixed(0)}
      </div>
      <div style={profit ? {color:'green'} : {color:'red'}}className="rank">
        {profit ? '+' + item.price_change_percentage_24h.toFixed(3) : item.price_change_percentage_24h.toFixed(3)}
      </div>
    </div>
    </Link>
  )
}

export default Coins
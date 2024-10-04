import React from 'react'
import { useState } from 'react'
import './searchBar.scss'
import { Link } from 'react-router-dom'
const types = ["buy", "rent"]

function SearchBar() {
    const [query, setQuery] = useState({
        type: "buy",
        location: "",
        minPrice: 0,
        maxPrice: 0,
    });

    const switchType = (val) => {
        console.log(val)
        setQuery((prev) => ({ ...prev, type: val }))
    }

    const handleInput = (e) => {
        setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(query);
    }

    return (
        <div className='searchBar'>
            <div className="type">
                {types.map((type, index) => (
                    <button
                        key={type}
                        className={query.type === type ? "active" : ""}
                        onClick={() => switchType(type)}>
                        {type}
                    </button>
                ))}

            </div>
            <form>
                <input type="text" name='city' placeholder='City' onChange={handleInput} />
                <input type="number" name='minPrice' min={0} max={10000000} placeholder='Min Price' onChange={handleInput} />
                <input type="number" name='maxPrice' min={0} max={10000000} placeholder='Max Price' onChange={handleInput} />
                <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
                    <button>
                        <img src="/search.png" alt="" />
                    </button>
                </Link>
            </form>

        </div>
    )
}

export default SearchBar
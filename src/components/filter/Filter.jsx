import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './filter.scss';

function Filter() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState({
        type: searchParams.get("type") || "",
        city: searchParams.get("city") || "",
        property: searchParams.get("property") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        bedroom: searchParams.get("bedroom") || "",
    })

    const handleChange = (e) => {
        e.preventDefault()
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    }

    const handleFilter = () => {
        setSearchParams(query)
    }


    console.log(searchParams);
    return (
        <div className='filter'>
            <h1>
                Search results for <b>{searchParams.city === "" ? "the location you want" : searchParams.city}</b>
            </h1>
            {/* TOP */}
            <div className="top">
                <div className="item">
                    <label htmlFor="city">
                        City
                    </label>
                    <input type="text" id='city' name='city' placeholder='City location' onChange={handleChange} defaultValue={query.city} />
                </div>
            </div>
            {/* BOTTOM */}
            <div className="bottom">
                <div className="item">
                    <label htmlFor="type">
                        Type
                    </label>
                    <select name='type' id='type' onChange={handleChange} defaultValue={query.type}>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="property">
                        Location
                    </label>
                    <select name='property' id='property' onChange={handleChange} defaultValue={query.property}>
                        <option value="any">Any</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                        <option value="land">Land</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="minPrice">
                        Min price
                    </label>
                    <input type="number" id='minPrice' name='minPrice' placeholder='any' onChange={handleChange} defaultValue={query.minPrice} />
                </div>
                <div className="item">
                    <label htmlFor="maxPrice">
                        Max price
                    </label>
                    <input type="number" id='maxPrice' name='maxPrice' placeholder='any' onChange={handleChange} defaultValue={query.maxPrice} />
                </div>
                <div className="item">
                    <label htmlFor="bedroom">
                        Bed room
                    </label>
                    <input type="number" id='bedroom' name='bedroom' placeholder='any' onChange={handleChange} defaultValue={query.bedroom} />
                </div>
                <button onClick={handleFilter} className="flex justify-center items-center rounded-md">
                    <img src="./search.png" alt="" />
                </button>
            </div>
        </div>
    );
}

export default Filter;
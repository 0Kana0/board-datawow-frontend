import React from 'react'
import "../../styles/search.css"
import { SearchIcon } from 'lucide-react'

const Search = () => {
  return (
    <div className='search-container'>
      <div className="search-content">
        <SearchIcon />
        <input type="text" placeholder='Search' />
      </div>
    </div>
  )
}

export default Search
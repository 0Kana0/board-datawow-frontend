import React from 'react'
import "../../styles/search.css"
import { SearchIcon } from 'lucide-react'
import { usePostFilterModal } from '@/hooks/PostFilterContext'

const Search = () => {
  const { filter, setFilter } = usePostFilterModal()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='search-container'>
      <div className="search-content">
        <SearchIcon />
        <input 
          type="text" 
          placeholder='Search' 
          name="search"
          onChange={handleChange}
          value={filter.search}
        />
      </div>
    </div>
  )
}

export default Search
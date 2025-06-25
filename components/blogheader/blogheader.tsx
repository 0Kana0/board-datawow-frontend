import React from 'react'
import "../../styles/blogheader.css"
import Dropdown from './dropdown'
import CreateButton from './createbutton'
import Search from './search'


const BlogHeader = () => {
  
  return (
    <div className='blogheader-container'>
      <Search />
      <div className="blogheader-right">
        <Dropdown />
        <CreateButton />
      </div>
    </div>
  )
}

export default BlogHeader
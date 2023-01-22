
import React, {useState} from 'react'
import './Search.css';
const Search = ({history}) => {
    const [keyword, setKeyword] = useState("")
    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/Products/${keyword}`)
        }
        else{
            history.push("/Products")
        }
    }
    return (
    <>
        <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input type="text"
               placeholder="Search a Product....."
               onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
        </form>
    </>
  );
};

export default Search
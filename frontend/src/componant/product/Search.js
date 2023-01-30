
import React, {useState} from 'react'
import './Search.css';
import MetaData from '../layout/metadata'
import { useNavigate } from 'react-router-dom';
const Search = () => {
    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate();
    const searchSubmitHandler = (e) =>{
        
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/Products/${keyword}`)
        }
        else{
            // Push is undefined ---> According to Error. -->>>> Resolved ###
            navigate("/Products");
        }
    }
    return (
    <>
        <MetaData title="Search Item"/>
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
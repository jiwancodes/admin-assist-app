import React from 'react'

function SearchPage() {
    return (
        <div className="searchField">
        <form>
          <label>UserName:</label>
        <input type="text" placeholder="Enter UserName" style={{margin:"5px auto"}}></input>
        <br/>
        <label>Mobile no  :  </label>
        <input type="text" placeholder="Enter Mobile Number" style={{margin:"5px auto"}}></input>  
        <br/>
        <label>Choose between npstocks and systemxlite</label>
        <select>
        <option>npstocks</option>
        <option>systemxlite</option>
        </select>     
        <br/>
        <input type="button" name="search" value="Search" style={{margin:"5px auto"}}></input>
        </form>
        <div className="result-table" style={{height:200,width:400,border: "1px solid rgb(212, 212, 212)", alignSelf:"center",margin:"10px auto",}}>
          <p>show the result of search here</p>
        </div>
      </div>
    )
}

export default SearchPage

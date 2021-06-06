import { React, useState, useEffect } from 'react'
import MaterialAppBar from '../../components/MaterialAppBar'
import TableWithPaginationAndSearch from '../table/UserDetailsTableWithPaginationAndSearch'
function Home() {
  const [database, setDatabase] = useState("npstock");

  return (
    <div>
      <MaterialAppBar database={database} setDatabase={setDatabase}/>
      <TableWithPaginationAndSearch/>
      
    </div>
  )
}

export default Home

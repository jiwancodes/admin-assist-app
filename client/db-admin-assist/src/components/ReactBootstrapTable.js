import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import React from 'react'


function ReactBootstrapTable(props) {
    const { SearchBar, ClearSearchButton } = Search;

const columns = [{
  dataField: 'username',
  text: 'Username'
}, {
  dataField: 'phone',
  text: 'Phone Number'
}, {
  dataField: 'expiry_date',
  text: 'Expiry Date'
},
{
    dataField: 'null',
    text: 'Extend expiry date'
  }
];



    return (
        <div>
            <ToolkitProvider
  keyField="id"
  data={ props.rows }
  columns={ columns }
  search
>
  {
    props => (
      <div>
        <h3>Input something at below input field:</h3>
        <SearchBar { ...props.searchProps } />
        <ClearSearchButton { ...props.searchProps } />
        <hr />
        <BootstrapTable
          { ...props.baseProps }
        />
      </div>
    )
  }
</ToolkitProvider>
            
        </div>
    )
}

export default ReactBootstrapTable





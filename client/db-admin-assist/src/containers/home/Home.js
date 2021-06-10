// import { React, useState} from 'react'
// import axios from '../../axios-order';
import MaterialAppBar from '../../components/MaterialAppBar'
function Home(props) {
    //  const [database, setDatabase] = useState("npstock"); 
    // const [rows, setrows] = useState("");
 

  //   const fetchAllUserDataByDatabase = (database) => {
  //     console.log("fetche data called");
  //     axios.get(`/user/details/${database}`).then((response) => {
  //         // console.log("here are rows");
  //         // console.log(response.data.rows);
  //         var tempData = JSON.parse(response.data.rows);
  //         setrows(tempData);
  //     })
  // }

//   const fetchAllUpdateLogsByDatabase = (database) => {
//     console.log("fetche data called");
//     let payload={
//         "option":database
//     };
//     axios.post(`/updatelogs`,payload).then((response) => {
//       console.log("called update logs");
//         var tempData = JSON.parse(response.data.rows);
//         setrows(tempData);
//     })
//     console.log(rows);
// }
  return (
    <div>
      <MaterialAppBar/>

    </div>
  )
}
export default Home

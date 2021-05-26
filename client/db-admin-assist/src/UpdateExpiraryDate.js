import React, { Component } from 'react'

export class UpdateExpiraryDate extends Component {
    addOneYear=()=>{
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var c = new Date(year + 1, month, day);
        console.log(c);
    }
    addLifeTime=()=>{
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var c = new Date(year + 1000, month, day);
        console.log(c);
    }

    render() {
        return (
            <div className="updatePageWrapper">
                <div>Show account Username and Password here whose expirary date is to be changed</div>
                <div>
                <input type="button" value="Add a year"></input>
                <input type="button" value="Add lifetime"></input>             
                </div>
            </div>
        )
    }
}

export default UpdateExpiraryDate


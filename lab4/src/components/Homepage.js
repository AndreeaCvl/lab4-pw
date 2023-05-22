import React, { useState, useEffect } from "react";
import { getUsers } from "../requests";

function Homepage() {
    const [data, setdata] = useState({
        name: "",
        surname: "",
        id: 0,
    });
  
    // get all users
    useEffect(() => {
        getUsers().then(response=>{
            console.log("here")
            console.log(response.data[0])
            console.log("up")

            setdata({
                name: response.data[0].name,
                surname: response.data[0].surname,
                id: response.data[0].id,
            });

        });
    }, []);
  
    return (
        <div className="App">
            <header className="App-header">
                <h1>React and flask</h1>
                {/* Calling a data from setdata for showing */}
                <p>{data.name}</p>
                <p>{data.surname}</p>
                <p>{data.id}</p>  
            </header>
        </div>
    );
}

export default Homepage
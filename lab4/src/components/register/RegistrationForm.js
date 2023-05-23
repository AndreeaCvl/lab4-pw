import React , {useState} from "react";
import { register } from "../../requests";
import { useNavigate} from "react-router-dom";

import { useContext } from 'react';
import { UserContext } from "../../UserContext";

export default function RegistrationForm() {

    const { updateUser } = useContext(UserContext);


    const [name,setName] = React.useState("");
    const [surname,setSurname] = React.useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "name"){
            setName(value);
        }
        if(id === "surname"){
            setSurname(value);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        
        const RegisterRequest = {name, surname};

        register(RegisterRequest).then(response=>{
            console.log(response);
            updateUser(response.data.id);
            navigate("/quizzes-list",/*{state:{id:response.data.id}}*/);
        });
    }    

    return (
        <div className="registration-form">
            <div className="form-element">
            <form>
                <label>
                    <div className="formInputName"></div>
                    <input placeholder="Name" className="formInput" type="text" value={name} onChange = {(e) => handleInputChange(e)} id="name" />
                </label>
                <label>
                    <div className="formInputName"></div>
                    <input  placeholder="Surname" className="formInput" type="text" value={surname} onChange = {(e) => handleInputChange(e)} id="surname" />
                </label>
                <div className="formButton">
                    <input type="submit" value="Create user" onClick={handleSubmit}/>
                </div>
            </form>
            </div>
        </div>
    )
}
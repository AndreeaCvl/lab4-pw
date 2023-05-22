import React , {useState} from "react";
import { register } from "../../requests";
import { useNavigate} from "react-router-dom";

export default function RegistrationForm() {

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
            navigate("/quizzes-list",{state:{id:response.data.id}});
        });
    }    

    return (
        <div>
            <form>
                <label>
                    <div className="formInputName">Name</div>
                    <input  className="formInput" type="text" value={name} onChange = {(e) => handleInputChange(e)} id="name" />
                </label>
                <label>
                    <div className="formInputName">Surname</div>
                    <input  className="formInput" type="text" value={surname} onChange = {(e) => handleInputChange(e)} id="surname" />
                </label>
                <div className="formButton">
                    <input type="submit" value="Go" onClick={handleSubmit}/>
                </div>
            </form>
        </div>
    )
}
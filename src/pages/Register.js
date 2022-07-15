/*
The below code is reffred from below resources:
https://www.npmjs.com/package/amazon-cognito-identity-js
*/

import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails,
} from "amazon-cognito-identity-js";
import axios from "axios";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const shortUUID = require('short-uuid')
var poolData = {
    UserPoolId: 'us-east-1_rIytU64lO', 
    ClientId: '6qbs04aqbt3htai8l8pikfbivl', 
};

const userPool = new CognitoUserPool(poolData);

const Register = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [emailerror, setEmailerror] = useState();
    const [name, setName] = useState('')
    const [ferror, setFerror] = useState();
    const [password, setPassword] = useState('')
    const [passworderror, setPassworderror] = useState();
    const [birthplaceanswer, setBirthPlaceAnswer] = useState('')
    const [birthplaceanswererror, setBirthPlaceAnswererror] = useState();
    const [foodanswer, setFoodAnswer] = useState('')
    const [foodanswererror, setFoodAnswererror] = useState();
    const [coloranswer, setColorAnswer] = useState('')
    const [coloranswererror, setColorAnswererror] = useState();


    const validateName = (value) => {
        const regexforname = /^[A-Za-z ]+$/;
        if (regexforname.test(value)) {
            setName(value)
            setFerror(null);
        } else {
            setName(value);
            setFerror("Enter only letters")
        }
    }

    const validatEmail = (value) => {
        const regexforemail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (regexforemail.test(value)) {
            setEmail(value)
            setEmailerror(null);
        } else {
            setEmail(value);
            setEmailerror("Enter valid Email Address")
        }
    }

    const validatPassword = (value) => {
        const regexforpassword = /^[a-zA-Z0-9!@#$%^&*]{8,25}$/;
        if (regexforpassword.test(value)) {
            setPassword(value)
            setPassworderror(null);
        } else {
            setPassword(value);
            setPassworderror("Password must have minimum 8 letter and one special character")
        }
    }

    const validateBirthPlaceAnswer = (value) => {
        const regexforname = /^[A-Za-z ]+$/;
        if (regexforname.test(value)) {
            setBirthPlaceAnswer(value)
            setBirthPlaceAnswererror(null);
        } else {
            setBirthPlaceAnswer(value);
            setBirthPlaceAnswererror("Enter only letters")
        }
    }

    const validateFoodAnswer = (value) => {
        const regexforname = /^[A-Za-z ]+$/;
        if (regexforname.test(value)) {
            setFoodAnswer(value)
            setFoodAnswererror(null);
        } else {
            setFoodAnswer(value);
            setFoodAnswererror("Enter only letters")
        }
    }

    const validateColorAnswer = (value) => {
        const regexforname = /^[A-Za-z ]+$/;
        if (regexforname.test(value)) {
            setColorAnswer(value)
            setColorAnswererror(null);
        } else {
            setColorAnswer(value);
            setColorAnswererror("Enter only letters")
        }
    }

    const handleSubmit = (event) => {

        if (emailerror || ferror || passworderror || birthplaceanswererror || foodanswererror || coloranswererror) {
            return;
        } else {

            event.preventDefault()

            var userid = shortUUID.generate();
            console.log(userid);

            const attributeList = [
                new CognitoUserAttribute({
                    Name: "email",
                    Value: email
                }),
                new CognitoUserAttribute({
                    Name: "name",
                    Value: name
                }),
                new CognitoUserAttribute({
                    Name: "custom:userid",
                    Value: userid.toString(),
                })
            ];


            userPool.signUp(email, password, attributeList, null, function (
                err,
                result
            ) {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                }
                var cognitoUser = result.user;

                axios.post('https://k6isuvi4x0.execute-api.us-east-1.amazonaws.com/test/register', {
                    userid,
                    email,
                    birthplaceanswer,
                    foodanswer,
                    coloranswer
                }).then(()=>{console.log('user name is ' + cognitoUser.getUsername());})

                navigate("/login");

                console.log('user name is ' + cognitoUser.getUsername());
            });
        }
    }

    return (

        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <center>
                        <h1>Registration</h1>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Name:
                                <input
                                    className='form-control mb-3'
                                    type='text'
                                    value={name}
                                    name='name'
                                    onChange={(event) => validateName(event.target.value)}

                                />
                            </label>
                            {ferror && <p>{ferror}</p>}
                            <br />

                            <label>
                                Email:
                                <input
                                    className='form-control mb-3'
                                    type='text'
                                    value={email}
                                    name='email'
                                    onChange={(event) => validatEmail(event.target.value)}
                                />
                            </label>
                            {emailerror && <p>{emailerror}</p>}
                            <br />

                            <label>
                                Password:
                                <input
                                    type='text'
                                    className='form-control mb-3'
                                    value={password}
                                    name='password'
                                    onChange={(event) => validatPassword(event.target.value)}
                                />
                            </label>
                            {passworderror && <p>{passworderror}</p>}
                            <br />

                            <label>
                                What is your birth place:
                                <input
                                    type='text'
                                    className='form-control mb-3'
                                    value={birthplaceanswer}
                                    name='birthplaceanswer'
                                    onChange={(event) => validateBirthPlaceAnswer(event.target.value)}
                                />
                            </label>
                            {birthplaceanswererror && <p>{birthplaceanswererror}</p>}
                            <br />

                            <label>
                                What is your favorite food:
                                <input
                                    type='text'
                                    className='form-control mb-3'
                                    value={foodanswer}
                                    name='foodanswer'
                                    onChange={(event) => validateFoodAnswer(event.target.value)}
                                />
                            </label>
                            {foodanswererror && <p>{foodanswererror}</p>}
                            <br />

                            <label>
                                What is your favorite color:
                                <input
                                    type='text'
                                    className='form-control mb-3'
                                    value={coloranswer}
                                    name='coloranswer'
                                    onChange={(event) => validateColorAnswer(event.target.value)}
                                />
                            </label>
                            {coloranswererror && <p>{coloranswererror}</p>}
                            <br />


                            <input type='submit' value='Submit' />
                        </form>
                    </center>
                </div>
            </div>
        </div>



    );

}

export default Register
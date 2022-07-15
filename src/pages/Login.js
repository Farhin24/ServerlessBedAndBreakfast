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
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

var poolData = {
    UserPoolId: 'us-east-1_rIytU64lO',
    ClientId: '6qbs04aqbt3htai8l8pikfbivl',
};

const userPool = new CognitoUserPool(poolData);

const Login = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [emailerror, setEmailerror] = useState();
    const [password, setPassword] = useState('')

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

    const handleSubmit = (event) => {

        if (emailerror) {
            return;
        } else {
            const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
            const authenticationDetails = new AuthenticationDetails({
                Username: email,
                Password: password,
            });

            event.preventDefault()

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    console.log( result.idToken.payload);

                    var response = result.idToken.payload;
                    var userid = response['custom:userid']
                    var cognitousername = response['cognito:username']
                    
                    console.log("userid: " + userid);
                    console.log("token: " + result.getIdToken().getJwtToken());
                    console.log("cognitousername: " + cognitousername);
    
                    localStorage.setItem('jwttoken', result.getIdToken().getJwtToken());
                    localStorage.setItem('email', result.idToken.payload.email);
                    localStorage.setItem('userid', userid);
                    localStorage.setItem('cognitousername', cognitousername);

                    console.log("LoggedIn");
                    navigate("/securityquestion");
                },
                onFailure: function (err) {
                    console.log(err.message);
                }
            }
                );
            }
        }

        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <center>
                            <h1>Login</h1>
                            <form onSubmit={handleSubmit}>

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
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </label>
                                <br />


                                <input type='submit' value='Submit' />
                            </form>
                        </center>
                    </div>
                </div>
            </div>
        );

    }

    export default Login
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

const Nextpage = () => {

    let navigate = useNavigate();

    const signOut = () => {

        const currentCognitoUser = userPool.getCurrentUser();
        if (currentCognitoUser !== null) {
            currentCognitoUser.signOut();
        }

        localStorage.removeItem('jwttoken');
        localStorage.removeItem('email');
        localStorage.removeItem('userid');
        localStorage.removeItem('cognitousername');
        navigate("/login");
    }


    return (

        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <center>
                        <h1>Signout Button</h1>
                        <button onClick={signOut}>
                            Signout
                        </button>

                    </center>
                </div>
            </div>
        </div>
    );

}

export default Nextpage
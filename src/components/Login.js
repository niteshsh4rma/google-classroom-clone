import React, { useState, useEffect } from 'react'
import LandingLogo from '../media/landinglogo.png'
import { Button } from '@material-ui/core'
import { auth } from '../firebase'
import firebase from 'firebase'
import '../styles/Login.css'
import { useStateValue } from '../StateProvider'
import { useHistory } from 'react-router-dom'
import udatelist from '../updatelist'

function Login() {

    const [{ user }, dispatch] = useStateValue()

    const history = useHistory()

    useEffect(() => {
        if (user) {
            history.push("/u")
            dispatch({
                type: "UPDATE_CLASSLIST"
            })
        } else {
            history.push("/")
        }
    }, [user])

    const handleAuth = () => {

        var provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithRedirect(provider)

        firebase.auth()
            .getRedirectResult()
            .then((result) => {
                if (result.credential) {
                    /** @type {firebase.auth.OAuthCredential} */
                    var credential = result.credential;

                    // The signed-in user info.
                    var user = result.user;

                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = credential.accessToken;
                    // ...


                    dispatch({
                        type: "SET_USER",
                        user: user
                    })


                    // user keys {J, l, m, s, a, b, za, _lat, refreshToken, uid, displayName, photoURL, email, emailVerified, phoneNumber, isAnonymous, tenantId, metadata, providerData, xa, pa, v, ac, gb, R, i, S, h, u, aa, ya, Oa, ja, Aa, X, $, Ba, ba, O, multiFactor, ha})


                }
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });


    }


    return (
        <div class="login">
            <img className="login__logo" src={LandingLogo} />
            <br />


            {
                user ? (<p>Hello, {user.displayName}</p>) : (<Button variant="contained" className="login__signinButton" size="large" onClick={handleAuth}>
                    Login with Google
                </Button>)
            }
        </div>
    )
}

export default Login

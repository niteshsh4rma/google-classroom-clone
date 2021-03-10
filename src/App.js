import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Header from './components/Header'
import Home from './components/Home'
import ClassHome from './components/ClassHome'
import { useStateValue } from './StateProvider'
import { auth, db } from './firebase'

function App() {

  const [{ user }, dispatch] = useStateValue()
  useEffect(() => {

    auth.onAuthStateChanged(async (authUser) => {

      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

        await db.collection('users').doc(authUser.email).collection('created').onSnapshot((querySnapshot) => {
          let updatedclasses = {}
          querySnapshot.forEach((doc) => {
            updatedclasses[doc.id] = doc.data()
          });
          dispatch({
            type: "UPDATE_CLASSLIST",
            classlist: updatedclasses
          })

        });

        await db.collection('users').doc(authUser.email).collection('joined').onSnapshot((querySnapshot) => {
          let joinedcodes = {}
          querySnapshot.forEach((doc) => {
            joinedcodes[doc.id] = doc.data()
          })

          let returnjoin = {}
          Object.keys(joinedcodes).map(async (key) => {
            await db.collection('users').doc(joinedcodes[key].teacherEmail).collection('created').doc(key).onSnapshot((doc)=>{
              returnjoin[key] = doc.data()
            })
          })


          dispatch({
            type: "UPDATE_JOINLIST",
            joinlist: returnjoin
          })

        })







      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }

    })



  }, [user])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            {user ?
              (
                <>
                  <Header />
                  <Home />
                </>
              ) : <Login />}
          </Route>
          <Route exact path="/c/:cid">
            {user ?
              (
                <>
                  <Header />
                  <ClassHome />
                </>
              ) : <Login />}
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;

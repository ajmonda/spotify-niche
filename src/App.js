import React from 'react'
import './App.css'

import queryString from 'query-string'

function App() {

  const string = queryString.parse(window.location.search)
  const accessToken = string.access_token

  return accessToken ? (

    <div className="App">
      
      <h1>Hello</h1>
    </div>
  )
    : (
      // Login component here
    <button>Login</button>
  );
}

export default App;
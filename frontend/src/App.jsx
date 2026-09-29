import React from 'react'
import Form from './component/Form'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import UserList from './component/UserList'

const App = () => {
  return (
    <div>
     <BrowserRouter>
     <Routes>
        
        <Route path="/" element={<Form/>}/>

        <Route path="/signup" element={<Form />} />

        <Route path="/users" element={<UserList />} />

        <Route path="/signup/:id" element={<Form/>}/>

     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App

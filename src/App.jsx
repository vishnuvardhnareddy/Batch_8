import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./componets/CustomNavbar.jsx";
import Banner from './componets/Banner.jsx';
import FlashcardCreator from './componets/FlashcardCreator.jsx';
import Storage from './componets/Storage.jsx';
import Notes from './componets/Notes.jsx';
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Banner></Banner>
      <FlashcardCreator></FlashcardCreator>
      <Storage />
      <Notes />
    </div>
  )
}

export default App

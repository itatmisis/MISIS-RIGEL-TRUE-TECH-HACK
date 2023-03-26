import { useState } from 'react'
import Header from "./components/header/Header";
import MainPage from "./pages/mainPage/MainPage";
import {Main} from "./components/ui/main/Main";
import Footer from "./components/footer/Footer";
import SettingsPage from "./pages/settingsPage/settingsPage";
import {Route, Routes} from "react-router-dom";
import ColorsSection from "./pages/settingsPage/ColorsSection/ColorsSection";
import VideoPage from "./pages/VideoPage/VideoPage";

function App() {
  return (
      <>
        <Header/>
        <Main>
            <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/settings" element={<SettingsPage/>}>
                <Route path="colors" element={<ColorsSection/>}/>
                <Route path="*" element={<div>404</div>}/>
            </Route>
                <Route path="video" element={<VideoPage/>}/>
            </Routes>
        </Main>
        <Footer/>
          </>
  )
}




export default App

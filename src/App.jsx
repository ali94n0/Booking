
import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HotelsPage from "./pages/HotelsPage";
import SingleHotel from "./components/singleHotel/SingleHotel";
import AppLayout from "./components/appLayout/AppLayout";
import HotelsProvider from "./context/HotelsProvider";


function App() {
  return <div>
    <HotelsProvider>

    <Toaster/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/hotels" element={<AppLayout/>} >
        <Route index element={<HotelsPage/>} />
        <Route path="/hotels/:id" element={<SingleHotel/>}/>
      </Route>
    </Routes>
    </HotelsProvider>
  </div>
}

export default App;


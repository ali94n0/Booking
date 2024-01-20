
import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HotelsPage from "./pages/HotelsPage";
import SingleHotel from "./components/singleHotel/SingleHotel";
import AppLayout from "./components/appLayout/AppLayout";
import HotelsProvider from "./context/HotelsProvider";
import BookmarkLayout from "./components/bookmarkLayout/BookmarkLayout";
import BookmarksList from "./components/bookmarksList/BookmarksList";
import AddBookmark from "./components/addBookmark/AddBookmark";
import BookmarksProvider from "./context/BookmarksProvider";
import SingleBookmark from "./components/singleBookmark/SingleBookmark";


function App() {
  return <div>
    <HotelsProvider>
    <BookmarksProvider>


    <Toaster/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/hotels" element={<AppLayout/>} >
        <Route index element={<HotelsPage/>} />
        <Route path="/hotels/:id" element={<SingleHotel/>}/>
      </Route>
      <Route path="/bookmarks" element={<BookmarkLayout/>}>
        <Route index element={<BookmarksList/>}/>
        <Route path=":id" element={<SingleBookmark/>}/>
        <Route path="add" element={<AddBookmark/>}/>
      </Route>
    </Routes>
    </BookmarksProvider>
    </HotelsProvider>
  </div>
}

export default App;


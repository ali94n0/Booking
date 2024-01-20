import { createContext, useContext, useState } from "react";
import axios from "axios";

const bookmarkContext = createContext();
const BASE_URL = "http://localhost:5000"

export default function BookmarksProvider({children}){
    const[bookmarks,setBookmarks] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [currentBookmark,setCurrentBookmark]= useState(null)
    const [error,setError] = useState(null)


    const getAllBookmarks =async()=>{
    setIsLoading(true);
    try {
        const {data} = await axios.get(`${BASE_URL}/bookmarks`)
        setBookmarks(data)
    } catch (error) {
        setError(error.message)
    }finally{
        setIsLoading(false)
    }
    }

    const getSingleBookmark= async(id)=>{
        setIsLoading(true);
        try {
            const{data} = await axios.get(`${BASE_URL}/bookmarks/${id}`)
            setCurrentBookmark(data)
        } catch (error) {
            setError(error.message)
        }finally{
            setIsLoading(false)
        }

    }

    const DeleteBookmark = async(id)=>{
        setIsLoading(true);
        try {
            const {data} = await axios.delete(`${BASE_URL}/bookmarks/${id}`)
            setBookmarks(prev => prev.filter(item => item.id !== id))

        } catch (error) {
            setError(error.message)
        }finally{setIsLoading(false)}
    }

    const addNewBookmark = async(bookmark)=>{
        setIsLoading(true)
        try {
            const {data} = await axios.post(`${BASE_URL}/bookmarks`,bookmark)
            setBookmarks((prev)=>[...prev,data])
        } catch (error) {
            setError(error.message)
        }finally{
            setIsLoading(false)
        }
    }

    return(
        <bookmarkContext.Provider value={{getAllBookmarks,bookmarks,getSingleBookmark,isLoading,currentBookmark,error,DeleteBookmark,addNewBookmark}}>
            {children}
        </bookmarkContext.Provider>
    )
}

export const useBookmark=()=>{
return useContext(bookmarkContext)
}
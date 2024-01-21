import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const bookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

const initialState = {
    bookmarks:[],
    currentBookmark:null,
    isLoading:false,
    error:null,
}

const bookmarkReducer = (state,action)=>{
    switch (action.type) {
        case "pending":return{...state,isLoading:true}
        case "bookmarks/loaded":return{...state,isLoading:false,bookmarks:action.payload}
        case "bookmark/loaded":return{...state,isLoading:false,currentBookmark:action.payload}
        case "bookmark/deleted":return{...state,isLoading:false,bookmarks:state.bookmarks.filter(item=>item.id !== action.payload)}
        case "bookmark/added":return{...state,isLoading:false,bookmarks:[...state.bookmarks,action.payload]}
        case "rejected":return{...state,isLoading:false,error:action.payload}
    
        default: throw new Error("action not found")
    }
}

export default function BookmarksProvider({children}){
    
const [{bookmarks,currentBookmark,isLoading,error},dispatch] = useReducer(bookmarkReducer,initialState)


    const getAllBookmarks =async()=>{
    dispatch({type:"pending"});
    try {
        const {data} = await axios.get(`${BASE_URL}/bookmarks`)
        dispatch({type:"bookmarks/loaded",payload:data})
    } catch (error) {
        dispatch({type:"rejected",payload:error.message})
    }
    }

    const getSingleBookmark= async(id)=>{
        
        if(Number(id) === currentBookmark.id)return;
        dispatch({type:"pending"});
        try {
            const{data} = await axios.get(`${BASE_URL}/bookmarks/${id}`)
            dispatch({type:"bookmark/loaded",payload:data})
        } catch (error) {
            dispatch({type:"rejected",payload:error.message})
        }

    }

    const DeleteBookmark = async(id)=>{
        dispatch({type:"pending"})
        try {
            const {data} = await axios.delete(`${BASE_URL}/bookmarks/${id}`)
            dispatch({type:"bookmark/deleted",payload:id})

        } catch (error) {
            dispatch({type:"rejected",payload:error.message})
        }
    }

    const addNewBookmark = async(bookmark)=>{
        dispatch({type:"pending"})
        try {
            const {data} = await axios.post(`${BASE_URL}/bookmarks`,bookmark)
            dispatch({type:"bookmark/added",payload:data})
            dispatch({type:"bookmark/loaded" , payload:data})
        } catch (error) {
            dispatch({type:"rejected",payload:error.message})
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
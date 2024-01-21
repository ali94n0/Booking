import { createContext, useContext, useReducer } from "react"

const FAKE_USER={
    name:"ali",
    email:"ali94n0@gmail.com",
    password:"123456"
}

const authContext = createContext()

const initialState={
    user:null,
    isAuth:false
}

const authReducer=(state,action)=>{
    switch (action.type) {
        case "login":return{...state,isAuth:true,user:action.payload}
        case "logout":return{...state,isAuth:false,user:null}  
    
        default:throw new Error("action not found")
    }
}

export default function AuthProvider({children}){

    const[{user,isAuth},dispatch] = useReducer(authReducer,initialState)

    const login=(email,password)=>{
        if(email === FAKE_USER.email && password === FAKE_USER.password){
            dispatch({type:"login",payload:FAKE_USER})
        }
    }

    const logout=()=>{
        dispatch({type:"logout"})
    }

    return <authContext.Provider value={{user,isAuth,login,logout}}>
        {children}
    </authContext.Provider>
}

export const useAuth = ()=>{
    return useContext(authContext)
}
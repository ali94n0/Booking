import {MdLocationOn} from "react-icons/md";
import {HiCalendar, HiLogout, HiMinus, HiPlus, HiSearch} from "react-icons/hi"
import { useRef, useState } from "react";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range'; 
import { format } from "date-fns";
import useOutsideClick from "../../hooks/useOutsideClick";
import { Link, NavLink, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Header = () => {
    const{isAuth,user,logout} = useAuth() 
    const[destination,setDestination]= useState("")
    const [isOpenDate,setIsOpenDate] = useState(false);
    const [isOpenOption,setIsOpenOption]=useState(false);
    const [dateRange,setDateRange] = useState([{
        startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }]);
    const [guestOption,setGuestOption]=useState({
        adult:1,
        children:0,
        room:1
    })

    const navigate = useNavigate()
    const dateRef = useRef()
    useOutsideClick(dateRef,()=>setIsOpenDate(false),"dateDropDown")

    const handleOption=(type,operation)=>{
        setGuestOption((prev)=>({...prev,[type]: operation === "increment" ? guestOption[type]++ : guestOption[type]-- }))

    }

    const handleSearch = ()=>{
        const encodedParams = createSearchParams({
            destination,
            date:JSON.stringify(dateRange),
            option:JSON.stringify(guestOption)

        })
        
        navigate({
            pathname:"/hotels",
            search:encodedParams.toString()
        })
    }

    
    return (
        <div className="header">
            <div>
                <NavLink to={"/bookmarks"} className={({isActive})=>isActive ? "active" : ""}>Bookmarks</NavLink>
            </div>
            <div className="headerSearch">
                <div className="headerSearchItem">
                    <MdLocationOn className="headerIcon locationIcon"/>
                    <input type="text" placeholder="Where to go?" className="headerSearchInput"
                    value={destination} onChange={(e)=>setDestination(e.target.value)}/>
                </div>
                <div className="headerSearchItem">
                <span className="seperator"></span>
                    <HiCalendar className="headerIcon dateIcon"/>
                    <div id="dateDropDown" onClick={()=>setIsOpenDate(is=>!is)} className="dateDropDown">
                        {`${format(dateRange[0].startDate , "yyyy/MM/dd")} to ${format(dateRange[0].endDate , "yyyy/MM/dd")}`}
                    </div>
                    {isOpenDate && <div ref={dateRef}><DateRange 
        ranges={dateRange}
        onChange={(item)=>setDateRange([item.selection])}
        className="date "
        minDate={new Date()}
        moveRangeOnFirstSelection={true}
      /></div> }
                    
                </div>
                <div className="headerSearchItem">
                <span className="seperator"></span>
                    <div id="optionDropDown" className="guestOptionsDropDown" onClick={()=>setIsOpenOption(is=>!is)}>{guestOption.adult} adult &bull; {guestOption.children} children &bull; {guestOption.room} room</div>
                    {isOpenOption && <GuestOptionList setIsOpenOption={setIsOpenOption}  handleOption={handleOption} guestOption={guestOption} />}
                    
                </div>
                <div className="headerSearchItem">
                    <button onClick={handleSearch} className="headerSearchBtn">
                        <HiSearch className="headerIcon" />
                    </button>
                </div>
            </div>
            <div>
                {isAuth ? <button onClick={()=>logout()}>
                    <HiLogout/>
                    {user.name}
                </button> : <NavLink to={"/login"} className={({isActive})=>isActive ? "active" : ""}>Login</NavLink>}
            
            </div>
        </div>
    );
};

export default Header;

const GuestOptionList=({guestOption,handleOption,setIsOpenOption})=>{
    const refOption = useRef();
    useOutsideClick(refOption,()=>setIsOpenOption(false),"optionDropDown");
    return (
        <div className="guestOptions" ref={refOption}>
            <GuestOptionElement handleOption={handleOption} guestOption={guestOption} limit={1}  type={"adult"}/>
            <GuestOptionElement handleOption={handleOption} guestOption={guestOption} limit={0} type={"children"}/>
            <GuestOptionElement handleOption={handleOption} guestOption={guestOption} limit={1} type={"room"}/>
        </div>
    )
}
const GuestOptionElement = ({type,guestOption,limit,handleOption})=>{
    return(
        <div className="guestOptionItem">
            <span className="optionText">{type}</span>
            <div className="optionCounter">
                <button onClick={()=>handleOption(type,"decrement")} disabled={guestOption[type] <= limit} className="optionCounterBtn">
                    <HiMinus className="icon"/>
                </button>
                <span>{guestOption[type]}</span>
                <button onClick={()=>handleOption(type,"increment")}  className="optionCounterBtn"><HiPlus className="icon" /></button>
            </div>
        </div>
    )
}
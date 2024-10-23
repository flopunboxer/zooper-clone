import React from 'react'
import { useRouter } from "next/navigation";

function Header() {
    const router=useRouter()
  return (
    <div className="header">
        <button onClick={()=>{router.push("/")}} className=' mt-2 ml-5 mb-2 bg-white rounded-md py-1 px-7 text-[20px]'>Home</button>
    </div>
  )
}

export default Header
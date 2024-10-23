"use client"

import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter()
  return (
 <>
 <div className=" flex flex-col items-center gap-y-16">
    {/* part 1 */}
    <div className="flex flex-col gap-y-5">
      <h1>Complete a waiver now and jump the queues later</h1>
      <p>You must be 16 or older to sign this document</p>
      {/* <img width={80} style={{backgroundColor:"white"}} src=""></img> */}
    </div>
    {/* part 2 */}
    <div>
      <button onClick={()=>{router.push("/formpage")}} className=" bg-[#0096FF] text-white font-bold w-[600px] text-[28px] py-2 rounded-lg hover:bg-[#0d6efd] transition-all duration-200">Click Here to Start</button>
    </div>
 </div>
 </>
  );
}

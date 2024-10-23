import React from 'react'
import Consentform from './consentForm'

function WaiverForm({data}) {
    console.log(data,"data")
  return (
    <div className='absolute top-[100px] left-[10%] border-black border-2 w-[80%] bg-white '>
            {/* header */}
            <div className='  border-b-2 border-[#337ab7] my-4 mx-3 py-3'>
                <h1 className='!text-[34px] !font-bold text-center'>Waiver Form
                </h1>
                <h1 className='!text-[34px] text-green-700 text-center'>Valid Till Date: 21-10-2025</h1>
            </div>
            {/* inputs */}
            <div className=' flex gap-x-10 flex-wrap gap-y-7 py-6 px-10'>
                {/* input fields disbaled */}
                {/* email */}
                <div>
                <label className=' font-semibold' htmlFor='email'>Email</label><br></br>
                <input className=' bg-gray-100 outline-none w-[300px] text-[15px] p-2' readOnly name='email' type='text' value={data?.email}></input>
                </div>

                {/* name */}
                <div>
                <label className=' font-semibold' htmlFor='name'>Name</label><br></br>
                <input className=' bg-gray-100 outline-none w-[300px] text-[15px] p-2' readOnly name='name' type='text' value={data?.name}></input>
                </div>
                {/* Gender */}
                <div>
                <label className=' font-semibold' htmlFor='gender'>Gender</label><br></br>
                <input className=' bg-gray-100 outline-none w-[300px] text-[15px] p-2' readOnly name='gender' type='text' value={data?.gender}></input>
                </div>
                {/* phone */}
                <div>
                <label className=' font-semibold' htmlFor='phone'>Phone Number</label><br></br>
                <input className=' bg-gray-100 outline-none w-[300px] text-[15px] p-2' readOnly name='phone' type='text' value={data?.phone}></input>
                </div>

                {/* City */}
                <div>
                <label className=' font-semibold' htmlFor='city'>City</label><br></br>
                <input className=' bg-gray-100 outline-none w-[300px] text-[15px] p-2' readOnly name='city' type='text' value={data?.city}></input>
                </div>

                {/* Country */}
                <div>
                <label className=' font-semibold' htmlFor='country'>Country</label><br></br>
                <input className=' bg-gray-100 outline-none w-[300px] text-[15px] p-2' readOnly name='country' type='text' value={"india"}></input>
                </div>

                {/* age */}
                <div>
                <label className=' font-semibold' htmlFor='age'>Age</label><br></br>
                <input className=' bg-gray-100 outline-none w-[300px] text-[15px] p-2' readOnly name='age' type='text' value={data?.age}></input>
                </div>

            </div>

            {/* child list */}
            <div className=' px-4 my-4'>
                <h2 className='text-[23px]'>Child List:</h2>
                <div className="child-table">
            <div className="child-row header flex w-full !bg-[#11085a] text-[23px] ">
              <div className=" w-[30%] border-white border-x-2 h-full !text-white flex items-center px-2" >Name </div>
              <div  className=" w-[22%] border-white border-x-2  h-full !text-white flex items-center px-2">Gender </div>
              <div  className=" w-[25%] border-white border-x-2  h-full !text-white flex items-center px-2">Birth Date </div>
              <div  className=" w-[25%] border-white border-x-2  h-full !text-white flex items-center px-2">Age </div>
            </div>
            {data?.children.map((child, index) => (
              <div className="child-row" key={index}>
                <input
                 className="input-field !w-[28%]"
                 readOnly
                  type="text"
                  value={child.name}
                  disabled
                />
                <select
                className="input-field !w-[20%]"
                  value={child.gender}
                  readOnly
                  disabled
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="not-specified">Not Specified</option>
                </select>
                <div className="birth-date ">
                
                  <input
                  className="input-field !w-[100%]"
                    value={child.birth_day+'/'+child.birth_month+'/'+child.birth_year}
                    readOnly
                    disabled
                  >
                    
                  </input>
                </div>
                <div className="age ml-2">
                
                  <input
                  className="input-field !w-[80%]"
                    value={2024-Number(child?.birth_year)}
                    readOnly
                    disabled
                  >
                    
                  </input>
                </div>
               
                
              </div>
            ))}
          </div>
            </div>
            {/* waiver form */}
            <div className=' mt-14 mb-10 flex flex-col items-center gap-y-8'>
                <Consentform></Consentform>
                <div className=" flex flex-col">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                    width: "800px",
                  }}
                >
                  <input
                    style={{ cursor: "pointer" }}
                    type="checkbox"
                    id="parentCheckbox"
                    checked={true}
                    readOnly
                    disabled
                  />
                  <label
                    htmlFor="parentCheckbox"
                    style={{ marginLeft: "8px", fontWeight: "500" }}
                  >
                    <span className="asterik">*</span>I certify that I am the
                    parent or legal guardian of the above child and confirm that
                    the information I entered is accurate and true.
                  </label>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{ cursor: "pointer" }}
                    type="checkbox"
                    id="adultCheckbox"
                    checked={true}
                    readOnly
                    disabled
                  />
                  <label
                    htmlFor="adultCheckbox"
                    style={{ marginLeft: "8px", fontWeight: "500" }}
                  >
                    <span className="asterik">*</span>I am at least 18 years old
                    and I have read and agree to the terms of the above
                    agreement.
                  </label>
                </div>
              </div>
            </div>

            {/* your sign */}
            <div className=' flex flex-col gap-y-6 mb-10'>
            <h2 className='text-[23px] text-center font-semibold'>Your Sign</h2>
            <div className='border-[1px] border-black max-w-max mx-auto px-20 py-10'>
                <img src={data?.signature}></img>
            </div>
            </div>
    </div>
  )
}

export default WaiverForm
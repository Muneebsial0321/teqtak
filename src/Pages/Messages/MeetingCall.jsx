import React from 'react'

const MeetingCall = () => {
  return (
    <div className='w-[50vw] absolute top-24 left-[8rem] z-30 h-[18rem] flex flex-col justify-center items-center shadow-inner bg-[#c6c5c5] rounded-2xl' >
        Call by: USER_NAME
      <div className="flex justify-center items-center mt-10 gap-[5rem]">
        <button className="rounded-full bg-green-500 h-[4rem] w-[4rem]">Attend</button>
        <button className="rounded-full bg-red-500 h-[4rem] w-[4rem]">Cancel</button>
        </div>  
        </div>
  )
}

export default MeetingCall
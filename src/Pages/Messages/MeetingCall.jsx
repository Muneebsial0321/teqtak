import React from 'react'

const MeetingCall = () => {
  return (
    <div className='w-[20rem] rounded-[1rem] z-30  pb-8 gap-5 flex flex-col  items-center shadow-inner border-solid border-[#a5a5a5] border-[1px] ' >
      <div className="bg-blue-600 h-[4rem] w-full rounded-t-[1rem] flex justify-center items-center text-white font-bold">
       April 14, 2024
      </div>
      <div className="flex justify-start flex-col gap-y-2 w-full pl-4">
        <p className='font-bold'>Meeting Invite</p>
        <p className='text-gray-500'>Date: <span className='text-black font-medium'>April 14, 2024</span></p>
        <p className='text-gray-500'>Type: <span className='text-black font-medium'>Zoom Meeting</span></p>
      </div>
      <div className="flex flex-row gap-7 justify-center items-center">
        <button className='px-8 py-2 rounded-xl font-bold bg-white border border-black border-solid'>Reject</button>
        <button className='px-8 py-2 rounded-xl font-bold text-white bg-blue-600 border border-black border-solid'>Accept</button>
      </div>
        </div>
  )
}

export default MeetingCall
import React from 'react'

const LikedSongs = () => {
  return (
    <div className='h-full bg-gray-100'>
        <div className='md:h-full items-center text-gray-600'>
            <div className='container flex flex-col px-5 py-24 mx-auto'>
                <div className='text-center mb-12'>
                    <h5 className='text-base md:text-lg text-indigo-700 mb-1'>Songs That You Love </h5>
                    <h1 className='text-4xl md:text-6xl text-gray-700 font-semibold'>Liked Songs</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LikedSongs
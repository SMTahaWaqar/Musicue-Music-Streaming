import React from 'react'

const AboutUs = () => {
  return (
    <div className='text-center bg-black text-white text-xl h-[100vh] p-10 px-[200px]'>
      <h1 className='bg-black text-white text-6xl mb-10 text-left'>About The Project</h1>
      <p className='bg-black text-white text-xl text-left'>Musicue is a music recommendation engine that helps create personalized playlists and dicover music for users. The engine has a user-friendly interface and allows users to easily discover new music and artists. Musicue is designed to improve the listening experience for music lovers.</p>
      <h1 className='bg-black text-white text-6xl my-10 mt-15 text-left'>About The Developers</h1>
      <p className='bg-black text-white text-xl text-left'>This web app is developed by : </p>
      <ul className='text-left'>
        <li>Taha</li>
        <li>Hashir</li>
        <li>Mahad</li>
        <li>Salman</li>
      </ul>
    </div>
  )
}

export default AboutUs;

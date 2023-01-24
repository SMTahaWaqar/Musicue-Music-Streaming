import React, { useEffect, useState } from 'react'

const Player = (props) => {

  const [currentSong, setCurrentSong] = useState();

  console.log(props.song)

  useEffect(() => {
    // console.log(currentSong)
    // window.location.reload();
  }, [props.song])
  
  if (props.song) {
    return (
    <div>
            {/* Playing {currentSong} */}
            {/* <span>{isPlaying}</span> */}
            {/* {isPlaying ? */}
            <div className="flex justify-center items-center pb-8 bg-black">
              {/* {isPlaying} */}
              <video id="player" controls>
                <source src={props.song ? props.song : "https://aac.saavncdn.com/292/3688f03d025658b1103cc8b854e1b3ed_320.mp4"} type="video/mp4" />
                <source src="video/sintel-short.webm" type="video/webm" />
                {/* <!-- fallback content here --> */}
               </video>
               {/* <div className="controls">
                <button className="play" data-icon="P" aria-label="play pause toggle"></button>
                <button className="stop" data-icon="S" aria-label="stop"></button>
                <button className="rwd" data-icon="B" aria-label="rewind"></button>
                <button className="fwd" data-icon="F" aria-label="fast forward"></button>
              </div> */}
            </div>
            {/* : <div>Loading</div> */}
          </div>
          

  )}
}

export default Player;
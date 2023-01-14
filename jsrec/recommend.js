const fetch = require('node-fetch');


class Song {
    constructor(song){
        this.id = song['id']
        this.name = song['name']
        this.album = song['album']
        this.artist = song['primaryArtists'].split(",")
        this.download_url = song['downloadUrl'][4]['link']
        this.label = song['label']
        this.play_count = song['playCount']

        
    }

    get_recommendations(){
        for(let item of this.artist){
           fetch("http://saavn.me/search/songs?query="+item) //---------------------
  .then(res => res.json()).then(json => console.log(json['data']['results']))
        }
    }


  }
// query in the url to be replaced by variable based on search ---------------------------------------- 

let q = "dreamers";
fetch("http://saavn.me/search/songs?query="+q) //---------------------
  .then(res => res.json())
  .then(
    json => song = new Song(json['data']['results'][0])) // ek song k liye 0th index-----list of songs k lye loop se
    .then(
    song => (song.get_recommendations()))


  
// import {getSongUrl} from 'api/songUrl'
import {getLyric} from 'api/songUrl'
import { Base64 } from 'js-base64';
import { ERR_OK } from 'api/config';
export class Song{
	constructor({id,mid,name,singer,album,duration,imgurl}){
		this.id=id;
		this.mid=mid;
		this.name=name;
		this.singer=singer;
		this.album=album;
		this.duration=duration;
		this.imgurl=imgurl;
		// this.songurl=songurl;
	}
	getLyric(){
		if (this.lyric) {
      return Promise.resolve(this.lyric)
		}
		return new Promise((resolve,reject)=>{
			getLyric(this.mid).then(res=>{
				if(res.retcode==ERR_OK){
					this.lyric=Base64.decode(res.lyric);
					resolve(this.lyric);
				}else{
					reject('no lyric');
				}
			})
		})
		
	}
}

export function getSong(songObj){
	// songUrl(songObj.songmid);
	return new Song({
		id:songObj.songid,
		mid:songObj.songmid,
		name:songObj.songname,
		singer:getSinger(songObj.singer),
		album:songObj.albumname,
		duration:songObj.interval,
		imgurl:'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+songObj.albummid+'.jpg?max_age=2592000',
		// songurl:songObj.songmid,
	})
}

export function getSinger(arr){
	let tempArr=[];
	arr.forEach((key)=>{
		tempArr.push(key.name);
	});
	return tempArr.join('/');
}

function songUrl(mid){
	getSongUrl(mid).then((data)=>{
		console.log(data);
	})
}

export function getRandomIndex(oldIndex,length){
	var newIndex=Math.floor(Math.random()*length);
	if(newIndex==oldIndex){
		return getRandomIndex(oldIndex,length);
	}else{
		return newIndex;
	}
}
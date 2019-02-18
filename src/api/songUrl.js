import axios from 'axios'
import jsonp from 'common/js/jsonp'
import {commonParams,options,IpAddr} from './config'

// export function getSongUrl(mid){
// 	const url='https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
// 	const data=Object.assign({},commonParams,{
// 		hostUin:0,
// 		format:'json',
// 		notice:0,
// 		platform:'yqq',
// 		needNewCode:0,
// 		cid:205361747,
// 		uin:0,
// 		songmid:mid,
// 		filename:'C400'+mid+'.m4a',
// 		guid:3571791149,
// 		// jsonpCallback:'jsonpCallback',
// 		// callback:'jsonpCallback'
// 	});
// 	// return jsonp(url, data,{
// 	// 	name:'jsonpCallback'
// 	// });
// 	return axios.get(url,{
// 		// params:{
// 			params:data
// 		//}
// 	});
// }

export function getSongUrl(mid){
	// const url='https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
	const url=IpAddr+'/songUrl/getSongUrl';
	const data=Object.assign({},commonParams,{
		hostUin:0,
		format:'json',
		notice:0,
		platform:'yqq',
		needNewCode:0,
		cid:205361747,
		uin:0,
		songmid:mid,
		filename:'C400'+mid+'.m4a',
		guid:3571791149,
		// jsonpCallback:'jsonpCallback',
		// callback:'jsonpCallback'
	});
	const headers={
		// 'cookie': 'pgv_pvi=3737145344; ptui_loginuin=576883737; RK=ZDZ0ZX2NVE; ptcz=99f6c9151bd17362cfc328e0c12aba8f8c7c90a0f37380989bca506b20e140f2; pgv_pvid=9157427183; pac_uid=0_a6c8d6f57a4f4; tvfe_boss_uuid=45c5e3dc16344480; ts_uid=8133276606; yqq_stat=0; pgv_si=s4864800768; pgv_info=ssid=s7997130838; ts_refer=ADTAGmyqq; ts_last=y.qq.com/portal/playlist.html',
		'origin': 'https://y.qq.com',
		'referer': 'https://y.qq.com/portal/player.html',
		'user-agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
	}
	// return jsonp(url, data,{
	// 	name:'jsonpCallback'
	// });
	return axios.get(url,{
		params:{
			params:data,
			headers:headers
		}
	});
}

export function getLyric(mid){
	// const url='http://'+IpAddr+'/getLyric';
	const url=IpAddr+'/songUrl/getLyric';
	const data=Object.assign({},commonParams,{
		'-': 'MusicJsonCallback_lrc',
		songmid: mid,
		hostUin:0,
		loginUin:0,
		format:'json',
		notice:0,
		platform:'yqq',
		needNewCode:0,
		songmid:mid,
		platform: 'yqq.json',
		// jsonpCallback:'jsonpCallback',
		// callback:'jsonpCallback'
	});
	// return jsonp(url, data,{
	// 	name:'jsonpCallback'
	// });
	const headers={
		// 'cookie': 'pgv_pvi=3737145344; ptui_loginuin=576883737; RK=ZDZ0ZX2NVE; ptcz=99f6c9151bd17362cfc328e0c12aba8f8c7c90a0f37380989bca506b20e140f2; pgv_pvid=9157427183; pac_uid=0_a6c8d6f57a4f4; tvfe_boss_uuid=45c5e3dc16344480; ts_uid=8133276606; yqq_stat=0; pgv_si=s4864800768; pgv_info=ssid=s7997130838; ts_refer=ADTAGmyqq; ts_last=y.qq.com/portal/playlist.html',
		'origin': 'https://y.qq.com',
		'referer': 'https://y.qq.com/portal/player.html',
		'user-agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
	}
	return axios.get(url,{
		// params:{
			params:{
				params:data,
				headers:headers
			}
		//}
	});
}


// export function getSongUrl(mid){
// 	const url='http://192.168.0.103:3000/api/getSongUrl';
// 	const data=Object.assign({},commonParams,{
// 		hostUin:0,
// 		format:'json',
// 		notice:0,
// 		platform:'yqq',
// 		needNewCode:0,
// 		cid:205361747,
// 		uin:0,
// 		songmid:mid,
// 		filename:'C400'+mid+'.m4a',
// 		guid:3571791149,
// 		jsonpCallback:'jsonpCallback',
// 		callback:'callback'
// 	});
// 	return jsonp(url, data,{
// 		name:'callback',
// 		//param:'jsonpCallback'
// 	});
// 	// return axios.get(url,{
// 	// 	params:data
// 	// }).then((res)=>{
// 	// 	return Promise.resolve(res.data);
// 	// });
// }


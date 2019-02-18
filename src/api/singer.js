import axios from 'axios'
import jsonp from 'common/js/jsonp'
import {commonParams,options,IpAddr} from './config'

// export function getSingerlist(){
// 	const url='https://c.y.qq.com/v8/fcg-bin/v8.fcg';
// 	const data=Object.assign({},commonParams,{
// 		channel: 'singer',
// 	    page: 'list',
// 	    key: 'all_all_all',
// 	    pagesize: 100,
// 	    pagenum: 1,
// 	    hostUin: 0,
// 	    needNewCode: 0,
// 	    platform: 'yqq'
// 	});
// 	// const headers={
// 	// 	'cookie': 'pgv_pvi=3737145344; ptui_loginuin=576883737; RK=ZDZ0ZX2NVE; ptcz=99f6c9151bd17362cfc328e0c12aba8f8c7c90a0f37380989bca506b20e140f2; pgv_pvid=9157427183; pac_uid=0_a6c8d6f57a4f4; tvfe_boss_uuid=45c5e3dc16344480; ts_uid=8133276606; yqq_stat=0; pgv_si=s4864800768; pgv_info=ssid=s7997130838; ts_refer=ADTAGmyqq; ts_last=y.qq.com/portal/playlist.html',
// 	// 	'origin': 'https://y.qq.com',
// 	// 	'referer': 'https://y.qq.com/portal/playlist.html',
// 	// 	'user-agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
// 	// }
// 	// return jsonp(url,data,options);
// 	return axios.get(url,{
// 		params:data
// 	});
// }

export function getSingerlist(){
	// const url='https://c.y.qq.com/v8/fcg-bin/v8.fcg';
	const url =IpAddr+'/singer/getSingerlist';
	const data=Object.assign({},commonParams,{
		channel: 'singer',
	    page: 'list',
	    key: 'all_all_all',
	    pagesize: 100,
	    pagenum: 1,
	    hostUin: 0,
	    needNewCode: 0,
	    platform: 'yqq'
	});
	const headers={
		// 'cookie': 'pgv_pvi=3737145344; ptui_loginuin=576883737; RK=ZDZ0ZX2NVE; ptcz=99f6c9151bd17362cfc328e0c12aba8f8c7c90a0f37380989bca506b20e140f2; pgv_pvid=9157427183; pac_uid=0_a6c8d6f57a4f4; tvfe_boss_uuid=45c5e3dc16344480; ts_uid=8133276606; yqq_stat=0; pgv_si=s4864800768; pgv_info=ssid=s7997130838; ts_refer=ADTAGmyqq; ts_last=y.qq.com/portal/playlist.html',
		'origin': 'https://y.qq.com',
		'referer': 'https://y.qq.com/portal/playlist.html',
		'user-agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
	}
	// return jsonp(url,data,options);
	return axios.get(url,{
		params:{
			params:data,
			headers:headers
		}
	});
}

export function getSingerListDetail(id,page){
	// const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
	const url =IpAddr+'/singer/getSingerListDetail';
	const data=Object.assign({},commonParams,{
	    hostUin: 0,
	    needNewCode: 0,
	    platform: 'yqq',
		singermid:id,
		order:'listen',
		begin:(page-1)*30,
		num:30,
		songstatus:1,
		// format: json
	});
	const headers={
		// 'cookie': 'pgv_pvi=3737145344; ptui_loginuin=576883737; RK=ZDZ0ZX2NVE; ptcz=99f6c9151bd17362cfc328e0c12aba8f8c7c90a0f37380989bca506b20e140f2; pgv_pvid=9157427183; pac_uid=0_a6c8d6f57a4f4; tvfe_boss_uuid=45c5e3dc16344480; ts_uid=8133276606; ts_refer=ADTAGmyqq; _ga=amp-THu3A4GfzUVHV8RLWGz79g; pgv_info=ssid=s7473283540; pgv_si=s6000347136; yqq_stat=0; ts_last=y.qq.com/n/yqq/singer/0013RsPD3Xs0FG.html',
		'origin': 'https://y.qq.com',
		'referer': 'https://y.qq.com/portal/playlist.html',
		'user-agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
	}
	return axios.get(url,{
		params:{
			params:data,
			headers:headers
		}
	});
}


// export function getSingerListDetail(id){
// 	const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
// 	// const url="http://192.168.0.103:4001/getSingerListDetail";
// 	const data=Object.assign({},commonParams,{
// 	    pagenum: 1,
// 	    hostUin: 0,
// 	    needNewCode: 0,
// 	    platform: 'yqq',
// 		singermid:id,
// 		order:'listen',
// 		begin:0,
// 		num:30,
// 		songstatus:1,
// 		// format: json
// 	});
// 	const headers={
// 		'cookie': 'pgv_pvi=3737145344; ptui_loginuin=576883737; RK=ZDZ0ZX2NVE; ptcz=99f6c9151bd17362cfc328e0c12aba8f8c7c90a0f37380989bca506b20e140f2; pgv_pvid=9157427183; pac_uid=0_a6c8d6f57a4f4; tvfe_boss_uuid=45c5e3dc16344480; ts_uid=8133276606; ts_refer=ADTAGmyqq; _ga=amp-THu3A4GfzUVHV8RLWGz79g; pgv_info=ssid=s7473283540; pgv_si=s6000347136; yqq_stat=0; ts_last=y.qq.com/n/yqq/singer/0013RsPD3Xs0FG.html',
// 		// 'origin': 'https://y.qq.com',
// 		// 'referer': 'https://y.qq.com/portal/playlist.html',
// 		// 'user-agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
// 	}
// 	return axios.get(url,{
// 		// params:{
// 			params:data,
// 			headers:headers
// 		//}
// 	});
// }
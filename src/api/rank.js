import axios from 'axios'
import jsonp from 'common/js/jsonp'
import {commonParams,options,IpAddr} from './config'


// export function getTopList(){
// 	const url='https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
// 	// const url="http://192.168.0.103:4001/getSingerListDetail";
// 	const data=Object.assign({},commonParams,{
// 		g_tk: '5381',
// 		uin: '0',
// 		format: 'json',
// 		platform: 'h5',
// 		needNewCode: 1,
// 		'_': 1549679518868
// 	});
// 	// const headers={
// 	// 	'cookie': 'pgv_pvi=3737145344; ptui_loginuin=576883737; RK=ZDZ0ZX2NVE; ptcz=99f6c9151bd17362cfc328e0c12aba8f8c7c90a0f37380989bca506b20e140f2; pgv_pvid=9157427183; pac_uid=0_a6c8d6f57a4f4; tvfe_boss_uuid=45c5e3dc16344480; ts_uid=8133276606; ts_refer=ADTAGmyqq; _ga=amp-THu3A4GfzUVHV8RLWGz79g; pgv_info=ssid=s7473283540; pgv_si=s6000347136; yqq_stat=0; ts_last=y.qq.com/n/yqq/singer/0013RsPD3Xs0FG.html',
// 	// 	// 'origin': 'https://y.qq.com',
// 	// 	// 'referer': 'https://y.qq.com/portal/playlist.html',
// 	// 	// 'user-agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
// 	// }
// 	return axios.get(url,{
// 		// params:{
// 			params:data,
// 			// headers:headers
// 		//}
// 	});
// }

export function getTopList(){
	// const url='https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
	const url=IpAddr+"/rank/getTopList";
	const data=Object.assign({},commonParams,{
		g_tk: '5381',
		uin: '0',
		format: 'json',
		platform: 'h5',
		needNewCode: 1,
		'_': 1549679518868
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

export function getMusicList(topid){
	// const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
	const url=IpAddr+"/rank/getMusicList";
	const data=Object.assign({},commonParams,{
		g_tk: '5381',
		uin: '0',
		format: 'json',
		platform: 'h5',
		needNewCode: 1,
		'_': 1549692470645,
		tpl: 3,
		page: 'detail',
		type: 'top',
		topid:topid
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


// export function getMusicList(topid){
// 	const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
// 	// const url="http://192.168.0.103:4001/getSingerListDetail";
// 	const data=Object.assign({},commonParams,{
// 		g_tk: '5381',
// 		uin: '0',
// 		format: 'json',
// 		platform: 'h5',
// 		needNewCode: 1,
// 		'_': 1549692470645,
// 		tpl: 3,
// 		page: 'detail',
// 		type: 'top',
// 		topid:topid
// 	});
// 	// const headers={
// 	// 	'cookie': 'pgv_pvi=3737145344; ptui_loginuin=576883737; RK=ZDZ0ZX2NVE; ptcz=99f6c9151bd17362cfc328e0c12aba8f8c7c90a0f37380989bca506b20e140f2; pgv_pvid=9157427183; pac_uid=0_a6c8d6f57a4f4; tvfe_boss_uuid=45c5e3dc16344480; ts_uid=8133276606; ts_refer=ADTAGmyqq; _ga=amp-THu3A4GfzUVHV8RLWGz79g; pgv_info=ssid=s7473283540; pgv_si=s6000347136; yqq_stat=0; ts_last=y.qq.com/n/yqq/singer/0013RsPD3Xs0FG.html',
// 	// 	// 'origin': 'https://y.qq.com',
// 	// 	// 'referer': 'https://y.qq.com/portal/playlist.html',
// 	// 	// 'user-agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
// 	// }
// 	return axios.get(url,{
// 		// params:{
// 			params:data,
// 			// headers:headers
// 		//}
// 	});
// }
import jsonp from 'common/js/jsonp'
import {commonParams,options,IpAddr} from './config'
import axios from 'axios'
// export function getRecommend(){
// 	const url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
// 	const data=Object.assign({},commonParams,{
// 		platform: 'h5',
// 		needNewCode: 1,
// 		uin: 0,
// 		//format: 'json'
// 	});
// 	return jsonp(url,data,options);
// }

// export function getRecommend(){
// 	const url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
// 	const data=Object.assign({},commonParams,{
// 		platform: 'h5',
// 		needNewCode: 1,
// 		uin: 0,
// 		//format: 'json'
// 	});
// 	return axios.get(url,{
// 		params:data
// 	});
// 	//return jsonp(url,data,options);
// }

export function getRecommend(){
	const url=IpAddr+"/recommend/getRecommend";
	const data=Object.assign({},commonParams,{
		platform: 'h5',
		needNewCode: 1,
		uin: 0,
		//format: 'json'
	});
	const headers={
		// 'cookie': 'pgv_pvi=3737145344; ptui_loginuin=576883737; RK=ZDZ0ZX2NVE; ptcz=99f6c9151bd17362cfc328e0c12aba8f8c7c90a0f37380989bca506b20e140f2; pgv_pvid=9157427183; pac_uid=0_a6c8d6f57a4f4; tvfe_boss_uuid=45c5e3dc16344480; ts_uid=8133276606; yqq_stat=0; pgv_si=s4864800768; pgv_info=ssid=s7997130838; ts_refer=ADTAGmyqq; ts_last=y.qq.com/portal/playlist.html',
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
	//return jsonp(url,data,options);
}

export function getDiscList(pageIndex){
	//const url="https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
	// const url="/api/getDiscList";
	// const url="https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
	const url=IpAddr+"/recommend/getDiscList";
	const pageNum=30;
	const data=Object.assign({},commonParams,{
		picmid:1,
		rnd:Math.random(),
		//jsonpCallback:'jsonpCallback',
		//loginUin:0,
		hostUin:0,
		format:'json',
		platform:'yqq',
		needNewCode:0,
		categoryId:10000000,
		sortId:5,
		sin:(pageIndex-1)*pageNum,
		ein:pageIndex*pageNum-1
	});
	const headers={
		'cookie': 'pgv_pvi=3737145344; ptui_loginuin=576883737; RK=ZDZ0ZX2NVE; ptcz=99f6c9151bd17362cfc328e0c12aba8f8c7c90a0f37380989bca506b20e140f2; pgv_pvid=9157427183; pac_uid=0_a6c8d6f57a4f4; tvfe_boss_uuid=45c5e3dc16344480; ts_uid=8133276606; yqq_stat=0; pgv_si=s4864800768; pgv_info=ssid=s7997130838; ts_refer=ADTAGmyqq; ts_last=y.qq.com/portal/playlist.html',
		'origin': 'https://y.qq.com',
		'referer': 'https://y.qq.com/portal/playlist.html',
		'user-agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
	}
	//return jsonp(url,data,options);
	return axios.get(url,{
		params:{
			params:data,
			headers:headers
		}
	});
}

// 获取歌单详细内容
export function getSongList(disstid) {
  const url =IpAddr+"/recommend/getSongList";
  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid,
    format: 'json',
    g_tk: 1132671320,
    platform: 'yqq',
    needNewCode: 0
  })
	const headers={
		'cookie': 'pgv_pvi=3737145344; ptui_loginuin=576883737; RK=ZDZ0ZX2NVE; ptcz=99f6c9151bd17362cfc328e0c12aba8f8c7c90a0f37380989bca506b20e140f2; pgv_pvid=9157427183; pac_uid=0_a6c8d6f57a4f4; tvfe_boss_uuid=45c5e3dc16344480; ts_uid=8133276606; yqq_stat=0; pgv_si=s4864800768; pgv_info=ssid=s7997130838; ts_refer=ADTAGmyqq; ts_last=y.qq.com/portal/playlist.html',
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
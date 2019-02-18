import axios from 'axios'
import jsonp from 'common/js/jsonp'
import {commonParams,options,IpAddr} from './config'
// export function getHotKey(){
// 	const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
// 	// const url="http://192.168.0.103:4001/getSingerListDetail";
// 	const data = Object.assign({}, commonParams, {
//     needNewCode: 1,
//     platform: 'h5'
//   })
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
// 	})
// };

export function getHotKey(){
	// const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
	const url=IpAddr+'/search/getHotKey';
	const data = Object.assign({}, commonParams, {
    needNewCode: 1,
    platform: 'h5'
  })
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
	})
};

export function search(query, page, zhida, perpage) {
  const url = IpAddr+'/search/searchList';

  const data = Object.assign({}, commonParams, {
    w: query,
    catZhida: zhida ? 1 : 0,
    p: page,
    perpage,
    n: perpage,
    platform: 'h5',
    needNewCode: 1,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0
  })
	const headers={
		// 'cookie': 'pgv_pvi=3737145344; ptui_loginuin=576883737; RK=ZDZ0ZX2NVE; ptcz=99f6c9151bd17362cfc328e0c12aba8f8c7c90a0f37380989bca506b20e140f2; pgv_pvid=9157427183; pac_uid=0_a6c8d6f57a4f4; tvfe_boss_uuid=45c5e3dc16344480; ts_uid=8133276606; ts_refer=ADTAGmyqq; _ga=amp-THu3A4GfzUVHV8RLWGz79g; yq_index=0; yqq_stat=0; pgv_si=s6805896192; pgv_info=ssid=s7911899535; ts_last=y.qq.com/m/act/hiradio/27.html',
		'origin': 'https://m.y.qq.com/',
		'referer': 'https://m.y.qq.com/',
		'user-agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
	}
  return axios.get(url,{
		params:{
			params:data,
			headers:headers
		}
	})
}
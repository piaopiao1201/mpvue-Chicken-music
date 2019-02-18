import originJsonp from 'jsonp'

export default function (url,data,options){
	url+=((url.indexOf('?')<0)?'?':'&')+parma(data);
	return new Promise((resolve,reject) => {
		originJsonp(url,options,(err,data) => {
			if(!err){
				resolve(data);
			}else{
				reject(err);
			}
		})
	})
}

function parma(data){
	let urlData='';
	for(var key in data){
		let value=data[key]!==undefined?data[key]:'';
		urlData+='&'+key+'='+encodeURIComponent(value);
	}
	return urlData?urlData.substr(1):'';
}
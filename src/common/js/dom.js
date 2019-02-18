export function domData(el,data,method='get',val){
	if(method=='get'){
		return el.getAttribute('data-'+data);
	}else if(method=='set'){
		el.setAttribute('data-'+data,val);
	}
}

export function getPerfix(style){
	let upperStyle=style.charAt(0).toUpperCase()+style.substr(1);
	let styleSet={
		Style:style,
		Webkit:'webkit'+upperStyle,
		Moz:'moz'+upperStyle,
		Ms:'ms'+upperStyle,
		O:'o'+upperStyle
	};
	let elem=document.createElement('div');
	for(let key in styleSet){
		if(elem.style[styleSet[key]]!==undefined){
			return styleSet[key];
		}
	}
}

export function styles(obj){
	var arrRes=[];
	for(var key in obj){
		arrRes.push(key+':'+obj[key]);
	}
	return arrRes.join(';');
}
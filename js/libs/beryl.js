/*
Beryl.compress("string",bool)
//圧縮
Beryl.decompress("string")
//解凍
Beryl.getByteSize("string")
//byteサイズを求める

boolは文字列の長さの判定基準
true:	byteのサイズ(初期値)
false:	文字列の長さ

hex66.encode("10num")
//10進数 → 66進数
hex66.decode("66string")
//66進数 → 10進数
*/

var Beryl,hex66;
[Beryl,hex66] = (function(){
	let libCou = 1;
	let libraries;

	function beryl(){
		libraries = {
			base64urlEncoder: {
				existence: typeof base64urlEncode,
				compress: function(data) {
					return base64urlEncode(data);
				},
				decompress: function(data) {
					return base64urlDecode(data);
				},
			},
			cheepCompressor: {
				existence: typeof CCCompress,
				compress: function(data) {
					return CCCompress(data, Infinity);
				},
				decompress: function(data) {
					return CCDecompress(data, Infinity);
				},
			},
			lzbase62: {
				existence: typeof lzbase62,
				compress: function(data) {
					return lzbase62.compress(data);
				},
				decompress: function(data) {
					return lzbase62.decompress(data);
				},
			},
			LZString: {
				existence: typeof LZString,
				compress: function(data) {
					return LZString.compressToEncodedURIComponent(data);
				},
				decompress: function(data) {
					return LZString.decompressFromEncodedURIComponent(data);
				},
			},
			flate: {
				existence: typeof RawDeflate,
				compress: function(data) {
					let tmp = encodeURIComponent(data);
					tmp = RawDeflate.deflate(tmp);
					return btoa(tmp);
				},
				decompress: function(data) {
					let tmp = atob(data);
					tmp = RawDeflate.inflate(tmp);
					return decodeURIComponent(tmp);
				},
			},
			URLCompressor: {
				existence: typeof URLCompressor,
				compress: function(data) {
					return URLCompressor.compress(data);
				},
				decompress: function(data) {
					return URLCompressor.expand(data);
				},
			},
			URLpercentEncoder: {
				existence: typeof percentEncode,
				compress: function(data) {
					return percentEncode(data);
				},
				decompress: function(data) {
					return percentDecode(data);
				},
			},
		};

		for(let key in libraries){
			let type = libraries[key].existence;
			if(type != "function" && type != "object"){
				console.error('ライブラリ: ' + key + ' が見つかりませんでした');
			}
			else{
				libraries[key].use = true;
			}
			libraries[key].index = libCou;
			libCou++;
		}
	}

	beryl.prototype = {
		compress: function(data,useLengthType=true){
			let moderes = [data],
				modelen;
			if(useLengthType){
				modelen = [this.getByteSize(data)];
			}
			else{
				modelen = [data.length];
			}

			for(let mKey in libraries){
				if(!libraries[mKey].use){
					continue;
				}
				let mInd = libraries[mKey].index;

				moderes[mInd] = libraries[mKey].compress(data);

				if(useLengthType){
					modelen[mInd] = this.getByteSize(moderes[mInd]);
				}
				else{
					modelen[mInd] = moderes[mInd].length;
				}

				for(let sKey in libraries){
					if(!libraries[sKey].use){
						continue;
					}
					let sInd = libraries[sKey].index;
					if(mInd == sInd){
						continue;
					}
					sInd += 8 * mInd;

					moderes[sInd] = libraries[sKey].compress(moderes[mInd]);

					if(useLengthType){
						modelen[sInd] = this.getByteSize(moderes[sInd]);
					}
					else{
						modelen[sInd] = moderes[sInd].length;
					}
				}
			}

			let minIndex = 0,
				minValue = Infinity;
			for(let i=0,li=modelen.length;i<li;i++){
				let len = modelen[i];
				if(len == undefined){
					continue;
				}
				if(minValue >= len){
					minValue = len;
					minIndex = i;
				}
			}
			return hex66.encode(minIndex) + moderes[minIndex];
		},
		decompress: function(data){
			let len = hex66.decode(data.slice(0,1));
			data = data.slice(1);

			if(len == 0){
				return data;
			}
			len--;
			len = [(len/8)|0,len%8+1];				

			let tmpData = null;
			for(let key in libraries){
				if(libraries[key].index == len[1]){
					if(!libraries[key].use){
						console.error("変換に使用するライブラリの欠如");
						return;
					}
					tmpData = libraries[key].decompress(data);
					break;
				}
			}
			if(tmpData === null){
				console.error("不明な値");
				return;
			}
			if(len[0] == 0){
				return tmpData;
			}

			for(let key in libraries){
				if(libraries[key].index == len[0]){
					if(!libraries[key].use){
						console.error("変換に使用するライブラリの欠如");
						return;
					}
					return libraries[key].decompress(tmpData);
				}
			}

			console.error("不明な値");
			return;
		},

		getByteSize: (function(){
			let s, i, len;
			function toCharCode(){
				let c1 = s.charCodeAt(i), c2, j;
				if (0xD800 <= c1 && c1 <= 0xD8FF){
					j = i + 1;
					if(j < len){
						c2 = s.charCodeAt(j);
						if(0xDC00 <= c2 && c2 <= 0xDFFF){
							c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
							i = j;
						}
						else{
							return false;
						}
					}
					else{
						return false;
					}
				}
				return c1;
			}

			return function(string){
				var size = 0, c;
				s = String(string);
				if(s){
					len = s.length;
					for(i = 0;i<len;i++){
						c = toCharCode();
						if(c !== false){
							if(c < 0x80){
								size += 1;
							}
							else if(c < 0x800){
								size += 2;
							}
							else if (c < 0x10000){
								size += 3;
							}
							else if (c < 0x200000){
								size += 4;
							}
							else if (c < 0x4000000){
								size += 5;
							}
							else{
								size += 6;
							}
						}
					}
				}
				s = i = len = null;
				return size;
			};
		})(),
	};

	function decToBase62(num_){
		if (num_ === null) return void 0;
		let num = Number(num_);
		if (isNaN(num)) return void 0;
		if (Math.floor(num) !== num) return void 0;

		let is_negative = num < 0;
		num = Math.abs(num);
	
		let ret = "", digit = 0;
		while(true){
			digit = num % 62;
			if (digit < 10)
				ret+=String(digit); //0-9
			else if (digit < 36)
				ret+=String.fromCharCode(digit + 55); //A-Z
			else
				ret+=String.fromCharCode(digit + 61); //a-z
			if (num < 62)
				break;
			else
				num = Math.floor(num / 62);
		}
		if (is_negative) ret+="-";
		return ret.split("").reverse().join("");
	}

	//66進数(雑)
	const hex66 = {
		encode:function(num){
			let chars = this.chars;
			let cn = chars.length;
			let str = [];
			let a1 , a2;
			while (num != 0) {
				a1 = parseInt(num / cn);
				a2 = num - (a1 * cn);
				str.unshift(chars.substr(a2,1));
				num = a1;
			}
			let res = str.join("");
			res = (!res)?"0":res;
			return res;
		},
		decode:function(num){
			let chars = this.chars;
			let char2 = {};
			let cn = chars.length;
			for (var i=0; i< cn; i++) {
				char2[chars[i]] = i;
			}
			let str = 0;
			for (var i=0; i<num.toString().length; i++) {
				str += char2[num.substr((i+1)*-1, 1)] * Math.pow(cn, i);
			}
			return str;
		},
		chars:(function(){
			let str = "";
			str += "0123456789";
			str += "abcdefghijklmnopqrstuvwxyz";
			str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			str += "=_+-";
			return str;
		})(),
	}


	//初期化
	return [new beryl(),hex66];
})();
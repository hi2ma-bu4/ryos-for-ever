/*
DataCaller.pass(num)
//データ保存時使用パスワード
DataCaller.save(id"str",data"str",bool)
//データの保存
DataCaller.load(id"str")
//データの呼出し
DataCaller.del(id"str")
//データの削除
*/

var DataCaller = (function(){
	let password = 1;
	function dataCaller(){

		if(typeof Zircon != "object"){
			console.error('ライブラリ: Zircon.js が見つかりませんでした');
		}

		//thisのバインド
		this.pass = this.pass.bind(this);
		this.characteristic = this.characteristic.bind(this);
	}

	dataCaller.prototype = {
		pass: function(id){
			password = id;

			this.pass = () => {console.error("パスワードは重複設定出来ません");};
		},
		characteristic: function(name){
			Object.defineProperty(this, "ciword", {
				value: name+"_",
				writable: false
			});

			this.characteristic = () => {console.error("名称は重複設定出来ません");};
		},
		save: function(id, data, type=true){
			let tmp;
			let flag;
			if(type){
				tmp = Zircon.encode(data, password);
				flag = "t";
			}
			else{
				tmp = Beryl.compress(data, false);
				flag = "f";
			}

			localStorage.setItem(this.ciword+id+"_"+flag, LZString.compressToUTF16(tmp));
		},
		load: function(id){
			let tmp = LZString.decompressFromUTF16(localStorage.getItem(this.ciword+id+"_t"));
			if(tmp){
				return Zircon.decode(tmp, password);
			}
			tmp = LZString.decompressFromUTF16(localStorage.getItem(this.ciword+id+"_f"));
			if(tmp){
				return Beryl.decompress(tmp);
			}
			return null;
		},
		del: function(id){
			delete localStorage[this.ciword+id+"_t"];
			delete localStorage[this.ciword+id+"_f"];
		},
		allLoad: function(){
			let tmpArr = {};
			for(let key in localStorage){
				if(!key.indexOf(this.ciword)){
					let tmp = key.slice(this.ciword.length).slice(0,-2);
					tmpArr[tmp] = this.load(tmp);
				}
			}
			return tmpArr;
		},
		allDel: function(){
			for(let key in localStorage){
				if(!key.indexOf(this.ciword)){
					delete localStorage[key];
				}
			}
		},
	};

	//初期化
	return new dataCaller();
})();
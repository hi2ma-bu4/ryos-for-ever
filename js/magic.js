let RFE_magic_doflag = false;
let magicName = "";
const magic = (function(){
	let plMp = 0;

	let md = {
// 生成系
		//火生成
		createfire: function(size=1){
			size = numGet(size);
			if(size === false){
				return null;
			}
			let found = foundation();
			setDefPro(found,"attribute","fire");
			setDefPro(found,"size",size);
			plMp += size;

			return found;
		},
		//水生成
		createwater: function(size=1){
			size = numGet(size);
			if(size === false){
				return null;
			}
			let found = foundation();
			setDefPro(found,"attribute","water");
			setDefPro(found,"size",size);
			plMp += size;

			return found;
		},
// 魔法動作設定系
		//魔法移動
		move: function(){

		},
// 位置取得系
		//player位置取得
		playerpos: function(){
			return {x:0,y:0};
		},
		//敵位置取得(最短距離)
		enemypos: function(){
			plMp += 3;
			return {x:0,y:0};
		},
		//敵位置全取得
		enemyallpos: function(){
			plMp += 3 * 1/*敵の数だけ*/;
			return [{x:0,y:0}];
		},
	}

	function Magic(){

	}
	const magic = new Magic();

	//システム関数
	setDefPro(magic,"reset",function(){
		if(RFE_magic_doflag){
			plMp = 0;
		}
		else{
			console.error("不明なmpのリセット");
		}
	});
	setDefPro(magic,"getplmp",function(){
		return plMp;
	});

	for(let key in md){
		setDefPro(magic,key,md[key]);
	}

	function numGet(num){
		if(isNaN(num)){
			return false;
		}
		return (+num)|0;
	}
	function foundation(){
		const found = {};
		setDefPro(found,"parent","player");
		return found;
	}
	function setDefPro(obj,name,val){
		Object.defineProperty(obj, name, {
			value: val,
			writable: false
		});
	}

	return magic;
})();

var RFE_magicTest = (function(){
	function rfe_magicTest(){

	}

	rfe_magicTest.prototype = {
		test: function(data){
			magicName = "";
			let foundData = {};
			RFE_magic_doflag = true;
			magic.reset();
			RFE_magic_doflag = false;
			try{
				if(parent.userjsmode == 0){
					foundData = Function(`
						'use strict';
						let RFE_magic_doflag;
						let window,parent,document;
						${data}
					`)();
				}
			}
			catch(e){
				console.error(e);
				return [0,"Error",false];
			}
			return [
				magic.getplmp() + (codeMinifyLength(data)/10|0),
				magicName,
				foundData
			];
		}
	}

	function codeMinifyLength(data){
		return data.replace(/\r/g,"")
			.replace(/\/\/.*?(\n|$)/g,"")
			.replace(/\/\*.*?\*\//gs,"")
			.replace(/(\s+|\n|;)/g,"").length;
	}

	let blockCom = [
		"eval",
	];
	for(let i=0,li=blockCom.length;i<li;i++){
		if(typeof blockCom[i] === "string"){
			window[blockCom[i]] = (x) => {console.error(`不明なコマンドの実行を防ぎました\nfunc: ${blockCom[i]}\n${x}`);};
		}
	}

	return new rfe_magicTest();
})();
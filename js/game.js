
var RFE_game = (function(){
	let foundationMagic = [
		{
			code: `
//魔法名定義
magicName = "fireball";
//mp消費1の火を作る
let fire = magic.createfire(1);
//一旦出力
return fire;
`,
		},
		{
			code: `
//魔法名定義
magicName = "waterball";
//mp消費1の水を作る
let water = magic.createwater(1);
//一旦出力
return water;
`,
		},
	];
	let lastEdit = 0;

	let game;
	let settingData;
	let CELL_PX = {
		width : 32,
		height : 32,
	};
	const MAPDATA = [
		"",			//マップ0(タイトル)
		"map/map01.json",	//マップ1
	]
	const SPRITE_ASSETS = {
		BaseChip: "image/game/map/[Base]BaseChip_pipo.png",
		WorldMap: "image/game/map/[Base]WorldMap_pipo.png",
	}
	const IMAGE_ASSETS = {
		Flower: "image/game/map/auto/[A]Flower_pipo.png",
	};

	let staticMapCache = {
		low: "staticMapCacheLow",
		top: "staticMapCacheTop",
	}

	let nowMapId = 1;

	function rfe_game(){
		//thisのバインド
		this.init = this.init.bind(this);
	}

	rfe_game.prototype = {
		init: function(){
			settingData = JSON.parse(localDataLoad("settingData"));
			let magicCode = localDataLoad("magicCode");
			if(magicCode){
				magicCode = JSON.parse(magicCode);
				[magicCode,lastEdit] = magicCode;
				for(let i=0,li=magicCode.length;i<li;i++){
					foundationMagic[i] = {};
					foundationMagic[i].code = magicCode[i];
				}
			}

			game = new Phaser.Game({
				type: Phaser.AUTO,
				scale: {
					mode: Phaser.Scale.RESIZE,
					width: '100%',
					height: '100%'
				},
				scene: {
					preload: preload,
					create: gameInit,
					update: update
				},
				render: {
					pixelArt: false
				},
			});

			//再利用防止
			this.init = () => {};
		},
		editsave: function(){
			return codeVerification();
		},
	};

	function preload(){
		for(let i=0,li=foundationMagic.length;i<li;i++){
			[foundationMagic[i].mp,foundationMagic[i].name] = RFE_magicTest.test(foundationMagic[i].code);
		}
		console.log(foundationMagic);

		for(let key in SPRITE_ASSETS){
			this.load.spritesheet(key,SPRITE_ASSETS[key],{frameWidth: 16, frameHeight: 16});
		}
		for(let key in IMAGE_ASSETS){
			this.load.image(key,IMAGE_ASSETS[key]);
		}

		for(let key in staticMapCache){
			staticMapCache[key] = {};
			staticMapCache[key].canvas = document.getElementById(key);
			staticMapCache[key].ctx = staticMapCache[key].canvas.getContext("2d");
		}
	}

	function gameInit(){
		this.scale.on('resize', gameResize, this);

		mapLoad(1);

		//this.add.image(x座標,y座標,名前)
	}

	function update(){

	}

	function mapLoad(mapId){
		nowMapId = mapId;

		getJSON(MAPDATA[nowMapId]).then(function(e){
			staticMapCreate(e);
		}).catch(function(e){
			console.error(e);
		});
	}

	function staticMapCreate(data){
		let width = data.layer1[0].length * 16;
		let height = data.layer1.length * 16;
		staticMapCache.low.canvas.width = width;
		staticMapCache.low.canvas.height = height;
		staticMapCache.top.canvas.width = width;
		staticMapCache.top.canvas.height = height;
	}

	function getJSON(path){
		return new Promise(function(resolve){
			let req = new XMLHttpRequest();
			req.open("get", path, true);
			req.send(null);
			req.onload = function(){
				resolve(JSON.parse(req.responseText));
			}
		});
	}

	function localDataLoad(id){
		return parent.DataCaller.load(id);
	}
	function localDataSave(id,data){
		parent.DataCaller.save(id, data, false);
	}

	function gameResize(gameSize){
		let w = gameSize.width;
		let h = gameSize.height;
		this.cameras.resize(w, h);
	}

	function codeVerification(){
		//新規データ追加
		foundationMagic[lastEdit] = {};
		foundationMagic[lastEdit].code = localDataLoad("editor");
		let tmp = RFE_magicTest.test(foundationMagic[lastEdit].code);
		if(tmp[2] === false){
			return true;
		}
		[foundationMagic[lastEdit].mp,foundationMagic[lastEdit].name] = tmp;

		//保存用データ作成
		let outtmp = [];
		for(let i=0,li=foundationMagic.length;i<li;i++){
			outtmp[i] = foundationMagic[i].code;
		}
		localDataSave("magicCode",JSON.stringify([outtmp,lastEdit]));
	}

	return new rfe_game();
})();

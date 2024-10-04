var userjsmode = 0;
window.addEventListener('DOMContentLoaded', function(){
	DataCaller.characteristic("RyosForEver");
	DataCaller.pass(2929);

	const searchParams = new URLSearchParams(window.location.search)
	if(searchParams.get('userjs') == "stop"){
		userjsmode = 1;
	}
	else if(searchParams.get('userjs') == "reset"){
		userjsmode = -1;
		DataCaller.del("magicCode")
		window.location.search = "";
		return;
	}

	RFE_window.init();
	RFE_editor.init();
	RFE_setting.init();

	// iframe読み込み待機
	document.getElementById("game").contentWindow.addEventListener('DOMContentLoaded', function(){
		RFE_main.init();
		RFE_main.RFE_game("init")();

		//チュートリアル
		//RFE_main.tutorial();
	});
});

const RFE_main = (function(){
	let gameFrame;

	function rfe_main(){

	}
	rfe_main.prototype = {
		init: function(){
			gameFrame = document.getElementById("game").contentWindow;

			//再利用防止
			this.init = () => {};
		},
		RFE_game: function(data){
			return gameFrame.RFE_game[data];
		},
		tutorial: function(){
			introJs().setOptions({
				nextLabel: '次へ',
				prevLabel: '戻る',
				doneLabel: '終了',
				exitOnOverlayClick: false,
				disableInteraction: true,
				showBullets: false,
				showProgress: true,
				hidePrev: true,
				initialStep: 0,
				steps: [
					{
						title: '初めまして！',
						intro: 'チュートリアルを開始する?'
					},
					{
						title: "エディタ",
						intro: 'これはエディタ<br/>クリックでウィンドウが開く',
						element: '#editorOpen',
					},
					{
						title: "エディタ",
						intro: 'このゲームで扱うプログラムはjavascriptで書く',
						element: '#editHtml',
					},
					{
						title: "メモ帳",
						intro: '次にこれはメモ帳',
						element: '#memoOpen',
					},
					{
						title: "メモ帳",
						intro: 'メモ帳は特にいう事なし<br/>(Ctrl+Sで保存)',
						element: '#memoHtml',
					},
					{
						title: "設定",
						intro: '次にこれは設定',
						element: '#settingOpen',
					},
					{
						title: "設定",
						intro: '設定は初めに設定しておくのがオススメ',
						element: '#settingHtml',
					},
					{
						title: "ゲーム本体",
						intro: 'ゲームは見て分かる通りここ',
						element: '#game',
					}
				],
			}).onbeforechange(async function(targetElem){
				if (typeof targetElem === "undefined"){
					return;
				}
				return new Promise(function(resolve){
					let waitFlag = false;
			
					switch(targetElem.id){
						case 'editorOpen':
							RFEwinHides("editor",false);
							break;
						case 'editHtml':
							waitFlag = true;
							RFEwinHides("editor",true);
							break;
						case 'memoOpen':
							RFEwinHides("editor",false);
							RFEwinHides("memo",false);
							break;
						case 'memoHtml':
							waitFlag = true;
							RFEwinHides("memo",true);
							break;
						case 'settingOpen':
							RFEwinHides("memo",false);
							RFEwinHides("setting",false);
							break;
						case 'settingHtml':
							waitFlag = true;
							RFEwinHides("setting",true);
							break;
						case 'game':
							tutorialFlag = true;
							RFEwinHides("setting",false);
							break;
					}

					if(waitFlag){
						setTimeout(resolve, 500);
					}
					else{
						resolve();
					}
				});
			}).start();

			function RFEwinHides(name,flag){
				RFE_window.windowData[name].frame.control.doCommand(flag?'dehide':'hide');
			}
		},
	}
	


	let blockCom = [
		"eval",
	];
	for(let i=0,li=blockCom.length;i<li;i++){
		if(typeof blockCom[i] === "string"){
			window[blockCom[i]] = (x) => {console.error(`不明なコマンドの実行を防ぎました\nfunc: ${blockCom[i]}\n${x}`);};
		}
	}

	return new rfe_main();
})();
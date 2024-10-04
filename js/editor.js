const RFE_editor = (function(){

	let editor;
	let noSaveEditor,noSaveMemo;

	let editTbData = {
		applying: {
			toElement: "applyingButton",
			image: "image/editor_icon/download_icon.png",
			buttonName: "適用",
			buttonExp: "コードを世界に適用する",
			func: editorApplying,
		},
		save: {
			toElement: "saveButton",
			image: "image/editor_icon/save_icon.png",
			buttonName: "保存",
			buttonExp: "コードを保存",
			func: editorSave,
		},
	};

	function rfe_editor(){

	}

	rfe_editor.prototype = {
		init: function(){
			//ツールバーボタン設置
			let toolchip = document.getElementById("editToolbar");
			for(let key in editTbData){
				let divElem = document.createElement("div");
				toolchip.appendChild(divElem);
				divElem.title = editTbData[key].buttonExp;
				divElem.id = editTbData[key].toElement;
				divElem.classList.add("editIconBackground");

				if(editTbData[key].image){
					let imgElem = document.createElement("img");
					divElem.appendChild(imgElem);
					imgElem.src = editTbData[key].image;
					imgElem.classList.add("editIcon");
				}
				let spanElem = document.createElement("span");
				divElem.appendChild(spanElem);
				spanElem.innerText = editTbData[key].buttonName;
				spanElem.classList.add("editIconTitle");

				divElem.addEventListener('click', function(){
					editTbData[key].func();
				});
			}

			//エディタ設定
			let editorName = "editor";

			editor = ace.edit(editorName,{
				theme: "ace/theme/chrome",
				mode: "ace/mode/javascript",
				minLines: 2,
			});
			editor.$blockScrolling = Infinity;
			editor.setOptions({
				enableBasicAutocompletion: true,
				enableSnippets: true,
				enableLiveAutocompletion: true,
				customScrollbar: true,
				vScrollBarAlwaysVisible: true,
			});
			RFE_window.windowData.editor.frame.on('frame', 'resize', function(){
				editor.resize();
			});

			const langTools = ace.require("ace/ext/language_tools");
			const words = [
				{"word":"magic"}
			];
			const rhymeCompleter = {
				getCompletions: function(editor, session, pos, prefix, callback) {
					callback(null, words.map(function(ea){
						return {
							name: ea.word,
							value: ea.word,
							meta: "magic object"
						}
					}));
				}
			}
			langTools.addCompleter(rhymeCompleter);

			//データ入力
			let editorData = DataCaller.load(editorName);
			if(editorData){
				editor.getSession().setValue(editorData);
			}
			//フォーカス関連
			RFE_window.windowData[editorName].frame.on('frame', 'focus', (data) => {
				editor.focus();
			});
			RFE_window.windowData[editorName].frame.titleBar.addEventListener('click', function(event){
				editor.focus();
			});
			//データ保存関連
			editor.getSession().on('change', function(){
				if(!noSaveEditor){
					noSaveEditor = true;
					RFE_window.changeWindowName(editorName,RFE_window.changeWindowName(editorName)+"*");
				}
			});
			editor.commands.addCommand({
				name : "savefile",
				bindKey: {
					win : "Ctrl-S",
					mac : "Command-S"
				},
				exec: function(editor){
					editorSave();
				}
			});

			//関係ないけどメモ帳もついでにinit
			let memoName = "memo";
			let memoEl = document.getElementById(memoName);
			//データ入力
			let memoData = DataCaller.load(memoName);
			if(memoData){
				memoEl.value = memoData;
			}
			//フォーカス関連
			RFE_window.windowData[memoName].frame.on('frame', 'focus', (data) => {
				memoEl.focus();
			});
			RFE_window.windowData[memoName].frame.titleBar.addEventListener('click', function(event){
				memoEl.focus();
			});
			//データ保存関連
			memoEl.addEventListener('input', function(event){
				if(!noSaveMemo){
					noSaveMemo = true;
					RFE_window.changeWindowName(memoName,RFE_window.changeWindowName(memoName)+"*");
				}
			});
			shortcut.add("Ctrl+S", function(){
				if(noSaveMemo){
					noSaveMemo = false;
					DataCaller.save(memoName,memoEl.value,false);
					RFE_window.createToast("保存しました");
					RFE_window.changeWindowName(memoName,RFE_window.changeWindowName(memoName).slice(0,-1));
				}
			},{target: memoEl});


			//再利用防止
			this.init = () => {};
		},

		//エディタナイトモード設定
		nightMode: function(flag){
			if(flag){
				editor.setTheme("ace/theme/monokai");
			}
			else{
				editor.setTheme("ace/theme/chrome");
			}
		},

		//コード閲覧モード
		inspectionCode: function(){
			console.log("コード閲覧モードのボタンが押されました");
		},
	};

	//エディタセーブ
	function editorSave(){
		if(noSaveEditor){
			noSaveEditor = false;
			let editorName = "editor";
			DataCaller.save(editorName,editor.getSession().getValue().replace(/\r/g,""),false);
			RFE_window.createToast("保存しました");
			RFE_window.changeWindowName(editorName,RFE_window.changeWindowName(editorName).slice(0,-1));
		}
	}
	//世界に適用
	function editorApplying(){
		editorSave();
		if(document.querySelector('.ace_error')){
			RFE_window.createToast("コードにエラーが含まれています！");
			return;
		}
		if(DataCaller.load("editor").match(/while/)){
			RFE_window.createToast("コードにwhileが含まれています！");
			return;
		}
		if(DataCaller.load("editor").match(/for\s*?\(.*?;\s*?;.*?\)/)){
			RFE_window.createToast("コードに無限ループになる可能性のあるforが含まれています！");
			return;
		}
		if(RFE_main.RFE_game("editsave")()){
			RFE_window.createToast("適用に失敗しましたコンパイル中にエラーが発生しました");
		}
		else{
			RFE_window.createToast("適用しました");
		}
	}


	return new rfe_editor();
})();

var RFE_setting = (function(){

	var localDataName = [
		"settingData",
		"magicCode",
		"editor",
		"memo",
	];

/*
	title,explanation
	toggle,checkbox,button
*/
	var systemSetting = {
		allDataSaveTag: {
			title: "全体データ保存",
			type: "title",
			parent: "whole",
		},
		allDataSaveExp: {
			title: "別の端末で実行する場合や、バックアップなどの用途にご使用ください",
			type: "explanation",
			parent: "whole",
		},
		allDataSaveButton: {
			title: "保存(download)",
			type: "button",
			parent: "whole",
			func: "RFE_setting.dataDownload()",
		},
		allDataLoadTag: {
			title: "全体データ読み込み",
			type: "title",
			parent: "whole",
		},
		allDataLoadExp: {
			title: `configファイルを読み込ませて下さい<br/>
※破損したデータを読み込ませるとゲームに異常が発生する可能性があります！`,
			type: "explanation",
			parent: "whole",
		},
		allDataLoadButton: {
			title: "読み込み(upload)",
			type: "file",
			parent: "whole",
			func: "RFE_setting.dataUpload(this)",
		},
		tipsTag: {
			title: "いざという時用",
			type: "title",
			parent: "whole",
		},
		tipsExp: {
			title: `urlの後ろに「<span class="select">?userjs=stop</span>」を追加すると起動時魔法コンパイルが停止します<br/>
※stop状態ではゲームは進行出来ません！<br/>
<br/>
urlの後ろに「<span class="select">?userjs=reset</span>」を追加すると魔法のソースを全てリセット(削除)します<br/>
※この操作は取り消せません`,
			type: "explanation",
			parent: "whole",
		},

/* ############################################# */
		nightModeTag: {
			title: "ナイトモード関連",
			type: "title",
			parent: "display",
		},
		nightModeSystem: {
			title: "システムUIでナイトモードを使用する",
			type: "toggle",
			parent: "display",
			flag: false,
		},
		nightModeEdit: {
			title: "エディターでナイトモードを使用する",
			type: "toggle",
			parent: "display",
			flag: false,
		},
		nightModeMemo: {
			title: "メモ帳でナイトモードを使用する",
			type: "toggle",
			parent: "display",
			flag: false,
		},

		displayEtcTag: {
			title: "その他",
			type: "title",
			parent: "display",
		},
		systemPenetration: {
			title: "windowの背景を透過する",
			type: "toggle",
			parent: "display",
			flag: true,
		},

/* ############################################# */
		keyTag: {
			title: "キー設定",
			type: "title",
			parent: "key",
		},

/* ############################################# */
		tutorialTag: {
			title: "チュートリアル",
			type: "title",
			parent: "etc",
		},
		tutorialExp: {
			title: "チュートリアルを再度表示するだけです<br/>見ても得るものはありません",
			type: "explanation",
			parent: "etc",
		},
		tutorialButton: {
			title: "もう一度みる",
			type: "button",
			parent: "etc",
			func: "RFE_main.tutorial()",
		},
		gameDataTag: {
			title: "ゲーム情報",
			type: "title",
			parent: "etc",
		},
		programAuthor: {
			title: "作成者等",
			type: "details",
			parent: "etc",
			notflag: true,
			flag: "open",
			data: `<pre>
作成者: tromtub<br/>
更新日時: 2023/03/18
</pre>`,
		},
		licenseTag: {
			title: "ライセンス",
			type: "title",
			parent: "etc",
		},
		license_zircon: {
			title: "zircon.js",
			type: "details",
			parent: "etc",
			data: `<pre>
This library uses the following libraries:
Licenses are dependent on each.

* beryl.js
</pre>`,
		},
		license_beryl: {
			title: "beryl.js",
			type: "details",
			parent: "etc",
			data: `<pre>
This library uses the following libraries:
Licenses are dependent on each.

* base64urlEncoder.js
* cheep-compressor.min.js
* inflate.min.js
* deflate.min.js
* lzbase62.min.js
* lz-string.min.js
* url-comp.js
</pre>`,
		},
		license_base64urlEncoder: {
			title: "base64urlEncoder.js",
			type: "details",
			parent: "etc",
			data: `<pre>
no license
</pre>`,
		},
		license_cheep_compressor: {
			title: "cheep-compressor.min.js",
			type: "details",
			parent: "etc",
			data: `<pre>
Copyright (c) 2021 utubo under the [MIT](https://opensource.org/licenses/mit-license.php)
</pre>`,
		},
		license_deflate: {
			title: "deflate.min.js",
			type: "details",
			parent: "etc",
			data: `<pre>
GNU General Public License, version 2 (GPL-2.0)
  http://opensource.org/licenses/GPL-2.0
Original:
 http://www.onicos.com/staff/iz/amuse/javascript/expert/deflate.txt

Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
Version: 1.0.1
LastModified: Dec 25 1999
</pre>`,
		},
		license_inflate: {
			title: "inflate.min.js",
			type: "details",
			parent: "etc",
			data: `<pre>
GNU General Public License, version 2 (GPL-2.0)
  http://opensource.org/licenses/GPL-2.0
original:
  http://www.onicos.com/staff/iz/amuse/javascript/expert/inflate.txt

Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
Version: 1.0.0.1
LastModified: Dec 25 1999
</pre>`,
		},
		license_lzbase62: {
			title: "lzbase62.min.js",
			type: "details",
			parent: "etc",
			data: `<pre>
lzbase62 v2.0.0 - LZ77(LZSS) based compression algorithm in base62 for JavaScript
Copyright (c) 2014-2020 polygon planet <polygon.planet.aqua@gmail.com>
https://github.com/polygonplanet/lzbase62
@license MIT
</pre>`,
		},
		license_lz_string: {
			title: "lz-string.min.js",
			type: "details",
			parent: "etc",
			data: `<pre>
MIT License

Copyright (c) 2013 pieroxy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre>`,
		},
		license_url_comp: {
			title: "url-comp.js",
			type: "details",
			parent: "etc",
			data: `<pre>
URLCompressor library Version 0.1.0

Copyright (c) 2021 Hiroshi Tanigawa
http://synapse.kyoto/

This program is distributed under MIT licence.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre>`,
		},
		license_URLpercentEncoder: {
			title: "URLpercentEncoder.js",
			type: "details",
			parent: "etc",
			data: `<pre>
no license
</pre>`,
		},
		license_jsframe: {
			title: "jsframe.min.js",
			type: "details",
			parent: "etc",
			data: `<pre>
jsframe v1.6.3 Copyright (c) 2007-2020 Tom Misawa
</pre>`,
		},
		license_shortcut: {
			title: "shortcut.js",
			type: "details",
			parent: "etc",
			data: `<pre>
http://www.openjs.com/scripts/events/keyboard_shortcuts/
Version : 2.01.B
By Binny V A
License : BSD
</pre>`,
		},
		license_ace: {
			title: "ace.js  (included in ace.js)",
			type: "details",
			parent: "etc",
			data: `<pre>
Copyright (c) 2010, Ajax.org B.V.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of Ajax.org B.V. nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
</pre>`,
		},
		license_intro: {
			title: "intro.min.js",
			type: "details",
			parent: "etc",
			data: `<pre>
Intro.js v6.0.0
https://introjs.com

Copyright (C) 2012-2022 Afshin Mehrabani (@afshinmeh).
https://introjs.com
</pre>`,
		},
		license_enchant: {
			title: "phaser.min.js",
			type: "details",
			parent: "etc",
			data: `<pre>
The MIT License (MIT)

Copyright (c) 2020 Richard Davey, Photon Storm Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</pre>`,
		},
	};
/* ############################################# */


	function rfe_setting(){
		this.dataSave = this.dataSave.bind(this);
	}

	rfe_setting.prototype = {
		init: function(){
			//editor設定読み込み
			let tmp = DataCaller.load("settingData");
			if(tmp){
				tmp = JSON.parse(tmp);
				for(let key in tmp){
					if(systemSetting[key]){
						systemSetting[key].flag = tmp[key];
					}
				}
			}
			else{
				this.dataSave();
			}

			//設定画面設定
			let elem = document.getElementById("settingHtml");
			elem.innerHTML = `<div class="setting-tabPanel">
				<ul class="setting-tabGroup">
					<li class="setting-tab setting-tab-isActive">全般</li>
					<li class="setting-tab">画面</li>
					<li class="setting-tab">操作</li>
					<li class="setting-tab">その他</li>
				</ul>
				<div class="setting-panelGroup">
					<div id="setting-whole" class="setting-panel setting-panel-isShow"></div>
					<div id="setting-display" class="setting-panel"></div>
					<div id="setting-key" class="setting-panel"></div>
					<div id="setting-etc" class="setting-panel"></div>
				</div>
			</div>`

			//システム設定適用
			for(let key in systemSetting){
				let tElem = "";
				let inTy = systemSetting[key].type;
				if(inTy == "toggle"){
					inTy = "checkbox";
				}
				if(inTy == "details"){
					tElem = `<details class="accordion-details" ${systemSetting[key].flag}>
						<summary class="accordion-summary">
							<span class="accordion-inner">
								${systemSetting[key].title}
								<span class="accordion-icon"></span>
							</span>
						</summary>
						<div class="accordion-content">
							<span class="accordion-content-inner">
							${systemSetting[key].data}
						</div>
					</details>`;
				}
				else if(inTy == "title"){
					tElem = `<h4 class="setting-title">${systemSetting[key].title}</h4>`;
				}
				else if(inTy == "explanation"){
					tElem = `<p class="setting-exp">${systemSetting[key].title}</p>`;
				}
				else{
					tElem = `<input type="${inTy}" data-setting-type="${key}" `;
					switch(systemSetting[key].type){
						case "toggle":
							tElem += (systemSetting[key].flag?" checked":"");
							tElem = `<label>
									<div class="togglebutton">${tElem}>
										<span class="togglebutton-content"></span>
										<span class="togglebutton-circle"></span>
									</div>
									<span class="togglebutton-title">${systemSetting[key].title}</span>
								</label>`;
							break;
						case "checkbox":
							tElem += (systemSetting[key].flag?" checked":"");
							tElem = `<label>${tElem}>
									<span>${systemSetting[key].title}</span>
								</label>`;
							break;
						case "button":
							tElem += `value="${systemSetting[key].title}" onclick="${systemSetting[key].func}">`;
							break;
						case "file":
							tElem += `onchange="${systemSetting[key].func}">`;
							tElem = `<label class="fileloader">${systemSetting[key].title}
									${tElem}
								</label>`;
							break;
						default:
							tElem += ">";
					}
				}
				let pElem = document.getElementById("setting-"+systemSetting[key].parent);
				pElem.innerHTML += tElem;
			}

			//イベントリスナー設置
			let tabs = document.getElementsByClassName('setting-tab');
			for(let i=0,li=tabs.length;i<li;i++){
				tabs[i].addEventListener('click', tabSwitch, false);
			}

			let imputs = document.querySelectorAll(':scope #settingHtml input');
			for(let i=0,li=imputs.length;i<li;i++){
				imputs[i].addEventListener('change', this.dataSave, false);
			}

			//アコーディオンイベントリスナー設置
			setUpAccordion();

			//設定反映
			this.settingReflect();

			//再利用防止
			this.init = () => {};
		},
		dataSave: function(e){
			let data = stDataSave(e);
			DataCaller.save("settingData",data,false);
			this.settingReflect();
			console.log("data saved");
		},
		dataDownload: function(){
			let data = [];
			data[0] = DataCaller.ciword + "config";
			for(let i=0,li=localDataName.length;i<li;i++){
				data[i+1] = DataCaller.load(localDataName[i]);
				data[i+1] = Zircon.encode(data[i+1],51218);
			}

			const blob = new Blob([data.join("\n")],{type:"text/plain"});
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = DataCaller.ciword + '.config';
			link.click();
			RFE_window.createToast("ファイルをダウンロードしました");
		},
		dataUpload: function(input){
			if(!input.files[0]){
				return;
			}
			let file = new FileReader();

			file.addEventListener('load', function(e) {
				let data = e.target.result.split('\n');
				if(data.length == localDataName.length+1
					&& data[0] == DataCaller.ciword + "config"){

					for(let i=1,li=data.length;i<li;i++){
						DataCaller.save(localDataName[i-1],Zircon.decode(data[i],51218),false);
					}
					RFE_window.createToast("ファイルを読み込みました<br/>ページを更新すると反映されます");
				}
			});
			file.readAsText(input.files[0]);
		},
		settingReflect: function(){
			for(let key in systemSetting){
				let flag = systemSetting[key].flag;
				if(flag === undefined){
					continue;
				}
				switch(key){
					case 'nightModeSystem':
						if(flag){
							styleSet('--jsframe-titlebar-background','#2f3129');
							styleSet('--jsframe-titlebar-background-hover','#45473f');
							styleSet('--jsframe-titlebar-font-def','#6f7169');
							styleSet('--jsframe-titlebar-font-foc','#afb1a9');
							styleSet('--jsframe-title-font-def','#d4d4d4');
							styleSet('--jsframe-title-font-foc','#fafafa');
							styleSet('--jsframe-title-shadow-font','rgba(0,0,0,0.7)');
						}
						else{
							styleSet('--jsframe-titlebar-background','#fafafa');
							styleSet('--jsframe-titlebar-background-hover','#e5e5e5');
							styleSet('--jsframe-titlebar-font-def','#9b9a9b');
							styleSet('--jsframe-titlebar-font-foc','#000000');
							styleSet('--jsframe-title-font-def','#9b9b9b');
							styleSet('--jsframe-title-font-foc','#4d4d4d');
							styleSet('--jsframe-title-shadow-font','rgba(255,255,255,0.7)');
						}
						break;
					case 'nightModeEdit':
						RFE_editor.nightMode(flag);
						break;
					case 'nightModeMemo':
						if(flag){
							styleSet('--memo-background','#2f3129');
							styleSet('--memo-font','#fafafa');
						}
						else{
							styleSet('--memo-background','#fafafa');
							styleSet('--memo-font','#000000');
						}
						break;
					case 'systemPenetration':
						if(flag){
							styleSet('--all-opacity','0.9');
							styleSet('--setting-opacity','0.8');
						}
						else{
							styleSet('--all-opacity','1');
							styleSet('--setting-opacity','1');
						}
						break;
				}
			}
		},
	};

	function stDataSave(e){
		let tmp = {};
		if(isElement(e.target)){
			let st = e.target.dataset.settingType;
			if(systemSetting[st]){
				switch(e.target.type){
					case "checkbox":
						systemSetting[st].flag = e.target.checked;
						break;
					case "text":
						systemSetting[st].flag = e.target.value;
						break;
				}
			}
			else{
				console.log("不明な設定");
			}
		}
		for(let key in systemSetting){
			if(!systemSetting[key].notflag){
				tmp[key] = systemSetting[key].flag;
			}
		}
		return JSON.stringify(tmp);
	}

	function tabSwitch(){
		const ancestorEle = this.closest('.setting-tabPanel');
		ancestorEle.getElementsByClassName('setting-tab-isActive')[0].classList.remove('setting-tab-isActive');
		this.classList.add('setting-tab-isActive');
		ancestorEle.getElementsByClassName('setting-panel-isShow')[0].classList.remove('setting-panel-isShow');
		const groupTabs = ancestorEle.getElementsByClassName('setting-tab');
		const arrayTabs = Array.prototype.slice.call(groupTabs);
		const index = arrayTabs.indexOf(this);
		ancestorEle.getElementsByClassName('setting-panel')[index].classList.add('setting-panel-isShow');
	}

	function styleSet(name,data){
		document.documentElement.style.setProperty(name,data);
	}



// アコーディオン関係の動き
	const setUpAccordion = () => {
		const details = document.querySelectorAll(".accordion-details");
		const RUNNING_VALUE = "running"; // アニメーション実行中のときに付与する予定のカスタムデータ属性の値
		const IS_OPENED_CLASS = "is-opened"; // アイコン操作用のクラス名

		details.forEach((element) => {
			const summary = element.querySelector(".accordion-summary");
			const content = element.querySelector(".accordion-content");

			summary.addEventListener("click", (event) => {
				event.preventDefault();

				// 連打防止用
				if (element.dataset.animStatus === RUNNING_VALUE) {
					return;
				}
				// detailsのopen属性を判定
				if(element.open){
					element.classList.toggle(IS_OPENED_CLASS);

					const closingAnim = content.animate(closingAnimKeyframes(content), animTiming);
					element.dataset.animStatus = RUNNING_VALUE;

					closingAnim.onfinish = () => {
						element.removeAttribute("open");
						element.dataset.animStatus = "";
					};
				}
				else{
					element.setAttribute("open", "true");
					element.classList.toggle(IS_OPENED_CLASS);
					const openingAnim = content.animate(openingAnimKeyframes(content), animTiming);
					element.dataset.animStatus = RUNNING_VALUE;

					openingAnim.onfinish = () => {
						element.dataset.animStatus = "";
					};
				}
			});
		});
	}

	const animTiming = {
		duration: 400,
		easing: "ease-out"
	};
	const closingAnimKeyframes = (content) => [
		{
			height: content.offsetHeight + 'px', // height: "auto"だとうまく計算されないため要素の高さを指定する
			opacity: 1,
		},{
			height: 0,
			opacity: 0,
		}
	];
	const openingAnimKeyframes = (content) => [
		{
			height: 0,
			opacity: 0,
		},{
			height: content.offsetHeight + 'px',
			opacity: 1,
		}
	];

	return new rfe_setting();
})();

function isElement(obj) {
	try {
		return obj instanceof HTMLElement;
	}
	catch(e){
		return (typeof obj==="object") &&
			(obj.nodeType===1) && (typeof obj.style === "object") &&
			(typeof obj.ownerDocument ==="object");
	}
}
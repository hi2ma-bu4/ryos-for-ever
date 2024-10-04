const RFE_window = (function(){

	const jsFrame = new JSFrame();

	let initialWindowLeft = 20;
	let initialWindowTop = 30;

	function rfe_window(){
		this.windowData = {
			inspection: {
				toElement: "InspectionMode",
				image: "image/system_icon/create_icon.png",
				buttonName: "コード閲覧",
				buttonExp: "コード閲覧モードを起動・解除する",
				func: RFE_editor.inspectionCode,
			},
			editor: {
				title: "エディタ",
				width: 430,
				height: 330,
				visible: false,
				toElement: "editorOpen",
				image: "image/system_icon/code_icon.png",
				buttonName: "エディタ",
				buttonExp: "コードエディタを起動・縮小する",
				html: `<div id="editHtml" class="winHtmlOri">
					<div id="editToolbar"></div>
					<div id="editor"></div>
				</div>`,
			},
			memo: {
				title: "メモ帳",
				width: 320,
				height: 220,
				visible: false,
				toElement: "memoOpen",
				image: "image/system_icon/memo_icon.png",
				buttonName: "メモ帳",
				buttonExp: "メモ帳を起動・縮小する",
				html: `<div id="memoHtml" class="winHtmlOri">
					<textarea id="memo" name="memo"></textarea>
				</div>`,
			},
			setting: {
				title: "設定",
				width: 500,
				minWidth: 330,
				height: 400,
				visible: false,
				toElement: "settingOpen",
				image: "image/system_icon/settings_icon.png",
				buttonName: "設定",
				buttonExp: "全体設定を起動・縮小する",
				html: `<div id="settingHtml" class="winHtmlOri">
				</div>`,
			},
		};

	}

	rfe_window.prototype = {
		init: function(){
			let toolchip = document.getElementById("winToolbar");
			for(let key in this.windowData){
				let divElem = document.createElement("div");
				toolchip.appendChild(divElem);
				divElem.title = this.windowData[key].buttonExp;
				divElem.id = this.windowData[key].toElement;
				divElem.classList.add("systemIconBackground");

				if(this.windowData[key].image){
					let imgElem = document.createElement("img");
					divElem.appendChild(imgElem);
					imgElem.src = this.windowData[key].image;
					imgElem.classList.add("systemIcon");
				}

				let spanElem = document.createElement("span");
				divElem.appendChild(spanElem);
				spanElem.innerText = this.windowData[key].buttonName;
				spanElem.classList.add("systemIconTitle");

				if(this.windowData[key].func){
					divElem.addEventListener('click', function(){
						RFE_window.windowData[key].func();
					});
				}
				else{
					this.createWindow(key,this.windowData[key].visible);
				}
			}

			//再利用防止
			this.init = () => {};
		},
		createToast: function(data){
			jsFrame.showToast({
				html: data,
				closeButton: true,
				closeButtonColor: 'white',
			});
		},
		changeWindowName: function(winid,data){
			if(data){
				this.windowData[winid].frame.titleBar.childNodes[0].innerText = data;
			}
			else{
				return this.windowData[winid].frame.titleBar.childNodes[0].innerText;
			}
		},

		createWindow: function(windowId, visible){
			this.windowData[windowId].frame = jsFrame.create({
				name: windowId,
				title: this.windowData[windowId].title,
				left: initialWindowLeft,
				top: initialWindowTop,
				width: this.windowData[windowId].width,
				height: this.windowData[windowId].height,
				minWidth: this.windowData[windowId].minWidth || 200,
				minHeight: this.windowData[windowId].minHeight || 30,
				appearanceName: 'redstone',
				presetParam: {
					maximizeButtonBehavior: 'maximize',
					minimizeButtonBehavior: 'hide',
					closeButtonBehavior: 'hide',
				},
				movable: true,
				resizable: true,
				style: {
					backgroundColor: 'rgba(220,220,220,0.8)',
					overflow: 'hidden',
				},
				html: this.windowData[windowId].html,
			});
			this.windowData[windowId].frame.hideFrameComponent('minimizeButton');

			this.windowData[windowId].frame.on('closeButton', 'click', function(_frame, evt){
				_frame.control.doCommand("hide");
			});

			this.windowData[windowId].frame.setControl({
				maximizeButton: 'maximizeButton',
				maximizeParam: {
					fullScreen: false,
					restoreKey: 'Escape',
				},
				demaximizeButton: 'restoreButton',
				minimizeButton: 'minimizeButton',
				deminimizeButton: 'deminimizeButton',
				closeButton: 'closeButton',
				hideParam: {
					align: 'ABSOLUTE',
					toElement: document.querySelector("#"+this.windowData[windowId].toElement),
					duration: 200
				},
				dehideParam: {
					duration: 200
				},
				styleDisplay: 'inline',
				animation: true,
				animationDuration: 100,
			});


			if(!this.windowData[windowId].btnListenerFlag){
				this.windowData[windowId].btnListenerFlag = true;
				document.querySelector("#"+this.windowData[windowId].toElement).addEventListener('click', function(){
					if(jsFrame.containsWindowName(windowId)){
						const windowMode = RFE_window.windowData[windowId].frame.control.getWindowMode();
						if (windowMode === 'hid') {
							RFE_window.windowData[windowId].frame.control.doCommand('dehide');
						} else if (windowMode === 'default') {
							RFE_window.windowData[windowId].frame.control.doCommand('hide');
						}
					} else {
						RFE_window.createWindow(windowId, true);
					}
				});
			}
			if (visible) {
				this.windowData[windowId].frame.show();
			} else {
				this.windowData[windowId].frame.control.doHide({
					silent: true,
					duration: 0,
					align: 'ABSOLUTE',
					toElement: document.querySelector("#"+this.windowData[windowId].toElement),
				});
			}

			initialWindowLeft += 20;
			initialWindowTop += 20;
		},
	};

	return new rfe_window();
})();
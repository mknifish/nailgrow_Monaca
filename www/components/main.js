
function start(){
// すべてを始める関数
  if(localStorage.getItem('my_badges')==null){
  // もし、ローカルストレージから取得したバッチがNULLだった場合、
    tutorial01();
  }
  else if(localStorage.getItem('start_year')==null){
  // もし、ローカルストレージから取得した年がNULLだった場合、
    writeLoader();
    writeStartMessage();
  // startMessageを出力する。
  }
  else if(localStorage.getItem('myDayCount')==null){
  //もし、ローカルストレージから取得した経過日数がNULLだった場合、
    writeLoader();
    nailgrow();
  }else{
    writeLoader();
    nailgrow_2();
  }  
} 

function setBadges(){
// 初回起動時のバッチの数を定義する関数
  var badges = 0; 
  // バッチの数を0にする。
  localStorage.setItem('my_badges', badges);
  // ローカルストレージ上に対象のキーの値を保存する
}

function setGoal(){
// 目標を定義する関数
  var goal = document.getElementById("selectGoal"); 
  // 目標をプルダウンから取得する。
  var myGoal = goal.value; 
  // プルダウンから取得した情報から値を抽出する。
  localStorage.setItem('my_goal', myGoal);
  // ローカルストレージ上に対象のキーの値を保存する
}

function setStartDay(){
// 開始日を定義する関数
  var startDay = new Date();
  // new Date でコンピューターから日付と時間を取得し変数stratDayへ代入する。
  var year = startDay.getFullYear();
  // 変数stratDayに代入したデータからyearとして現在の年を取り出す。    
  var month = startDay.getMonth() + 1;
  // 変数stratDayに代入したデータからmonthとして現在の月を取り出す。             
  // monthは0~11で表されることから、何月と定義したいときには、１を足す。
  var day = startDay.getDate();
  // 変数stratDayに代入したデータからdayとして現在の日を取り出す。 
  localStorage.setItem('start_year', year);  
  localStorage.setItem('start_month', month);       
  localStorage.setItem('start_day', day);
  // ローカルストレージ上に対象のキーの値を保存する。            
}

function calGoal(){
//目標の進捗を計算する関数
  var my_goal = localStorage.getItem('my_goal');
  var myDayCount = localStorage.getItem('myDayCount');
  var myCalGoal = my_goal - myDayCount * 0.1;
  var myCalGoal = myCalGoal.toFixed(1);
  localStorage.setItem('myCalGoal', myCalGoal);
  // ローカルストレージ上に対象のキーの値を保存する。
}

function nailgrow(){
//アプリのコアとなる関数
  var start_year,start_month,start_day;
  //start_year,start_month,start_dayを定義する。
  start_year = localStorage.getItem('start_year');
  //start_yearにローカルストレージの値を代入する。
  start_month = localStorage.getItem('start_month');
  //start_monthにローカルストレージの値を代入する。
  start_day = localStorage.getItem('start_day');
  //start_dayにローカルストレージの値を代入する。
  myCountUp(start_year,start_month,start_day);
}

function myCountUp(myYear,myMonth,myDay){
// を定義する関数
  var myNow   = new Date();
  // new Date でコンピューターから日付と時間を取得し変数mynowへ代入する。
  var myRunDate = new Date( myYear , myMonth-1 , myDay );
  // n_ew Date に値をセットして、変数myRunDate（経過時間）へ代入する。
  var myMsec = myNow.getTime() - myRunDate.getTime();
  // 現在の時間から経過時間をミリ秒に置き換えて減算し、変数myMsecへ代入する。
  var myDayCount = Math.floor( myMsec / (1000*60*60*24) );
  // myMsecを経過日数に変換（ミリ秒で割り、小数点第一位以下は切り捨てる）して、変数myDayCountに代入する。
  var myCalGoal = localStorage.getItem('myCalGoal');
  localStorage.setItem('myDayCount', myDayCount);
  // ローカルストレージ上に対象のキーの値を保存する。
  var my_goal = localStorage.getItem('my_goal');
  var my_goalDays = parseInt(my_goal)*10;
  localStorage.setItem('my_goalDays', my_goalDays);
  var daysLeft = my_goalDays - myDayCount;
  var stroke = Math.floor( 299 - myDayCount *22 / my_goal );
  if(myDayCount == 0){
  // もし、初日（経過日数ゼロ日）だった場合、
    writeHeaderHomeLose();//ヘッダーの出力。
    writeStroke();
    witeCircle_in();
    writeBox_button();//描写ボタンの出力。
    calGoal();//calGoal関数を実行する。
    writeBox_startMessage();// テキストを出力する。
    writeFooter();//バッチボタンの出力。
  }else if(myCalGoal <= 0){
  // もし、ゴールに到達していた場合、
    var badges = localStorage.getItem('my_badges');                  
    var badges = parseInt(badges)+1;
    // データの型を整数に変換した上で経過日数を10で割って加算
    localStorage.setItem('my_badges', badges);
    // ローカルストレージ上に対象のキーの値を保存する
    HeaderHomeWin();//ヘッダーの出力。
    writeStroke();
    witeCircle_in();
    writeBox_button();//描写ボタンの出力。
    calGoal();//calGoal関数を実行する。
    writeBox_message();// テキストを出力する。
    writeFooter();//バッチボタンの出力。
  }else{
    writeHeaderHomeLose();//ヘッダーの出力。
    writeStroke();
    witeCircle_in();
    writeBox_button();//描写ボタンの出力。
    calGoal();//calGoal関数を実行する。
    writeBox_message();// テキストを出力する。
    writeFooter();//バッチボタンの出力。
  }
}

function nailgrow_2(){
//アプリのコアとなる関数
  var myDayCount = localStorage.getItem('myDayCount');
  // myMsecを経過日数に変換（ミリ秒で割り、小数点第一位以下は切り捨てる）して、変数myDayCountに代入する。
  var myCalGoal = localStorage.getItem('myCalGoal');
  // ローカルストレージ上に対象のキーの値を保存する。
  var my_goal = localStorage.getItem('my_goal');
  var my_goalDays = parseInt(my_goal)*10;
  localStorage.setItem('my_goalDays', my_goalDays);
  var daysLeft = my_goalDays - myDayCount
  //var windowHeight = window.parent.screen.width;
  if(myDayCount == 0){
  // もし、初日（経過日数ゼロ日）だった場合、
    writeHeaderHomeLose();//ヘッダーの出力。
    writeStroke();
    witeCircle_in();
    // myDayCountの値をテキストで出力する。
    // 指定日も１日と数える場合は１を足します(myDayCount+1)
    writeBox_button();
    //描写ボタンの出力。onclick="loseMessage();"
    calGoal();//calGoal関数を実行する。
    writeBox_startMessage();// テキストを出力する。
    writeFooter();//バッチボタンの出力。
  }else if(myCalGoal <= 0){
  // もし、ゴールに到達していた場合、
    nailgrow();
  }else{
    writeHeaderHomeLose();
    //ヘッダーの出力。
    writeStroke();
    witeCircle_in();
    writeBox_button();//描写ボタンの出力。
    calGoal();//calGoal関数を実行する。
    writeBox_message();// テキストを出力する。
    writeFooter();//バッチボタンの出力。
  }
}
            
function clearStartDay(){
// 開始日を削除する関数
  localStorage.removeItem('start_year');
  localStorage.removeItem('start_month');    
  localStorage.removeItem('start_day');
  localStorage.removeItem('myCalgoal');
  localStorage.removeItem('myDayCount');
  localStorage.removeItem('myCalGoal');
  localStorage.removeItem('my_goal');
  localStorage.removeItem('my_goalDays');
  loadReload();
  // ローカルストレージ上の対象のキーの値を削除する。
}

function goBadges(){
  mainViewRemove();
  badges();
}

function goGetBadges(){
  mainViewRemove();
  getBadges();
}

function goResetGoal(){
  mainViewRemove();
  writeResetMessage();
}

//バッチ画面

function badges(){
  var badges = localStorage.getItem('my_badges');           
  if(localStorage.getItem('my_badges')==0){
  // もし、ローカルストレージから取得したバッチの数が0だった場合、
    writeBadges();
    document.write('</div><div class="box_message_badges"><a class="message_badges">完走するとここにバッチが表示されます。<br>完走を目指して頑張りましょう！</a></div></div><footer><input class="btn_home" type="button" value="home" onclick="location.reload();"></footer></div>'); 
    }else if(localStorage.getItem('my_badges')>0){
    // もし、ローカルストレージから取得したバッチの数が0より大きかった場合、
      writeBadges();
      document.write('</div><div class="box_message_badges"><a class="message_badges">これまで</a><span class="num_gorl">'+badges+'</span><a class="message_badges">回完走！</a></div></div><footer><input class="btn_home" type="button" value="home" onclick="location.reload();"></footer></div>');
  }
}

//forResetGoal
function resetGoalDays(){
  var my_goal = localStorage.getItem('my_goal');
  var my_goalDays = parseInt(my_goal)*10;
  localStorage.setItem('my_goalDays', my_goalDays);
  mainViewRemove();
  location.reload();
}

//forGetBadges
 
function getBadges(){
  var badges = localStorage.getItem('my_badges');           
    writeBadges();
    document.write('</div><div class="box_message_badges"><a class="message_badges">これまで</a><span class="num_gorl">'+badges+'</span><a class="message_badges">回完走！</a></div></div><footer><input class="btn_home" type="button" value="home" onclick="clearStartDay();"></footer></div>'); 
}

//ポップアップ画面
function popupImage() {
  var popup = document.getElementById('js-popup');
  if(!popup) return;
  var blackBg = document.getElementById('js-black-bg');
  var blackBg = document.getElementById('js-black-bg');
  var closeBtn = document.getElementById('js-close-btn');
  var showBtn = document.getElementById('js-show-popup');
  //closePopUp(blackBg);
  closePopUp(closeBtn);
  closePopUp(showBtn);
  function closePopUp(elem) {
    if(!elem) return;
    elem.addEventListener('click', function() {
      popup.classList.toggle('is-show');
    });
  }
}

//ローディング画面
function loadStop(){
  const loader = document.getElementById('js-loader');
  window.addEventListener('load', () => {
    const ms = 400;
    loader.style.transition = 'opacity ' + ms + 'ms';
    loader.style.display = 'none';
    const loaderOpacity = function(){
      loader.style.opacity = 0;
    }
    const loaderDisplay = function(){
      loader.style.opacity = 0;
    }
    setTimeout(loaderOpacity, 0.05);
    setTimeout(loaderDisplay, ms);
  });
}

//チュートリアル

function tutorial01(){
  document.write('<head><link rel="stylesheet" href="components/style.css"></head><div class="tutorial_wrap" id ="mainView"><input class="tutorial" type="button" style=" background-image: url(components/img/tutorial/nag_tutorial_1.png);" onclick="tutorial02();"></div>');
}

function tutorial02(){
  mainViewRemove();
  document.write('<head><link rel="stylesheet" href="components/style.css"></head><div class="tutorial_wrap" id ="mainView"><input class="tutorial" type="button" style=" background-image: url(components/img/tutorial/nag_tutorial_2.png);" onclick="tutorial03();"></div>');
}

function tutorial03(){
  mainViewRemove();
  document.write('<head><link rel="stylesheet" href="components/style.css"></head><div class="tutorial_wrap" id ="mainView"><input class="tutorial" type="button" style=" background-image: url(components/img/tutorial/nag_tutorial_3.png);" onclick="tutorial04();"></div>');
}

function tutorial04(){
  mainViewRemove();
  document.write('<head><link rel="stylesheet" href="components/style.css"></head><div class="tutorial_wrap" id ="mainView"><input class="tutorial" type="button" style=" background-image: url(components/img/tutorial/nag_tutorial_4.png);" onclick="tutorial05();"></div>');
}

function tutorial05(){
  mainViewRemove();
  document.write('<head><link rel="stylesheet" href="components/style.css"></head><div class="tutorial_wrap" id ="mainView"><input class="tutorial" type="button" style=" background-image: url(components/img/tutorial/nag_tutorial_5.png);" onclick="tutorial06();"></div>');
}

function tutorial06(){
  mainViewRemove();
  document.write('<head><link rel="stylesheet" href="components/style.css"></head><div class="tutorial_wrap" id ="mainView"><input class="tutorial" type="button" style=" background-image: url(components/img/tutorial/nag_tutorial_6.png);" onclick="tutorial07();"></div>');
}

function tutorial07(){
  mainViewRemove();
  document.write('<head><link rel="stylesheet" href="components/style.css"></head><div class="tutorial_wrap" id ="mainView"><input class="tutorial" type="button" style=" background-image: url(components/img/tutorial/nag_tutorial_7.png);" onclick="tutorial08();"></div>');
}

function tutorial08(){
  mainViewRemove();
  document.write('<head><link rel="stylesheet" href="components/style.css"></head><div class="tutorial_wrap" id ="mainView"><input class="tutorial" type="button" style=" background-image: url(components/img/tutorial/nag_tutorial_8.png);" onclick="setBadges();location.reload();"></div>');
}

//基本機能

function mainViewRemove(){
  var element = document.getElementById('mainView');
  element.remove();
}

function loadReload(){
  mainViewRemove();
  writeLoader();
  location.reload();
}

function writeLoader(){
  document.write('<div id="js-loader" class="loader"><script type="text/javascript">loadStop();</script></div>');
}

//スタート画面生成
function writeStartMessage(){
  document.write('<body style="background-image: url(components/img/nag_setting.png);"><div class="wrap" id="main"><header></header><div class="container"><div class="box_message_setting"><p class="message_setting">今回はどのくらい爪をのばしますか？</p></div><div class="box_select"><div class="select_shadow"><select id="selectGoal"><option value="1">1mm<option value="2">2mm<option value="3">3mm</select></div></div><div class="box_button_setting"><input class="btn_start_setting" type="button" value=""onclick="setGoal();setStartDay();nailgrow();loadReload();"></div></div><footer></footer></div>');
}

//設定画面生成
function writeResetMessage(){
  document.write('<head><meta charset="UTF-8"><title>nailGrow</title><link rel="stylesheet" href="components/style.css"><script type="text/javascript" src="components/main.js"></script></head><body style="background-image: url(components/img/nag_setting.png);"><div class="wrap" id="mainView"><header></header><div class="container"><div class="box_message_setting"><p class="message_setting">今回はどのくらい爪をのばしますか？</p></div><div class="box_select"><div class="select_shadow"><select id="selectGoal"><option value="1" >1mm<option value="2">2mm<option value="3">3mm</select></div></div><div class="box_button_setting"><input class="btn_start_setting" type="button" value="" onclick="setGoal();resetGoalDays();"></div></div><footer></footer></div>');
}

//ホーム画面生成

function writeHeaderHomeLose(){
  var myDayCount = localStorage.getItem('myDayCount');  
  document.write('<head><link rel="stylesheet" href="components/style.css"></head><body style="background-image: url(components/img/home/nag_home_'+myDayCount+'.png);"></div><div class="wrap" id ="mainView"><div class="popup" id="js-popup"><div class="popup-inner"><input class="close-btn" id="js-close-btn" type="button" onclick="clearStartDay();"><img src="components/img/nag_futassei_1208.png" alt="ポップアップ画像"></div><div class="black-background" id="js-black-bg"></div></div><header><input class="btn_setting" type="button" value="" onclick="goResetGoal();"></header>');
}

function HeaderHomeWin(){
  var myDayCount = localStorage.getItem('myDayCount');
  document.write('<head><link rel="stylesheet" href="components/style.css"></head><body style="background-image: url(components/img/home/nag_home_'+myDayCount+'.png);"><div class="popup-win"><div class="popup-inner-win"><input class="close-btn-win" type="button" onclick="goGetBadges();"><img src="components/img/nag_tassei_1208.png" alt="ポップアップ画像"></div><div class="black-background-win"></div></div><div class="wrap" id ="mainView"><header><input class="btn_setting" type="button" value="" onclick="goResetGoal();"></header>');
}

function writeStroke(){
  var myDayCount = localStorage.getItem('myDayCount');
  var my_goal = localStorage.getItem('my_goal');
  var stroke = Math.floor( 299 - myDayCount *22 / my_goal )
  //var stroke = Math.floor( 90 )
  var windowHeight = window.innerHeight;
  if(windowHeight >= 734 ){
    document.write('<div class="container"><div class="box_counter"><style>@keyframes chart {from {stroke-dashoffset: 300;}to{stroke-dashoffset:'+stroke+';}}</style><svg class="progress" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><defs><linearGradient id="g0"><stop offset="0.2" stop-color="#FF998D"/><stop offset="0.8" stop-color="#FFDCC3"/></linearGradient></defs><circle id="chartfill" r="35" cx="47" cy="46" stroke-width="10" stroke-dasharray="300"  fill="transparent" stroke="url(#g0)" stroke-linecap="round" class="meter"></circle></svg><div class="circle_out">');
    }else{
    document.write('<div class="container"><div class="box_counter"><style>@keyframes chart {from {stroke-dashoffset: 300;}to{stroke-dashoffset:'+stroke+';}}</style><svg class="progress" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><defs><linearGradient id="g0"><stop offset="0.2" stop-color="#FF998D"/><stop offset="0.8" stop-color="#FFDCC3"/></linearGradient></defs><circle id="chartfill" r="38" cx="50" cy="52" stroke-width="10" stroke-dasharray="300"  fill="transparent" stroke="url(#g0)" stroke-linecap="round" class="meter"></circle></svg><div class="circle_out">');
    }
}
function witeCircle_in(){
  var myDayCount = localStorage.getItem('myDayCount');
  var my_goalDays = localStorage.getItem('my_goalDays');
  document.write('<div class="circle_in"><div class="title" ><span></span></div><div class="num_day"><span class="numerator_day" style="background-image: url(components/img/nag_'+myDayCount+'_1208.png);">'+myDayCount+'</span><span class="denominator_day"style="background-image: url(components/img/nag_'+my_goalDays+'_1208.png);">'+my_goalDays+'</span></div></div></div></div>');
  }
// myDayCountの値をテキストで出力する。
// 指定日も１日と数える場合は１を足します(myDayCount+1)

function writeBox_button(){
  document.write('<div class="box_button"><input class="btn_win" type="button" value="" onclick="nailgrow(); loadReload();"><input class="btn_lose" id="js-show-popup" type="button" value="" ></div><script>popupImage();</script>');
}

function writeBox_startMessage(){
  var my_goalDays = localStorage.getItem('my_goalDays');
  document.write('<div class="box_message"><p class="message">爪が伸びるスピードは、1日あたり約0.1mm。<br>目標達成にむけて、'+my_goalDays+'日間頑張りましょう!</p></div></div>');
}

function writeBox_message(){
  var myCalGoal = localStorage.getItem('myCalGoal');
  var my_goalDays = localStorage.getItem('my_goalDays');
  var myDayCount = localStorage.getItem('myDayCount');
  var daysLeft = my_goalDays - myDayCount
  document.write('<div class="box_message"><p class="message">目標まで'+myCalGoal+'mm、残り'+daysLeft+'日です！</p></div></div>');
  // テキストを出力する。
}

function writeFooter(){
  document.write('<footer><div class="badges"><input class="btn_badges" type="button" value="badges" onclick="goBadges();"></div></footer></div>');
}
    
//バッチ画面生成

function writeBadges(){
  var badges = localStorage.getItem('my_badges'); 
  document.write('<head><meta charset="UTF-8"><title>nailGrow</title><link rel="stylesheet" href="components/style.css"><script type="text/javascript" src="components/main.js"></script></head><body style="background-image: url(components/img/badges/nag_badge_'+badges+'.png);"><div class="wrap" id="mainView"><div class="container_badges"><div class="box_badges">');

    for (let i = 0; i < badges ; i++) {
      document.write('<img src="components/img/nag_white_1208.png" alt="獲得バッチ画像">');
    }
    for (let i = 0; i < 30-badges ; i++) {
      document.write('<img src="components/img/nag_gray_1208.png" alt="獲得バッチ画像">');
    }
}
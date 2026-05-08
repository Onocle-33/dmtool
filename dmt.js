// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkYPx7NpFbdpmt-pNapu5FZn5HYWwCqvA",
  authDomain: "dmtool-34a7d.firebaseapp.com",
  projectId: "dmtool-34a7d",
  storageBucket: "dmtool-34a7d.firebasestorage.app",
  messagingSenderId: "682046414940",
  appId: "1:682046414940:web:816aefbd845e13b02f8699",
  measurementId: "G-YXQ3NGRF87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const ent=[];
const chkEnt=[];
var mode=0;
const pointData=[];
const rankData=[];
const snd = new Audio("sound/剣で斬る6.mp3");
const snd2 = new Audio("sound/重力魔法1.mp3");
const snd3 = new Audio("sound/魔法陣を展開.mp3");
snd.preload="auto"
snd2.preload="auto"
snd3.preload="auto"
var count = 0;
//setInterval(loading, 1000);
function soundLoad(){
    snd.loop=false
    snd2.loop=false
    snd3.loop=false
    snd.muted=true
    snd2.muted=true
    snd3.muted=true
    snd.play()
    snd2.play()
    snd3.play()
    return
}

function entry(){
    let decks1=document.getElementById("decks").value
    let names1=document.getElementById("names").value
    if(ent.length>=1){
        ent.push(["$@"+decks1,names1,"t"])
    }else{
        ent.push([decks1,names1,"t"]);
    }
   
    //console.log(ent)
    list();
    return;
}

function dld(){
    
    const reader = new FileReader();
    const blob = new Blob(ent, { type: "text" });
    reader.readAsText(blob);
    
    reader.onload = function(){
        const url = URL.createObjectURL(blob);
        var anchor = document.createElement('a');
        anchor.download = "entry.dat";
        anchor.href = url;
        anchor.click()
        return;
    }
}





function list() {
    //soundLoad();
    let res = "";
    if (ent.length >= 1) {
        res = res + "<table border='2' id='tb'>";
        res = res + "<tr>";
        res = res + "<th>デッキ名</th>"
        res = res + "<th>持ち主</th>"
        res = res + "<th>抽選</th>"
        res = res + "<th></th>"
        res = res + "<th></th>"
        res = res + "</tr>";
        for (let i = 0; i < ent.length; i++) {
            res = res + "<tr id='ls'>";
            //res = res + "<div id='bdr'>"
            let cut = ent[i][0].substr(2*(ent[i][0].indexOf('$@')>=0));
            res = res + "<td>" + cut + "</td>"
            res = res + "<td>" + ent[i][1] + "</td>"
            res = res + "<td><input type='checkbox' id='chk" + i + "'"
            if (ent[i][2] == "t") {
                res = res + " checked=1"
            }
            res = res + " onchange='chk()'></td>";
            res = res + "<td><input type='button' id='" + i + "' value='上へ移動'onclick='up(" + i + ")'><br><input type='button' id='" + i + "' value='下へ移動'onclick='down(" + i + ")'></td>"
            res = res + "<td><input type='button' id='" + i + "' value='削除'onclick='del(" + i + ")'></td>";
            //res = res + "</div>"
            res = res + "</tr>"
        }
        res = res + "</table>"

    }
    if(ent.length>0){
        document.getElementById("list").className="active"
    }else{
        document.getElementById("list").className="hide"
    }
    document.getElementById("list").innerHTML=res;
}



function del(id){
    let res=window.confirm("削除しますか？\nこの操作は取り消せません。")
    if(!res){
        return;
    }
    ent.splice(id,1);
    if(ent.length<1){
        list();
        return;
    }
    if(ent[0][0].indexOf("$@")>=0){
        let cut = ent[0][0].substr(2*(ent[0][0].indexOf('$@')>=0));
        ent[0][0]=cut
    }
    
    list();
    return;
}

function up(id){
    if(id<=0){
        return;
    }
    let wk;
    for(let i=0;i<ent[1].length;i++){
        wk=ent[id][i];
        ent[id][i]=ent[id-1][i];
        ent[id-1][i]=wk;
    }
    if(ent[0][0].indexOf("$@")>=0){
        let cut = ent[0][0].substr(2*(ent[0][0].indexOf('$@')>=0));
        ent[0][0]=cut
    }
    if(ent[id][0].substr(0,2)!="$@"){
        ent[id][0]="$@" + ent[id][0]
    }
    list();
    return;
}
function down(id){
    if(id>=ent.length){
        return;
    }
    let wk;
    for(let i=0;i<ent[1].length;i++){
        wk=ent[id][i];
        ent[id][i]=ent[id+1][i];
        ent[id+1][i]=wk;
    }
    if(ent[0][0].indexOf("$@")>=0){
        let cut = ent[i][0].substr(2*(ent[i][0].indexOf('$@')>=0));
        ent[0][0]=cut
    }
    if(ent[id+1][0].substr(0,2)!="$@"){
        ent[id+1][0]="$@" + ent[id+1][0]
    }
    list();
    return;
}

function chk(){
    for(let i=0;i<ent.length;i++){
        if(document.getElementById("chk"+i).checked){
            ent[i][2]="t";
        }else{
            ent[i][2]="f"
        }
    }
    return;
}

function chg(r){
    const pages=[]
    pages.push(["tab1","sc"])
    pages.push(["tab2","conf"])
    pages.push(["tab3","music"])
    pages.push(["tab4","data"])
    document.getElementById("sel").scrollTo(0,0)
    for(i=0;i<pages.length;i++){
        let res1 = "off"
        let res2 = "hide"
        if(i==r){
            res1="on"
            res2="active"
        }
        document.getElementById(pages[i][0]).className=res1
        document.getElementById(pages[i][1]).className=res2
    }
    return
}
function volume(){
    for(let i=1;i<=4;i++){
        document.getElementById("msc" + i).volume=document.getElementById("vol").value
    }
}
function volume2(){
    snd.volume=document.getElementById("vol2").value
    snd2.volume=document.getElementById("vol2").value
    snd3.volume=document.getElementById("vol2").value
}
function battle(){
    if(ent.length<1){
        return
    }
    chk()
    let res1=0
    let res2=1
    const table1=[];
    const table2=[];
    for(let i=0;i<ent.length;i++){
        //console.log(ent[i][2]);
        if(ent[i][2]=="t"){
            table1.push([ent[i][0].substr(2*(ent[i][0].indexOf('$@')>=0)),ent[i][1]]);
        }
    }
    if(table1.length<2){
        return
    }
    res1=Math.floor(Math.random() * table1.length);
    console.log("res1:" + res1);
    let j=0;
    for(let i=0;i<ent.length;i++){
        //console.log(ent[i][2]);
        if(ent[i][2]=="t"){
            if(j!=res1){
                table2.push([ent[i][0].substr(2*(ent[i][0].indexOf('$@')>=0)),ent[i][1]]);
            }
            j=j+1
        }
    }
    console.log(table1)
    console.log(table2)
    res2=Math.floor(Math.random() * table2.length);
    console.log("res2:" + res2);
    console.log(table1[res1][0] +"-from:" + table1[res1][1] + " - VS - " + table2[res2][0] +"-from:" + table2[res2][1]);
    //document.getElementById("vs").innerText=table1[res1][0] +"-from:" + table1[res1][1] + " - VS - " + table2[res2][0] +"-from:" + table2[res2][1]
    document.getElementById("u1").innerText=document.getElementById("pl1").value
    document.getElementById("u2").innerText=document.getElementById("pl2").value
    document.getElementById("d1").innerText= "【" +table1[res1][0] + "】"
    document.getElementById("d2").innerText= "【" +table2[res2][0] + "】"
    document.getElementById("c1").innerText="builder\n≪" + table1[res1][1] + "≫"
    document.getElementById("c2").innerText="builder\n≪" + table2[res2][1] + "≫"
    document.getElementById("page1").className="hide"
    document.getElementById("page2").className="active"
    document.getElementById("vs").className="active"
    document.getElementById("vss").className="active"
    document.getElementById("den").className="active"
    document.getElementById("card").className="active"
    document.getElementById("user").className="active"
    document.getElementById("deck").className="active"
    document.getElementById("d1").className="active"
    document.getElementById("d2").className="active"
    document.getElementById("c1").className="active"
    document.getElementById("c2").className="active"
    document.getElementById("cr").className="active"
    document.getElementById("boxs").className="active"
    document.getElementById("box1").className="active"
    document.getElementById("box2").className="active"
    document.getElementById("return").className="active"
    document.getElementById("first").className="active"
    se()
    return
}

function se(){
    
    snd.loop=false
    snd2.loop=false
    snd3.loop=false
    snd.pause();
    snd2.pause();
    snd3.pause();
    snd.currentTime=0;
    snd2.currentTime=0;
    snd3.currentTime=0;
    if(document.getElementById("sound").checked){
        snd.muted=false
        snd2.muted=false
        snd3.muted=false
        snd.play();
        snd2.play();
        snd3.play();
    }
}
function onePick(){
    
    if(ent.length<1){
        return
    }
    chk()
    let res1=0
    let res2=1
    const table1=[];
    for(let i=0;i<ent.length;i++){
        //console.log(ent[i][2]);
        if(ent[i][2]=="t"){
            table1.push([ ent[i][0].substr(2*(ent[i][0].indexOf('$@')>=0)),ent[i][1]]);
        }
    }
    if(table1.length<2){
        return
    }
    res1=Math.floor(Math.random() * table1.length);
    console.log("res1:" + res1);
    alert("デッキ:" + table1[res1][0] + "\n構築:" + table1[res1][1])
}
function reset(){
    document.getElementById("page1").className="active"
    document.getElementById("page2").className="hide"
    document.getElementById("vs").className="hide"
    document.getElementById("vss").className="hide"
    document.getElementById("den").className="hide"
    document.getElementById("card").className="hide"
    document.getElementById("user").className="hide"
    document.getElementById("deck").className="hide"
    document.getElementById("d1").className="hide"
    document.getElementById("d2").className="hide"
    document.getElementById("c1").className="hide"
    document.getElementById("c2").className="hide"
    document.getElementById("cr").className="hide"
    document.getElementById("boxs").className="hide"
    document.getElementById("box1").className="hide"
    document.getElementById("box2").className="hide"
    document.getElementById("return").className="hide"
    document.getElementById("first").className="hide"
    document.getElementById("first1").className="hide"
    document.getElementById("first2").className="hide"

    document.getElementById("first1").innerText="";
    document.getElementById("first2").innerText="";
}

function inports(){
    //console.log(document.getElementById("pass").value)
    let ps=document.getElementById("pass").value;
    const res1=ps.split("$@");
    for(let i=0;i<res1.length;i++){
        let tb=res1[i].split(",")
        if(tb[0]==false||tb[1]==false||tb.length<=1){
            alert("インポートに失敗しました。\nテキストが正常でない可能性があります。");
            return;
        }
        if(ent.length>=1){
            ent.push(["$@"+tb[0],tb[1],"t"])
        }else{
            ent.push([tb[0],tb[1],"t"]);
        }
    }
    alert("インポートに成功しました。");
    list()
   return;
}
function exp(){
    let res=""
    chk()
    for(let i=0;i<ent.length;i++){
        res=res+ent[i][0]+",";
        res=res+ent[i][1];
    }
    //console.log(res);
    document.getElementById("pass").value=res;
}
function copy(){
    document.getElementById("pass").select();                              // コピーしたい要素を選択状態にする
	document.execCommand("Copy");                     // 選択しているテキストをクリップボードにコピーする
	alert("コピーしました");  
}
function crs(){
    document.getElementById("pass").value="";    
}
function loading(){
    let dot;
    dot="";
    for(let i=0;i<count;i++){
        dot=dot+"."
    }
    count=count+1;
    if(count>3){
        count=0;
    }
    document.getElementById("ld2").innerText="Now Loading" + dot
}

function first(){
    let res=Math.round(Math.random());
    let res1="先攻"
    let res2="後攻"
    if(res==1){
        res1="後攻"
        res2="先攻"
    }
    document.getElementById("first1").innerText=res1;
    document.getElementById("first2").innerText=res2;
    document.getElementById("first1").className="active"
    document.getElementById("first2").className="active"
    document.getElementById("first").className="hide"

}

function sFirst(){
    let res=Math.round(Math.random());
    let res2=document.getElementById("pl1").value
    if(res==1){
        res2=document.getElementById("pl2").value
    }
    alert(res2 + "の先攻")
}

window.onload= volume(),volume2()
document.getElementById("ent").onclick=entry();
document.getElementById("se").onclick=se();
export { list,entry,del,up,down,chk,chg,volume,volume2,battle,se,onePick,reset,inports,exp,copy,crs,first,sFirst};

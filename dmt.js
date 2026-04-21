const ent=[];
const chkEnt=[];
var mode=0;
const pointData=[];
const rankData=[];
const snd = new Audio("sound/剣で斬る6.mp3");
const snd2 = new Audio("sound/重力魔法1.mp3");
const snd3 = new Audio("sound/魔法陣を展開.mp3");

function soundLoad(){
    snd.muted=false
    snd2.muted=false
    snd3.muted=false
    snd.play()
    snd2.play()
    snd3.play()
    return
}

function entry(){
    let decks1=document.getElementById("decks").value
    let names1=document.getElementById("names").value
    if(ent.length>=1){
        ent.push(["$"+decks1,names1,"t"])
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


function inports(){
    const input = document.querySelector(".input");
    let files = input.files;
    console.log(files);
    if(files.length!=1){
        return;
    }
    const blob = new Blob(files, {type: 'dat'});
    const reader = new FileReader();
    reader.readAsText(blob)
    reader.onload = function(){
    let file_type = files[0].type
    console.log(file_type)
    if(file_type!=""){
        return;
    }
    let res = (reader.result.split("$"));
    ent.splice(0);
    for(let i=0;i<res.length;i++){
        let res2= res[i].split(",");
        if(i>=1){
        res2[0]="$"+res2[0];
        }
        //console.log(res2)
        ent.push(res2);
    }

    //console.log(ent);
    list();
};
    
    return;
}



function list() {
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
            let cut = ent[i][0].substr(ent[i][0].indexOf('$') + 1);
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
    if(ent[0][0].indexOf("$")>=0){
        let cut = ent[0][0].substr(ent[0][0].indexOf('$') + 1);
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
            table1.push([ent[i][0].substr(ent[i][0].indexOf('$') + 1),ent[i][1]]);
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
                table2.push([ent[i][0].substr(ent[i][0].indexOf('$') + 1),ent[i][1]]);
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
    snd.loop=false
    snd2.loop=false
    snd3.loop=false
    if(document.getElementById("sound").checked){
        snd.muted=true
        snd2.muted=true
        snd3.muted=true
        snd.play();
        snd2.play();
        snd3.play();
    }
    return
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

}
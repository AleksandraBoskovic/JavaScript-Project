var m = 1;
var s = 11;
var num_move = 0;
var picture_swap=[];
var picture_id=[];
let first_name = "";
let last_name = "";
var time_end;

function startTime() {
    if((m==1 && s>0) || (m==0 && s>0))
        s--;
    else {
        m=0;
        s=59;
    }
    document.getElementById("h1").innerHTML ="0"+ m + ":" + ((s>9)? s : "0" + s);

    if(m!=0 || s!=0){

        var t = setTimeout(function(){ startTime() }, 1000);}
    else{
        document.getElementById("h1").style = "color:red;";

        var wait = setTimeout(window.alert("Time is up\n Try again"),1000);

        location.reload();
    }
}


function on_submit() {
    first_name = document.getElementById("fname").value;
    last_name = document.getElementById("lname").value;
    console.log(first_name,last_name);
    startTime();

}

async function end_game() {
    console.log("end");
    let res = await axios.post('/addPlayer', {moves_number:num_move,fname:first_name,lname:last_name,time:time_end});
    location.reload();
}

class marvel_heroes{
    constructor(full,peaces){
        this.full=full;
        this.peaces=peaces;
    }

    chack(){
        var end = true;
        for (let index = 0; index < 8; index++) {
            var number_of_picture = document.getElementById(index).src.split( '.' )[1];
            if(number_of_picture != (index+1)){
                end=false ;
                break;
            }
        }

        if(end){
            var minutes;
            var seconds;

            if(m==1) {
                minutes=0;
                seconds=10-s;
            }
            else{
                if(s<=10)
                { minutes=1;
                    seconds=10-s;

                }
                else{
                    minutes=0;
                    seconds=70-s;
                }

            }
            time_end="["+minutes+":"+seconds+"]";
            end_game();
            window.alert("SUCCESS\n You use "+ num_move+ " moves\n Complete for "+minutes+":"+seconds);

            m=1;s=11;
        }


    } // end chack

} // end class

Array.prototype.shuffle = function()
{
    var i=this.length , j, temp;
    while (--i > 0) {
        j= Math.floor(Math.random() * (i+1));
        temp= this[j];
        this[j] = this[i];
        this[i] = temp ;
    }
}


function swap(picture){
    if (picture_swap.length < 2) {
        if (picture_swap.length == 0) {
            picture_swap.push(picture.src);
            picture_id.push(picture.id);
        } else {
            picture_swap.push(picture.src);
            picture_id.push(picture.id);
            document.getElementById(picture_id[0]).src = picture_swap[1] ;
            document.getElementById(picture_id[1]).src = picture_swap[0] ;
            num_move+=1;
            document.getElementById('moves_number').innerHTML = ""+num_move+"" ;
            picture_swap = [];
            picture_id = [];

            mapa.get(random_pic).chack();
        }

    }
}
var full_name1="Spiderman";
var full_name2="Wolverine";
var full_name3="Deadpool";
var array_1=[];
var array_2=[];
var array_3=[];

for(let i=1;i<9;i++){
    array_1.push(full_name1+'.'+i+'.jpg');
    array_2.push(full_name2+'.'+i+'.jpg');
    array_3.push(full_name3+'.'+i+'.jpg');
}

var class1 = new marvel_heroes(full_name1,array_1);
var class2 = new marvel_heroes(full_name2,array_2);
var class3 = new marvel_heroes(full_name3,array_3);
var mapa = new Map ([[0,class1],[1,class2],[2,class3]]);

function newBoard() {
    num_move = 0;
    document.getElementById("moves_number").innerHTML="";
    var output ="";
    var rand = (max) => {return Math.floor(Math.random() * Math.floor(max))};
    random_pic=rand(mapa.size);
    mapa.get(random_pic).peaces.shuffle();
    for (var index = 0; index < 8; index++) {
        output += '<img id="'+index+'" onclick ="swap(this)" src="'+mapa.get(random_pic).peaces[index]+'"> ';

    }
    document.getElementById('puzzle_board').innerHTML=output;
    document.getElementById('full_picture').src=mapa.get(random_pic).full+'.jpg';

}






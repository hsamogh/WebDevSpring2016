/**
 * Created by Amogh on 3/16/2016.
 */
myapps=(function()
{

    var api={
        add:add
    };

var html="<h1>";
html+="Welcome to Online Calculator";
html+="</h1>";

for(var i=1; i<=5; i++)
{
    if(i<5){
        var idgen = 'num'+i;
        html+="<input type='text' id=\'"+idgen+"\'>";
        html+="A"+i;
        html+="</input>";
        html+="<br/>"
    }
    else{
        html+="<button id='submit' onclick='myapps.add()'>";
        html+="SUBMIT";
        html+="</button>";
        html+="<br/>";
    }
}

html+="<input type='text' id='num6'>";
html+="sum";
html+="</input>";
document.write(html);


function add(){
    var sum=0;
    for(var i=1; i<5; i++){
        var el=document.getElementById("num"+i).value;

        sum+=parseInt(el);

    }
    alert(sum);
    document.getElementById("num6").value=sum;
    return false;
}
    return api;
})();
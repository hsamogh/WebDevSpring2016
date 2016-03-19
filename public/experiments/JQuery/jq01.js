(function(){
    $(init);
    function init(){
        $("#lorem").html("Hello Lorem");
        $("#ipsum").html("Hello Ipsum");

        var names=['abhiram','samarth','hemanth'];

        for(var name in names){
            var li =$("<li>");
            li.append(names[name]);
            $("#names").prepend(li);
        }

        $("#singleClick").click(function(){
            alert("Single click Hello");
        });

        $("#doubleClick").dblclick(function(){
            alert("Double Click Hello");
        });

        $("#messageClick").hover(hoverEnter,hoverExit);

        function hoverEnter(enterEvent){
            alert("hower message on enter");
        }

        function hoverExit(leaveEvent){
            alert("hower message on exit");
        }
    }
})();
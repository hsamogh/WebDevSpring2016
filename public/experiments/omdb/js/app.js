(function(){
    $(init);
    var $movieTitle;
    var $searchButton;
    var $tbodygg;
    function init()
    {
        $movieTitle=$("#movieName");
        $searchButton=$("#search");
        $tbodygg = $("#searchtable tbody");

        $searchButton.click(searchTitle);
    }

    function searchTitle()
    {
        var title=$movieTitle.val();
        var url="http://www.omdbapi.com/?s="+title;
        $.ajax({
            url:url,
            success:renderSearchResult
        });
    }

    function renderSearchResult(response){

        var listofm=response.Search;
        for(var i=0 ; i<listofm.length; i++){
            var title=listofm[i].Title;
            console.log(title);
            var yor = listofm[i].Year;
            var $tr = $("<tr>");
            var $td=$("<td>").append(title).appendTo($tr);
            $td = $("<td>").append(yor).appendTo($tr);
            $tbodygg.append($tr)
        }



    }

})();
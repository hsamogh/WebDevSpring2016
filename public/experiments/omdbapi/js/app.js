(function(){


    jQuery(init);
    var $movietitle;
    var $movietitlebut;
    var $tableid;
    var searchURL="http://www.omdbapi.com/?s="
    function init() {
         $movietitle=$("#movieTitle");
         $movietitlebut = $("#movieTitleSubmit");
        $movietitlebut.click(search);
    }

    function search()
    {
        var movietitle = $movietitle.val();
        //alert(searchURL+movietitle);
        $.ajax({
            url:searchURL+movietitle,
            success: displayResult
        });
    }

    function displayResult(response)
    {
       //console.log(result);
        var totalResponse= response.totalResults;
        var resultset=response.Search;
        for (var m = 0 ; m<resultset.length; m++)
        {
            var movie = resultset[m];
            var title = movie.title;
            var poster = movie.poster;
            var year = movie.Year;
            var id =movie.imdbID;


        }
    }

})();


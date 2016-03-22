/**
 * Created by Amogh on 3/20/2016.
 */

(function(){

    $(init);
    function init(){
        $("#date").datepicker();

        $("#accordion").accordion();

        $("#sortList").sortable();

        $("#resizableText").resizable();

        $("#dialog")
            .dialog();

        var ele=["amogh","abhiram","hemanth","vikas","samarth","deep"];
        $("#tags").autocomplete({
            source:ele
        });

    }



})();
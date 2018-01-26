
$(document).ready(function() {
    


var root = "/apps/{{currentApp.appDirName}}/views/";

var className = $("main").attr('class');





   switch (className) {
       case 'forecast-index-wide':
           forecastIndexWide();
           break;
       case 'another-page':
           anotherPage();
       break;
       case 'finance-transactions':
           financeTransactions();
       break;
       default: break;
}


function financeTransactions(){
    
var from_$input = $('#input_from').pickadate(),
    from_picker = from_$input.pickadate('picker')

var to_$input = $('#input_to').pickadate(),
    to_picker = to_$input.pickadate('picker')


// Check if there’s a “from” or “to” date to start with.
if ( from_picker.get('value') ) {
  to_picker.set('min', from_picker.get('select'))
}
if ( to_picker.get('value') ) {
  from_picker.set('max', to_picker.get('select'))
}

// When something is selected, update the “from” and “to” limits.
from_picker.on('set', function(event) {
  if ( event.select ) {
    to_picker.set('min', from_picker.get('select'))    
  }
  else if ( 'clear' in event ) {
    to_picker.set('min', false)
  }
})
to_picker.on('set', function(event) {
  if ( event.select ) {
    from_picker.set('max', to_picker.get('select'))
  }
  else if ( 'clear' in event ) {
    from_picker.set('max', false)
  }
})

 
$('tr').click(function () {
    $(this).next('tr').toggle();
});
    
}

function forecastIndexWide(){
  $("body").addClass("wide");

var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250],
        ['data2', 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 321, 22],
        ['data3', 50, 20, 10, 40, 15, 25, 30, 200, 222, 332, 533, 432],
        ['data4', 50, 20, 10, 40, 15, 25, 30, 200, 221, 342, 112, 235]
      ],
        type: 'area-spline',
        colors: {
            data1: '#d53880',
            data2: '#2e358b',
            data3: '#912b88',
            data3: '#cccccc'
        },
        names: {
            data1: 'Levy in',
            data2: 'Traiing costs',
            data3: 'Co-investment',
            data4: 'Transfers'
        },
        subchart: {
            show: true
        }        
    },

});
    
};
    
    var XMLSource = $('#search').attr('xmlData');

        $(".search-submit").click(function(e){
            e.preventDefault();
            keyword = $("#search-main").val();
            stn = '';
            searchThis();
        });
    
    $("body").keydown(function(e){
        if ( e.which == 13 ) {
            keyword = $("#search-main").val();
            stn = '';
            searchThis();
        }
    });
    
    
           $("#search-main").focus();
 
function searchThis() {

        $.ajax({
            type: "GET",
            url: XMLSource,
            dataType: "xml",
            success: function (xml) {
                loadstnlocation(xml)
            },
            error: function (request, error) {
                //console.log(arguments);
                console.log("something broke in the searchThis function");
                //alert(" Can't do because: " + error);
            }
        });
    }

    function loadstnlocation(xmlData) {
    i = 0;
        c = 0;
        var row;
        var searchExp = "";
        var stn = "";
        
        

        $(xmlData).find('url').each(function () {

            i++;
            

            var iName = $(this).find('loc').text();
            console.log(iName);

            
            //console.log(iName);

            //Format the keyword expression
            var exp = new RegExp(keyword, "gi");
            searchExp = iName.match(exp);


            
            
var str = iName;
console.log(str.split('/').pop(-1).replace(/-/g, ' ' ));

          
                  var safeName = iName.split('/').pop(-1).replace(/-/g, ' ' )
            
            //var sortBy = localStorage.getItem("addSort");
            //sortBy = "Public body";

            if (searchExp != null) {
                    returnList();
                    c++;
            }

            
            

            function returnList() {

                
                stn += '<li class="item" data-id=' + i + '"><h2 class="result-title bold-medium"><a href="'+iName+'">' + safeName + '</a></h2></li>'; 
            }
            
           
        });
        


				$('span.count').text(c);
				$('span.text').text(" results found");
        showList(stn);

    }

    function showList(stn) {

	        //Populate on page
        var contentTop = '<ul class="list list-links">';
        var contentBottom = '</ul>';
        $('#results').html(contentTop + stn + contentBottom);
    }


});




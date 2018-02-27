
$(document).ready(function() {
var POCgraphDataJSON;
var root = "/apps/{{currentApp.appDirName}}/views/";
//console.log(root);
var className = $("main").attr('class');
var msg = getQueryVariable("msg");
var transferForecastEmpty = localStorage.getItem("transferForecastEmpty");
                var estimatePrice = "";
            var levyLength = "";
var fieldHasError = false;
    var formHasError = false;
    var appValue;
    //get url variables    
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    }    
    
    
    $(".link-back").click(function(e){
        e.preventDefault();
           window.history.back(); 
    });
    
    
    $("#clearData").click(function(e){
        e.preventDefault();
        localStorage.clear();
        location.reload();
    })


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
       case 'transfers-dashboard':
           transfersDashboard();
       break;
       case 'forecast-view-commitments':
           forecastViewCommitments();
       break;
       case 'forecast-add-cohort-wizard':
           forecastAddCohortWizard();
       break;
       case 'forecast-name-forecast':
           forecastNameForecast();
       break;
       case 'data-vis-demos':
            dataVisDemos();
       default: break;
}

    
    
function dataVisDemos(){
    
    
    
    userAuth = localStorage.getItem("userAuth");
    
    if ( userAuth != "true" ) {
    } else {
        $("#noForecasts").hide();
        $("#existingForecasts").removeClass("hidden");        
    }
    $("#saveForecast").click(function(e){
        e.preventDefault();
        if ( userAuth  != "true") {
            // a quick save to the existing forecasts
            window.location.href = "../../../index";
            $(".success-summary a").hide();
        } else {
            //sender user to register
            $(".success-summary h3").text("FORECAST SAVED");
            $(".success-summary p").text("YOU CAN ACCESS IT FROM THE MANAGE LIST");
        }
    });

  var pocGraphData = 'https://docs.google.com/spreadsheets/d/133N_0QU2Aw8_S-tf52xRckc_A6enHj0B02-namZkw5g/pubhtml';
//  var pocGraphData = 'https://docs.google.com/spreadsheets/d/1txitSUKAz_r_Yn3Q4nPNkoM0mGtP6F9nG_PlmHmUNYw/pubhtml';
    
    
     pocGraphDataFunction()
    
    function pocGraphDataFunction() {
    Tabletop.init( { key: pocGraphData,
                     callback: pocLoadData,
                    parseNumbers: true,
                     simpleSheet: true } )
  }
    
        function pocLoadData(data, tabletop) {
           // $("#json").text(JSON.stringify(data));            
            var pocData = JSON.stringify(data);
            console.log(typeof data);
            console.log( typeof pocData);
              
var chart = c3.generate({
    bindto: '#chartA',
    data: {
        json: data,    
        keys: {
            //x: 'date', // it's possible to specify 'x' when category axis
            x: 'date',
            value: ['levy_in', 'transfer_balance','actual_transfer_monthly','actual_transfer_completion','estimated_transfer_monthly','estimated_transfer_completion','actual_training_monthly','actual_training_completion','estimated_training_monthly','estimated_training_completion','expired_funds','account_balance_formatted','your_contribution','gov_contribution'],
          },
        xFormat: '%Y-%m-%d', // 'xFormat' can be used as custom format of 'x'
        type: 'line',
        colors: {
            data1: '#d53880',
            data2: '#2e358b',
            data3: '#912b88',
            data3: '#cccccc'
        },
        names: {
            data1: 'Balance',
            data3: 'Co-investment',
            data2: 'Your training',
            data4: 'Transfered training',
            data5: 'Transfer allowance'
        }        
    },
    grid: {
        x: {
            lines: [
                {value: "2018-09-01", text: 'Academic year 2018'},
                {value: "2019-09-01", text: 'Academic year 2019'},
                {value: "2020-09-01", text: 'Academic year 2020'},
                {value: "2021-09-01", text: 'Academic year 2021'},
                {value: "2022-09-01", text: 'Academic year 2022'},
                {value: "2023-09-01", text: 'Academic year 2023'},
                {value: "2024-09-01", text: 'Academic year 2024'},
                {value: "2018-04-05", text: 'Financial year 2018'},
                {value: "2019-04-05", text: 'Financial year 2019'},
                {value: "2020-04-05", text: 'Financial year 2020'},
                {value: "2021-04-05", text: 'Financial year 2021'},
                {value: "2022-04-05", text: 'Financial year 2022'},
                {value: "2023-04-05", text: 'Financial year 2023'},
                {value: "2024-04-05", text: 'Financial year 2024'}
            ]
        },
        y: {
            value: 'transfer_allowance', text: 'Transfer allowance'
        }
    },    
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%b'
            },
            label: {
                text: 'Time',
                position: 'outer-center'
            }
        },
        y: {
            label: {
                text: 'Amount in £s',
                position: 'outer-middle'
                // inner-top : default
                // inner-middle
                // inner-bottom
                // outer-top
                // outer-middle
                // outer-bottom
            }
        }        
    }
});    
            
  }
    
};


    
    
    });  

$(document).ready(function() {

var root = "/apps/{{currentApp.appDirName}}/views/";
console.log(root);
var className = $("main").attr('class');
    i = 1;

    
   switch (className) {
       case 'index':
           index();
           break;
       case 'login':
           login();
           break;
       case 'assessmentQuestions':
           assessmentQuestions();
           break;
       default: break;
}

    
    
    function assessmentQuestions(){
        
        //initialise
        $("section, [class$='-summary']").hide();
        $("section#1").show();
        
        // reveal answer
        
        $("form + .button").click(function(e){
            
            // override the normal button behaviour
            e.preventDefault(); 
            
            // get the answer given                        
            questionNumber = $(this).closest("section").attr("id");
            localStorage.setItem("questionNumber",questionNumber)
            //console.log("This is question number " + questionNumber);
            
            answerGiven = $("input[name=radio-group]:checked").val();
            //console.log("The answer given by the user is " + answerGiven);
            
            questionAnswer = $("#"+questionNumber).data("answer");
            //console.log("The answer to the question is " + questionAnswer)
        
            
            // hide the submit button
            $("#"+questionNumber+" .button").first().hide();
            // compare to the actual answer
            if (answerGiven == questionAnswer ) {
                // show the right answer
                $("#"+questionNumber+" .success-summary").show();
            } else {
                // show the wrong answer
                $("#"+questionNumber+" .error-summary").show();
            }
            // store the answer
            // move onto the next question    
            
        });
        
        questionNumber = localStorage.getItem("questionNumber");
        
    $("#" + questionNumber + " [class$='-summary'] .button").click(function(e){
        e.preventDefault();
        console.log("clicked next");
        nextQuestion = questionNumber++;
        $("progress-wrap").attr("progress-percent",nextQuestion);     
        progressBar();
        questionCounter(questionNumber);
        $("section#"+questionNumber).hide();     
        $(this).closest("section").hide();
        //console.log("next question is " + nextQuestion)
        
        showNextQuestion(nextQuestion);
});  
             

    }
    
    
    function showNextQuestion(number){
        $("#"+number).show();
    }
    
    function questionCounter(number){
        $(".current").text(number);
    }
    

  
    
    // duolingo clone scripts

function duoLingo(){
                     var accountData = {
                         users: [{
                            id: 0,
                            email: "ty.fairclough@gmail.com",
                            topScore: 72,
                            levels: [{
                                level1: [1],
                                level2: [1,2,3]
                            }]
                         },
                            {
                            id: 1,
                            email: "tom.fairclough@gmail.com",
                            topScore: 72,
                            levels: [{
                                level1: [1,2,3],
                                level2: [1,2,3]
                            }]
                         }]
                     } 
  
    
    localStorage.setItem("accountData", JSON.stringify(accountData));
    //console.log(JSON.parse(localStorage.getItem("accountData")));
    var showData = JSON.parse(localStorage.getItem("accountData"));
    console.log("array length is " + showData.users.length);
    console.log(showData.users[1].email);
    
    
    for(var i = 0; i < showData.users.length; i++)
    {
      if(showData.users[i].email == 'tom.fairclough@gmail.com')
      {
        console.log(showData.users[i].topScore);
      } else {
          console.log("no-user-found");
      }
    }
    newUser();
                         
}
    
    //duoLingo();
                    
    
    // login redirect
    function login(){
        $(".button").click(function(e) {
            e.preventDefault();
            var email = $("input").val();

            if (localStorage.getItem("accountData") === null) {
                // initialise accounts
                newUser()
            } else {
                for (var i = 0; i < showData.users.length; i++) {
                    if (showData.users[i].email == email) {
                        console.log(showData.users[i].topScore);
                    } else {
                        console.log("no-user-found");
                        //newUser()
                    }
                }
            }

        });
    }
    
    
    function newUser(){
            var email = $("input").val();
        
        var accountData = {
             users: [{
                id: 0,
                email: email,
                topScore: 0,
                levels: [{
                    level1: [],
                    level2: []
                }]
             }]
        }
        
        localStorage.setItem("accountData", JSON.stringify(accountData));
        window.location.href = "../onboarding/chooseGoal";
    }

    

    function progressBar(){
          moveProgressBar();
    // on browser resize...
    $(window).resize(function() {
        moveProgressBar();
    });

    // SIGNATURE PROGRESS
    function moveProgressBar() {
      //console.log("moveProgressBar");
        var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
        var getProgressWrapWidth = $('.progress-wrap').width();
        var progressTotal = getPercent * getProgressWrapWidth;
        var animationLength = 2500;
        
        // on page load, animate percentage bar to data percentage length
        // .stop() used to prevent animation queueing
        $('.progress-bar').stop().animate({
            left: progressTotal
        }, animationLength);
    }
    }

    progressBar();

    
// global js
    
    
    // setting up the transfer detaults
    
    
    $(".link-back").click(function(e){
        e.preventDefault();
        window.history.back();
    })
    
});
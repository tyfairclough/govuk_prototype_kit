
$(document).ready(function() {

var root = "/apps/{{currentApp.appDirName}}/views/";
console.log(root);
var className = $("main").attr('class');
    //i = 1;
    
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
       case 'dashboard':
           dashboard();
           break;
       case 'getStarted':
           getStarted();
           break;
       case 'whatYouKnow':
           whatYouKnow();
           break;
       default: break;
}
    
    
    function getStarted(){
        arrayStart = localStorage.getItem("currentUserID") - 1;
        console.log("current user id: " + arrayStart)
        showData = JSON.parse(localStorage.getItem("accountData"));

 
          $(".button").click(function(e){
            e.preventDefault(); 
            state = $("input[name=radio-group]:checked").val()
            if (state === "casual") {
                
                showData.users[arrayStart].onboarding[0] = "casual";
                localStorage.setItem("accountData", JSON.stringify(showData));
                
                //set pace to casual
            } else if ( state === "regular" ) {
                //set pace to regular
                showData.users[arrayStart].onboarding[0] = "regular";
                localStorage.setItem("accountData", JSON.stringify(showData));            } else {
                //set pace to intense
                showData.users[arrayStart].onboarding[0] = "intense";
                localStorage.setItem("accountData", JSON.stringify(showData));
            }
                window.location.href = "whatYouKnow";
        })         
        
    }
    
    
    function whatYouKnow(){
        arrayStart = localStorage.getItem("currentUserID") - 1;
        console.log("current user id: " + arrayStart)
        showData = JSON.parse(localStorage.getItem("accountData"));

 
          $(".button").click(function(e){
            e.preventDefault(); 
            state = $("input[name=radio-group]:checked").val()
            if (state === "new") {
                
                showData.users[arrayStart].onboarding[1] = "new";
                localStorage.setItem("accountData", JSON.stringify(showData));
                
                //set pace to casual
            } else {
                //set pace to regular
                showData.users[arrayStart].onboarding[1] = "assessment";
                localStorage.setItem("accountData", JSON.stringify(showData));            } 
                window.location.href = "startAssessment";
        })         
        
    } 

    
    function dashboard(){
        i = localStorage.getItem("currentUserID") - 1;
        
        console.log( i );
        //console.log( localStorage.getItem("currentUserID"))
        var showData = JSON.parse(localStorage.getItem("accountData"));
        console.log(showData.users[i].email);
        $(".email").text(showData.users[i].email);
        $(".topScore").text(showData.users[i].topScore);
        
        
        //get level 1 and drop it like it's hot.
        var numberOfQuestions11 = showData.users[i].levels[0].level0.length;
        var answered11 = 0;
        
        for (i = 0; i < numberOfQuestions11; i++) {
            if ( showData.users[i].levels[0].level0[i] == 1 ) {
                answered11++
                console.log("numeber of correct answers count: " + answered11);
            }
        }
        
        
        
        $("#level0 .scoreWrapper .answered").text(answered11+1);
        $("#level0 .scoreWrapper .numberOfQuestions").text(numberOfQuestions11);
    }

    
    function assessmentQuestions(){
        showData = JSON.parse(localStorage.getItem("accountData"));        
        arrayStart = localStorage.getItem("currentUserID") - 1;
        var numberOfQuestions = $(".question").length;
        var questionNumber = null;
        var answerResult = "";
        var nextQuestion = "";
        //var questionCounter = i;
        //initialise
        $("section, [class$='-summary']").hide();
        $("section#1").show();
        $(".total").text(numberOfQuestions);
        
        $("form + .button.submit").click(function(e){
            
            // override the normal button behaviour
            e.preventDefault(); 
            
            //get the question number
            console.log($(this).closest("section").attr("id"));
            questionNumber = $(this).closest("section").attr("id");
            
            //get the answer to that question
            questionAnswer = $("#"+questionNumber).data("answer");
            
            //get the users answer
            answerGiven = $("#"+questionNumber+" input[name=radio-group]:checked").val();
            
            
            // compare answers
            if (answerGiven == questionAnswer ) {
                // show the right answer
                //console.log(showData);
                $("#"+questionNumber+" .success-summary").show();
                showData.users[arrayStart].levels[0].level0[questionNumber-1] = 1;                                
                localStorage.setItem("accountData", JSON.stringify(showData));
                
                answerResult = "right"
            } else {
                // show the wrong answer
                showData.users[arrayStart].levels[0].level0[questionNumber-1] = 0;                
                localStorage.setItem("accountData", JSON.stringify(showData));
                $("#"+questionNumber+" .error-summary").show();
                answerResult = "wrong";
            }
            
            // print the results
            console.log("This is question number " + questionNumber + " of " + numberOfQuestions + "\nThe answer to this question is " + questionAnswer + "\nThe user gave the answer of " + answerGiven + "\nThe user got the answer " + answerResult);
    });
                    // loop through questions
            $(".button.next").click(function (e) {
                e.preventDefault();
            console.log("This is question number " + questionNumber + " of " + numberOfQuestions + "\nThe answer to this question is " + questionAnswer + "\nThe user gave the answer of " + answerGiven + "\nThe user got the answer " + answerResult);
                
                if ( numberOfQuestions == questionNumber ) {
                    console.log("true;")
                    // go to success page
                    window.location.href = "assessmentComplete";
                } else {
                    // go to next question
                    $("section#"+questionNumber).hide();                        
                    console.log("false q no" + questionNumber);
                    questionNumber++;
                    $("section#"+questionNumber).show();      
                    questionCounter(questionNumber, numberOfQuestions);
                }
            })
    }
    

    
    function questionCounter(number,total){
        $(".current").text(number);
        var calcOfNumbers = Math.floor(100/total*number);
        console.log(calcOfNumbers);
        $(".progress-wrap").attr("data-progress-percent",calcOfNumbers);
        progressBar();
    }
    
    

    
                                
    
    
    // login redirect
    function login(){
        $(".button").click(function(e) {
            e.preventDefault();
            var email = $("input").val();
            showData = JSON.parse(localStorage.getItem("accountData"));
            var redirector = false;
            if (showData === null) {
                // initialise accounts
                initialiseService()
                //newUser();
                console.log("first time")
            } else {
                for (i = 0; i < showData.users.length; i++) {    
                var newData = showData.users[i].email;
                    if (newData === email) {
                        localStorage.setItem("currentUserID",showData.users[i].id);
                        console.log("redirect");
                        redirector = true;
                    }
                }   
            }
            if ( redirector == true ) {
                window.location.href = "../dashboard";
              console.log("new user")
                } else {
                newUser();
                    }
        });
                  
        
    }
 
   
    function initialiseService()    
    {
        var accountData = {
        users: [{
        id: 0,
        email: "ty.fairclough@gmail.com",
        topScore: 0,
        onboarding: [0,0],
        levels: [{
        level0: [0,0,0],
        level1: [0,0,0]
        }]
        },
        {
        id: 1,
        email: "tom.fairclough@gmail.com",
        topScore: 72,
        onboarding: [1,1],
        levels: [{
        level0: [1,1,1],
        level1: [1,1,1]
        }]
        }]
        } 
        localStorage.setItem("accountData", JSON.stringify(accountData));
    }
    
    
    function newUser(){
        email = $("input").val();
        currentUsers = JSON.parse(localStorage.getItem("accountData"));
        i = currentUsers.users.length;
        i++;
        console.log(i);
        newUserDetails = {
                            id: i,
                            email: email,
                            topScore: 0,
                            onboarding: [1,0],
                            levels: [{
                                level0: [0,0,0],
                                level1: [0,0,0]
                            }]
                         };
  
        currentUsers.users.push(newUserDetails);
        //console.log(currentUsers);
        localStorage.setItem("accountData", JSON.stringify(currentUsers));
        localStorage.setItem("currentUserID", newUserDetails.id);
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

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
       case 'assessmentQuestions':
           assessmentQuestions();
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
    
    function assessmentQuestions(){
        arrayStart = localStorage.getItem("currentUserID") - 1;
        console.log("current user id: " + arrayStart)
        showData = JSON.parse(localStorage.getItem("accountData"));
    }
    
   /* 
    function testSplice(){
        
        // get the data
        
        arrayStart = 0;
        var accountData = {
        users: [{
        id: 0,
        email: "ty.fairclough@gmail.com",
        topScore: 0,
        onboarding: ["weee",0],
        levels: [{
        level1: [1],
        level2: [1,2,3]
        }]
        },
        {
        id: 1,
        email: "tom.fairclough@gmail.com",
        topScore: 72,
        onboarding: [1,1],
        levels: [{
        level1: [1,0,0],
        level2: [1,2,3]
        }]
        }]
        }    
        
        //update the onboarding values
        accountData.users[0].onboarding[0] = "regular";
        // push the data back to local storage
        localStorage.setItem("accountData", JSON.stringify(accountData));

    }
    
    testSplice();
    */
        //console.log(JSON.parse(localStorage.getItem("accountData")));

    
    function dashboard(){
        i = localStorage.getItem("currentUserID") - 1;
        
        console.log( i );
        //console.log( localStorage.getItem("currentUserID"))
        var showData = JSON.parse(localStorage.getItem("accountData"));
        console.log(showData.users[i].email);
        $(".email").text(showData.users[i].email);
        $(".topScore").text(showData.users[i].topScore);
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
        level1: [1],
        level2: [1,2,3]
        }]
        },
        {
        id: 1,
        email: "tom.fairclough@gmail.com",
        topScore: 72,
        onboarding: [1,1],
        levels: [{
        level1: [1,2,3],
        level2: [1,2,3]
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
                                level1: [1],
                                level2: [1,2,3]
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
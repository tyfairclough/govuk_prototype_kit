
$(document).ready(function() {

var root = "/apps/{{currentApp.appDirName}}/views/";
console.log(root);
var className = $("main").attr('class');
var type =  getQueryVariable("type");
var scenario =  getQueryVariable("scenario");
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



   switch (className) {
       case 'forecastAlreadyHaveAccount':
           forecastAlreadyHaveAccount();
       break;
       case 'estimate-add-apprenticeship':
           estimateAddApprenticeship();
       break;
        case 'estimator-details':
           estimatorDetails();
       break;
       case 'estimator-outcomes':
           estimatorOutcomes();
       break;
       default: break;
}
    
/*----- PAGE FUNCTIONS -----*/
    
    
    function estimatorOutcomes(){
        $(".error-summary").hide();
        $(".success-summary").hide();
        
        scenario = localStorage.getItem("scenario");
        if ( scenario == "1" ) {
            $("#successOne.success-summary").removeClass("hidden");            
            $("#successOne.success-summary").show();            
        } else {
            $("#errorOne.error-summary").removeClass("hidden");  
            $("#errorOne.error-summary").show();  
        }
        
        
        
        $("#submit").click(function(e){
            e.preventDefault();
        state = $("input[name=next]:checked").val()
            if (state === "details") {
                window.location.href = "details.html";
            } else if (state === "nextscenario") {
                window.location.href = "add-apprenticeship?scenario=2"
            } else if (state === "homepage") {
                window.location.href = "../transfers/index"
            }            
        });
    }
    
    function estimatorDetails(){
        
estimatorOutcomes();
        
        
 var googleDocA = 'https://docs.google.com/spreadsheets/d/1PwP2NxBj3WVuzwwU6Z4USUCurOxuu2kiHkg8nVWKssE/pubhtml';
 var googleDocB = 'https://docs.google.com/spreadsheets/d/1QhGGbIZDyFXvCej3UHh-nQmM5L6iPLthzz--RHCHaQY/pubhtml';
        var googleDoc = localStorage.getItem("googleDoc");
        console.log(googleDoc);
    
    function googleTables() {
    Tabletop.init( { key: googleDoc,
                     callback: showInfoA,
                     simpleSheet: false } )
  }
    
        function showInfoA(data, tabletop) {
      loadArrayA(data);
  }
    
        function loadArrayA(data){
        var content = "";
        var footerContent = "";
        var pos = "";
            
       for (i = 0; i < data.levy.elements.length; i++) {
           pos = i + 1;
           
           var fundsCurrency = data.levy.elements[i].projected_funds;
           var projectedFunds = Number(fundsCurrency.replace(/[^0-9\.-]+/g,""));
           if ( projectedFunds < 0 ) {
               var redClass = "error-message";
           } else {
               var redClass = "";
           }
           
           
           content += '<tr><td>'+data.levy.elements[i].date+'</td><td class="'+redClass+'">'+data.levy.elements[i].projected_funds+'</td><td>'+data.levy.elements[i].modelled_costs+'</td></tr>';
           renderTableA(content);
            }
            content = "";
            footerContent = "";
            
        for (i = 0; i < data.transfer.elements.length; i++) {
           pos = i + 1;
            
                       
           var transferCurrency = data.transfer.elements[i].transfer_balance;
           var transferFunds = Number(transferCurrency.replace(/[^0-9\.-]+/g,""));
           if ( transferFunds < 0 ) {
               var redClass = "error-message";
               var redRow = "error-row";
           } else {
               var redClass = "";
               var redRow = "";
           }
            
            content += '<tr class="'+redRow+'"><td>'+data.transfer.elements[i].date+'</td><td class="'+redClass+'">'+data.transfer.elements[i].transfer_balance+'</td><td>'+data.transfer.elements[i].modelled_costs+'</td></tr>';
           renderTableB(content);
            }
         
        content = "";
        footerContent = "";

        for (i = 0; i < data.apprenticeships.elements.length; i++) {
            
            if ((i +1) == data.apprenticeships.elements.length ) {
           footerContent += '<tr class="total"><td data-label="Totals">&nbsp;</td><td class="total" data-label="Number of apprentices"><span class="bold-xsmall">'+data.apprenticeships.elements[i].number_of_apprentices+'</span></td><td class="total">'+data.apprenticeships.elements[i].start_date+'</td><td class="total" data-label="Monthly payment"><span class="bold-xsmall">'+data.apprenticeships.elements[i].monthly_payment+'</span></td><td class="total">'+data.apprenticeships.elements[i].number_of_monthly_payments+'</td><td class="total" data-label="Completion payment"><span class="bold-xsmall">'+data.apprenticeships.elements[i].completion_payment+'</span></td><td></td><td></td></tr>';
           renderTableC(content,footerContent);
            } else {
           pos = i + 1;
           content += '<tr><td>'+data.apprenticeships.elements[i].apprenticeship+'<span class="form-hint">level '+data.apprenticeships.elements[i].apprenticeship_level+'</span></td><td data-label="Number of apprentices">'+data.apprenticeships.elements[i].number_of_apprentices+'</td><td data-label="Start date">'+data.apprenticeships.elements[i].start_date+'</td><td data-label="Monthly payment">'+data.apprenticeships.elements[i].monthly_payment+'</td><td data-label="Number of monthly payments">'+data.apprenticeships.elements[i].number_of_monthly_payments+'</td><td data-label="Completion payment">'+data.apprenticeships.elements[i].completion_payment+'</td><td style="display:none">'+data.apprenticeships.elements[i].transfer+'</td><td><a href="#">Remove</a></td><td></td></tr>';
           renderTableC(content);
                }
            }
   
        content = "";
        footerContent = "";
        }
    
        function renderTableA(content){
            $(document).ready(function () {
                $("#tab-1 tbody").html(content);
                //paginateBalancesheet();
            });
        }     
    
        function renderTableB(content){
            $(document).ready(function () {
                $("#tab-2 tbody").html(content);
                //paginateBalancesheet();
            });
        }       
                function renderTableC(content,footerContent){
            $(document).ready(function () {
                $("#tab-3 tbody").html(content);
                $("#tab-3 tfoot").html(footerContent);
                //paginateBalancesheet();
            });
        }       
        
         
        
googleTables();        
        
$(".error-summary").hide();
        
        
                scenario = localStorage.getItem("scenario");
        if ( scenario == "2" ) {
            $("#errorOne.error-summary").show();    
            $("#tab-2 tbody").addClass("errorTable");
// ADD ERROR STYLES HERE

        };        
        
    }
    
    
    function estimateAddApprenticeship(){

        var appTotalValue;
        $("#standardNew").chosen();
        
        $(".money-mask").mask("999,999,999",{reverse: true});
        
        
 console.log(type);
        
        if ( type == "levy" ) {
            $("input[name=radio-inline-group][value=" + 0 + "]").prop('checked', true);
        } else if ( type == "transfer") {
            $("input[name=radio-inline-group][value=" + 1 + "]").prop('checked', true);            
        };

       
        $("select").on('change',function(){
             estimatePrice = $(this).find(':selected').attr('data-price');
             levyLength = $(this).find(':selected').attr('data-duration');
        });
        
        
        $(".button.cancel").click(function(e){
            e.preventDefault();
            localStorage.setItem("transferForecastState","empty");
            
            window.location.href = 'forecast-transfer'            
        })
        
    // do the app value for various field changes.    
    //    $('').change(function(){      
    //    });
        
        $( "#cohortsNew" ).change(function() {
        var appCount = $(this).val();
            appTotalValue = appCount*estimatePrice;
            appTotalValue = numberWithCommas(appTotalValue);
            estimatePrice = numberWithCommas(estimatePrice);
            if ( appCount > 1 ) {
                s = "s";
            } else {
                s = ""
            }
            //$("#levy-value").val(appValue);
            $("#levy-cap").text("Government funding cap for this apprenticeship is £" + estimatePrice);
            $("#levy-cap").removeClass("hidden");
            $("#levy-cap").prev().hide();
//            $(".grand-total span").text("£" +appCount*estimatePrice);
            $("#levy-length").val(levyLength)
            $("#levy-total-cap").html("Total government funding cap for <span class='bold-small'>" + appCount + "</span> apprentice" +s+ " is <span class='bold-small'>£" + appTotalValue + "</span>");
            $("#levy-total-cap").removeClass("hidden");
            $("#levy-value").val(appTotalValue);
            
});


        
$(document).keypress(function(e) {
    if(e.which == 13) {
           validationForm();
    }
});
   
        
   $(".save,.add-another").click(function(e){
           e.preventDefault();
           validationForm();
   });     
        function validationForm() {
            formHasErrors = false;
            var selectedCourse = $("#standardNew").find(':selected').text();
            localStorage.setItem("lastAdded", selectedCourse);
            var totalCost = $("#levy-value").val();
            var year = $("#startDateYear").val();
            var month = $("#startDateMonth").val();
            var numberOfApprentices = $("#cohortsNew").val();



            // reset the error messages

            $(".error-summary, .error-message, .error-summary ul li").addClass("hidden");
            $(".form-group").removeClass("form-group-error");


            // check they've chosen an apprenticeship
            if (selectedCourse == "Select one") {
                errorCheck(true);
                $("#noStandardSelected").removeClass("hidden");
                $("#standardNew").parent().addClass("form-group-error")
                $("#standardNew").prev().removeClass("hidden")
            } else {
                errorCheck(false);
            }



            // checks apprentice count is is not empty
            if (numberOfApprentices <= 0 || numberOfApprentices == "") {
                errorCheck(true);
                $("#noNumberOfApprentices").removeClass("hidden");
                $("#cohortsNew").parent().addClass("form-group-error")
                $("#cohortsNew").prev().removeClass("hidden")
            } else {
                errorCheck(false);
            }




            // has to be between certain dates startDateMonth startDateYear
            if (year < 2018 || year > 2019) {
                errorCheck(true);
                $("#wrongYears").removeClass("hidden");
                $("#dateWrapper").addClass("form-group-error")
                $("#declareDate").removeClass("hidden");
            } else if (year == 2019) {
                console.log("years is 2019")
                if (month <= 9) {
                    errorCheck(false);
                } else {
                    errorCheck(true);
                    $("#wrong2019month").removeClass("hidden");
                    $("#dateWrapper").addClass("form-group-error")
                    $("#2019montherror").removeClass("hidden");
                }
            } else if (year == 2018) {
                if (month >= 5) {
                    errorCheck(false);
                } else {
                    errorCheck(true);
                    $("#wrong2018month").removeClass("hidden");
                    $("#dateWrapper").addClass("form-group-error")
                    $("#2018montherror").removeClass("hidden");
                }
            }



            // cant be above gov cap

            if (totalCost == "") {
                errorCheck(true);
                $("#noCost").removeClass("hidden");
                $("#levy-value").parent().addClass("form-group-error")
                $("#levy-value").prev().prev().prev().removeClass("hidden")
            } else if (appTotalValue === undefined) {
                errorCheck(true);
                $("#overCap").removeClass("hidden");
                $("#levy-value").parent().addClass("form-group-error")
                $("#levy-value").prev().prev().prev().prev().removeClass("hidden")
            } else if (totalCost > appTotalValue) {
                errorCheck(true);
                $("#overCap").removeClass("hidden");
                $("#levy-value").parent().addClass("form-group-error")
                $("#levy-value").prev().prev().removeClass("hidden")
            } else {
                errorCheck(false);
            }





            // checks levy length is not empty
            if ($("#levy-length").val() == "") {
                //           console.log("length of apprenticeships is null")
                errorCheck(true);
                $("#noLength").removeClass("hidden");
                $("#levy-length").parent().addClass("form-group-error")
                $("#levy-length").prev().prev().removeClass("hidden")
            } else {
                // cant be less than 12 months duration
                if ($("#levy-length").val() < 12) {
                    //               console.log("value must be at least 12 months")
                    errorCheck(true);
                    console.log("true");
                    $("#shortLength").removeClass("hidden");
                    $("#levy-length").parent().addClass("form-group-error")
                    $("#levy-length").prev().removeClass("hidden")
                } else {
                    errorCheck(false);
                }
            }






            // reveal the errors and do the redirects
            console.log("value for formHasErrors " + formHasErrors)


            if (formHasErrors == true) {
                // alert("we've got an error")
                $(".error-summary").removeClass("hidden");
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
            } else {
                localStorage.setItem("transferForecastState", "populated");
                window.location.href = 'details'
            }

        }
        
    }
    
    
    
/*----- GLOBAL JS -----*/
    
    
    function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
    
    
    if ( scenario == 1 ) {
        //load the first spreadsheet
                console.log("v1");
        localStorage.setItem("googleDoc","https://docs.google.com/spreadsheets/d/1PwP2NxBj3WVuzwwU6Z4USUCurOxuu2kiHkg8nVWKssE/pubhtml")
        localStorage.setItem("scenario","1")
    } else if ( scenario == 2 ) {
        //load the second spreadsheet
        console.log("v2");
        localStorage.setItem("googleDoc","https://docs.google.com/spreadsheets/d/1QhGGbIZDyFXvCej3UHh-nQmM5L6iPLthzz--RHCHaQY/pubhtml")
        localStorage.setItem("scenario","2")
    };
    
        function errorCheck(fieldHasError){
        console.log("does field has error " + fieldHasError)
        if ( fieldHasError == true ) {
            formHasErrors = true
        }
    }
    
    
    
    $(".link-back").click(function(e){
       e.preventDefault();
            window.history.back();
    });
   
/*----- TABS -----*/
    $(".tab-content").not("#tab-3").css("display", "none");

    //tabs pattern
    $(".tabs-menu a").click(function(event) {
    event.preventDefault();
    $(this).parent().addClass("current");
    $(this).parent().siblings().removeClass("current");
    var tab = $(this).attr("href");
    $(".tab-content").not(tab).css("display", "none");
    $(tab).fadeIn();
    });






/*----- ACCORDION -----*/
! function(t) { "use strict";
    var e = t.jQuery,
        n = t.GOVUK || {},
        o = { _hasScrolled: !1, _scrollTimeout: !1, _hasResized: !1, _resizeTimeout: !1, getWindowDimensions: function() {
                return { height: e(t).height(), width: e(t).width() } }, getWindowPositions: function() {
                return { scrollTop: e(t).scrollTop() } }, getElementOffset: function(t) {
                return t.offset() }, init: function() {
                var i = e(".js-stick-at-top-when-scrolling");
                i.length > 0 && (o.$els = i, o._scrollTimeout === !1 && (e(t).scroll(o.onScroll), o._scrollTimeout = t.setInterval(o.checkScroll, 50)), o._resizeTimeout === !1 && (e(t).resize(o.onResize), o._resizeTimeout = t.setInterval(o.checkResize, 50))), n.stopScrollingAtFooter && i.each(function(o, i) {
                    var s = e(i).find("img");
                    if (s.length > 0) {
                        var r = new t.Image;
                        r.onload = function() { n.stopScrollingAtFooter.addEl(e(i), e(i).outerHeight()) }, r.src = s.attr("src") } else n.stopScrollingAtFooter.addEl(e(i), e(i).outerHeight()) }) }, onScroll: function() { o._hasScrolled = !0 }, onResize: function() { o._hasResized = !0 }, checkScroll: function() {
                if (o._hasScrolled === !0) { o._hasScrolled = !1;
                    var t = o.getWindowPositions().scrollTop,
                        n = o.getWindowDimensions();
                    o.$els.each(function(i, s) {
                        var r = e(s),
                            a = r.data("scrolled-from");
                        a && t < a ? o.release(r) : n.width > 768 && t >= o.getElementOffset(r).top && o.stick(r) }) } }, checkResize: function() {
                if (o._hasResized === !0) { o._hasResized = !1;
                    var t = o.getWindowDimensions();
                    o.$els.each(function(n, i) {
                        var s = e(i);
                        if (s.hasClass("js-sticky-resize")) {
                            var r = e(".shim"),
                                a = s.parent("div"),
                                c = a.width();
                            r.css("width", c), s.css("width", c) }
                        t.width <= 768 && o.release(s) }) } }, stick: function(t) {
                if (!t.hasClass("content-fixed")) { t.data("scrolled-from", o.getElementOffset(t).top);
                    var e = Math.max(t.height(), 1),
                        n = t.width();
                    t.before('<div class="shim" style="width: ' + n + "px; height: " + e + 'px">&nbsp;</div>'), t.css("width", n + "px").addClass("content-fixed") } }, release: function(t) { t.hasClass("content-fixed") && (t.data("scrolled-from", !1), t.removeClass("content-fixed").css("width", ""), t.siblings(".shim").remove()) } };
    n.stickAtTopWhenScrolling = o, t.GOVUK = n }(window),
function(t) { "use strict";
    var e = t.jQuery,
        n = t.GOVUK || {},
        o = { _pollingId: null, _isPolling: !1, _hasScrollEvt: !1, _els: [], addEl: function(n, i) {
                var s;
                if (n.length) { s = parseInt(n.css("top"), 10), s = isNaN(s) ? 0 : s, o.updateFooterTop(), e(t).on("govuk.pageSizeChanged", o.updateFooterTop);
                    var r = e("<div></div>");
                    r.insertBefore(n);
                    var a = r.offset().top - r.position().top;
                    r.remove();
                    var c = { $fixedEl: n, height: i + s, fixedTop: i + a, state: "fixed" };
                    o._els.push(c), o.initTimeout() } }, updateFooterTop: function() {
                var t = e(".js-footer:eq(0)");
                if (0 === t.length) return 0;
                o.footerTop = t.offset().top - 10 }, initTimeout: function() { o._hasScrollEvt === !1 && (e(window).scroll(o.onScroll), o._hasScrollEvt = !0) }, onScroll: function() { o._isPolling === !1 && o.startPolling() }, startPolling: function() {
                return window.requestAnimationFrame ? function() {
                    var t = function() { o.checkScroll(), o._isPolling === !0 && o.startPolling() };
                    o._pollingId = window.requestAnimationFrame(t), o._isPolling = !0 } : function() { o._pollingId = window.setInterval(o.checkScroll, 16), o._isPolling = !0 } }(), stopPolling: function() {
                return window.requestAnimationFrame ? function() { window.cancelAnimationFrame(o._pollingId), o._isPolling = !1 } : function() { window.clearInterval(o._pollingId), o._isPolling = !1 } }(), checkScroll: function() {
                var t = e(window).scrollTop();
                if (t < o.cachedScrollTop + 2 && t > o.cachedScrollTop - 2) return void o.stopPolling();
                o.cachedScrollTop = t, e.each(o._els, function(e, n) { t + n.height > o.footerTop ? o.stick(n) : o.unstick(n) }) }, stick: function(t) { "fixed" === t.state && "fixed" === t.$fixedEl.css("position") && (t.$fixedEl.css({ position: "absolute", top: o.footerTop - t.fixedTop }), t.state = "absolute") }, unstick: function(t) { "absolute" === t.state && (t.$fixedEl.css({ position: "", top: "" }), t.state = "fixed") } };
    n.stopScrollingAtFooter = o, e(t).load(function() { e(t).trigger("govuk.pageSizeChanged") }), t.GOVUK = n }(window),
function(t) { "use strict";
    t.GOVUK = t.GOVUK || {}, t.GOVUK.getCurrentLocation = function() {
        return t.location } }(window), window.GOVUK.Modules = window.GOVUK.Modules || {},
    function(t) { "use strict";
        t.AccordionWithDescriptions = function() {
            function t(t) {
                var e = this;
                this.$subsectionContent = t.find(".js-subsection-content"), this.$subsectionButton = t.find(".js-subsection-button"), this.title = e.$subsectionButton.text(), this.toggle = function() { e.isClosed() ? e.open() : e.close() }, this.open = function() { e.$subsectionContent.removeClass("js-hidden"), t.removeClass("subsection"), t.addClass("subsection--is-open"), e.$subsectionButton.attr("aria-expanded", "true") }, this.close = function() { e.$subsectionContent.addClass("js-hidden"), t.removeClass("subsection--is-open"), t.addClass("subsection"), e.$subsectionButton.attr("aria-expanded", "false") }, this.isClosed = function() {
                    return e.$subsectionContent.hasClass("js-hidden") } }

            function e(t, e) {
                var o = this;
                this.$target = $(e.target), this.track = function() { n("pageElementInteraction", o._trackingAction(), { label: o._trackingLabel() }) }, this._trackingAction = function() {
                    return t.isClosed() ? "accordionClosed" : "accordionOpened" }, this._trackingLabel = function() {
                    return o._clickedOnIcon() ? t.title + " - " + o._iconType() + " Click" : o._clickedOnHeading() ? t.title + " - Heading Click" : t.title + " - Click Elsewhere" }, this._clickedOnIcon = function() {
                    return o.$target.hasClass("subsection__icon") }, this._clickedOnHeading = function() {
                    return o.$target.hasClass("js-subsection-button") }, this._iconType = function() {
                    return t.isClosed() ? "Minus" : "Plus" } }

            function n(t, e, n) { GOVUK.analytics && GOVUK.analytics.trackEvent && GOVUK.analytics.trackEvent(t, e, n) }
            this.start = function(o) {
                function i() {
                    return $("h1").text() }

                function s(t) {
                    return t.replace(/\s+/g, "_") }

                function r() {
                    var t = i();
                    return t = s(t), "GOVUK_service_manual_" + (t = t.toLowerCase()) + "_" }

                function a() { o.prepend('<div class="subsection-controls js-subsection-controls"><button aria-expanded="false">Open all</button></div>') }

                function c() { o.find(".subsection__title").each(function(t) { $(this).wrapInner('<button class="subsection__button js-subsection-button" aria-expanded="false" aria-controls="subsection_content_' + t + '"></button>') }) }

                function u() { F.append('<span class="subsection__icon"></span>') }

                function l() {
                    for (var t = "", e = 0; e < _; e++) t += "subsection_content_" + e + " ";
                    C = o.find(".js-subsection-controls button"), C.attr("aria-controls", t) }

                function d() { $.each(o.find(".js-subsection"), function() { new t($(this)).close() }) }

                function f() {
                    var e, n = h();
                    if (n.length && (e = o.find(n).parents(".js-subsection"), e.length)) { new t(e).open() } }

                function h() {
                    return GOVUK.getCurrentLocation().hash }

                function g() { o.find(".subsection__content").each(function() {
                        var t = $(this).attr("id");
                        sessionStorage.getItem(S + t) && k(o.find("#" + t)) }), w() }

                function m() { o.find(".subsection--is-open").length && o.find(".subsection--is-open").each(function() {
                        var t = $(this).find(".subsection__content").attr("id");
                        sessionStorage.setItem(S + t, "Opened") }) }

                function p() { o.find(".subsection").length && o.find(".subsection").each(function() {
                        var t = $(this).find(".subsection__content").attr("id");
                        sessionStorage.removeItem(S + t, t) }) }

                function b() { o.find(".subsection__header").on("click", function(n) {
                        var o = $(this),
                            i = o.parent(".js-subsection"),
                            s = new t(i);
                        return s.toggle(), w(), m(), p(), new e(s, n).track(), !1 }) }

                function v() { C = o.find(".js-subsection-controls button"), C.on("click", function() {
                        var t = "";
                        return "Open all" == C.text() ? (C.text("Close all"), C.attr("aria-expanded", "true"), t = "open", n("pageElementInteraction", "accordionAllOpened", { label: "Open All" })) : (C.text("Open all"), C.attr("aria-expanded", "false"), t = "close", n("pageElementInteraction", "accordionAllClosed", { label: "Close All" })), o.find(".js-subsection").each(function() {
                            var e = $(this),
                                n = e.find(".js-subsection-button"),
                                o = e.find(".js-subsection-content"); "open" == t ? (n.attr("aria-expanded", "true"), o.removeClass("js-hidden"), e.removeClass("subsection"), e.addClass("subsection--is-open")) : (n.attr("aria-expanded", "false"), o.addClass("js-hidden"), e.addClass("subsection"), e.removeClass("subsection--is-open")) }), m(), p(), !1 }) }

                function k(e) { new t(e.parent(".js-subsection")).open(), w() }

                function w() { o.find(".subsection--is-open").length === _ ? C.text("Close all") : C.text("Open all") }
                o.addClass("js-accordion-with-descriptions"), o.removeClass("js-hidden");
                var C, F = o.find(".subsection__header"),
                    _ = o.find(".subsection__content").length,
                    S = r();
                a(), c(), u(), l(), d(), g(), f(), b(), v() } } }(window.GOVUK.Modules),
    function(t, e) { "use strict";
        var n = e.$,
            o = n(e);
        t.HighlightActiveSectionHeading = function() {
            var t = this,
                e = !0,
                i = !0,
                s = 50,
                r = [];
            t.getWindowDimensions = function() {
                return { height: o.height(), width: o.width() } }, t.getWindowPositions = function() {
                return { scrollTop: o.scrollTop() } }, t.getElementOffset = function(t) {
                return t.offset() }, t.start = function(e) { o.resize(t.hasResized), o.scroll(t.hasScrolled), setInterval(t.checkResize, s), setInterval(t.checkScroll, s), t.$anchors = e.find(".js-page-contents a"), t.getAnchors(), t.checkResize(), t.checkScroll() }, t.hasResized = function() {
                return e = !0 }, t.hasScrolled = function() {
                return i = !0 }, t.checkResize = function() { e && (e = !1, i = !0) }, t.checkScroll = function() {
                if (i) { i = !1;
                    t.getWindowDimensions().width <= 768 ? t.removeActiveItem() : t.updateActiveNavItem() } }, t.getAnchors = function() { n.each(t.$anchors, function() {
                    var t = n(this).attr("href");
                    r.push(t) }) }, t.getHeadingPosition = function(t) {
                return t.offset() }, t.getNextHeadingPosition = function(t) {
                return t.offset() }, t.getFooterPosition = function(t) {
                return t.offset() }, t.getDistanceBetweenHeadings = function(t, e) {
                return e - t }, t.updateActiveNavItem = function() {
                var e = t.getWindowPositions().scrollTop,
                    o = t.getFooterPosition(n("#footer"));
                n.each(t.$anchors, function(i) {
                    var s = r[i],
                        a = r[i + 1],
                        c = n(s),
                        u = n(a),
                        l = t.getHeadingPosition(c);
                    if (l) {
                        if (l = l.top, l -= 53, a) var d = t.getNextHeadingPosition(u).top;
                        var f = t.getDistanceBetweenHeadings(l, d);
                        if (f) var h = e >= l && e < l + f;
                        else var h = e >= l && e < o.top;
                        h && t.setActiveItem(s) } }) }, t.setActiveItem = function(e) { t.$anchors.removeClass("active"), t.$anchors.filter("[href='" + e + "']").addClass("active") }, t.removeActiveItem = function() { t.$anchors.removeClass("active") } } }(window.GOVUK.Modules, window),
    function(t) { "use strict";

        function e() { this.controller = null, this.view = null, this.start = function(t) { this.view = new n(t), this.controller = new o(this.view), this.controller.init() } }

        function n(t) {
            function e(t) {
                return function(e) { e.preventDefault(), t() } }
            var n = this;
            this.$pageIsUsefulButton = t.find(".js-page-is-useful"), this.$pageIsNotUsefulButton = t.find(".js-page-is-not-useful"), this.$somethingIsWrongButton = t.find(".js-something-is-wrong"), this.$feedbackFormContainer = t.find(".js-feedback-form"), this.$feedbackForm = n.$feedbackFormContainer.find("form"), this.$feedbackFormSubmitButton = n.$feedbackFormContainer.find("[type=submit]"), this.$feedbackFormCloseButton = n.$feedbackFormContainer.find(".js-close-feedback-form"), this.$prompt = t.find(".js-prompt"), this.onPageIsUsefulButtonClicked = function(t) { n.$pageIsUsefulButton.on("click", e(t)) }, this.onPageIsNotUsefulButtonClicked = function(t) { n.$pageIsNotUsefulButton.on("click", e(t)) }, this.onSomethingIsWrongButtonClicked = function(t) { n.$somethingIsWrongButton.on("click", e(t)) }, this.onFeedbackFormCloseButtonClicked = function(t) { n.$feedbackFormCloseButton.on("click", e(t)) }, this.onSubmitFeedbackForm = function(t) { n.$feedbackForm.on("submit", e(t)) }, this.showSuccess = function() { n.$prompt.html('<span id="feedback-success-message">Thanks for your feedback.</span>'), n.$prompt.hasClass("js-hidden") && n.toggleFeedbackForm(), n.$prompt.attr("aria-labelledby", "feedback-success-message"), n.$prompt.focus() }, this.toggleFeedbackForm = function() { n.$prompt.toggleClass("js-hidden"), n.$feedbackFormContainer.toggleClass("js-hidden");
                var t = !n.$feedbackFormContainer.hasClass("js-hidden");
                n.updateAriaAttributes(t), t && $(".form-control", n.$feedbackFormContainer).first().focus() }, this.updateAriaAttributes = function(t) { n.$feedbackFormContainer.attr("aria-hidden", !t), $("[aria-controls=improveThisPageForm]").attr("aria-expanded", t) }, this.feedbackFormContainerData = function() {
                return n.$feedbackFormContainer.find("input, textarea").serialize() }, this.feedbackFormContainerTrackEventParams = function() {
                return n.getTrackEventParams(n.$feedbackFormContainer) }, this.pageIsUsefulTrackEventParams = function() {
                return n.getTrackEventParams(n.$pageIsUsefulButton) }, this.pageIsNotUsefulTrackEventParams = function() {
                return n.getTrackEventParams(n.$pageIsNotUsefulButton) }, this.somethingIsWrongTrackEventParams = function() {
                return n.getTrackEventParams(n.$somethingIsWrongButton) }, this.getTrackEventParams = function(t) {
                return { category: t.data("track-category"), action: t.data("track-action") } }, this.renderErrors = function(t) { this.clearErrors();
                var e = [];
                $.each(t, function(t, o) { $.each(o, function(o, i) {
                        var s = t.charAt(0).toUpperCase() + t.slice(1),
                            r = s + " " + i + ".";
                        n.addErrorToField(t, r) || e.push(r) }) }), e.length && n.addGenericError('<h1 class="heading-medium error-summary-heading" id="generic-error-message">There is a problem</h1>' + $("<p>").text(e.join(" ")).html()), n.focusFirstError() }, this.clearErrors = function() { $(".form-group", n.$feedbackFormContainer).removeClass("error"), $(".error-message, .error-summary", n.$feedbackFormContainer).remove(), $("[name]", n.$feedbackFormContainer).attr({ "aria-describedby": "", "aria-invalid": "" }) }, this.focusFirstError = function() { $(".error-summary, .form-group.error .form-control", n.$feedbackFormContainer).first().focus() }, this.addErrorToField = function(t, e) {
                var o = n.$feedbackFormContainer.find('[name="' + t + '"]'),
                    i = o.parents(".form-group");
                if (!o.length || !i.length) return !1;
                var s = n.generateIdFromError(e);
                return i.addClass("error"), $("label", i).append($("<span />", { "class": "error-message", text: e, id: s })), o.attr({ "aria-describedby": s, "aria-invalid": "true" }), !0 }, this.addGenericError = function(t) {
                var e = $("<div/>", { "class": "error-summary", role: "group", "aria-labelledby": "generic-error-message", html: t, tabindex: -1 });
                $(".js-errors", n.$feedbackFormContainer).html(e) }, this.generateIdFromError = function(t) {
                return "error-" + t.toString().toLowerCase().trim().replace(/&/g, "-and-").replace(/[\s\W-]+/g, "-") }, this.disableSubmitFeedbackButton = function() { n.$feedbackFormSubmitButton.prop("disabled", !0) }, this.enableSubmitFeedbackButton = function() { n.$feedbackFormSubmitButton.removeAttr("disabled") } }

        function o(t) {
            var e = this;
            this.init = function() { e.bindPageIsUsefulButton(), e.bindPageIsNotUsefulButton(), e.bindSomethingIsWrongButton(), e.bindSubmitFeedbackButton(), this.bindCloseFeedbackFormButton(), t.updateAriaAttributes(!1) }, this.bindPageIsUsefulButton = function() {
                var n = function() { e.trackEvent(t.pageIsUsefulTrackEventParams()), t.showSuccess() };
                t.onPageIsUsefulButtonClicked(n) }, this.bindPageIsNotUsefulButton = function() {
                var n = function() { e.trackEvent(t.pageIsNotUsefulTrackEventParams()), t.toggleFeedbackForm() };
                t.onPageIsNotUsefulButtonClicked(n) }, this.bindSomethingIsWrongButton = function() {
                var n = function() { e.trackEvent(t.somethingIsWrongTrackEventParams()), t.toggleFeedbackForm() };
                t.onSomethingIsWrongButtonClicked(n) }, this.bindCloseFeedbackFormButton = function() {
                var e = function() { t.toggleFeedbackForm() };
                t.onFeedbackFormCloseButtonClicked(e) }, this.bindSubmitFeedbackButton = function() { t.onSubmitFeedbackForm(e.handleSubmitFeedback) }, this.handleSubmitFeedback = function() { $.ajax({ type: "POST", url: "/contact/govuk/page_improvements", data: t.feedbackFormContainerData(), beforeSend: t.disableSubmitFeedbackButton }).done(function() { e.trackEvent(t.feedbackFormContainerTrackEventParams()), t.showSuccess() }).fail(function(e) { t.enableSubmitFeedbackButton(), 422 == e.status ? t.renderErrors(e.responseJSON.errors) : (t.clearErrors(), t.addGenericError(['<h1 class="heading-medium error-summary-heading" id="generic-error-message">', "  Sorry, we\u2019re unable to receive your message right now. ", "</h1>", "<p>If the problem persists, we have other ways for you to provide", ' feedback on the <a href="/contact/govuk">contact page</a>.</p>'].join("")), t.focusFirstError()) }) }, this.trackEvent = function(t) { GOVUK.analytics && GOVUK.analytics.trackEvent && GOVUK.analytics.trackEvent(t.category, t.action) } }
        t.ImproveThisPage = e }(window.GOVUK.Modules),
    function(t) { "use strict";
        var e = t.jQuery,
            n = t.GOVUK || {};
        n.Modules = n.Modules || {}, n.modules = { find: function(t) { t = t || e("body");
                var n, o = "[data-module]";
                return n = t.find(o), t.is(o) && (n = n.add(t)), n }, start: function(t) {
                function o(t) {
                    return s(i(t)) }

                function i(t) {
                    return t.replace(/-([a-z])/g, function(t) {
                        return t.charAt(1).toUpperCase() }) }

                function s(t) {
                    return t.charAt(0).toUpperCase() + t.slice(1) }
                for (var r = this.find(t), a = 0, c = r.length; a < c; a++) {
                    var u, l = e(r[a]),
                        d = o(l.data("module")),
                        f = l.data("module-started"); "function" != typeof n.Modules[d] || f || (u = new n.Modules[d], u.start(l), l.data("module-started", !0)) } } }, t.GOVUK = n }(window), $(document).ready(function() { GOVUK.modules.start() }), window.GOVUK.stickAtTopWhenScrolling.init(), window.GOVUK.stopScrollingAtFooter.addEl($(".js-stick-at-top-when-scrolling"));

    
    });  


// Generated by CoffeeScript 1.10.0

/*
  This is the main script file. It can attach to the terminal
 */

(function() {
  var COMPLETE_URL, EVENT_TYPES, adv_q, advancedTag, buildfunction, current_question, drawStatusMarker, endsWith, f, isNumber, j, leftside, len, logEvent, mob_q, next, pkg_q, previous, progressIndicator, q, question, questionNumber, questions, results, rlz_q, staticDockerPs, statusMarker, switchToAdvanced, switchToBasic, switchToMobileSDK, switchToPackages, switchToRules, switchToTriggers, trigger_q, tutorialTop;

  COMPLETE_URL = "/whats-next/";


  /*
    Array of question objects
   */

  staticDockerPs = "ID                  IMAGE               COMMAND               CREATED             STATUS              PORTS";

  q = [];

  q.push({
    html: "<h3>OpenWhisk Getting started</h3>\n<p>OpenWhisk is an event-driven compute platform that executes code in response to events or direct invocations.\n</p>\n<p>Examples of events include changes to database records, IoT sensor readings that exceed a certain temperature, new code commits to a GitHub repository, or simple HTTP requests from web or mobile apps. Events from external and internal event sources are channeled through a trigger, and rules allow actions to react to these events. </p>\n<p>Actions can be small snippets of Javascript or Swift code, or custom binaries embedded in a Docker container. Actions in OpenWhisk are instantly deployed and executed whenever a trigger fires. The more triggers fire, the more actions get invoked. If no trigger fires, no action code is running, so there is no cost.</p>\n<p>In addition to associating actions with triggers, it is possible to directly invoke an action by using the OpenWhisk API, CLI, or iOS SDK. A set of actions can also be chained without having to write any code. Each action in the chain is invoked in sequence with the output of one action passed as input to the next in the sequence.</p> <a href=\"https://new-console.ng.bluemix.net/docs/openwhisk/index.html\"> Getting Started with Bluemix OpenWhisk documentation</a>",
    assignment: "<h3>Assignment</h3>\n<p>Use a wsk command to see the full list of accepted arguments</p>\n<p>If you see a list of arguments then you know that you are all set with your wsk client installation.</p>",
    intermediateresults: [
      function() {
        return "<p>Whisk argument swithces usually start with two dashes. Try \"--help\"</p>";
      }
    ],
    tip: "<p>This emulator provides only a limited set of shell and wsk commands, so some commands may not work as expected</p>",
    command_expected: ['wsk', '--help'],
    result: "<p>Well done! Let's move to the next assignment.</p>"
  });

  q.push({
    html: "<h3>Creating a JavaScript Action</h3>\n<p>Actions encapsulate an actual code to be executed. One can think of an action as a piece of code that runs in response to an event. Actions support multiple language bindings including NodeJS, Swift and arbitrary binary programs encapsulated in Docker Containers. Actions invoke any part of an open ecosystem including existing Bluemix services for analytics, data, cognitive, or any other 3rd party service. </p>",
    assignment: "<h3>Assignment</h3>\n<p>Create an action called \"hello\" from the content of the \"hello.js\" file. \"hello.js\" had been already created.</p>",
    command_expected: ['wsk', 'action', 'create', 'hello', 'hello.js'],
    result: "<p>You found it! Way to go!</p>",
    tip: "For this assignment, the file 'hello.js' had been already created. Perform a 'ls' to ensure file exists and 'cat hello.js' to examine the contents of the file"
  });

  q.push({
    html: "<h3>List actions that have been created. </h3>\n<p>Existing and newly created actions can be looked up by using a wsk command.</p>",
    assignment: "<h3>Assignment</h3>\n<p>List the actions that were created</p>",
    command_expected: ['wsk', 'action', 'list'],
    result: "<p>Cool. Look at the result. You'll see that the action created in step 1 was listed</p>"
  });

  q.push({
    html: "<h3>Running an action using a blocking invocation</h3>\n<p>After you create your action, you can run it in the cloud in OpenWhisk with the 'invoke' command. You can invoke actions with a blocking\ninvocation or a non-blocking invocation by specifying a flag in the command. A blocking invocation waits until the action runs to completion and\nreturns a result. This example uses blocking invocation.</p>",
    assignment: "<h3>Assignment</h3>\n<p>Invoke the hello action utilizing blocking invocation.  </p>",
    command_expected: ['wsk', 'action', 'invoke', '--blocking', 'hello'],
    command_show: ['wsk', 'action', 'invoke', '--blocking', 'hello'],
    result: "<p>Great! The command outputs two important pieces of information:\n<ul>\n  <li>The activation ID (44794bd6aab74415b4e42a308d880e5b)</li>\n  <li>The invocation result. The result in this case is the string Hello world \n  returned by the JavaScript function. The activation ID can be used to \n  retrieve the logs or result of the invocation at a future time.</li>\n</ul>",
    intermediateresults: [
      function() {
        return "<p>You seem to be almost there. Did you feed in the \"wsk action\" command \"invoke --blocking hello\" parameters?";
      }
    ],
    tip: "<ul>\n   <li>Remember to use wsk action command.</li>\n</ul>"
  });

  q.push({
    html: "<h3>Running an action using a non-blocking invocation</h3>\n<p>If you don't need the action result right away, you can omit the --blocking flag to make a non-blocking invocation. You can get the result later by using the activation ID. </p>",
    assignment: "<h3>Assignment</h3>\n<p>Invoke the \"hello\" action utilizing non-blocking invocation.  </p>",
    command_expected: ['wsk', 'action', 'invoke', 'hello'],
    command_show: ['wsk', 'action', 'invoke', 'hello'],
    result: "<p>Great! Action was invoked. Next we are going to obtain the result",
    intermediateresults: [
      function() {
        return "<p>You seem to be almost there. Did you feed in the wsk action command \"invoke hello\" parameters";
      }
    ],
    tip: "<ul>\n  <li>Remember to use wsk action</li>\n</ul>"
  });

  q.push({
    html: "<h3>Get action's invocation result using the activation ID</h3>\n<p>You can get an actions result by using the action activation ID. If you forgot to record the activation ID, you can get a list of activations ordered from most recent to the oldest running the <code> wsk activation list</code> command </p>",
    assignment: "<h3>Assignment</h3>\n<p>Obtain a non-blocking action's result.  Remember, a non-blocking invocation may execute in the background so obtaining the result requires the activation ID</p>",
    command_expected: ["wsk", "activation", "result", "6bf1f670ee614a7eb5af3c9fde813043"],
    command_show: ["wsk", "activation", "result", "6bf1f670ee614a7eb5af3c9fde813043"],
    result: "<p>Great! You Have completed the Basic wsk CLI tutorial! Hit next to move on to the <em style=\"color:crimson;\">Advanced</em> tutorial!",
    tip: "<ul>\n   <li>You need to use the <code> wsk activation result</code> command along with the activation ID</li>\n</ul>",
    intermediateresults: [
      function() {
        var data;
        $('#instructions .assignment').hide();
        $('#tips, #command').hide();
        $('#instructions .text').html("<div class=\"complete\">\n  <h3>Congratulations!</h3>\n  <p>You have mastered the basic wsk commands!</p>\n  <p><strong>Did you enjoy this tutorial? </p>\n  <h3>Your next steps</h3>\n  <ol>\n    <li><a href=\"#\" onClick=\"leaveFullSizeMode()\">Close</a> this tutorial, and continue with the rest of the getting started.</li>\n  </ol>\n  <p> - Or - </p>\n  <p>Continue to learn the advanced features of the wsk CLI. </p><p><a onclick=\"switchToAdvanced()\" class='btn btn-primary secondary-action-button'>Start <em style=\"color:crimson;\">Advanced</em> tutorial</a></p>\n\n</div>");
        data = {
          type: EVENT_TYPES.complete
        };
        return logEvent(data);
      }
    ],
    finishedCallback: function() {
      webterm.clear();
      return webterm.echo(myTerminal());
    }
  });


  /*
    Array of ADVANCED question objects
   */

  adv_q = [];

  adv_q.push({
    html: "<h3>Creating Sequence of actions</h3>\n<p>You can create an action that chains together a sequence of actions.Several utility actions are provided in a package called /whisk.system/util that you can use to create your first sequence. You can learn more about packages in the Packages section. </p>",
    assignment: "<h3>Assignment</h3>\n<p>1. Display the actions in the /whisk.system/util package using <code>wsk package get --summary /whisk.system/util</code> 2. Create an action sequence called \"sequenceOfActions\" so that the result of the <code>/whisk.system/util/cat</code> action is passed as an argument to the <code>/whisk.system/util/sort</code> action. </p>",
    command_expected: ["wsk", "action", "create", "sequenceOfActions", "--sequence", "/whisk.system/util/cat,/whisk.system/util/sort"],
    command_show: ["wsk", "action", "create", "sequenceOfActions", "--sequence", "/whisk.system/util/cat,/whisk.system/util/sort"],
    result: "<p>Great! You Have completed the Advanced CLI tutorial!",
    tip: "<ul>\n   <li>Creating action sequences is similar to creating a single action except one needs to add the \"--sequence\" switch and specify a list of comma separated existing actions</li>\n</ul>",
    intermediateresults: [
      function() {
        var data;
        $('#instructions .assignment').hide();
        $('#tips, #command').hide();
        $('#instructions .text').html("<div class=\"complete\">\n  <h3>Congratulations!</h3>\n  <p>You have mastered the <em style=\"color:aquamarine;\">Advanced</em> wsk commands!</p>\n  <p><strong>Did you enjoy this tutorial?</p>\n  <h3>Your next steps</h3>\n  <ol>\n    <li><a href=\"#\" onClick=\"leaveFullSizeMode()\">Close</a> this tutorial, and continue with the rest of the getting started.</li>\n  </ol>\n  <p> - Or - </p>\n  <p>Return back to getting started. </p><p><a onclick=\"leaveFullSizeMode()\" class='btn btn-primary secondary-action-button'>Return to Getting Started</a></p>\n</div>");
        data = {
          type: EVENT_TYPES.complete
        };
        return logEvent(data);
      }
    ],
    finishedCallback: function() {
      webterm.clear();
      return webterm.echo(myTerminal());
    }
  });


  /*
    Array of Triggers question objects
   */

  trigger_q = [];

  trigger_q.push({
    html: "<h3>Creating Triggers</h3>\n<p>You can create a trigger using the trigger command</p>",
    assignment: "<h3>Assignment</h3>\n<p>Create a trigger called 'myTrigger'</p>",
    command_expected: ["wsk", "trigger", "create", "myTrigger"],
    command_show: ["wsk", "trigger", "create", "myTrigger"],
    result: "<p>Great! You Have completed the Trigger tutorial!",
    tip: "  ",
    intermediateresults: [
      function() {
        var data;
        $('#instructions .assignment').hide();
        $('#tips, #command').hide();
        $('#instructions .text').html("<div class=\"complete\">\n  <h3>Congratulations!</h3>\n  <p>You have mastered the <em style=\"color:aquamarine;\">trigger</em> wsk commands!</p>\n  <p><strong>Did you enjoy this tutorial?</p>\n  <h3>Your next steps</h3>\n  <ol>\n    <li><a href=\"#\" onClick=\"leaveFullSizeMode()\">Close</a> this tutorial, and continue with the rest of the getting started.</li>\n  </ol>\n  <p> - Or - </p>\n  <p>Return back to getting started. </p><p><a onclick=\"leaveFullSizeMode()\" class='btn btn-primary secondary-action-button'>Return to Getting Started</a></p>\n</div>");
        data = {
          type: EVENT_TYPES.complete
        };
        return logEvent(data);
      }
    ],
    finishedCallback: function() {
      webterm.clear();
      return webterm.echo(myTerminal());
    }
  });


  /*
    Array of Rules question objects
   */

  rlz_q = [];

  rlz_q.push({
    html: "<h3>Creating a rule</h3>\n<p>You can create a rule using the rule command</p>",
    assignment: "<h3>Assignment</h3>\n<p>Create a rule called 'myRule'</p>",
    command_expected: ["wsk", "rule", "create", "myRule"],
    command_show: ["wsk", "rule", "create", "myRule"],
    result: "<p>Great! You Have completed the Rules tutorial!",
    tip: "  ",
    intermediateresults: [
      function() {
        var data;
        $('#instructions .assignment').hide();
        $('#tips, #command').hide();
        $('#instructions .text').html("<div class=\"complete\">\n  <h3>Congratulations!</h3>\n  <p>You have mastered the <em style=\"color:aquamarine;\">rules</em> wsk commands!</p>\n  <p><strong>Did you enjoy this tutorial?</p>\n  <h3>Your next steps</h3>\n  <ol>\n    <li><a href=\"#\" onClick=\"leaveFullSizeMode()\">Close</a> this tutorial, and continue with the rest of the getting started.</li>\n  </ol>\n  <p> - Or - </p>\n  <p>Return back to getting started. </p><p><a onclick=\"leaveFullSizeMode()\" class='btn btn-primary secondary-action-button'>Return to Getting Started</a></p>\n</div>");
        data = {
          type: EVENT_TYPES.complete
        };
        return logEvent(data);
      }
    ],
    finishedCallback: function() {
      webterm.clear();
      return webterm.echo(myTerminal());
    }
  });


  /*
    Array of Packages question objects
   */

  pkg_q = [];

  pkg_q.push({
    html: "<h3>Creating a package</h3>\n<p>You can create a package using the package command</p>",
    assignment: "<h3>Assignment</h3>\n<p>Create a package called 'myPackage'</p>",
    command_expected: ["wsk", "package", "create", "myPackage"],
    command_show: ["wsk", "package", "create", "myPackage"],
    result: "<p>Great! You Have completed the package tutorial!",
    tip: "  ",
    intermediateresults: [
      function() {
        var data;
        $('#instructions .assignment').hide();
        $('#tips, #command').hide();
        $('#instructions .text').html("<div class=\"complete\">\n  <h3>Congratulations!</h3>\n  <p>You have mastered the <em style=\"color:aquamarine;\">package</em> wsk commands!</p>\n  <p><strong>Did you enjoy this tutorial?</p>\n  <h3>Your next steps</h3>\n  <ol>\n    <li><a href=\"#\" onClick=\"leaveFullSizeMode()\">Close</a> this tutorial, and continue with the rest of the getting started.</li>\n  </ol>\n  <p> - Or - </p>\n  <p>Return back to getting started. </p><p><a onclick=\"leaveFullSizeMode()\" class='btn btn-primary secondary-action-button'>Return to Getting Started</a></p>\n</div>");
        data = {
          type: EVENT_TYPES.complete
        };
        return logEvent(data);
      }
    ],
    finishedCallback: function() {
      webterm.clear();
      return webterm.echo(myTerminal());
    }
  });


  /*
    Array of Packages question objects
   */

  mob_q = [];

  mob_q.push({
    html: "<h3>Placeholder for mobile SDK</h3>\n<p></p>",
    assignment: "<h3>Assignment</h3>\n<p>Placeholder</p>",
    command_expected: ["placeholder"],
    command_show: ["placeholder"],
    result: "<p>Great! You Have completed the MobileSDK tutorial!",
    tip: "  ",
    intermediateresults: [
      function() {
        var data;
        $('#instructions .assignment').hide();
        $('#tips, #command').hide();
        $('#instructions .text').html("<div class=\"complete\">\n  <h3>Congratulations!</h3>\n  <p>You have mastered the <em style=\"color:aquamarine;\">MobileSDK</em> wsk commands!</p>\n  <p><strong>Did you enjoy this tutorial?</p>\n  <h3>Your next steps</h3>\n  <ol>\n    <li><a href=\"#\" onClick=\"leaveFullSizeMode()\">Close</a> this tutorial, and continue with the rest of the getting started.</li>\n  </ol>\n  <p> - Or - </p>\n  <p>Return back to getting started. </p><p><a onclick=\"leaveFullSizeMode()\" class='btn btn-primary secondary-action-button'>Return to Getting Started</a></p>\n</div>");
        data = {
          type: EVENT_TYPES.complete
        };
        return logEvent(data);
      }
    ],
    finishedCallback: function() {
      webterm.clear();
      return webterm.echo(myTerminal());
    }
  });

  questions = [];


  /*
    Register the terminal
   */

  this.webterm = $('#terminal').terminal(interpreter, basesettings);

  EVENT_TYPES = {
    none: "none",
    start: "start",
    command: "command",
    next: "next",
    peek: "peek",
    feedback: "feedback",
    complete: "complete"
  };


  /*
    Sending events to the server (disabled for ice tutorial)
   */

  logEvent = function(data, feedback) {
    return console.log(data);
  };


  /*
    Event handlers
   */

  $('#buttonNext').click(function(e) {
    this.setAttribute('disabled', 'disabled');
    console.log(e);
    return next();
  });

  $('#buttonFinish').click(function() {
    return window.open(COMPLETE_URL);
  });

  $('#buttonPrevious').click(function() {
    previous();
    return $('#results').hide();
  });

  $('#leftside').bind('mousewheel', function(event, delta, deltaX, deltaY) {
    this.scrollTop += deltaY * -30;
    return event.preventDefault();
  });

  $('#feedbackSubmit').click(function() {
    var data, feedback;
    feedback = $('#feedbackInput').val();
    data = {
      type: EVENT_TYPES.feedback,
      feedback: feedback
    };
    return logEvent(data, feedback = true);
  });

  $('#fullSizeOpen').click(function() {
    return goFullScreen();
  });

  isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  this.goFullScreen = function(start) {
    var index;
    window.scrollTo(0, 0);
    console.debug("going to fullsize mode");
    $('.togglesize').removeClass('startsize').addClass('fullsize');
    $('.hide-when-small').css({
      display: 'inherit'
    });
    $('.hide-when-full').css({
      display: 'none'
    });
    if (start === 'adv') {
      switchToAdvanced();
    } else if (start === 'basic') {
      switchToBasic();
    } else if (isNumber(start)) {
      next(start);
    } else if (endsWith(start, 'ADV')) {
      switchToAdvanced();
      index = start.split('-')[0];
      next(index);
    } else {
      next(0);
    }
    webterm.resize();
    return setTimeout(function() {
      return logEvent({
        type: EVENT_TYPES.start
      });
    }, 3000);
  };

  $('#fullSizeClose').click(function() {
    return leaveFullSizeMode();
  });

  this.leaveFullSizeMode = function() {
    console.debug("leaving full-size mode");
    $('.togglesize').removeClass('fullsize').addClass('startsize');
    $('.hide-when-small').css({
      display: 'none'
    });
    $('.hide-when-full').css({
      display: 'inherit'
    });
    return webterm.resize();
  };

  $('#command').click(function() {
    var data;
    if (!$('#commandHiddenText').hasClass('hidden')) {
      $('#commandHiddenText').addClass("hidden").hide();
      $('#commandShownText').hide().removeClass("hidden").fadeIn();
    }
    data = {
      type: EVENT_TYPES.peek
    };
    return logEvent(data);
  });


  /*
    Navigation amongst the questions
   */

  endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  current_question = 0;

  window.next = next = function(which) {
    var data;
    $('#marker-' + current_question).addClass("complete").removeClass("active");
    if (which === 'ADV') {
      switchToAdvanced();
    } else if (which === '←') {
      switchToBasic();
    } else if (!which && which !== 0) {
      current_question++;
      if (current_question === questions.length) {
        next('ADV');
      }
    } else {
      current_question = which;
    }
    questions[current_question]();
    results.clear();
    this.webterm.focus();
    if (!$('#commandShownText').hasClass('hidden')) {
      $('#commandShownText').addClass("hidden");
      $('#commandHiddenText').removeClass("hidden").show();
    }
    if (window.advancedTut === true) {
      history.pushState({}, "", "#" + current_question + "-ADV");
      window.location.hash = "#" + current_question + "-ADV";
    } else {
      history.pushState({}, "", "#" + current_question);
      window.location.hash = "#" + current_question;
    }
    data = {
      'type': EVENT_TYPES.next
    };
    logEvent(data);
    $('#marker-' + current_question).removeClass("complete").addClass("active");
    $('#question-number').find('text').get(0).textContent = current_question;
    $('#instructions .assignment').show();
    $('#tips, #command').show();
  };

  previous = function() {
    current_question--;
    questions[current_question]();
    results.clear();
    this.webterm.focus();
  };

  results = {
    set: function(htmlText, intermediate) {
      if (intermediate) {
        console.debug("intermediate text received");
        $('#results').addClass('intermediate');
        $('#buttonNext').hide();
      } else {
        $('#buttonNext').show();
      }
      return window.setTimeout((function() {
        $('#resulttext').html(htmlText);
        $('#results').fadeIn();
        return $('#buttonNext').removeAttr('disabled');
      }), 300);
    },
    clear: function() {
      $('#resulttext').html("");
      return $('#results').fadeOut('slow');
    }
  };


  /*
    Transform question objects into functions
   */

  buildfunction = function(question) {
    var _q;
    _q = question;
    return function() {
      console.debug("function called");
      $('#instructions').hide().fadeIn();
      $('#instructions .text').html(_q.html);
      $('#instructions .assignment').html(_q.assignment);
      $('#tipShownText').html(_q.tip);
      if (_q.command_show) {
        $('#commandShownText').html(_q.command_show.join(' '));
      } else {
        $('#commandShownText').html(_q.command_expected.join(' '));
      }
      if (_q.currentDockerPs != null) {
        window.currentDockerPs = _q.currentDockerPs;
      } else {
        window.currentDockerPs = staticDockerPs;
      }
      if (_q.currentLocalImages != null) {
        window.currentLocalImages = _q.currentLocalImages;
      }
      if (_q.currentCloudImages != null) {
        window.currentCloudImages = _q.currentCloudImages;
      }
      if (_q.currentCloudImages != null) {
        window.currentCloudImages = _q.currentCloudImages;
      }
      if (_q.currentIceGroups != null) {
        window.currentIceGroups = _q.currentIceGroups;
      }
      if (_q.currentIcePs != null) {
        window.currentIcePs = _q.currentIcePs;
      } else {
        window.finishedCallback = function() {
          return "";
        };
      }
      window.immediateCallback = function(input, stop) {
        var data, doNotExecute;
        if (stop === true) {
          doNotExecute = true;
        } else {
          doNotExecute = false;
        }
        if (doNotExecute !== true) {
          console.log(input);
          data = {
            'type': EVENT_TYPES.command,
            'command': input.join(' '),
            'result': 'fail'
          };
          if (input.containsAllOfTheseParts(_q.command_expected)) {
            data.result = 'success';
            setTimeout((function() {
              this.webterm.disable();
              return $('#buttonNext').focus();
            }), 1000);
            results.set(_q.result);
            console.debug("contains match");
          } else {
            console.debug("wrong command received");
          }
          logEvent(data);
        }
      };
      window.intermediateResults = function(input) {
        var intermediate;
        if (_q.intermediateresults) {
          return results.set(_q.intermediateresults[input](), intermediate = true);
        }
      };
    };
  };

  statusMarker = $('#progress-marker-0');

  progressIndicator = $('#progress-indicator');

  leftside = $('#leftside');

  tutorialTop = $('#tutorialTop');

  advancedTag = $('#advancedTag');

  window.switchToBasic = switchToBasic = function() {
    var f, j, len, question, questionNumber;
    window.advancedTut = false;
    questions = [];
    statusMarker.prevAll('span').remove();
    statusMarker.nextAll('span').remove();
    leftside.animate({
      backgroundColor: "#26343f"
    }, 1000);
    tutorialTop.animate({
      backgroundColor: "rgb(59, 74, 84)"
    }, 1000);
    advancedTag.fadeOut();
    questionNumber = 0;
    for (j = 0, len = q.length; j < len; j++) {
      question = q[j];
      f = buildfunction(question);
      questions.push(f);
      drawStatusMarker(questionNumber);
      if (questionNumber > 0) {
        $('#marker-' + questionNumber).removeClass("active").removeClass("complete");
      } else {
        $('#marker-' + questionNumber).removeClass("complete").addClass("active");
      }
      questionNumber++;
    }
    drawStatusMarker('ADV');
    return next(0);
  };

  window.switchToTriggers = switchToTriggers = function() {
    var f, j, len, question, questionNumber;
    window.advancedTut = false;
    questions = [];
    statusMarker.prevAll('span').remove();
    statusMarker.nextAll('span').remove();
    leftside.animate({
      backgroundColor: "#26343f"
    }, 1000);
    tutorialTop.animate({
      backgroundColor: "rgb(59, 74, 84)"
    }, 1000);
    advancedTag.fadeOut();
    questionNumber = 0;
    for (j = 0, len = trigger_q.length; j < len; j++) {
      question = trigger_q[j];
      f = buildfunction(question);
      questions.push(f);
      drawStatusMarker(questionNumber);
      if (questionNumber > 0) {
        $('#marker-' + questionNumber).removeClass("active").removeClass("complete");
      } else {
        $('#marker-' + questionNumber).removeClass("complete").addClass("active");
      }
      questionNumber++;
    }
    return next(0);
  };

  window.switchToRules = switchToRules = function() {
    var f, j, len, question, questionNumber;
    window.advancedTut = false;
    questions = [];
    statusMarker.prevAll('span').remove();
    statusMarker.nextAll('span').remove();
    leftside.animate({
      backgroundColor: "#26343f"
    }, 1000);
    tutorialTop.animate({
      backgroundColor: "rgb(59, 74, 84)"
    }, 1000);
    advancedTag.fadeOut();
    questionNumber = 0;
    for (j = 0, len = rlz_q.length; j < len; j++) {
      question = rlz_q[j];
      f = buildfunction(question);
      questions.push(f);
      drawStatusMarker(questionNumber);
      if (questionNumber > 0) {
        $('#marker-' + questionNumber).removeClass("active").removeClass("complete");
      } else {
        $('#marker-' + questionNumber).removeClass("complete").addClass("active");
      }
      questionNumber++;
    }
    return next(0);
  };

  window.switchToPackages = switchToPackages = function() {
    var f, j, len, question, questionNumber;
    window.advancedTut = false;
    questions = [];
    statusMarker.prevAll('span').remove();
    statusMarker.nextAll('span').remove();
    leftside.animate({
      backgroundColor: "#26343f"
    }, 1000);
    tutorialTop.animate({
      backgroundColor: "rgb(59, 74, 84)"
    }, 1000);
    advancedTag.fadeOut();
    questionNumber = 0;
    for (j = 0, len = pkg_q.length; j < len; j++) {
      question = pkg_q[j];
      f = buildfunction(question);
      questions.push(f);
      drawStatusMarker(questionNumber);
      if (questionNumber > 0) {
        $('#marker-' + questionNumber).removeClass("active").removeClass("complete");
      } else {
        $('#marker-' + questionNumber).removeClass("complete").addClass("active");
      }
      questionNumber++;
    }
    return next(0);
  };

  window.switchToMobileSDK = switchToMobileSDK = function() {
    var f, j, len, question, questionNumber;
    window.advancedTut = false;
    questions = [];
    statusMarker.prevAll('span').remove();
    statusMarker.nextAll('span').remove();
    leftside.animate({
      backgroundColor: "#26343f"
    }, 1000);
    tutorialTop.animate({
      backgroundColor: "rgb(59, 74, 84)"
    }, 1000);
    advancedTag.fadeOut();
    questionNumber = 0;
    for (j = 0, len = mob_q.length; j < len; j++) {
      question = mob_q[j];
      f = buildfunction(question);
      questions.push(f);
      drawStatusMarker(questionNumber);
      if (questionNumber > 0) {
        $('#marker-' + questionNumber).removeClass("active").removeClass("complete");
      } else {
        $('#marker-' + questionNumber).removeClass("complete").addClass("active");
      }
      questionNumber++;
    }
    return next(0);
  };

  window.switchToAdvanced = switchToAdvanced = function() {
    var f, j, len, marker, question, questionNumber;
    questions = [];
    window.advancedTut = true;
    statusMarker.prevAll('span').remove();
    statusMarker.nextAll('span').remove();
    leftside.animate({
      backgroundColor: "#543B3B"
    }, 1000);
    tutorialTop.animate({
      backgroundColor: "#3F2626"
    }, 1000);
    advancedTag.fadeIn();
    marker = statusMarker.clone();
    marker.prependTo(progressIndicator);
    marker.title = 'Go back to the Basic Tutorial';
    marker.attr("id", "marker-" + 'BSC');
    marker.find('text').get(0).textContent = '←';
    marker.click(function() {
      return switchToBasic();
    });
    marker.removeClass("active");
    questionNumber = 0;
    for (j = 0, len = adv_q.length; j < len; j++) {
      question = adv_q[j];
      f = buildfunction(question);
      questions.push(f);
      drawStatusMarker(questionNumber);
      if (questionNumber > 0) {
        $('#marker-' + questionNumber).removeClass("active").removeClass("complete");
      } else {
        $('#marker-' + questionNumber).removeClass("complete").addClass("active");
      }
      questionNumber++;
    }
    return next(0);
  };

  drawStatusMarker = function(i) {
    var marker;
    if (i === 0) {
      marker = statusMarker;
    } else {
      marker = statusMarker.clone();
      marker.appendTo(progressIndicator);
    }
    marker.attr("id", "marker-" + i);
    marker.find('text').get(0).textContent = i;
    return marker.click(function() {
      return next(i);
    });
  };

  questionNumber = 0;

  for (j = 0, len = q.length; j < len; j++) {
    question = q[j];
    f = buildfunction(question);
    questions.push(f);
    drawStatusMarker(questionNumber);
    questionNumber++;
  }

  drawStatusMarker('ADV');


  /*
    Initialization of program
   */


  /*if (window.location.hash)
    try
      currentquestion = window.location.hash.split('#')[1].toNumber()
   *    questions[currentquestion]()
   *    current_question = currentquestion
      next(currentquestion)
  
    catch err
      questions[0]()
  else
    questions[0]()
   */

  $('#results').hide();

}).call(this);

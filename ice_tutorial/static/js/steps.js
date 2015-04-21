// Generated by CoffeeScript 1.9.1

/*
  This is the main script file. It can attach to the terminal
 */

(function() {
  var COMPLETE_URL, EVENT_TYPES, buildfunction, current_question, currentquestion, drawStatusMarker, err, f, j, len, logEvent, next, previous, progressIndicator, q, question, questionNumber, questions, results, staticCloudImages, staticDockerPs, staticLocalImages, statusMarker;

  COMPLETE_URL = "/whats-next/";


  /*
    Array of question objects
   */

  staticDockerPs = "ID                  IMAGE               COMMAND               CREATED             STATUS              PORTS";

  staticLocalImages = "Target is local host. Invoking docker with the given arguments...\nREPOSITORY                                        TAG                 IMAGE ID            CREATED              VIRTUAL SIZE";

  staticCloudImages = "Image Id                             Created              Image Name\n\nd0feae99-b91d-4ce3-bcb4-6128886f6968 Mar 23 10:44:59 2015 registry-ice.ng.bluemix.net/ibmliberty:latest\n74831680-1c9c-424e-b8ea-ceede4aa0e40 Mar 23 10:41:24 2015 registry-ice.ng.bluemix.net/ibmnode:latest";

  q = [];

  q.push({
    html: "<h3>Getting started</h3>\n<p>Use IBM® Containers to run Docker containers in a hosted cloud environment on IBM Bluemix™. IBM Containers \nhelps you build and deploy containers where you can package your applications and services. Each container is \nbased on an image format, includes a set of standard operations, and is an execution environment in itself.\n</p>",
    assignment: "<h3>Assignment</h3>\n<p>Check IBM Containers Extension (ICE) to identify the version of the client that you are running</p>\n<p>This will help you verify which version of the ICE CLI is running. If you see a version value\nthen you know you that your all set with your ICE client installation. The ICE CLI is supported on Linux OS.\nFor Windows, your best option is to create an Ubuntu VM and install your client software there.</p>",
    tip: "<p>Try typing <code>ice</code> to see the full list of accepted arguments</p> <p>This emulator provides only a limited set of shell and ICE commands, so some commands may not work as expected</p>",
    command_expected: ['ice', 'version'],
    result: "<p>Well done! Let's move to the next assignment.</p>"
  });

  q.push({
    html: "<h3>Logging In</h3>\n<p>The easiest way to get started is to log in to the IBM Containers infrastructure.  For details on login arguments, search the online \n<a href=\"#1\" onClick=\"window.open('https://www.ng.bluemix.net/docs/#starters/index-gentopic3.html#genTopProcId4','IBM Containers Doc','width=1000,height=900,left=50,top=50,menubar=0')\";>IBM Containers Doc</a>\nand by using the commandline</p>",
    assignment: "<h3>Assignment</h3>\n<p>Use the <code>ice login</code> command to log in to the IBM Containers infrastructure while manually specifying your cloud service host or url using the <b>short option format</b>. Ice will ask you for a username and password, any value will work.</p>",
    command_expected: ['ice', 'login', '-H', 'https://api-ice.ng.bluemix.net/v2/containers'],
    result: "<p>You found it! Way to go!</p>",
    intermediateresults: [
      function() {
        return "<p>You seem to be almost there. Did you specify the host with </b>'-h  https://api-ice.ng.bluemix.net/v2/containers'</b> ";
      }, function() {
        return "<p>You've got the arguments right. Did you get the command? Try <em>/bin/bash </em>?</p>";
      }
    ],
    tip: "the optional arguments for login are specified in the online Bluemix Containers doc"
  });

  q.push({
    html: "<h3>Downloading container images</h3>\n<p>This exercise will introduce the --local. calling ice --local is the same as calling docker. ice --local will pass arguements to docker and run like standard docker.</p>\n<p>Container images can be downloaded just as easily, using <code>docker pull</code>.</p>\n<p>However, instead of calling <code>docker pull</code> directly we will use <code>ice --local pull</code>, to pull images from registry-ice.ng.bluemix.net/&lt;Namespace&gt;/&lt;Image&gt;.</p>\n<p>For images from the central index, the name you specify is constructed as &lt;Namespace&gt;/&lt;Image Name&gt;</p>\n<p>A group of special, trusted images such as the ubuntu base image can be retrieved by just their name &lt;Image Name&gt;.</p>",
    assignment: "<h3>Assignment</h3>\n<p>Pull the <b>'tutorial'</b> image from the <b>'learn'</b> namespace in the <b>'registry-ice.ng.bluemix.net'</b> registry</p>",
    command_expected: ['ice', '--local', 'pull', 'registry-ice.ng.bluemix.net/learn/tutorial'],
    result: "<p>Cool. Look at the results. You'll see that ice has invoked docker to download a number of layers. In Docker all images (except the base image) are made up of several cumulative layers.</p>",
    intermediateresults: [
      function() {
        return "<p>You seem to be almost there. Don't forget to tell <b>ice --local pull</b> where to find the image, ice --local pull &lt;<Registry url>&gt;/&lt;learn&gt;/&lt;tutorial&gt; ";
      }, function() {
        return "<p>You got the namespace and image name correct, but forgot to specify a registry, hint ice --local pull &lt;Registry url&gt;/&lt;Namespace&gt;/&lt;Image Name&gt;</p>";
      }
    ],
    tip: "<ul>\n  <li>Don't forget to pull the full name of the repository e.g. 'learn/tutorial'</li>\n  <li>For this tutorial the Namespace for you registry will always be <b>'learn'</b></li>\n  <li>Look under 'show expected command if you're stuck.</li>\n</ul>"
  });

  q.push({
    html: "<h3>Hello world from a container</h3>\n<p>You can think about containers as a process in a box. The box contains everything the process might need, so\nit has the filesystem, system libraries, shell and such, but by default none of it is started or run.<p>\n<p>You 'start' a container <em>by</em> running a process in it. This process is the only process run, so when\nit completes the container is fully stopped.",
    assignment: "<h3>Assignment</h3>\n<p>Make our freshly loaded container image output \"hello world\"</p>\n<p>To do so you should run 'echo' in the container and have that say \"hello world\"\n",
    command_expected: ["ice", "--local", "run", "learn/tutorial", "echo", "hello"],
    command_show: ["ice", "--local", "run", "learn/tutorial", 'echo "hello world"'],
    result: "<p>Great! Hellooooo World!</p><p>You have just started a container and executed a program inside of it, when\nthe program stopped, so did the container.",
    intermediateresults: [
      function() {
        return "<p>You seem to be almost there. Did you give the command `echo \"hello world\"` ";
      }, function() {
        return "<p>You've got the arguments right. Did you get the command? Try <em>/bin/bash </em>?</p>";
      }
    ],
    tip: "<p>The command <code>docker run</code> takes a minimum of two arguments. An image name, and the command you want to execute\nwithin that image.</p>\n<p>Check the expected command below if it does not work as expected</p>",
    currentLocalImages: "ubuntu                latest              8dbd9e392a96        4 months ago        131.5 MB (virtual 131.5 MB)\nlearn/tutorial        latest              8dbd9e392a96        2 months ago        131.5 MB (virtual 131.5 MB)\nlearn/ping            latest              effb66b31edb        10 minutes ago      11.57 MB (virtual 143.1 MB)"
  });

  q.push({
    html: "<h3>Installing things in the container</h3>\n<p>Next we are going to install a simple program (ping) in the container. The image is based upon ubuntu, so you\ncan run the command <code>apt-get install -y ping</code> in the container. </p>\n<p>Note that even though the container stops right after a command completes, the changes are not forgotten.</p>",
    assignment: "<h3>Assignment</h3>\n<p>Install 'ping' on top of the learn/tutorial image.</p>",
    command_expected: ["ice", "--local", "run", "learn/tutorial", "apt-get", "install", "-y", "ping"],
    command_show: ["ice", "--local", "run", "learn/tutorial", "apt-get", "install", "-y", "ping"],
    result: "<p>That worked! You have installed a program on top of a base image. Your changes to the filesystem have been\nkept, but are not yet saved.</p>",
    intermediateresults: [
      function() {
        return "<p>Not specifying -y on the apt-get install command will work for ping, because it has no other dependencies, but\nit will fail when apt-get wants to install dependencies. To get into the habit, please add -y after apt-get.</p>";
      }
    ],
    tip: "<p>Don't forget to use -y for noninteractive mode installation</p>\n<p>Not specifying -y on the apt-get install command will fail for most commands because it expects you to accept\n(y/n) but you cannot respond.\n</p>"
  });

  q.push({
    html: "<h3>Save your changes</h3>\n<p>After you make changes (by running a command inside a container), you probably want to save those changes.\nThis will enable you to later start from this point onwards.</p>\n<p>With Docker, the process of saving the state is called <em>committing</em>. Commit basically saves the difference\nbetween the old image and the new state. The result is a new layer.</p>",
    assignment: "<h3>Assignment</h3>\n<p>First use <code>ice --local ps -l</code> to find the ID of the container you created by installing ping.</p>\n<p>Then save (commit) this container with the repository name 'learn/ping' </p>",
    command_expected: ["ice", "--local", "commit", "698", "learn/ping"],
    command_show: ["ice", "--local", "commit", "698", 'learn/ping'],
    result: "<p>That worked! Please take note that Docker has returned a new ID. This id is the <em>image id</em>.</p>",
    intermediateresults: [
      function() {
        return "You have not specified the correct repository name to commit to (learn/ping). This works, but giving your images a name\nmakes them much easier to work with.";
      }
    ],
    tip: "<ul>\n<li>Giving just <code>ice --local commit</code> will show you the possible arguments.</li>\n<li>You will need to specify the container to commit by the ID you found</li>\n<li>You don't need to copy (type) the entire ID. Three or four characters are usually enough.</li>\n</ul>"
  });

  q.push({
    html: "<h3>Run your new image</h3>\n<p>Now you have basically setup a complete, self contained environment with the 'ping' program installed. </p>\n<p>Your image can now be run on any host that runs Docker.</p>\n<p>Lets run this image on this machine.</p>",
    assignment: "<h3>Assignment</h3>\n<p>Run the ping program to ping www.google.com</p>\n",
    command_expected: ["ice", "--local", "run", 'learn/ping', 'ping', 'google.com'],
    result: "<p>That worked! Note that normally you can use Ctrl-C to disconnect. The container will keep running. This\ncontainer will disconnect automatically.</p>",
    intermediateresults: [
      function() {
        return "You have not specified a repository name. This is not wrong, but giving your images a name\nmake them much easier to work with.";
      }
    ],
    tip: "<ul>\n<li>Make sure to use the repository name learn/ping to run ping with</li>\n</ul>"
  });

  q.push({
    html: "<h3>Check your running image</h3>\n<p>You now have a running container. Let's see what is going on.</p>\n<p>Using <code>ice --local ps</code> we can see a list of all running containers, and using <code>ice --local inspect</code>\nwe can see all sorts of useful information about this container.</p>",
    assignment: "<h3>Assignment</h3>\n<p><em>Find the container id</em> of the running container, and then inspect the container using <em>ice --local inspect</em>.</p>\n",
    command_expected: ["ice", "--local", "inspect", "efe"],
    result: "<p>Success! Have a look at the output. You can see the ip-address, status and other information.</p>",
    intermediateresults: [
      function() {
        return "You have not specified a repository name. This is not wrong, but giving your images a name make them much easier to work with.";
      }
    ],
    tip: "<ul>\n<li>Remember you can use a partial match of the image id, three or more letters should work.</li>\n</ul>",
    currentDockerPs: "ID                  IMAGE               COMMAND               CREATED             STATUS              PORTS\nefefdc74a1d5        learn/ping:latest   ping www.google.com   37 seconds ago      Up 36 seconds"
  });

  q.push({
    html: "<h3>Tagging your image with ice</h3>\n<p>Now you have verified that your application container works locally, it's time to get it ready for Bluemix.</p>\n<p>Remember you pulled (downloaded) the learn/tutorial image from the Bluemix Private Registry? You can also share your built images\nto the Registry by pushing (uploading) them to there. That way you can easily retrieve them for re-use and share them\nwith others. </p>\n\n<p>To use an image on bluemix, you will first need to push the image up to your,\nbluemix registry. To do that we need to tag the pulled image with your namespace and a name, that will identify it in your \nbluemix registry.\n</p>\n<p>Note: You can also push images downloaded from the <a href=\"registry.hub.docker.com\">Docker Public Registry</a> to your Bluemix Private Registry.</p>",
    assignment: "<h3>Assignment</h3>\n<p>Tag the learn/tutorial image using <code>ice --local tag</code>. tag the image with the name <b>'learn/ping'</b>. This prepares the image for pushing to the bluemix registry.</p>\n<p>tag usage: <b>'ice --local tag &lt;local_Image_name&gt; registry-ice.ng.bluemix.net/&lt;Namespace&gt;/&lt;Image_name&gt;'</b></p>",
    command_expected: ["ice", "--local", "tag", "learn/tutorial", "registry-ice.ng.bluemix.net/learn/ping"],
    command_show: ["ice", "--local", "tag", "learn/tutorial", "registry-ice.ng.bluemix.net/learn/ping"],
    result: "<p>Success! The image is now tagged and ready to push. In the next section we'll push to the registry</p>",
    intermediateresults: [
      function() {
        return "Almost there, don't forget to provide the name of the local image that will be tagged (learn/tutorial)";
      }
    ],
    tip: "<ul>\n<li><code>ice images</code> will show you which images are currently on your host</li>\n<li><code>ice --local images</code> will show you which images exist locally (docker)</li>\n<li>For more usage info see the docs <a a href=\"https://www.ng.bluemix.net/docs/#starters/index-gentopic3.html#container_install\">here</a></li>\n<li>You can only push images to your own namespace, this emulator uses the namespace 'learn'</li>\n</ul>"
  });


  /*intermediateresults:
    [
      () ->
        $('#instructions .assignment').hide()
        $('#tips, #command').hide()
  
        $('#instructions .text').html("""
          <div class="complete">
            <h3>Congratulations!</h3>
            <p>You have mastered the basic docker commands!</p>
            <p><strong>Did you enjoy this tutorial? Share it!</strong></p>
            <p>
              <a href="mailto:?Subject=Check%20out%20the%20Docker%20interactive%20tutorial!&Body=%20https://www.docker.io/gettingstarted/"><img src="/static/img/email.png"></a>
              <a href="http://www.facebook.com/sharer.php?u=https://www.docker.io/gettingstarted/"><img src="/static/img/facebook.png"></a>
              <a href="http://twitter.com/share?url=https://www.docker.io/gettingstarted/&text=%20Check+out+the+docker+tutorial!"><img src="/static/img/twitter.png"></a>
            </p>
            <h3>Your next steps</h3>
            <ol>
              <li><a href="/news_signup/" target="_blank" >Register</a> for news and updates on Docker (opens in new window)</li>
              <li><a href="http://twitter.com/docker" target="_blank" >Follow</a> us on twitter (opens in new window)</li>
              <li><a href="#" onClick="leaveFullSizeMode()">Close</a> this tutorial, and continue with the rest of the getting started.</li>
            </ol>
            <p> - Or - </p>
            <p>Continue to learn about the way to automatically build your containers from a file. </p><p><a href="/learn/dockerfile/" class='btn btn-primary secondary-action-button'>Start Dockerfile tutorial</a></p>
  
          </div>
          """)
  
  
        data = { type: EVENT_TYPES.complete }
        logEvent(data)
  
        return """<p>All done!. You are now pushing a container image to the index. You can see that push, just like pull, happens layer by layer.</p>"""
    ]
    finishedCallback: () ->
    webterm.clear()
    webterm.echo( myTerminal() )
  
  
  })
   */

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

  this.goFullScreen = function() {
    console.debug("going to fullsize mode");
    $('.togglesize').removeClass('startsize').addClass('fullsize');
    $('.hide-when-small').css({
      display: 'inherit'
    });
    $('.hide-when-full').css({
      display: 'none'
    });
    next(0);
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

  current_question = 0;

  next = function(which) {
    var data;
    $('#marker-' + current_question).addClass("complete").removeClass("active");
    if (!which && which !== 0) {
      current_question++;
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
    history.pushState({}, "", "#" + current_question);
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

  buildfunction = function(q) {
    var _q;
    _q = q;
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
      if (_q.currentImages != null) {
        window.currentImages = _q.currentImages;
      } else {
        window.currentImages = staticImages;
      }
      if (_q.currentImages != null) {
        window.currentImages = _q.currentImages;
      } else {
        window.currentImages = staticImages;
      }
      if (_q.finishedCallback != null) {
        window.finishedCallback = q.finishedCallback;
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


  /*
    Initialization of program
   */

  if (window.location.hash) {
    try {
      currentquestion = window.location.hash.split('#')[1].toNumber();
      next(currentquestion);
    } catch (_error) {
      err = _error;
      questions[0]();
    }
  } else {
    questions[0]();
  }

  $('#results').hide();

}).call(this);

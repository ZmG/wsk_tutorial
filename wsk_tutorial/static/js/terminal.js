// Generated by CoffeeScript 1.10.0

/*
	Please note the javascript is being fully generated from coffeescript.
	So make your changes in the .coffee file.
	Thatcher Peskens
				 _
			,_(')<
			\___)

	Forked and Modified by IBM jStart
 */

(function() {
  (this.myTerminal = function() {
    var EMULATOR_VERSION, bash, cat, parseInput, util_slow_lines, wait, wsk, wsk_action_invoke_blocking_hello, wsk_action_invoke_hello, wsk_activation_list, wsk_activation_result, wsk_cat_helloWorld, wsk_create_action_hello, wsk_create_action_hello_v, wsk_create_action_sequence, wsk_help, wsk_invalid_choice, wsk_list_action_hello, wsk_no_args, wsk_package_get, wsk_unrecognized_arguments;
    EMULATOR_VERSION = "0.1.5";
    this.basesettings = {
      prompt: '[[b;#fff;]you@tutorial:~$] ',
      greetings: "	 Imitation is the sincerest form of flattery\n	 We loved Docker's try it approach - so we forked it\n	 Welcome to the IBM OpenWhisk tutorial\n	 Courtesy of IBM jStart (http://ibm.com/jstart)\n\n   ____                 _       ____    _      __  \n  / __ &#92;____  ___  ____| |     / / /_  (_)____/ /__\n / / / / __ \/ _ \/ __ \ | /| / / __ \/ / ___/ //_/\n/ /_/ / /_/ /  __/ / / / |/ |/ / / / / (__  ) ,<   \n\____/ .___/\___/_/ /_/|__/|__/_/ /_/_/____/_/|_|  \n    /_/\n"
    };

    /*
    		Callback definitions. These can be overridden by functions anywhere else
     */
    this.preventDefaultCallback = false;
    this.immediateCallback = function(command) {
      console.debug("immediate callback from " + command);
    };
    this.finishedCallback = function(command) {
      console.debug("finished callback from " + command);
    };
    this.intermediateResults = function(string) {
      console.debug("sent " + string);
    };
    this.currentDockerPs = "";
    this.currentVolumes = [""];
    this.currentIceGroups = "\nGroup Id                             Name             Status               Created             Updated             Port";
    this.currentIcePs = "\nContainer Id                         Name                   Group      Image                          Created      State    Private IP      Public IP       Ports";
    this.currentLocalImages = "Target is local host. Invoking docker with the given arguments...\nREPOSITORY            TAG                 IMAGE ID            CREATED             VIRTUAL SIZE\nubuntu                latest              8dbd9e392a96        4 months ago        131.5 MB (virtual 131.5 MB)";
    this.currentCloudImages = "Image Id                             Created              Image Name\n\nd0feae99-b91d-4ce3-bcb4-6128886f6968 Mar 23 10:44:59 2015 registry-ice.ng.bluemix.net/ibmliberty:latest\n74831680-1c9c-424e-b8ea-ceede4aa0e40 Mar 23 10:41:24 2015 registry-ice.ng.bluemix.net/ibmnode:latest\n";

    /*
    		Base interpreter
     */
    this.interpreter = function(input, term) {
      var command, inputs, ref;
      input = input.trim();
      inputs = input.split(" ");
      command = inputs[0];
      if ((ref = term.loginSequence) === 1 || ref === 2) {
        login(term, inputs);
      } else if (command === 'hi') {
        term.echo('hi there! What is your name??');
        term.push(function(command, term) {
          return term.echo(command + ' is a pretty name');
        });
      } else if (command === 'shell') {
        term.push(function(command, term) {
          if (command === 'cd') {
            return bash(term, inputs);
          }
        }, {
          prompt: '> $ '
        });
      } else if (command === 'r') {
        location.reload('forceGet');
      } else if (command === '#') {
        term.echo('which question?');
      } else if (command === 'cd') {
        bash(term, inputs);
      } else if (command === "wsk") {
        wsk(term, inputs);
      } else if (command === "cat") {
        cat(term, inputs);
      } else if (command === "ls") {
        term.echo("hello.js");
      } else if (command === "cd" || command === "pwd") {
        term.echo("This is an emulator, not a shell. Try following the instructions.");
      } else if (command === "pull") {
        term.echo('[[b;#fff;]some text]');
        wait(term, 5000, true);
        alert(term.get_output());
        return;
      } else if (command) {
        term.echo(inputs[0] + ": command not found");
      }
      return immediateCallback(inputs);
    };

    /*  =======================================
    		Common utils
    	=======================================
     */
    String.prototype.beginsWith = function(string) {

      /*
      		Check if 'this' string starts with the inputstring.
       */
      return this.indexOf(string) === 0;
    };
    Array.prototype.containsAllOfThese = function(inputArr) {

      /*
      		This function compares all of the elements in the inputArr
      		and checks them one by one if they exist in 'this'. When it
      		finds an element to not exist, it returns false.
       */
      var me, valid;
      me = this;
      valid = false;
      if (inputArr) {
        valid = inputArr.every(function(value) {
          if (me.indexOf(value) === -1) {
            return false;
          } else {
            return true;
          }
        });
      }
      return valid;
    };
    Array.prototype.containsAllOfTheseParts = function(inputArr) {

      /*
      		This function is like containsAllofThese, but also matches partial strings.
       */
      var me, valid;
      me = this;
      if (inputArr) {
        valid = inputArr.every(function(value) {
          var item, itemDashes, k, len, valueDashes;
          for (k = 0, len = me.length; k < len; k++) {
            item = me[k];
            itemDashes = (item.match(/--/g) || []).length;
            valueDashes = (value.match(/--/g) || []).length;
            if (item.match(value) && itemDashes >= valueDashes) {
              return true;
            }
          }
          return false;
        });
      }
      return valid;
    };
    parseInput = function(inputs) {
      var command, commands, imagename, input, j, k, len, parsed_input, switchArg, switchArgs, switches;
      command = inputs[1];
      switches = [];
      switchArg = false;
      switchArgs = [];
      imagename = "";
      commands = [];
      j = 0;
      for (k = 0, len = inputs.length; k < len; k++) {
        input = inputs[k];
        if (input.startsWith('-') && imagename === "") {
          switches.push(input);
          if (switches.length > 0) {
            if (!['-i', '-t', '-d'].containsAllOfThese([input])) {
              switchArg = true;
            }
          }
        } else if (switchArg === true) {
          switchArg = false;
          switchArgs.push(input);
        } else if (j > 1 && imagename === "" && input !== 'create') {
          imagename = input;
        } else if (input === 'create') {
          commands.push(input);
        } else if (imagename !== "") {
          commands.push(input);
        } else {

        }
        j++;
      }
      parsed_input = {
        'switches': switches.sortBy(),
        'switchArgs': switchArgs,
        'imageName': imagename,
        'commands': commands
      };
      return parsed_input;
    };
    util_slow_lines = function(term, paragraph, keyword, finishedCallback) {
      var foo, i, lines;
      if (keyword) {
        lines = paragraph(keyword).split("\n");
      } else {
        lines = paragraph.split("\n");
      }
      term.pause();
      i = 0;
      foo = function(lines) {
        return self.setTimeout((function() {
          if (lines[i]) {
            term.echo(lines[i]);
            i++;
            return foo(lines);
          } else {
            term.resume();
            return finishedCallback(term);
          }
        }), 1000);
      };
      return foo(lines);
    };
    wait = function(term, time, dots) {
      var interval_id;
      term.echo("starting to wait");
      interval_id = self.setInterval((function() {
        return dots != null ? dots : term.insert('.');
      }), 500);
      return self.setTimeout((function() {
        var output;
        self.clearInterval(interval_id);
        output = term.get_command();
        term.echo(output);
        return term.echo("done ");
      }), time);
    };

    /*
    		Bash program
     */
    bash = function(term, inputs) {
      var argument, echo, insert;
      echo = term.echo;
      insert = term.insert;
      if (!inputs[1]) {
        return console.log("none");
      } else {
        argument = inputs[1];
        if (argument.beginsWith('..')) {
          return echo("-bash: cd: " + argument + ": Permission denied");
        } else {
          return echo("-bash: cd: " + argument + ": No such file or directory");
        }
      }
    };
    cat = function(term, inputs) {
      var echo;
      echo = term.echo;
      if (inputs[1] === "hello.js") {
        return echo(wsk_cat_helloWorld);
      }
    };
    wsk = function(term, inputs) {
      var callback, command, echo, insert;
      echo = term.echo;
      insert = term.insert;
      callback = function() {
        return this.finishedCallback(inputs);
      };
      command = inputs[1];
      if (!inputs[1]) {
        console.debug("no args");
        return echo(wsk_no_args);
      } else if (inputs[1] === "--help" || inputs[1] === "-h") {
        return echo(wsk_help);
      } else if (inputs[1] === "action") {
        if (inputs[2] === "create") {
          if (inputs[3] === "hello") {
            if (inputs[4] === "hello.js") {
              echo(wsk_create_action_hello);
            }
          }
          if (inputs[3] === "myAction") {
            if (inputs[4] === "--sequence") {
              if (inputs[5] === "/whisk.system/util/cat,/whisk.system/util/sort") {
                return echo(wsk_create_action_sequence);
              } else {
                return echo(wsk_unrecognized_arguments);
              }
            }
          }
        } else if (inputs[2] === "list") {
          return echo(wsk_list_action_hello);
        } else if (inputs[2] === "invoke") {
          if (inputs[3] === "hello") {
            return echo(wsk_action_invoke_hello);
          } else if (inputs[3] === "--blocking") {
            if (inputs[4] === "hello") {
              return echo(wsk_action_invoke_blocking_hello);
            }
          } else {
            return echo(wsk_no_args);
          }
        }
      } else if (inputs[1] === "package") {
        if (inputs[2] === "get") {
          if (inputs[3] === "--summary") {
            if (inputs[4] === "/whisk.system/util") {
              return echo(wsk_package_get);
            }
          }
        }
      } else if (inputs[1] === "activation") {
        if (inputs[2] === "result") {
          if (inputs[3] === "6bf1f670ee614a7eb5af3c9fde813043") {
            return echo(wsk_activation_result);
          }
        } else if (inputs[2] === "list") {
          return echo(wsk_activation_list);
        }
      } else if (inputs[1] === "-v") {
        if (inputs[2] === "action") {
          if (inputs[3] === "create") {
            if (inputs[4] === "hello") {
              if (inputs[5] === "hello.js") {
                return echo(wsk_create_action_hello_v);
              }
            }
          }
        }
      } else if (inputs[1] === "images") {
        return echo(currentCloudImages);
      }
    };
    wsk_help = "usage: wsk [-h] [-v] [--apihost hostname] [--apiversion version]\n           {action,activation,namespace,package,rule,trigger,sdk,property,list}\n           ...\n\nOpenWhisk is a distributed compute service to add event-driven logic to your\napps.\n\noptional arguments:\n  -h, --help            show this help message and exit\n  -v, --verbose         verbose output\n  --apihost hostname    whisk API host\n  --apiversion version  whisk API version\n\navailable commands:\n  {action,activation,namespace,package,rule,trigger,sdk,property,list}\n    action              work with actions\n    activation          work with activations\n    namespace           work with namespaces\n    package             work with packages\n    rule                work with rules\n    trigger             work with triggers\n    sdk                 work with the SDK\n    property            work with whisk properties\n    list                list all triggers, actions, and rules in the registry\n\nLearn more at https://developer.ibm.com/openwhisk fork on GitHub\nhttps://github.com/openwhisk. All trademarks are the property of their\nrespective owners.";
    wsk_invalid_choice = "usage: wsk [-h] [-v] [--apihost hostname] [--apiversion version]\n           {action,activation,namespace,package,rule,trigger,sdk,property,list}\n           ...\nwsk: error: argument cmd: invalid choice: (choose from 'action', 'activation', 'namespace', 'package', 'rule', 'trigger', 'sdk', 'property', 'list')";
    wsk_cat_helloWorld = "function main(params) {\n   			return {payload:  'Hello world'};\n}";
    wsk_create_action_hello = "ok: created action hello";
    wsk_create_action_hello_v = "{'apihost': 'openwhisk.ng.bluemix.net', 'namespace': 'jstart', 'clibuild': '2016-03-03T09:55:47-06:00', 'apiversion': 'v1'}\n========\nREQUEST:\nPUT https://openwhisk.ng.bluemix.net/api/v1/namespaces/jstart/actions/hello\nHeaders sent:\n{\n    \"Authorization\": \"Basic \n     UyLWJJkYu65JKhu7YjM0ZDcwODhlNzBiOmlFS3RWMHl0UWdIT1SxUGNrMUFJRHUzSF2VlFSV53hDUnZlVXhyMGJpbTBGeH827=\",\n    \"Content-Type\": \"application/json\"\n}\nBody sent:\n{\"exec\": {\"kind\": \"nodejs\", \"code\": \"function main(params) {\n   return {payload:  'Hello, ' + params.name + ' from ' + params.place};\n}\n\n\"}}\n--------\nRESPONSE:\nGot response with code 200\nBody received:\n{\n  \"name\": \"hello\",\n  \"publish\": false,\n  \"annotations\": [],\n  \"version\": \"0.0.1\",\n  \"exec\": {\n    \"kind\": \"nodejs\",\n    \"code\": \"function main(params) {\n   return {payload:  'Hello, ' + params.name + ' from ' + params.place};\n}\n\n\"\n  },\n  \"parameters\": [],\n  \"limits\": {\n    \"timeout\": 60000,\n    \"memory\": 256\n  },\n  \"namespace\": \"jstart\"\n}\n========\nok: created action hello";
    wsk_list_action_hello = "actions\nhello                                             private";
    wsk_action_invoke_hello = "ok: invoked hello with id 6bf1f670ee614a7eb5af3c9fde813043";
    wsk_action_invoke_blocking_hello = "ok: invoked hello with id 44794bd6aab74415b4e42a308d880e5b\nresponse:\n{\n   \"result\": {\n       \"payload\": \"Hello world\"\n   },\n   \"status\": \"success\",\n   \"success\": true\n}";
    wsk_activation_result = "{\n	\"payload\" : \"Hello world\"\n}";
    wsk_activation_list = "activations\n44794bd6aab74415b4e42a308d880e5b         hello\n6bf1f670ee614a7eb5af3c9fde813043         hello";
    wsk_no_args = "usage: wsk [-h] [-v] [--apihost hostname] [--apiversion version]\n           {action,activation,namespace,package,rule,trigger,sdk,property,list}\n           ...\nwsk: error: too few arguments";
    wsk_create_action_sequence = "ok: created action sequenceOfActions";
    wsk_unrecognized_arguments = "usage: wsk [-h] [-v] [--apihost hostname] [--apiversion version]\n           {action,activation,namespace,package,rule,trigger,sdk,property,list}\n           ...\nwsk: error: unrecognized arguments";
    return wsk_package_get = "package /whisk.system/util\naction /whisk.system/util/cat: Concatenate array of strings, and split lines into an array\naction /whisk.system/util/head: Filter first K array elements and discard rest\naction /whisk.system/util/date: Get current date and time\naction /whisk.system/util/sort: Sort array";
  })();

  return this;

}).call(this);

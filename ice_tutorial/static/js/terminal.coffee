###
	Please note the javascript is being fully generated from coffeescript.
	So make your changes in the .coffee file.
	Thatcher Peskens
				 _
			,_(')<
			\___)

	Forked and Modified by IBM jStart
###

do @myTerminal = ->

	# Which terminal emulator version are we
	EMULATOR_VERSION = "0.1.5"


	@basesettings = {
		prompt: 'you@tutorial:~$ ',
		greetings: """
							 Imitation is the sincerest form of flattery
							 We loved Docker's try it approach - so we forked it 
							 Welcome to the IBM Bluemix(tm) Container tutorial
							 Courtesy of IBM jStart (http://ibm.com/jstart)

							    ____  __                     _     
							   / __ )/ /_  _____  ____ ___  (_)  __
							  / __  / / / / / _ \\/ __ `__ \\/ / |/_/
							 / /_/ / / /_/ /  __/ / / / / / />  <  
							/_____/_/\\__,_/\\___/_/ /_/ /_/_/_/|_|  											 
																			
							"""

	}

	###
		Callback definitions. These can be overridden by functions anywhere else
	###

	@preventDefaultCallback = false

	@immediateCallback = (command) ->
		console.debug("immediate callback from #{command}")
		return

	@finishedCallback = (command) ->
		console.debug("finished callback from #{command}")
		return

	@intermediateResults = (string) ->
		console.debug("sent #{string}")
		return

	@currentDockerPs = ""

	###
		Base interpreter
	###

	@interpreter = (input, term) ->
		inputs = input.split(" ")
		command = inputs[0]

		if term.loginSequence in [1, 2]
			login(term, inputs)

		else if command is 'hi'
			term.echo 'hi there! What is your name??'
			term.push (command, term) ->
				term.echo command + ' is a pretty name'

		else if command is 'shell'
			term.push (command, term) ->
				if command is 'cd'
					bash(term, inputs)
			, {prompt: '> $ '}

		else if command is 'r'
			location.reload('forceGet')

		else if command is '#'
			term.echo 'which question?'

		else if command is 'test'
			term.echo 'I have to keep testing myself.'

		else if command is 'cd'
			bash(term, inputs)

		else if command is "ice"
			ice(term, inputs)

		else if command is "help"
			term.echo help

		else if command is "ls"
			term.echo "This is an emulator, not a shell. Try following the instructions."

		else if command is "colors"
			for IceCommand, description of IceCommands
				term.echo ("[[b;#fff;]" + IceCommand + "] - " + description + "")

		else if command is "pull"
			term.echo '[[b;#fff;]some text]'
			wait(term, 5000, true)
			alert term.get_output()

			return

		## finally
		else if command
			term.echo "#{inputs[0]}: command not found"

		immediateCallback(inputs)

	###  =======================================
		Common utils
	=======================================  ###

	String.prototype.beginsWith = (string) ->
		###
		Check if 'this' string starts with the inputstring.
		###
		return(this.indexOf(string) is 0)

	Array.prototype.containsAllOfThese = (inputArr) ->
		###
		This function compares all of the elements in the inputArr
		and checks them one by one if they exist in 'this'. When it
		finds an element to not exist, it returns false.
		###
		me = this
		valid = false

		if inputArr
			valid = inputArr.every( (value) ->
				if me.indexOf(value) == -1
					return false
				else
					return true
			)
		return valid


	Array.prototype.containsAllOfTheseParts = (inputArr) ->
		###
		This function is like containsAllofThese, but also matches partial strings.
		###

		me = this
		if inputArr
			valid = inputArr.every( (value) ->
				for item in me
					if item.match(value)
						return true

				return false
			)
		return valid


	parseInput = (inputs) ->
		command = inputs[1]
		switches = []
		switchArg = false
		switchArgs = []
		imagename = ""
		commands = []
		j = 0

		# parse args
		for input in inputs
			if input.startsWith('-') and imagename == ""
				switches.push(input)
				if switches.length > 0
					if not ['-i', '-t', '-d'].containsAllOfThese([input])
						switchArg = true
			else if switchArg == true
				# reset switchArg
				switchArg = false
				switchArgs.push(input)
			else if j > 1 and imagename == ""
				# match wrong names
				imagename = input
			else if imagename != ""
				commands.push (input)
			else
				# nothing?
			j++

		parsed_input = {
			'switches': switches.sortBy(),
			'switchArgs': switchArgs,
			'imageName': imagename,
			'commands': commands,
		}
		return parsed_input


	util_slow_lines = (term, paragraph, keyword, finishedCallback) ->

		if keyword
			lines = paragraph(keyword).split("\n")
		else
			lines = paragraph.split("\n")

		term.pause()
		i = 0
		# function calls itself after timeout is done, untill
		# all lines are finished
		foo = (lines) ->
			self.setTimeout ( ->
				if lines[i]
					term.echo (lines[i])
					i++
					foo(lines)
				else
					term.resume()
					finishedCallback(term)
			), 1000

		foo(lines)



	wait = (term, time, dots) ->
		term.echo "starting to wait"
		interval_id = self.setInterval ( -> dots ? term.insert '.'), 500

		self.setTimeout ( ->
			self.clearInterval(interval_id)
			output = term.get_command()
			term.echo output
			term.echo "done "
		), time

	###
		Bash program
	###

	bash = (term, inputs) ->
		echo = term.echo
		insert = term.insert

		if not inputs[1]
			console.log("none")

		else
			argument = inputs[1]
			if argument.beginsWith('..')
				echo "-bash: cd: #{argument}: Permission denied"
			else
				echo "-bash: cd: #{argument}: No such file or directory"

	###
		ice login program
	###
	login = (term, inputs) ->

		if term.loginSequence is 1
			term.email = inputs[0]
			term.echo ""
			term.set_prompt "Password> "
			term.loginSequence = 2

		else if term.loginSequence is 2
			util_slow_lines(term, auth, "", loginResult)
			term.loginSequence = 3

			term.set_prompt "you@tutorial:~$ "

		if not inputs[1]
			console.log("none")

		else
			argument = inputs[1]
			if argument.beginsWith('..')
				echo "-bash: cd: #{argument}: Permission denied"
			else
				echo "-bash: cd: #{argument}: No such file or directory"

	###
		ice program
	###

	ice = (term, inputs) ->

		echo = term.echo
		insert = term.insert
		callback = () -> @finishedCallback(inputs)
		command = inputs[1]

		# no command
		if not inputs[1]
			console.debug "no args"
			echo Ice_cmd
			for IceCommand, description of IceCommands
				echo "[[b;#fff;]" + IceCommand + "]" + description + ""

		# Command commit
		else if inputs[1] is "commit"
			if inputs.containsAllOfTheseParts(['docker', 'commit', '698', 'learn/ping'])
				util_slow_lines(term, commit_containerid, "", callback )
			else if inputs.containsAllOfTheseParts(['docker', 'commit', '698'])
				util_slow_lines(term, commit_containerid, "", callback )
				intermediateResults(0)
			else if inputs.containsAllOfTheseParts(['docker', 'commit']) and inputs[2]
				echo commit_id_does_not_exist(inputs[2])
			else
				echo commit

		else if inputs[1] is "do"
			term.push('do', {prompt: "do $ "})

		else if inputs[1] is "logo"
			echo ICE_logo

		
		# Command login
		else if inputs[1] is "login"
			# parse all input so we have a json object
			parsed_input = parseInput(inputs)

			switches = parsed_input.switches
			swargs = parsed_input.switchArgs
			commands = parsed_input.commands

			console.log "commands"
			console.log commands
			console.log "switches"
			console.log switches
			console.log("login")
			if inputs[2] is "-h" or inputs[2] is "--help"
				echo login_cmd
			else if inputs.containsAllOfTheseParts(['ice', 'login', 'https://api-ice.ng.bluemix.net/v2/containers'])
				term.echo "API endpoint: https://api.ng.bluemix.net\n"
				term.set_prompt "Email> "
				term.loginSequence = 1
			else if inputs.containsAllOfTheseParts(['ice', 'login'])
				intermediateResults(0)

		else if inputs[1] is "search"
			if keyword = inputs[2]
				if keyword is "ubuntu"
					echo search_ubuntu
				else if keyword is "tutorial"
					echo search_tutorial
				else
					echo search_no_results(inputs[2])
			else echo search
		else if inputs[1] is "--local"
			if inputs[2] is "pull"
				if keyword = inputs[3]
					if keyword is 'ubuntu'
						result = util_slow_lines(term, pull_ubuntu, "", callback )
					else if keyword is 'learn/tutorial'
						intermediateResults(1)
					else if keyword is 'registry-ice.ng.bluemix.net/learn/tutorial'
						result = util_slow_lines(term, pull_tutorial, "", callback )
					else
						util_slow_lines(term, pull_no_results, keyword)
				else
					echo pull
			# Command run
			else if inputs[2] is "run"
				# parse all input so we have a json object
				parsed_input = parseInput(inputs)

				switches = parsed_input.switches
				swargs = parsed_input.switchArgs
				imagename = parsed_input.imageName
				commands = parsed_input.commands

				console.log "commands"
				console.log commands
				console.log "switches"
				console.log switches

				console.log "parsed input"
				console.log parsed_input
				console.log "imagename: #{imagename}"

				if imagename is "ubuntu"
					if switches.containsAllOfTheseParts(['-i', '-t'])
						if commands.containsAllOfTheseParts(['bash'])
							term.push ( (command, term) ->
								if command
									echo """this shell is not implemented. Enter 'exit' to exit."""
								return
							), {prompt: 'root@687bbbc4231b:/# '}
						else
							echo run_image_wrong_command(commands)
					else
						echo run_flag_defined_not_defined(switches)
				else if imagename is "learn/tutorial"
					if switches.length = 0
						#missing local tag TODO
						echo run_learn_no_command
						intermediateResults(0)
					else if commands[0] is "/bin/bash"
						echo run_learn_tutorial_echo_hello_world(commands)
						intermediateResults(2)
					else if commands[0] is "echo"
						echo run_learn_tutorial_echo_hello_world(commands)
					else if commands.containsAllOfThese(['apt-get', 'install', '-y', 'iputils-ping'])
						echo run_apt_get_install_iputils_ping
					else if commands.containsAllOfThese(['apt-get', 'install', 'iputils-ping'])
						echo run_apt_get_install_iputils_ping
	#          intermediateResults(0)
					else if commands.containsAllOfThese(['apt-get', 'install', 'ping'])
						echo run_apt_get_install_iputils_ping
	#          intermediateResults(0)
					else if commands.containsAllOfThese(['apt-get', 'install'])
						i = commands.length - 1
						echo run_apt_get_install_unknown_package( commands[i] )
	#          intermediateResults(0)
					else if commands[0] is "apt-get"
						echo run_apt_get
					else if commands[0]
						echo run_image_wrong_command(commands[0])
					else
						echo run_learn_no_command

				else if imagename is "learn/ping"
					if commands.containsAllOfTheseParts(["ping", "google.com"])
						util_slow_lines(term, run_ping_www_google_com, "", callback )
					else if commands[0] is "ping" and commands[1]
						echo run_ping_not_google(commands[1])
					else if commands[0] is "ping"
						echo ping
					else if commands[0]
						echo "#{commands[0]}: command not found"
					else
						echo run_learn_no_command

				else if imagename
					echo run_notfound(inputs[2])
				else
					console.log("run")
					echo run_cmd

			else if inputs[2] is "images"
				echo images

			else if inputs[2] is "inspect"
				if inputs[3] and inputs[3].match('ef')
					echo inspect_ping_container
				else if inputs[3]
					echo inspect_no_such_container(inputs[3])
				else
					echo inspect

			# command ps
			else if inputs[2] is "ps"
				if inputs.containsAllOfThese(['-l'])
					echo ps_l
				else if inputs.containsAllOfThese(['-a'])
					echo ps_a
				else
					echo currentDockerPs
			else if inputs[2] is "push"
				if inputs[3] is "learn/ping"
					util_slow_lines(term, push_container_learn_ping, "", callback )
					intermediateResults(0)
					return
				else if inputs[3]
					echo push_wrong_name
				else
					echo push

			else
				echo Ice_cmd
				for IceCommand, description of IceCommands
					echo "[[b;#fff;]" + IceCommand + "]" + description + ""

		else if inputs[1] is "version"
#      console.log(version)
			echo ice_version()


		else if IceCommands[inputs[1]]
			echo "#{inputs[1]} is a valid argument, but not implemented"

		else
			echo Ice_cmd
			for IceCommand, description of IceCommands
				echo "[[b;#fff;]" + IceCommand + "]" + description + ""

		# return empty value because otherwise coffeescript will return last var
		return

	###
		Some default variables / commands

		All items are sorted by alphabet
	###

	Ice_cmd = \
		"""
			usage: ice [-h] [--verbose] [--cloud | --local]
						 {login,tlogin,ps,run,inspect,logs,build,start,stop,restart,pause,unpause,rm,images,rmi,search,info,ip,group,route,volume,namespace,help,version,cpi}
						 ...

			positional arguments:
				{login,tlogin,ps,run,inspect,logs,build,start,stop,restart,pause,unpause,rm,images,rmi,search,info,ip,group,route,volume,namespace,help,version,cpi}
			-h, --help     :  show this help message and exit
			-v, --verbose  :  display additional debug info
			--cloud        :  execute command against container cloud service
			-L, --local    :  execute any local docker host command.  For list of available commands run 'docker help'

			IBM Containers Extension, a self-sufficient containers infrastructure. 

			Commands:

		"""

	IceCommands =
		" ": "              For specific command help, follow the command by -h"
		" ": "              To list local docker commands, run 'ice --local -h'"
		" ": "              "
		"login": "          Login to container cloud service"
		"tlogin": "         Tenant login, not available for Bluemix Containers"
		"ps": "             List containers in container cloud"
		"run": "            Create and start container in container cloud"
		"inspect": "        Inspect container details"
		"logs": "           Get container logs"
		"build": "          Build docker image and push to cloud registry"
		"start": "          Run existing container"
		"stop": "           Stop running container"
		"restart": "        Restart running container"
		"pause": "          Pause existing container"
		"unpause": "        Unpause existing container"
		"rm": "             Remove existing container"
		"images": "         List images registered in container cloud"
		"rmi": "            Remove image from container cloud registry"
		"search": "         Search image registry"
		"info": "           Display system info"
		"ip": "             Manage floating-ips"
		"group": "          Manage auto-scaling groups"
		"route": "          Manage routing to container groups"
		"volume": "         Manage storage volumes"
		"namespace": "      Manage repository namespace"
		"help": "           Provide usage help for a specified command"
		"version": "        Display program version"
		"cpi": "            image copy (equivalent to pull, tag, and push)"

	run_switches =
		"-p": ['port']
		"-t": []
		"-i": []
		"-h": ['hostname']

	commit = \
		"""
		Usage: Docker commit [OPTIONS] CONTAINER [REPOSITORY [TAG]]

		Create a new image from a container's changes

			-author="": Author (eg. "John Hannibal Smith <hannibal@a-team.com>"
			-m="": Commit message
			-run="": Config automatically applied when the image is run. (ex: {"Cmd": ["cat", "/world"], "PortSpecs": ["22"]}')
		"""

	commit_id_does_not_exist = (keyword) ->
		"""
		2013/07/08 23:51:21 Error: No such container: #{keyword}
		"""

	commit_containerid = \
		"""
		effb66b31edb
		"""

	auth = \
		"""
		Authenticating...
		OK

		"""

	loginResult = (term) ->
		term.echo (
			"""
			
			API endpoint:   https://api.ng.bluemix.net (API version: 2.19.0)
			User:           #{term.email}
			Org:            tutorial
			Space:          tutorial
			Authentication with container cloud service at https://api-ice.ng.bluemix.net/v2/containers completed successfully
			You can issue commands now to the container service

			Proceeding to authenticate with the container cloud registry at registry-ice.ng.bluemix.net
			Login Succeeded

			"""
		)

	help = \
		"
IBM Container tutorial \n
\n
The IBM Container tutorial is an emulater intended to help novice users get up to spead with the IBM Container
Extension (ice) commands. This terminal contains a limited IBM Container CLI and a limited shell emulator.  
Therefore some of the commands that you would expect do not exist.\n
\n
Just follow the steps and questions. If you are stuck, click on the 'expected command' to see what the command
should have been. Leave feedback if you find things confusing.

		"

	images = \
		"""
		ubuntu                latest              8dbd9e392a96        4 months ago        131.5 MB (virtual 131.5 MB)
		learn/tutorial        latest              8dbd9e392a96        2 months ago        131.5 MB (virtual 131.5 MB)
		learn/ping            latest              effb66b31edb        10 minutes ago      11.57 MB (virtual 143.1 MB)
		"""

	ice_images = \
		"""
		Image Id                             Created              Image Name

		d0feae99-b91d-4ce3-bcb4-6128886f6968 Mar 23 10:44:59 2015 registry-ice.ng.bluemix.net/ibmliberty:latest
		74831680-1c9c-424e-b8ea-ceede4aa0e40 Mar 23 10:41:24 2015 registry-ice.ng.bluemix.net/ibmnode:latest
		"""

	inspect = \
		"""

		Usage: Docker inspect CONTAINER|IMAGE [CONTAINER|IMAGE...]

		Return low-level information on a container/image

		"""

	inspect_no_such_container = (keyword) ->
		"""
			Error: No such image: #{keyword}
		"""

	inspect_ping_container = \
	"""
	[2013/07/30 01:52:26 GET /v1.3/containers/efef/json
	{
		"ID": "efefdc74a1d5900d7d7a74740e5261c09f5f42b6dae58ded6a1fde1cde7f4ac5",
		"Created": "2013-07-30T00:54:12.417119736Z",
		"Path": "ping",
		"Args": [
				"www.google.com"
		],
		"Config": {
				"Hostname": "efefdc74a1d5",
				"User": "",
				"Memory": 0,
				"MemorySwap": 0,
				"CpuShares": 0,
				"AttachStdin": false,
				"AttachStdout": true,
				"AttachStderr": true,
				"PortSpecs": null,
				"Tty": false,
				"OpenStdin": false,
				"StdinOnce": false,
				"Env": null,
				"Cmd": [
						"ping",
						"www.google.com"
				],
				"Dns": null,
				"Image": "learn/ping",
				"Volumes": null,
				"VolumesFrom": "",
				"Entrypoint": null
		},
		"State": {
				"Running": true,
				"Pid": 22249,
				"ExitCode": 0,
				"StartedAt": "2013-07-30T00:54:12.424817715Z",
				"Ghost": false
		},
		"Image": "a1dbb48ce764c6651f5af98b46ed052a5f751233d731b645a6c57f91a4cb7158",
		"NetworkSettings": {
				"IPAddress": "172.16.42.6",
				"IPPrefixLen": 24,
				"Gateway": "172.16.42.1",
				"Bridge": "docker0",
				"PortMapping": {
						"Tcp": {},
						"Udp": {}
				}
		},
		"SysInitPath": "/usr/bin/docker",
		"ResolvConfPath": "/etc/resolv.conf",
		"Volumes": {},
		"VolumesRW": {}
	"""

	ping = \
		"""
		Usage: ping [-LRUbdfnqrvVaAD] [-c count] [-i interval] [-w deadline]
						[-p pattern] [-s packetsize] [-t ttl] [-I interface]
						[-M pmtudisc-hint] [-m mark] [-S sndbuf]
						[-T tstamp-options] [-Q tos] [hop1 ...] destination
		"""

	ps = \
		"""
		ID                  IMAGE               COMMAND               CREATED             STATUS              PORTS
		efefdc74a1d5        learn/ping:latest   ping www.google.com   37 seconds ago      Up 36 seconds
		"""

	ps_a = \
		"""
		ID                  IMAGE               COMMAND                CREATED             STATUS              PORTS
		6982a9948422        ubuntu:12.04        apt-get install ping   1 minute ago        Exit 0
		efefdc74a1d5        learn/ping:latest   ping www.google.com   37 seconds ago       Up 36 seconds
		"""

	ps_l = \
		"""
		ID                  IMAGE               COMMAND                CREATED             STATUS              PORTS
		6982a9948422        ubuntu:12.04        apt-get install ping   1 minute ago        Exit 0
		"""

	pull = \
		"""
		Usage: docker pull NAME

		Pull an image or a repository from the registry

		-registry="": Registry to download from. Necessary if image is pulled by ID
		-t="": Download tagged image in repository
		"""

	pull_no_results = (keyword) ->
		"""
		Pulling repository #{keyword}
		2013/06/19 19:27:03 HTTP code: 404
		"""

	pull_ubuntu =
		"""
		Target is local host. Invoking docker with the given arguments...
		Pulling repository ubuntu from https://index.docker.io/v1
		Pulling image 8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c (precise) from ubuntu
		Pulling image b750fe79269d2ec9a3c593ef05b4332b1d1a02a62b4accb2c21d589ff2f5f2dc (12.10) from ubuntu
		Pulling image 27cf784147099545 () from ubuntu
		"""

	pull_tutorial = \
		"""
		Target is local host. Invoking docker with the given arguments...
		Pulling repository learn/tutorial from https://index.docker.io/v1
		Pulling image 8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c (precise) from ubuntu
		Pulling image b750fe79269d2ec9a3c593ef05b4332b1d1a02a62b4accb2c21d589ff2f5f2dc (12.10) from ubuntu
		Pulling image 27cf784147099545 () from tutorial
		"""

	push = \
		"""

		Usage: docker push NAME

		Push an image or a repository to the registry
		"""


	push_container_learn_ping = \
		"""
		The push refers to a repository [learn/ping] (len: 1)
		Processing checksums
		Sending image list
		Pushing repository learn/ping (1 tags)
		Pushing 8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c
		Image 8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c already pushed, skipping
		Pushing tags for rev [8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c] on {https://registry-1.docker.io/v1/repositories/learn/ping/tags/latest}
		Pushing a1dbb48ce764c6651f5af98b46ed052a5f751233d731b645a6c57f91a4cb7158
		Pushing  11.5 MB/11.5 MB (100%)
		Pushing tags for rev [a1dbb48ce764c6651f5af98b46ed052a5f751233d731b645a6c57f91a4cb7158] on {https://registry-1.docker.io/v1/repositories/learn/ping/tags/latest}
		"""

	push_wrong_name = \
	"""
	The push refers to a repository [dhrp/fail] (len: 0)
	"""

	login_cmd = \
		"""
		Usage: ice login [OPTIONS] [ARG...]

		Login to the IBM Container Infrastructure

		-h, --help                        show this help message and exit
		--cf                              use Bluemix cf login, default (Bluemix params are used, api key ignored)
		-k API_KEY, --key API_KEY         secret key string (ignored when Bluemix login is used)
		-H HOST, --host HOST              container cloud service host or url
		-R REG_HOST, --registry REG_HOST  container cloud registry host
		-u USER, --user USER              Bluemix user id/email
		-p PSSWD, --psswd PSSWD           Bluemix password
		-o ORG, --org ORG                 Bluemix organization
		-s SPACE, --space SPACE           Bluemix space
		-a API_URL, --api API_URL         Bluemix API Endpoint
		"""

	run_cmd = \
		"""
		Usage: Docker run [OPTIONS] IMAGE COMMAND [ARG...]

		Run a command in a new container

		-a=map[]: Attach to stdin, stdout or stderr.
		-c=0: CPU shares (relative weight)
		-d=false: Detached mode: leave the container running in the background
		-dns=[]: Set custom dns servers
		-e=[]: Set environment variables
		-h="": Container host name
		-i=false: Keep stdin open even if not attached
		-m=0: Memory limit (in bytes)
		-p=[]: Expose a container's port to the host (use 'docker port' to see the actual mapping)
		-t=false: Allocate a pseudo-tty
		-u="": Username or UID
		-v=map[]: Attach a data volume
		-volumes-from="": Mount volumes from the specified container
		"""

	run_apt_get = \
		"""
		apt 0.8.16~exp12ubuntu10 for amd64 compiled on Apr 20 2012 10:19:39
		Usage: apt-get [options] command
					 apt-get [options] install|remove pkg1 [pkg2 ...]
					 apt-get [options] source pkg1 [pkg2 ...]

		apt-get is a simple command line interface for downloading and
		installing packages. The most frequently used commands are update
		and install.

		Commands:
			 update - Retrieve new lists of packages
			 upgrade - Perform an upgrade
			 install - Install new packages (pkg is libc6 not libc6.deb)
			 remove - Remove packages
			 autoremove - Remove automatically all unused packages
			 purge - Remove packages and config files
			 source - Download source archives
			 build-dep - Configure build-dependencies for source packages
			 dist-upgrade - Distribution upgrade, see apt-get(8)
			 dselect-upgrade - Follow dselect selections
			 clean - Erase downloaded archive files
			 autoclean - Erase old downloaded archive files
			 check - Verify that there are no broken dependencies
			 changelog - Download and display the changelog for the given package
			 download - Download the binary package into the current directory

		Options:
			-h  This help text.
			-q  Loggable output - no progress indicator
			-qq No output except for errors
			-d  Download only - do NOT install or unpack archives
			-s  No-act. Perform ordering simulation
			-y  Assume Yes to all queries and do not prompt
			-f  Attempt to correct a system with broken dependencies in place
			-m  Attempt to continue if archives are unlocatable
			-u  Show a list of upgraded packages as well
			-b  Build the source package after fetching it
			-V  Show verbose version numbers
			-c=? Read this configuration file
			-o=? Set an arbitrary configuration option, eg -o dir::cache=/tmp
		See the apt-get(8), sources.list(5) and apt.conf(5) manual
		pages for more information and options.
													 This APT has Super Cow Powers.

		"""

	run_apt_get_install_iputils_ping = \
		"""
			Target is local host. Invoking docker with the given arguments...
			Reading package lists...
			Building dependency tree...
			The following NEW packages will be installed:
				iputils-ping
			0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
			Need to get 56.1 kB of archives.
			After this operation, 143 kB of additional disk space will be used.
			Get:1 http://archive.ubuntu.com/ubuntu/ precise/main iputils-ping amd64 3:20101006-1ubuntu1 [56.1 kB]
			debconf: delaying package configuration, since apt-utils is not installed
			Fetched 56.1 kB in 1s (50.3 kB/s)
			Selecting previously unselected package iputils-ping.
			(Reading database ... 7545 files and directories currently installed.)
			Unpacking iputils-ping (from .../iputils-ping_3%3a20101006-1ubuntu1_amd64.deb) ...
			Setting up iputils-ping (3:20101006-1ubuntu1) ...
		"""

	run_apt_get_install_unknown_package = (keyword) ->
		"""
			Reading package lists...
			Building dependency tree...
			E: Unable to locate package #{keyword}
		"""

	run_flag_defined_not_defined = (keyword) ->
		"""
		2013/08/15 22:19:14 flag provided but not defined: #{keyword}
		"""

	run_learn_no_command = \
		"""
		2013/07/02 02:00:59 Error: No command specified
		"""

	run_learn_tutorial_echo_hello_world = (commands) ->
		string = "Target is local host. Invoking docker with the given arguments...\n"
		for command in commands[1..]
			command = command.replace('"','');
			string += ("#{command} ")
		return string


	run_image_wrong_command = (keyword) ->
		"""
		2013/07/08 23:13:30 Unable to locate #{keyword}
		"""

	run_notfound = (keyword) ->
		"""
		Pulling repository #{keyword} from https://index.docker.io/v1
		2013/07/02 02:14:47 Error: No such image: #{keyword}
		"""

	run_ping_not_google = (keyword) ->
		"""
		ping: unknown host #{keyword}
		"""

	run_ping_www_google_com = \
		"""
		PING www.google.com (74.125.239.129) 56(84) bytes of data.
		64 bytes from nuq05s02-in-f20.1e100.net (74.125.239.148): icmp_req=1 ttl=55 time=2.23 ms
		64 bytes from nuq05s02-in-f20.1e100.net (74.125.239.148): icmp_req=2 ttl=55 time=2.30 ms
		64 bytes from nuq05s02-in-f20.1e100.net (74.125.239.148): icmp_req=3 ttl=55 time=2.27 ms
		64 bytes from nuq05s02-in-f20.1e100.net (74.125.239.148): icmp_req=4 ttl=55 time=2.30 ms
		64 bytes from nuq05s02-in-f20.1e100.net (74.125.239.148): icmp_req=5 ttl=55 time=2.25 ms
		64 bytes from nuq05s02-in-f20.1e100.net (74.125.239.148): icmp_req=6 ttl=55 time=2.29 ms
		64 bytes from nuq05s02-in-f20.1e100.net (74.125.239.148): icmp_req=7 ttl=55 time=2.23 ms
		64 bytes from nuq05s02-in-f20.1e100.net (74.125.239.148): icmp_req=8 ttl=55 time=2.30 ms
		64 bytes from nuq05s02-in-f20.1e100.net (74.125.239.148): icmp_req=9 ttl=55 time=2.35 ms
		-> This would normally just keep going. However, this emulator does not support Ctrl-C, so we quit here.
		"""

	search = \
		"""

		Usage: Docker search NAME

		Search the Docker index for images

		"""

	search_no_results = (keyword) ->
		"""
		Found 0 results matching your query ("#{keyword}")
		NAME                DESCRIPTION
		"""

	search_tutorial = \
		"""
		Found 1 results matching your query ("tutorial")
		NAME                      DESCRIPTION
		learn/tutorial            An image for the interactive tutorial
		"""

	search_ubuntu = \
		"""
		Found 22 results matching your query ("ubuntu")
		NAME                DESCRIPTION
		shykes/ubuntu
		base                Another general use Ubuntu base image. Tag...
		ubuntu              General use Ubuntu base image. Tags availa...
		boxcar/raring       Ubuntu Raring 13.04 suitable for testing v...
		dhrp/ubuntu
		creack/ubuntu       Tags:
		12.04-ssh,
		12.10-ssh,
		12.10-ssh-l...
		crohr/ubuntu              Ubuntu base images. Only lucid (10.04) for...
		knewton/ubuntu
		pallet/ubuntu2
		erikh/ubuntu
		samalba/wget              Test container inherited from ubuntu with ...
		creack/ubuntu-12-10-ssh
		knewton/ubuntu-12.04
		tithonium/rvm-ubuntu      The base 'ubuntu' image, with rvm installe...
		dekz/build                13.04 ubuntu with build
		ooyala/test-ubuntu
		ooyala/test-my-ubuntu
		ooyala/test-ubuntu2
		ooyala/test-ubuntu3
		ooyala/test-ubuntu4
		ooyala/test-ubuntu5
		surma/go                  Simple augmentation of the standard Ubuntu...

		"""

	testing = \
	"""
	Testing leads to failure, and failure leads to understanding. ~Burt Rutan
	"""

	docker_version = () ->
		"""
		Docker Emulator version #{EMULATOR_VERSION}

		Emulating:
		Client version: 0.5.3
		Server version: 0.5.3
		Go version: go1.1
		"""

	ice_version = () ->
			"""
			ICE CLI Version        : 2.0.1 271 2015-03-30T15:40:18
			"""

	ICE_logo = \
	'''
	ttttttttttttttttt1iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiittttttttttttttttttttttttttttttttttttttttttttttttttttttt
	ttttttttttttttttt1iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiittttttttttttttttttttttttttttttttttttttttttttttttttttttt
	ttttttttttttttttt1iiiiii:  iiiiii, .iiiiii. .iiiiii  ,iiiiiiiiiittttttt. .ttttt1  ;ttttt1  ittttti  itttttttttttttttttt
	ttttttttttttttttt1iiiiii:  iiiiii, .iiiiii. .iiiiii  ,iiiiiiiiiittttttt. .ttttt1  ;ttttt1  ittttti  itttttttttttttttttt
	ttttttttttttttttt1iiiiii:  iiiiii, .iiiiii. .iiiiii  ,iiiiiiiiiittttttt. .ttttt1  ;ttttt1  ittttti  itttttttttttttttttt
	ttttttttttttttttt1iiiiii:  iiiiii, .iiiiii. .iiiiii  ,iiiiiiiiiittttttt. .ttttt1  ;ttttt1  ittttti  itttttttttttttttttt
	ttttttttttttttttt1iiiiii:  iiiiii, .iiiiii. .iiiiii  ,iiiiiiiiiittttttt. .ttttt1  ;ttttt1  ittttti  itttttttttttttttttt
	ttttttttttttttttt1iiiiii:  iiiiii, .iiiiii. .iiiiii  ,iiiiiiiiiittttttt. .ttttt1  ;ttttt1  ittttti  itttttttttttttttttt
	ttttttttttttttttt1iiiiii:  iiiiii, .iiiiii. .iiiiii  ,iiiiiiiiiittttttt. .ttttt1  ;ttttt1  ittttti  itttttttttttttttttt
	ttttttttttttttttt1iiiiii:  iiiiii, .iiiiii. .iiiiii  ,iiiiiiiiiittttttt. .ttttt1  ;ttttt1  ittttti  itttttttttttttttttt
	ttttttttttttttttt1iiiiii:  iiiiii, .iiiiii. .iiiiii  ,iiiiiiiiiittttttt. .ttttt1  ;ttttt1  ittttti  itttttttttttttttttt
	ttttttttttttttttt1iiiiii:  iiiiii, .iiiiii. .iiiiii  ,iiiiiiiiiittttttt. .ttttt1  ;ttttt1  ittttti  itttttttttttttttttt
	tttttttttttttttttiiiiiii:  iiiiii, .iiiiii. .iiiiii  ,iiiiiiiiiiftttttt. .ttttt1  ;ttttt1  ittttti  itttttttttttttttttt
																																						 ,ttt1  ;ttttt1  ittttti  itttttttttttttttttt
																																						 ,ttt1  ;ttttt1  ittttti  itttttttttttttttttt
																																						 ,ttt1  ;ttttt1  ittttti  itttttttttttttttttt
																																						 ,ttt1  ;ttttt1  ittttti  itttttttttttttttttt
									:iiiiii;.   .iiiiiiiii,,iiiiiiiiii   iii                   ,ttttttttttttttttttttttttttttttttttttttttttt
								 .CCLtttLCCf  tCCLLLLLLL fLLLCCCLLLf  LCCC1                  ,ttttttttttttttttttttttttttttttttttttttttttt
								 :CC:   .CCf .CCf           .CCt    .CC11CC                  ,ttttttttttttttttttttttttttttttttttttttttttt
								 LCCCCCCCL,  ;CCCCCCCCf     tCC    .CCi .CC                                                              
								:CCi    ;CC: CCL           .CCf   :CCLtttCC1                                                             
								tCC    ,LCC.:CC1,,,,,,.    ;CC,  1CC;;;;;CCC                 ,GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
							 .CCCCCCCCL;  fCCCCCCCCC     CCL  LCC.     1CC                 :GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
																																						 :GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
																																						 :GGGG;;fGGGGGC;;LGGGGGL;;LGGGGGGGGGGGGGGGGGG
																																						 :GGGC  1GGGGGC  fGGGGGf  LGGGGGGGGGGGGGGGGGG
																																						 :GGGC  1GGGGGC  fGGGGGf  LGGGGGGGGGGGGGGGGGG
	,,,,,,,,,,,,,,,,,,1iiiii:  1iiiii, .1iiiii. .1iiiii  ,iiiiii    ,LLLLLL. ,LLGGGC  1GGGGGC  fGGGGGf  LGGGGGGGGGGGGGGGGGG
	G:,,,,,,,,,,,,,,,:tttttt;  tttttt: .tttttt. .tttttt  :tttttttttt0GGGGGG. ,GGGGGC  1GGGGGC  fGGGGGf  LGGGGGGGGGGGGGGGGGG
	GG ,,,,,,,,,,,,,,:tttttt;  tttttt: .tttttt. .tttttt  :tttttttttt0GGGGGG. ,GGGGGC  1GGGGGC  fGGGGGf  LGGGGGGGGGGGGGGGGGG
	GGGG:,,,,,,,,,,,,:tttttt;  tttttt: .tttttt. .tttttt  :tttttttttt0GGGGGG. ,GGGGGC  1GGGGGC  fGGGGGf  LGGGGGGGGGGGGGGGGGG
	GGGGGG;;;;;;;;;;;ttttttt;  tttttt: .tttttt. .tttttt  :tttttttttt0GGGGGG. ,GGGGGC  1GGGGGC  fGGGGGf  LGGGGGGGGGGGGGGGGGG
	GGGGGGGGGGGGGGGGGftttttt;  tttttt: .tttttt. .tttttt  :tttttttttt0GGGGGG. ,GGGGGC  1GGGGGC  fGGGGGf  LGGGGGGGGGGGGGGGGGG
	GGGGGGGGGGGGGGGGGftttttt;  tttttt: .tttttt. .tttttt  :tttttttttt0GGGGGG. ,GGGGGC  1GGGGGC  fGGGGGf  LGGGGGGGGGGGGGGGGGG
	GGGGGGGGGGGGGGGGGftttttt;  tttttt: .tttttt. .tttttt  :tttttttttt0GGGGGG. ,GGGGGC  1GGGGGC  fGGGGGf  LGGGGGGGGGGGGGGGGGG
	GGGGGGGGGGGGGGGGGftttttt;  tttttt: .tttttt. .tttttt  :tttttttttt0GGGGGG. ,GGGGGC  1GGGGGC  fGGGGGf  LGGGGGGGGGGGGGGGGGG
	GGGGGiiiiiiiiiiiiftttttt;  tttttt: .tttttt. .tttttt  :tttttttttt0GGGGGG. ,GGGGGC  1GGGGGC  fGGGGGf  LGGGGGGGGGGG1iiiiii
	iiiiiiiiiiiiiiiiiftttttt;  tttttt: .tttttt. .tttttt  :tttttttttt0GGGGGG. ,GGGGGC  1GGGGGC  fGGGGGf  LGGGGGGGGGGGiiiiiii
	iiiiiiiiiiiiiiiiiftttttt;  tttttt: .tttttt. .tttttt  :tttttttttt0GGGGGG. ,GGGGGC  1GGGGGC  fGGGGGf  LGGGGGGGGGGGiiiiiii
	iiiiiiiiiiiiiiiiiftttttti::tttttt;::tttttt:::tttttt::;tttttttttt0GGGGGGii1GGGGGGiifGGGGGCiiLGGGGGLiiCGGGGGGGGGGGiiiiiii
	iiiiiiiiiiiiiiiiiftttttttttttttttttttttttttttttttttttttttttttttt0GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGiiiiiii
	iiiiiiiiiiiiiiiiiftttttttttttttttttttttttttttttttttttttttttttttt0GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGiiiiiii
	iiiiiiiiiiiiiiiii@tttttttttttttttttttttttttttttttttttttttttffffffGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG000000iiiiiii
	iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
	iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii1iiiiii
	iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
	iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
	iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
 
	'''


return this

###

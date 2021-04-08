const readline = require('readline');
const os = require('os');
const url = require('url');
const EventEmitter = require('events');
const { commands } = require('./helper');

const emitter = new EventEmitter();

const cli = {};
cli.responder = {};

emitter.on('help', function (args) {
    cli.responder.helpHandler(args);
});
emitter.on('list checks', function (args) {
    cli.responder.checkHandler(args);
});
emitter.on('man', function (args) {
    cli.responder.manualHandler(args);
});
emitter.on('exit', function (args) {
    cli.responder.exitHandler(args);
});
emitter.on('stats', function (args) {
    cli.responder.statsHandler(args);
});
emitter.on('list users', function (args) {
    cli.responder.listUsersHandler(args);
});
emitter.on('more user info', function (args) {
    cli.responder.moreUserInfoHandler(args);
});
emitter.on('url', function (args) {
    cli.responder.urlHandler(args);
});


cli.responder.helpHandler = function (args = null) {
    let flag = true;
    for (x in commands) {
        let splittedCommand = x.split(" --");
        if (splittedCommand == args) {
            console.log(commands[x]);
            flag = false;
            break;
        }
    }
    if (flag) {
        console.log("Command not found!!!");
    }
}
cli.responder.listChecksHandler = function (args = null) {
    console.log(Date.now());
}
cli.responder.manualHandler = function (args = null) {
    for (x in commands) {
        console.log(`${x} : ${commands[x]}`);
    }
}
cli.responder.exitHandler = function (args = null) {
    process.exit(0);
}
cli.responder.statsHandler = function (args = null) {
    console.log(`
    Cores : ${os.cpus().length}
    Model : ${os.cpus()[0].model}
    Operating System : ${os.type()}
    Uptime : ${os.uptime() / 60} minutes`);
}
cli.responder.listUsersHandler = function (args = null) {
    console.log(`
    "Username" : ${os.userInfo().username}
    "Uid" : ${os.userInfo().uid}`);
}
cli.responder.moreUserInfoHandler = function (args = null) {
    let info = os.userInfo()
    if (info.uid == args) {
        for (x in info) {
            console.log(`${x} : ${info[x]}`);
        };
    } else {
        console.log("No User Found");
    }
}
cli.responder.urlHandler = function (args = null) {
    let [commandName, url] = args.split(" ");
    let myUrl = new URL(url);
    switch (commandName) {
        case "host":
            console.log(myUrl.hostname);
            flag = false;
            break;
        case "port":
            console.log(myUrl.port);
            flag = false;
            break;
        case "protocol":
            console.log(myUrl.protocol);
            flag = false;
            break;
        default:
            console.log("Not an url command!!!");
    }
}

cli.processInput = function (cmd) {
    let args = cmd.split(" --");
    let flag = true;
    for (x in commands) {
        let [splittedCommand] = x.split(" --");

        if (splittedCommand == args[0]) {

            emitter.emit(args[0], args[1]);
            flag = false;
            break;
        }
    }
    if (flag) {
        console.log("Sorry Try Again");
    }
}

function init() {
    console.log("NODE_CLI is running....");

    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    interface.prompt();

    interface.on('line', (cmd) => {
        cli.processInput(cmd);
    });

    interface.on('close', () => {
        process.exit(0);
    });
}

init();
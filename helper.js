const commands = {
    'exit': 'kill the cli and the rest of application',
    'man': 'show the help page',
    'help --{command name}': 'Alias for man command',
    'stats': 'get stats of underlying os and resource utilization',
    'list users': 'shows a list of all registered (undeleted) user',
    'more user info --{userId}': 'show details of the specific user',
    'url --{host,protocol,port} {url}': 'shows host,protocol,port of url',
}

module.exports = {
    commands
}

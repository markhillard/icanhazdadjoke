// globals
const { Command, flags } = require('@oclif/command'),
  request = require('request'),
  readline = require('readline'),
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  }),
  prefix = '> '

// init joke command
class IcanhazdadjokeCommand extends Command {
  // es2017 (es8) async function
  async run() {
    // exported flags
    const { flags } = this.parse(IcanhazdadjokeCommand), // eslint-disable-line no-unused-vars

      // api options
      options = {
        url: 'https://icanhazdadjoke.com/',
        headers: {
          Accept: 'text/plain'
        }
      },

      // joke handler
      joke = (error, response, body) => {
        let message
        try {
          message = body.trim()
        } catch (error) {
          message = `error: ${error.stack}`
        }
        process.stdout.write('\n' + message + '\n\n' + prefix)
      }

    // show usage instructions
    rl.setPrompt('press enter for a joke / press q to quit: \n' + prefix)
    rl.prompt()

    // watch for readline events
    await rl.on('line', line => {
      switch (line.trim()) {
        case 'q':
          rl.close()
          break
        default:
          request(options, joke)
          break
      }
    }).on('close', () => {
      process.exit(0)
    })
  }
}

// cli description
IcanhazdadjokeCommand.description = 'Stream dad jokes from https://icanhazdadjoke.com/'

// cli flags
IcanhazdadjokeCommand.flags = {
  // add --version flag
  version: flags.version({ char: 'v' }),
  // add --help flag
  help: flags.help({ char: 'h' })
}

// expose cli command as a module
module.exports = IcanhazdadjokeCommand

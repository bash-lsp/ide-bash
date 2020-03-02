const ChildProcess = require("child_process");
const Path = require('path')
const {AutoLanguageClient} = require('atom-languageclient')

class BashLanguageClient extends AutoLanguageClient {

  getGrammarScopes () {
    return [ 'source.shell', 'bash' ]
  }

  getLanguageName () {
    return 'Shell Script'
  }

  getServerName () {
    return 'BashIDE'
  }

  async startServerProcess(projectPath) {

    // The bash-language-server uses '#!/usr/bin/env node' to find the version
    // of node to use so we'll have to wait until the shell environment has been
    // loaded
    await new Promise(resolve => atom.whenShellEnvironmentLoaded(resolve));

    if ( process.platform == 'win32') {
      const command = 'bash-language-server.cmd'
    } else {
      const command = 'bash-language-server'
    }

    const args = ["start"]

    const childProcess = ChildProcess.spawn(command, args, {
      cwd: projectPath
    });

    childProcess.on("error", err =>
      atom.notifications.addError("Unable to start the Bash language server.", {
        dismissable: true,
        buttons: [
          {
            text: "Install Instructions",
            onDidClick: () => atom.workspace.open("atom://config/packages/ide-bash")
          }
        ],
        description:
          "Please make sure you've followed the System Requirements section in the README"
      })
    );

    super.captureServerErrors(childProcess, projectPath)

    return childProcess;

  }

}

module.exports = new BashLanguageClient()

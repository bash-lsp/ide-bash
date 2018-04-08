# Bash IDE

Bash language support for Atom-IDE. It's backed by
[mads-hartmann/bash-language-server][bash-lsp].

## System Requirements

You need to install that language server separately as it depends on native node
modules.

```bash
npm i -g bash-language-server
```

## Features

- [x] Jump to declaration
- [x] Find references
- [x] Code Outline & Show Symbols
- [x] Highlight occurrences
- [x] Code completion
- [x] Simple diagnostics reporting
- [ ] Rename symbol

## Development Guide

Most of the interesting bits are happening in the server so you'll probably want
to head over to the [development guide][server-dev-guide] to see the development
flow for the server.

If not, here's how to work on the Atom client.

```bash
git clone git@github.com:mads-hartmann/ide-bash && cd ide-bash
npm install
apm link
```

If you want to inspect the communication between the Atom and the Bash language
server then open the Developer Tools in Atom and execute the following piece of
code in the Console.

```javascript
atom.config.set('core.debugLSP', true)
```

Reload the window and you should see all the messages.

[bash-lsp]: https://github.com/mads-hartmann/bash-language-server
[server-dev-guide]: https://github.com/mads-hartmann/bash-language-server/blob/master/docs/development-guide.md

'use strict';

var prompts = [{
    type: 'confirm',
    name: 'createReadme',
    message: 'Would you like to create a blank README.md?',
    default: true
},{
    name: 'clearOutDirectory',
    type: 'confirm',
    message: 'Shall I empty out all the contents of current directory first?',
    default: true,
},{
    name: 'spaName',
    message: 'What would you like to call your single page app?'
}];

module.exports = prompts;
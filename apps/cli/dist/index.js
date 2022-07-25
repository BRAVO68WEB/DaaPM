"use strict";
exports.__esModule = true;
var commander_1 = require("commander");
var fs = require("fs");
var cmdFunctions = require("./commands");
var packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
var program = new commander_1.Command();
program
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version);
program.command('login')
    .description('Login to Doppler to use it as Password Manager')
    .argument('<token>', 'Doppler Token')
    .option('-s, --separator <char>', 'separator character', ',')
    .action(function (token, options) {
    cmdFunctions.login(token);
});
program.command('setup')
    .description('Setup the Doppler to use it as Password Manager')
    .action(function () {
    cmdFunctions.setup();
});
program.command('new')
    .description('Save a new Credentials')
    .action(function () {
    cmdFunctions.save();
});
program.command('view')
    .description('Save a new Credentials')
    .argument("<site>", "Site Name")
    .action(function (site) {
    cmdFunctions.retrive(site);
});
program.command('update')
    .description('Update a Credentials')
    .argument("<site>", "Site Name")
    .action(function (site) {
    cmdFunctions.update(site);
});
program.parse();

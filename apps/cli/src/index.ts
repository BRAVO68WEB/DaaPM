import { Command } from "commander"
import * as fs from 'fs'
import * as cmdFunctions from './commands'

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const program = new Command();

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

program.command('login')
  .description('Login to Doppler to use it as Password Manager')
  .argument('<token>', 'Doppler Token')
  .action((token) => {
    cmdFunctions.login(token);
  });

program.command('setup')
  .description('Setup the Doppler to use it as Password Manager')
  .action(() => {
    cmdFunctions.setup();
  })

program.command('new')
  .description('Save a new Credentials')
  .action(() => {
    cmdFunctions.save();
  })

program.command('view')
  .description('Save a new Credentials')
  .argument("<site>", "Site Name")
  .action((site) => {
    cmdFunctions.retrive(site);
  })

program.command('update')
  .description('Update a Credentials')
  .argument("<site>", "Site Name")
  .action((site) => {
    cmdFunctions.update(site);
  })


program.parse();


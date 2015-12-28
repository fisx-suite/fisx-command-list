/**
 * @file 入口模块
 * @author sparklewhy@gmail.com
 */

var pkgManage = require('fisx-package');

exports.name = 'list <component>';
exports.desc = 'list installed component packages';
exports.options = {
    '-h, --help': 'print this help message',
    '-r, --root <path>': 'set project root',
    '-u, --update': 'fetch latest version information'
};

exports.run = function (argv, cli, env) {
    if (argv.h || argv.help) {
        return cli.help(exports.name, exports.options);
    }

    argv._.shift();
    var listComponent = argv._[0];
    var options = {
        root: env.cwd,
        name: listComponent,
        availableUpdate: argv.update || argv.u
    };
    return pkgManage.initProjectRoot(env.configNameSearch[0], options, fis)
        .then(pkgManage.loadUserConfig.bind(this, env.configNameSearch[0], options, fis))
        .then(function () {
            return pkgManage.list(options);
        });
};

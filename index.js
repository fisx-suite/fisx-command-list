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
    '-u, --update': 'fetch latest version information',
    '--depth <number>': 'list package dependency info depth, default 8',
    '--detail': 'show package listed detail info',
    '--open': 'open specify package repository url in default browser',
    '--registry <url>': 'set the npm default registry to use'
};

exports.run = function (argv, cli, env) {
    if (argv.h || argv.help) {
        return cli.help(exports.name, exports.options);
    }

    argv._.shift();
    var listComponent = argv._[0];
    var depth = argv.depth || 8;
    depth = parseInt(depth, 10);
    (depth <= 0) && (depth = 1);
    var options = {
        root: env.cwd,
        name: listComponent,
        availableUpdate: argv.update || argv.u,
        style: argv.detail ? 'list' : 'tree',
        depth: depth,
        openRepository: argv.open,
        registry: argv.registry
    };
    return pkgManage.initProjectRoot(env.configNameSearch[0], options, fis)
        .then(pkgManage.loadUserConfig.bind(this, env.configNameSearch[0], options, fis))
        .then(function () {
            return pkgManage.list(options);
        });
};

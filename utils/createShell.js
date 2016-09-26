import { execSync } from 'child_process';

const routes = [
    'messenger'
];

const process = 'BABEL_DISABLE_CACHE=1 NODE_ENV=node ./node_modules/babel-cli/bin/babel-node.js';

const createShell = () => {
    routes.forEach((route) => {
        console.info(execSync(`${process} ./utils/shellProcess.js ${route}`).toString());
    });
};

export default createShell;

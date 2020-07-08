(function() {
    const CONTRACT_NAME = 'buildlinks_pool.stakingpool';
    //const CONTRACT_NAME = 'buildlinks2';
    const DEFAULT_ENV = 'testnet';
    //15
    const GAS = Math.pow(10,13).toString();

    function getConfig(env) {
        switch (env) {

            case 'production':
            case 'development':
                return {
                    networkId: 'betanet',                                             // this can be any label to namespace user accounts
                    nodeUrl: "https://rpc.betanet.near.org",                          // this endpoint must point to the network you want to reach
                    walletUrl: "https://wallet.betanet.near.org",                      // this endpoint must exist for the wallet to work
                    contractName: CONTRACT_NAME,
                    deps: {
                        keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore() // keys are stored as plaintext in LocalStorage
                    }
                };
            case 'testnet':
                return {
                    networkId: 'testnet',                                             // this can be any label to namespace user accounts
                    nodeUrl: "https://rpc.testnet.near.org",                          // this endpoint must point to the network you want to reach
                    walletUrl: "https://wallet.testnet.near.org",                      // this endpoint must exist for the wallet to work
                    contractName: CONTRACT_NAME,
                    deps: {
                        keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore() // keys are stored as plaintext in LocalStorage
                    }
                };
            case 'local':
                return {
                    networkId: 'local',
                    nodeUrl: 'http://localhost:3030',
                    keyPath: `${process.env.HOME}/.near/validator_key.json`,
                    walletUrl: 'http://localhost:4000/wallet',
                    contractName: CONTRACT_NAME,
                };
            default:
                throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
        }
    }

    window.nearConfig =  getConfig(DEFAULT_ENV);
    window.gas = GAS;
})();

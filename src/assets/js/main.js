
// open a connection to the NEAR platform
(async function() {
    window.near = await nearApi.connect(nearConfig);                      // connect to the NEAR platform
    window.wallet = new nearApi.WalletConnection(window.near);            // instantiate a new wallet


    window.walletAccount = new nearApi.WalletAccount(window.near);
    // ---------------------------------------------------------------------------
    // here you have access to `near-api-js` and a valid connection object `near`
    //
    // we've added them to the window object to make working in the console convenient
    // ---------------------------------------------------------------------------

    // Initializing our contract APIs by contract name and configuration.
    // window.contract = await near.loadContract
    window.contract = await new nearApi.Contract(
        wallet.account(),
        nearConfig.contractName,

        // window.nearConfig.contractName,
        {
        // eslint-disable-line require-atomic-updates
        // NOTE: This configuration only needed while NEAR is still in development
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: [
            "get_account_unstaked_balance",
            "get_account_staked_balance",
            "get_account_total_balance",
            "is_account_unstaked_balance_available",

            "get_total_staked_balance",
            "get_owner_id",
            "get_reward_fee_fraction",
            "get_staking_key",
            // "is_staking_paused",
        ],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: [
            "deposit",
            "withdraw",
            "stake",
            "unstake"
        ],
        // Sender is the account ID to initialize transactions.
        // sender: window.accountId
        sender: wallet.getAccountId()
    });

})(window);

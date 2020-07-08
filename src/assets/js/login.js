
async function doWork() {
    // Based on whether you've authorized, checking which flow we should go.
    let successUrl=window.location.href.replace('login.html','index.html');
    if (!window.walletAccount.isSignedIn()) {
        window.walletAccount.requestSignIn(
            // The contract name that would be authorized to be called by the user's account.
            // window.nearConfig.contractName,
            window.nearConfig.contractName,
            // This is the app name. It can be anything.
            "Welcome to NEAR",
            successUrl,
        );
    } else {
        location.href = "index.html";
    }
}
$("#login").click(() => {
    doWork()
});

window.onload=function(){
    if (window.walletAccount.isSignedIn()) {
        location.href = "index.html";
    }
};

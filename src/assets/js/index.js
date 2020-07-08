
const user=wallet.getAccountId();
const userName=wallet.getAccountId();
// const userName=wallet.getAccountId().split('.')[0];
const radix=Math.pow(10,24);

let layerEvent=function(data){
    layer.open({
        content: data
        ,skin: 'msg'
        ,time: 2 //2秒后自动关闭
        ,end: function(){
            console.log('456')
            layer.closeAll()
        }
    });
};
let layerBtnEvent=function(data){
    layer.open({
        content: 'Error:Timed out or '+data||'other'
        ,btn: '确定'
        ,end: function(){
            layer.closeAll()
        }
    });
};
let formattedNumber=function(num) {
    var num = (num || 0).toString();
    var len= parseInt(num.length)-2
    var result = '';
    while (num.length > 4) {
        result = ' , ' + num.slice(-2) + result;
        num = num.slice(0, num.length - 2);
    }
    if (num) { result = num + result; }
    return result;
};
let formattedEvent=function(nums) {
    var num1 = (nums.split('.')[0] || 0).toString();
    var num2 = (nums.split('.')[1] || '00').toString();
    var len1= parseInt(num1.length)-2;
    var result1 = '';
    while (num1.length > 4) {
        result1 = ' , ' + num1.slice(-3) + result1;
        num1 = num1.slice(0, num1.length - 3);
    }
    if (num1) { result1 = num1 + result1; }
    return result1+'.'+num2;
};

let getAccountUnstakedBalance=new Promise(function(resolve, reject){
    window.contract.get_account_unstaked_balance({"account_id": user}).then(res => {
        if (res.length != 0) {
            resolve(res)
        } else {
            console.log('error');
            layerEvent('get_account_unstaked_balance is error');
        }
    });
});

let isAccountUnstakedBalanceAvaialable=new Promise(function(resolve, reject){
    window.contract.is_account_unstaked_balance_available({"account_id": user}).then(res => {
        if (res.length != 0) {
            resolve(res)
        } else {
            console.log('error');
            layerEvent('is_account_unstaked_balance_available is error');
        }
    });
});

let getAccountStakedBalance=new Promise(function(resolve, reject){
    window.contract.get_account_staked_balance({"account_id": user}).then(res => {
        if (res.length != 0) {
            resolve(res)
        } else {
            console.log('error');
            layerEvent('get_account_staked_balance is error');
        }
    });
});
let getAccountTotalBalance=new Promise(function(resolve, reject){
    window.contract.get_account_total_balance({"account_id": user}).then(res => {
        if (res.length != 0) {
            resolve(res)
        } else {
            console.log('error');
            layerEvent('get_account_total_balance is error');
        }
    });
});

let getTotalStakedBalance=new Promise(function(resolve, reject){
    window.contract.get_total_staked_balance({"account_id": user}).then(res => {
        if (res.length != 0) {
            resolve(res)
        } else {
            console.log('error');
            layerEvent('get_total_staked_balance is error');
        }
    });
});

// TODO: this interface is not available yet on testnet contract
// let isStakingPaused=new Promise(function(resolve, reject){
//     window.contract.is_staking_paused({}).then(res => {
//         if (res.length != 0) {
//             resolve(res)
//         } else {
//             console.log('error');
//             layerEvent('is_staking_paused is error');
//         }
//     });
// });

let getCurNetworkStatus=new Promise(function(resolve, reject){
    window.near.connection.provider.status().then(res => {
        if (res.length != 0) {
            // console.log(res.sync_info);
            resolve(res)
        } else {
            console.log('error');
            layerEvent('curNetworkStatus is error');
        }
    });
});

let getRewardFeeFraction=new Promise(function(resolve, reject){
    window.contract.get_reward_fee_fraction({}).then(res => {
        if (res.length != 0) {
            resolve(res)
        } else {
            console.log('error');
            layerEvent('get_reward_fee_fraction is error');
        }
    });
});

let depositEvent=function(){
    let accountType=$(".accountType").attr('data-type');
    let layerValTest=$(".layerValTest").val();
    let at='000000000000000000000000';

    layer.open({type: 2});
    // setTimeout(function(){
    //     layer.closeAll()
    // },10000);

    switch (accountType) {
        case 'Deposit':
            window.contract.deposit({}, gas, layerValTest+at).then(res => {
                // console.log(res);
                if (res.length != 0) {
                    layer.closeAll();
                    layerEvent('get_epoch_height is error');
                } else {
                    layerEvent('success');
                    setTimeout(function(){
                        location.reload();
                    },1500)
                }
            });
            break;
        case 'Withdraw':
            window.contract.withdraw({"amount":layerValTest+at},gas).then(res => {
                // console.log(res)
                if (res.length != 0) {
                    layer.closeAll();
                    layerEvent('withdraw is error');
                } else {
                    layerEvent('success');
                    setTimeout(function(){
                        location.reload();
                    },1500)
                }
            });
            break;
        case 'Stake':
            window.contract.stake({"amount":layerValTest+at},gas).then(res => {
                console.log(res)
                if (res.length != 0) {
                    layerEvent('stake is error');
                } else {
                    layerEvent('success');
                    setTimeout(function(){
                        location.reload();
                    },1500)
                }
                // layer.closeAll()
            });
            break;
        case 'Unstake':
            window.contract.unstake({"amount":layerValTest+at},gas).then(res => {
                // console.log(res)
                if (res.length != 0) {
                    layerEvent('unstake is error');
                } else {
                    layerEvent('success');
                    setTimeout(function(){
                        location.reload();
                    },1500)
                }
                // layer.closeAll()
            });
            break;
        default:
            layerEvent('error');

    }

};
$(function(){
    // near detail
    // console.log(wallet)
    // wallet.account().state().then(data => {
    //     console.log(data)
    //     // console.log(data.amount/Math.pow(10,24))
    // });

    if (!window.walletAccount.isSignedIn()) {
        location.href = "login.html";
    }

    //login out
    $(".loginOut").click(function(){
        layer.open({
            content: 'sign out?'
            ,btn:['YES','NO']
            ,yes: function(){
                window.walletAccount.signOut();
                layer.closeAll();
                location.href='login.html'
            }
        });
    });

    //name
    $(".boxTopIcon").text(userName);

    //用户账户可用量
    let available=getAccountUnstakedBalance.then(res=>{
        // console.log(res);
        $(".Available").text(formattedEvent((parseInt(res)/radix).toFixed(2)));
        return res
    });

    // 用户账户可用是否可提取 CanWithdraw
    let canWithdraw=isAccountUnstakedBalanceAvaialable.then(res=>{
        // console.log(res);
        $(".CanWithdraw").text(res?"Yes":"No");
        return res
    });

    //用户账户抵押量
    let stakedBalance=getAccountStakedBalance.then(res=>{
        // console.log(res);
        $(".StakingBalance").text(formattedEvent((parseInt(res)/radix).toFixed(2)));
        return res
    });

    //用户账户总权益
    let totalBalance=getAccountTotalBalance.then(res=>{
        console.log(res);
        $(".TotalBalance").text(formattedEvent((parseInt(res)/radix).toFixed(2)));
        return res
    });

    //圆环比例
    let scale=Promise.all([stakedBalance,totalBalance]).then(([stakedBalance,totalBalance])=>{
        // console.log(stakedBalance);
        // console.log(totalBalance)
        let tas=stakedBalance/totalBalance;
        // echartEvent([stakedBalance,totalBalance])
        console.log(tas)
        echartMineEvent(tas*100);
        return tas;
    });

    //池区
    // 显示权益池名称
    $(".PoolID").text(window.nearConfig.contractName);
    
    // ownerid
    window.contract.get_owner_id({}).then(res => {
        if (res.length != 0) {
            $(".Owner").text(res);
        } else {
            console.log('error');
            layerEvent('get_owner_id is error');
        }
    });

    // curHeight
    let curStatus=getCurNetworkStatus.then(res=>{
        // console.log(res);
        $(".curHeight").text(parseInt(res.sync_info.latest_block_height));
        $(".curDate").text(res.sync_info.latest_block_time.substr(0,19));
        return res
    });

    //总抵押量
    let totalStaking=getTotalStakedBalance.then(res=>{
        // console.log(res);
        $(".TotalStaking").text(formattedEvent((parseInt(res)/radix).toFixed(2)));
        return res
    });

    //当前池状态
    $(".PoolStatus").text("Active");
    // let poolStatus=isStakingPaused.then(res=>{
    //     // console.log(res);
    //     $(".PoolStatus").text(res?"Paused":"Active");
    //     return res
    // });

    //抽成比例
    let rewardFeeRate=getRewardFeeFraction.then(res=>{
        $(".RewardFeeRate").text((res.numerator/res.denominator)*100+'%');
        return res
    });


    //充值转账
    $(".buttonListIcon").each(function(){
        $(this).click(async function(){
            let type=$(this).attr('data-type');
            let user=$(".boxTopIcon").text();
            let Available=$(".Available").text();
            let StakingBalance=$(".StakingBalance").text();
            let userAccount='0';
            let layerName=userName||'/';

            await wallet.account().state().then(data => {
                // console.log(data)
                userAccount=formattedEvent((parseInt(data.amount)/radix).toFixed(2))
            }).catch(err=>{
                layerBtnEvent(err)
            });

            $(".layerValTest").val('');
            $(".niconTogB").show();
            $(".niconTogA").show();


            switch(type) {
                case 'Deposit':
                    $(".neTag1").attr('src','assets/images/ne03.png');
                    $(".neTag2").attr('src','assets/images/ne01.png');
                    // $(".isShow").hide();

                    $(".fromName").text(layerName);
                    $(".toName").text('Available');
                    $(".layerWriteName").text('Deposit amount');

                    $(".fromBalanceQuantity").text(userAccount);
                    $(".toBalanceQuantity").text(Available);
                    break;
                case 'Withdraw':
                    $(".neTag1").attr('src','assets/images/ne01.png');
                    $(".neTag2").attr('src','assets/images/ne03.png');
                    // $(".isShow").hide();

                    $(".fromName").text('Available');
                    $(".toName").text(layerName);
                    $(".layerWriteName").text('Withdraw amount');

                    $(".fromBalanceQuantity").text(Available);
                    $(".toBalanceQuantity").text(userAccount);
                    break;
                case 'Stake':
                    $(".neTag1").attr('src','assets/images/ne01.png');
                    $(".neTag2").attr('src','assets/images/ne04.png');
                    // $(".isShow").show();

                    $(".fromName").text('Available');
                    $(".toName").text('Staked');
                    $(".layerWriteName").text('Stake amount');

                    $(".fromBalanceQuantity").text(Available);
                    $(".toBalanceQuantity").text(StakingBalance);

                    $(".niconTogB").hide();
                    $(".niconTogA").show();
                    break;
                case 'Unstake':
                    $(".neTag1").attr('src','assets/images/ne04.png');
                    $(".neTag2").attr('src','assets/images/ne01.png');
                    // $(".isShow").show();

                    $(".fromName").text('Staked');
                    $(".toName").text('Available');
                    $(".layerWriteName").text('Unstake amount');

                    $(".fromBalanceQuantity").text(StakingBalance);
                    $(".toBalanceQuantity").text(Available);

                    $(".niconTogA").hide();
                    $(".niconTogB").show();
                    break;
                default:
                    layerEvent('error');
            }
            $(".layerWrap").show();


            $(".accountType").css('backgroundImage',"url('assets/images/"+type+".png')").attr('data-type',type);
            $(".boxTopIconB").text(user);


        })
    });
    $(".layerWrap").click(function(){
        $(".layerWrap").hide();
    });
    $(".layerBox").click(function(e){
        e.stopPropagation()
    });
    $(".layerTop button").click(function(){
        $(".layerWrap").hide();
    });
    $(".uploadBtn").unbind('click').click(function(){
        let layerValTest=$(".layerValTest").val();
        if(layerValTest==''){
            layerEvent('请填写数值');
            return false
        }else {
            depositEvent();
        }
    });
    $(".layerValTest").bind({
        keyup:function(){
            let initVal=parseInt($(this).val());
            let nearVal=parseInt($(".AvailableB").text());
            // console.log(initVal,nearVal);
            // if(initVal>nearVal){
            //     $(this).val('');
            //     layerEvent('数值不能大于余额');
            // }
        },
        onpause:function(){
            let initVal=parseInt($(this).val());
            let nearVal=parseInt($(".AvailableB").text());
            // console.log(initVal,nearVal);
            // if(initVal>nearVal){
            //     $(this).val('');
            //     layerEvent('数值不能大于余额');
            // }
        }
    })
});

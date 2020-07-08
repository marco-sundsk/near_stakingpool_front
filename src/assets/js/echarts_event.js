
let echartMineEvent=function(num){
    let canvasBoxWidth=$(".canvasWrap").outerWidth();
    let canvasBoxHeight=$(".canvasWrap").outerHeight();
    // console.log(canvasBoxWidth,canvasBoxHeight);

    $("#canvas").attr({"width":canvasBoxWidth*2,"height":canvasBoxHeight*2});
    $("#canvas").css({"width":canvasBoxWidth,"height":canvasBoxHeight});

    var canvas = document.getElementById('canvas'), //获取canvas元素
        context = canvas.getContext('2d'), //获取画图环境，指明为2d
        centerX = canvas.width /2, //Canvas中心点x轴坐标
        centerY = canvas.height /2, //Canvas中心点y轴坐标
        radiusLen=((canvas.width)-(canvas.width/5))/2,
        borderLen=centerX*0.2,
        rad = Math.PI * 2 / 150, //将360度分成100份，那么每一份就是rad度
        speed = num, //加载的快慢就靠它了
        animateSpeedNum=0;

    let colorBig="#0fb2f2";
    let colorSig="#f6c94a";
    let colorTxt="#fff";
    let textSize=28;

    //绘制蓝色外圈
    function blueCircle(n) {
        context.save();
        context.beginPath();
        context.strokeStyle = colorSig;
        context.lineWidth = borderLen;
        context.arc(centerX, centerY, radiusLen, -Math.PI / 2, -Math.PI / 2 + n * rad, false);
        context.stroke();
        context.restore();
    }

    //绘制白色外圈
    function whiteCircle() {
        context.save();
        context.beginPath();
        context.strokeStyle = colorBig;
        context.lineWidth = borderLen;
        context.arc(centerX, centerY, radiusLen, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
        context.restore();
    }

    //百分比文字绘制
    function text(n) {
        context.save();
        context.fillStyle = colorTxt;
        context.font = textSize+"px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(n.toFixed(2) + "%", centerX, centerY);
        context.restore();
    }
    let drawFrame = setInterval(function(){
        context.clearRect(0, 0, canvas.width, canvas.height);

        whiteCircle();
        text(num);
        blueCircle(animateSpeedNum);

        if (animateSpeedNum > 150-(speed*1.5)) clearInterval(drawFrame);
        animateSpeedNum += 0.5;
    })
};
// echartMineEvent(56);

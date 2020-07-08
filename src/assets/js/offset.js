//字体适配
function offset(){
    var width=window.innerWidth;
    var html = document.querySelector('html');
    var rem = width / 7.5;
    if(width>540){
        rem = 71
        // rem = width / 10.5;
        // if(width>750){
        //     rem = width / 12.5;
        // }
        // if(width>820){
        //     rem = width / 14.8;
        // }
        // if(width>900){
        //     rem = width / 16.8;
        // }
        // if(width>1020){
        //     rem = width / 18.8;
        // }
        // if(width>1160){
        //     rem = width / 20.8;
        // }
        // if(width>1320){
        //     rem = width / 22.8;
        // }
        // if(width>1400){
        //     rem = width / 23.8;
        // }
        // if(width>1580){
        //     rem = width / 24.8;
        // }
        // if(width>1700){
        //     rem = width / 25.8;
        // }
        // if(width>1880){
        //     rem = width / 27.8;
        // }
        // if(width>2060){
        //     rem = width / 28.8;
        // }
        // if(width>2140){
        //     rem = width / 29.8;
        // }
        // html.style.fontSize = rem + "px";
    }
    html.style.fontSize = rem + "px";

}
offset();
window.onresize=function(){
    offset();
};
window.onload=function(){
    offset();
};

$(document).ready(() => {
  $(".back").click(() => {
    if (history.length == 0) {
      location.href = "/";
    } else {
      history.back();
    }
  });

  let cardcode = GetUrlString("cardcode");
  let id = GetUrlString("id");
  let url =
    window.location.protocol + "//" + location.host + "?cardcode=" + cardcode;
  console.log(url)
  $("#name").html(id);
  var qrcode = new QRCode("qrcode", {
    text: url,
    width: 168,
    height: 168,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
});

function GetUrlString(param) {
  var sValue = location.search.match(
    new RegExp("[?&]" + param + "=([^&]*)(&?)", "i")
  );
  return sValue ? decodeURI(sValue[1]) : decodeURI(sValue);
}

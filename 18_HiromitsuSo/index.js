
src = 'https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=ApbwDDtnMyCzkGt4rePxhvZnqs90aue39NqL7hr1U-Tm799BjeudCoRG3AySl5Yb';

//Initialization processing

// <!-- /jQuery&GoogleMapsAPI -->

function GetMap() {
    navigator.geolocation.getCurrentPosition(mapsInit, mapsError, set);
}


//1．位置情報の取得に成功した時の処理
function mapsInit(position) {
    
    let ido = position.coords.latitude;
    let keido = position.coords.longitude;
    let center = new Microsoft.Maps.Location(ido, keido);

    let map = new Microsoft.Maps.Map('#myMap', {
        center: new Microsoft.Maps.Location(ido, keido), //Location center position
        mapTypeId: Microsoft.Maps.MapTypeId.load, //Type: [load, aerial,canvasDark,canvasLight,birdseye,grayscale,streetside]
        zoom: 10  //Zoom:1=zoomOut, 20=zoomUp[ 1~20 ]
    });

    let pin = new Microsoft.Maps.Pushpin(center, {
        color: 'black',            //Color
        draggable: true,          //MouseDraggable
        enableClickedStyle: true, //Click
        enableHoverStyle: true,   //MouseOver
        visible: true             //show/hide
    });

    //Add the pushpin to the map
    map.entities.push(pin);

    let title = $("#title").val();
    let content = $("#content").val();
    let infobox = new Microsoft.Maps.Infobox(center, {
        title: title,
        description: content
    });
    infobox.setMap(map);

};

//2． 位置情報の取得に失敗した場合の処理
function mapsError(error) {
    let e = "";
    if (error.code == 1) { //1＝位置情報取得が許可されてない（ブラウザの設定）
        e = "位置情報が許可されてません";
    }
    if (error.code == 2) { //2＝現在地を特定できない
        e = "現在位置を特定できません";
    }
    if (error.code == 3) { //3＝位置情報を取得する前にタイムアウトになった場合
        e = "位置情報を取得する前にタイムアウトになりました";
    }
    alert("エラー：" + e);
};

//3.位置情報取得オプション
const set = {
    enableHighAccuracy: true, //より高精度な位置を求める
    maximumAge: 20000,        //最後の現在地情報取得が20秒以内であればその情報を再利用する設定
    timeout: 10000            //10秒以内に現在地情報を取得できなければ、処理を終了
};

//Main:位置情報を取得する処理 //getCurrentPosition :or: watchPosition


setMap = () => {
    navigator.geolocation.getCurrentPosition(mapsInit, mapsError, set);
}

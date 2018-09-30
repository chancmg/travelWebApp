$(function() {
      // Google Maps
    //   $('#map-canvas').addClass('loading');
    //   var latlng = new google.maps.LatLng(13.096360, 80.282363); // Set your Lat. Log. New York
    //   var settings = {
    //       zoom: 12,
    //       center: latlng,
    //       mapTypeId: google.maps.MapTypeId.ROADMAP,
    //       mapTypeControl: false,
    //       scrollwheel: false,
    //       draggable: true,
    //       styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}],
    //       mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    //       navigationControl: false,
    //       navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
    //   };
    //   var map = new google.maps.Map(document.getElementById("map-canvas"), settings);
    //
    //   var contentString =
    //       '<div id="info-window">'+
    //       '<p>18 McLuice Road, Vellyon Hills,<br /> New York, NY 10010<br /><a href="https://plus.google.com/102896039836143247306/about?gl=za&hl=en" target="_blank">Get directions</a></p>'+
    //       '</div>';
    //   var infowindow = new google.maps.InfoWindow({
    //       content: contentString
    //   });
    //
    // var atvData = [{
    // 	"x": "12.989723",
    // 	"y": "80.212772"
    // }, {
    // 	"x": "12.970082",
    // 	"y": "80.141863"
    // },{
    // 	"x": "13.057883",
    // 	"y": "80.257614"
    // }, {
    // 	"x": "13.195391",
    // 	"y": "80.185372",
    // }, {
    // 	"x": "13.197769",
    // 	"y": "80.320357"
    // },{
    // 	"x": "13.063347",
    // 	"y": "80.207062"
    // }, {
    // 	"x": "12.967740",
    // 	"y": "80.235803"
    // }, {
    // 	"x": "13.063955",
    // 	"y": "80.281111"
    // }];
    //
    //
    // var data = [{
    // 	"x": "12.989723",
    // 	"y": "80.212772"
    // }, {
    // 	"x": "12.962872",
    // 	"y": "80.146400",
    //   "intransist" : true
    // },{
    // 	"x": "13.057883",
    // 	"y": "80.257614"
    // }, {
    // 	"x": "13.147806",
    // 	"y": "80.230606",
    //   "intransist" : true
    // }, {
    // 	"x": "13.191097",
    // 	"y": "80.310334",
    //   "intransist" : true
    // },{
    // 	"x": "13.062881",
    // 	"y": "80.236224",
    //   "unauthorized": true
    // }, {
    // 	"x": "12.967740",
    // 	"y": "80.235803"
    // }, {
    // 	"x": "13.063955",
    // 	"y": "80.281111"
    // }];
    //
    //
    // for(var i =0 ; i< atvData.length; i++) {
    //   var image = 'http://chart.apis.google.com/chart?chst=d_map_xpin_icon&chld=pin|camping|00ffff';
    //
    //
    //   var companyImage = new google.maps.MarkerImage(image,
    //       new google.maps.Size(36,62),// Width and height of the marker
    //       new google.maps.Point(0,0),
    //       new google.maps.Point(18,52)// Position of the marker
    //   );
    //
    //   var companyPos = new google.maps.LatLng(atvData[i].x, atvData[i].y);
    //
    //   atvData[i].marker = new google.maps.Marker({
    //       position: companyPos,
    //       map: map,
    //       icon: companyImage,
    //       title:"Shapeshift Interactive",
    //       zIndex: 2});
    //
    //   google.maps.event.addListener(atvData[i].marker, 'click', function() {
    //       infowindow.open(map, atvData[i].marker);
    //       pageView('/#address');
    //   });
    // }
    //
    // for(var i =0 ; i< data.length; i++) {
    //   var image = 'http://chart.apis.google.com/chart?chst=d_map_xpin_letter&chld=pin|V|ADDE63|000000';
    //   if(data[i].intransist) {
    //     image = 'http://chart.apis.google.com/chart?chst=d_map_xpin_letter&chld=pin|V|FFFF00|000000';
    //   }
    //   if(data[i].unauthorized) {
    //     image = 'http://chart.apis.google.com/chart?chst=d_map_xpin_letter&chld=pin|V|FF0000|000000';
    //   }
    //
    //   var companyImage = new google.maps.MarkerImage(image,
    //       new google.maps.Size(36,62),// Width and height of the marker
    //       new google.maps.Point(0,0),
    //       new google.maps.Point(18,52)// Position of the marker
    //   );
    //
    //   var companyPos = new google.maps.LatLng(data[i].x, data[i].y);
    //
    //   data[i].marker = new google.maps.Marker({
    //       position: companyPos,
    //       map: map,
    //       icon: companyImage,
    //       title:"Shapeshift Interactive",
    //       zIndex: 3});
    //
    //   google.maps.event.addListener(data[i].marker, 'click', function() {
    //       infowindow.open(map, data[i].marker);
    //       pageView('/#address');
    //   });
    // }



    //
    //
    window.redraw = function redraw() {
      // var center = map.getCenter();
      // google.maps.event.trigger(map, "resize");
      // map.setCenter(center);

      var center = map2.getCenter();
      google.maps.event.trigger(map2, "resize");
      map2.setCenter(center);
      // $('#map-canvas').removeClass('loading');
      $('#map-canvas2').removeClass('loading');
    }
    $('#map-canvas2').addClass('loading');
    var latlng = new google.maps.LatLng(13.062881, 80.236224); // Set your Lat. Log. New York
    var settings2 = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        scrollwheel: false,
        draggable: true,
        styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}],
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        navigationControl: false,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
    };
    window.map2 = new google.maps.Map(document.getElementById("map-canvas2"), settings2);

    google.maps.event.addDomListener(window, "resize", redraw);

    var image = 'http://chart.apis.google.com/chart?chst=d_map_xpin_letter&chld=pin|V|FF0000|000000';


    var companyImage = new google.maps.MarkerImage(image,
        new google.maps.Size(36,62),// Width and height of the marker
        new google.maps.Point(0,0),
        new google.maps.Point(18,52)// Position of the marker
    );

    var companyPos = new google.maps.LatLng(13.062881, 80.236224);

    var marker = new google.maps.Marker({
        position: companyPos,
        map: map2,
        icon: companyImage,
        title:"Shapeshift Interactive",
        zIndex: 2});

    var image2 = 'http://chart.apis.google.com/chart?chst=d_map_xpin_icon&chld=pin|camping|00ffff';


    var companyImage2 = new google.maps.MarkerImage(image2,
        new google.maps.Size(36,62),// Width and height of the marker
        new google.maps.Point(0,0),
        new google.maps.Point(18,52)// Position of the marker
    );

    var marker2Pos = new google.maps.LatLng(13.063347, 80.207062);

    var marker2 = new google.maps.Marker({
        position: marker2Pos,
        map: map2,
        icon: companyImage2,
        title:"Shapeshift Interactive",
        zIndex: 2
      });
    });

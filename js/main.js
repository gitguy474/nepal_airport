var mymap = L.map('map', {
  center: [28.3949, 84.1240],
  zoom: 7,
  maxZoom: 100,
  minZoom: 3,
  detectRetina: true,
  fullscreenControl: true,
});

var baseMap = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';

L.tileLayer(baseMap).addTo(mymap);

var airports = null;

var colors = chroma.scale('RdYlGn').mode('lch').colors(2);

for (i = 0; i < 2; i++) {
  $('head').append(
    $(
      '<style> .marker-color-' +
        (i + 1).toString() +
        ' { color: ' +
        colors[i] +
        '; font-size: 14px; text-shadow: 0 0 3px #ffffff;} </style>'
    )
  );
}

function getPopupData(airport) {
  return `<div> Airport: ${airport.properties.nam || 'Unknown'} </div>`;
}

airports = L.geoJson.ajax('assets/airports.geojson', {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(getPopupData(feature));
  },
  pointToLayer: function (feature, latlng) {
    var id = feature.properties.use == 4 ? 0 : 1;
    return L.marker(latlng, {
      icon: L.divIcon({
        className: 'fa fa-plane marker-color-' + (id + 1).toString() + ' rotate-45',
      }),
      rotationAngle: 45,
    });
  },
}).addTo(mymap);

colors = chroma.scale('Blues').colors(5);



function style(feature) {
  return {
    fillColor: setColor(feature.properties.count),
    fillOpacity: 0.5,
    weight: 1,
    opacity: 1,
    color: 'gray',
    dashArray: '3',
  };
}



L.control.scale({ position: 'bottomleft' }).addTo(mymap);

// Add a mini map
var mini = new L.TileLayer(baseMap, {
  minZoom: 5,
  maxZoom: 18,
});

mymap.addLayer(mini);
mymap.setView(new L.LatLng(28.3949, 84.1240), 7);


var mini = new L.TileLayer(baseMap, {
  minZoom: 0,
  maxZoom: 10,
});
var miniMap = new L.Control.MiniMap(mini, { toggleDisplay: true }).addTo(mymap);

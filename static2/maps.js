//Déclaration des variables
let map;
let overlayPompeion;
let overlayEridanos;

  //Initialisation de la carte
 function initMap() {
  const kerameikos = {lat:  37.977950, lng: 23.718200 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: kerameikos,
    zoom: 19,
    mapTypeId : "satellite",

  });

  //Création des différents overlays
  var imgPompeion = new Image();
  imgPompeion.src = 'images/pompeion.jpg';

  var imgEridanos = new Image();
  imgEridanos.src = 'images/eridanos.jpg';

  var imgPompeionBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(37.977910, 23.718200),
    new google.maps.LatLng(37.978780, 23.719010));

   overlayPompeion = new google.maps.GroundOverlay(
     imgPompeion.src,
     imgPompeionBounds
   );
   //Affiche l'overlay sur la carte
   overlayPompeion.setMap(map);

   var imgEridanosBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng(37.97862453543905, 23.716649743986387),
     new google.maps.LatLng(37.978755, 23.716789));

   overlayEridanos = new google.maps.GroundOverlay(
     imgEridanos.src,
     imgEridanosBounds
   );
   overlayEridanos.setMap(map);

   // Crée la fenêtre initiale
   let infoWindow = new google.maps.InfoWindow({
     content: "Click the map to get Lat/Lng!",
     position: kerameikos,
   });
   infoWindow.open(map);

   overlayPompeion.addListener("click", (mapsMouseEvent) => {
   // Ferme la fenêtre actuelle
   infoWindow.close();
   // Crée une nouvelle fenêtre
   infoWindow = new google.maps.InfoWindow({
     position: mapsMouseEvent.latLng,
   });
   infoWindow.setContent(
         JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
       );
       infoWindow.open(map);
     });

//fetchGoogleData();
fetchProxyData();
}

//Fonction d'appel du serveur de geocodage
function fetchProxyData(){
  let x;
  let i = 30 ;
  //La boucle parcourt la totalité du nombre de tombes renseignées par i
  for(j = 1;j < i; j++ ){
    fetch('http://localhost:3000/json?address=Tombe+'+j+', Pompeion, Kerameikos')
    .then(res => res.json())
    .then(
      x => {
      let location = x.results[0].geometry.location;
       new google.maps.Marker({
       position : location,
       map
     });
  });
  };
}

//Appel du geocoding Google
function fetchGoogleData(){
  let x;
  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=Kerameikos, +Athenes&key=AIzaSyAtl1YBvhlhE_jJp-Bl1kVYigPaJfiti10')
  .then(res => res.json())
  .then(
    x => {
    let location = x.results[0].geometry.location;
     new google.maps.Marker({
     position : location,
     map
   });
});
}

async function getData(latitude, longitude) {
    const localityData = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then((res) => res.json());

    console.log(localityData.locality);
    console.log(localityData);
    return localityData.locality;
}

async function createMap() {
    var map = L.map('map').setView([38.7946, -106.5348], 4);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    markerOneLatitude = getRandomInRange(30, 35, 3);
    markerOneLongitude = getRandomInRange(-90, -100, 3);
    localityOne = await getData(markerOneLatitude, markerOneLongitude);

    markerTwoLatitude = getRandomInRange(30, 35, 3);
    markerTwoLongitude = getRandomInRange(-90, -100, 3);
    localityTwo = await getData(markerTwoLatitude, markerTwoLongitude);

    markerThreeLatitude = getRandomInRange(30, 35, 3);
    markerThreeLongitude = getRandomInRange(-90, -100, 3);
    localityThree = await getData(markerThreeLatitude, markerThreeLongitude);

    var markerOne = L.marker([markerOneLatitude, markerOneLongitude]).addTo(map);
    var markerTwo = L.marker([markerTwoLatitude, markerTwoLongitude]).addTo(map);
    var markerThree = L.marker([markerThreeLatitude, markerThreeLongitude]).addTo(map);

    document.getElementById('markerOne').textContent = 'Marker 1: Latitude: ' + markerOneLatitude + ', Longitude: ' + markerOneLongitude;
    document.getElementById('localityOne').textContent = 'Locality: ' + localityOne;

    document.getElementById('markerTwo').textContent = 'Marker 2: Latitude: ' + markerTwoLatitude + ', Longitude: ' + markerTwoLongitude;
    document.getElementById('localityTwo').textContent = 'Locality: ' + localityTwo;

    document.getElementById('markerThree').textContent = 'Marker 3: Latitude: ' + markerThreeLatitude + ', Longitude: ' + markerThreeLongitude;
    document.getElementById('localityThree').textContent = 'Locality: ' + localityThree;
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

window.onload = createMap()
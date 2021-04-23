// register here https://www.mapbox.com/
mapboxgl.accessToken = '< this is your api key from mapbox - account >';

// to get the location in the browser, use :
// navigator.geolocation.getCurrentPosition(pos => console.log(pos.coords));


const map = new mapboxgl.Map({
    container: 'map', // container ID in the HTML
    style: 'mapbox://styles/jnrdmnn/ckl1aoosu0afb17r27yya1ti5', // style URL
    center: [13.405, 52.52], // starting position [lng, lat]
    doubleClickZoom: true,
    zoom: 9, // starting zoom
    // pitch: 100
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

// setting a popup
const popup = new mapboxgl.Popup({
    closeButton: true
})
/*
popup.setLngLat([13.405, 52.52])
    .setHTML('<h1>Hello Mapbox</h1>')
    .setMaxWidth('400px')
    .addTo(map)
*/

let coords = [
    [13.405, 52.52],
    [13.6, 52.6]
]

coords.forEach(coord => {
    new mapboxgl.Marker({
        color: 'red',
        draggable: true
    })
        .setLngLat(coord)
        .addTo(map)
        .on('dragend', data => {
            console.log(data)
        })
})

const addMarker = event => {
    new mapboxgl.Marker({
        color: 'yellow',
        draggable: true
    })
        .setLngLat(event.lngLat)
        .addTo(map)
}

// map.on('click', (event) => console.log('these are the coords', event.lngLat));
map.on('click', addMarker)

// const marker = new mapboxgl.Marker({
//     color: 'red'
// })
//     .setLngLat([13.405, 52.52])
//     .addTo(map)

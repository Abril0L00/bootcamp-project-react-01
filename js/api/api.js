
const URL_LOCATION = 'https://rickandmortyapi.com/api/location/';

const getLocation = async function (location) {
    return await fetch(URL_LOCATION + location)
    .then(response => response.json())
    .catch(error => console.log(error));
}

const getCharacter = async function(url){
    return await fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

export {getLocation,getCharacter};
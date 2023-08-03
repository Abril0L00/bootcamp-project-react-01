
import {getLocation,getCharacter} from './api/api.js';

const MAX_NUMBER_LOCATION = 126;
const inputSearh = document.getElementById('input-search');
const spanLocationId = document.getElementById('span-location-id');
const spanLocationName = document.getElementById('span-location-name');
const divResidents = document.getElementById('div-residents');
const btnSearch = document.getElementById('btn-search');
const btnRandom = document.getElementById('btn-random');
const divFormErrors = document.getElementById('div-form-errors');
const sectionResidents = document.getElementById('section-residents');

const generateRandomNumber = function() {
    return Math.floor(Math.random()*MAX_NUMBER_LOCATION) + 1;
}

const orderArrayAlphabetically = function (array) {
    let textHtml = '';
    array.sort();
    array.forEach(url => {
        textHtml += `
        <div class="col-12 text-center">
            ${url}
        </div>
        `;
    });
    return textHtml;    
}

const getResidents = async function(residents){
    let textHtml = '';
    for (let i = 0; i < residents.length; i++) {
        const character = await getCharacter(residents[i]);
        const textHtmlEpisodes = orderArrayAlphabetically(character.episode.slice(0,3));
        //const episode = await getEpisode();
        textHtml += `
        <div class="col-4 mb-3">
            <div class="row">
                <div class="col-12">
                    <img src="${character.image}" alt="Resident Image">
                </div>
                <div class="col-12">
                    <span class="fw-bold">Name: </span>${character.name}<br>
                    <span class="fw-bold">Status: </span>${character.status}<br>
                    <span class="fw-bold">Species: </span>${character.species}<br>
                    <span class="fw-bold">Origin Name: </span>${character.origin.name}<br>
                </div>
                <div class="col-12 pt-2">
                    <span class="fw-bold">Episodes</span><br>
                    <div class="row">
                        ${textHtmlEpisodes}
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    return textHtml;
}

const initSearch = async function(locationNumber){
    const newLocation = await getLocation(locationNumber);
    divResidents.innerHTML = ``;
    spanLocationId.innerHTML = newLocation.id;
    spanLocationName.innerHTML= newLocation.name;
    if(newLocation.residents.length > 0) {
        const residents = newLocation.residents.slice(0,5);
        divResidents.innerHTML = await getResidents(residents);
    }else{
        divResidents.innerHTML = 
        `<div class="col-12">
            <span>Sin residentes</span>
        </div>`;
    }
}

const setBackgroundColor = function(locationNumber){
    sectionResidents.classList.remove('bg-success','bg-primary','bg-error');
    if(locationNumber < 50){
        sectionResidents.classList.add('bg-success');
    }else if (locationNumber > 50 && locationNumber < 80) {
        sectionResidents.classList.add('bg-primary');  
    } else if (locationNumber > 80) {
        sectionResidents.classList.add('bg-danger');
    }
}

const searchByRandomId = function(event){
    event.preventDefault();
    divFormErrors.innerHTML = ``;
    const locationNumber = generateRandomNumber();
    setBackgroundColor(locationNumber);
    initSearch(locationNumber);
}

const searchById = function (event) {
    event.preventDefault();
    divFormErrors.innerHTML = ``;
    const locationNumber = parseInt(inputSearh.value);
    
    if (!Object.is(locationNumber,NaN)) {
        if(locationNumber > 0 && locationNumber <= 126){
            setBackgroundColor(locationNumber);
            initSearch(locationNumber);
        }else{
            divFormErrors.innerHTML = `Ingrese un número > 0 y <= 126`;
        }
    } else {
        divFormErrors.innerHTML = `Ingrese un número válido`;
    }
}

btnRandom.addEventListener('click',searchByRandomId);
btnSearch.addEventListener('click',searchById);









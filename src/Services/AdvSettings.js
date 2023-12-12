import React, { useState, useEffect } from 'react';
import getURL from './deploy';
import axios from 'axios';
const baseURL = getURL();

const genreURL = baseURL + 'genre-cache';
const platformURL = baseURL + 'platform-cache';

const AdvSettings = (user) => {
  const [genres, setGenres] = useState([]); // default value
  const getGenres = async () => {

    try {
      let response = await axios.get(genreURL);  // Use 'await' here;
      console.log(response)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const [platforms, setPlatforms] = useState([]); // default value
  const getPlatforms = async () => {
    try {
      let response = await axios.get(platformURL);  // Use 'await' here;
      console.log(response)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Create a checkbox for an item
  function createSearchCheckbox(name, id) {
    return (
      <li className="adv_search_checkbox">
        <input type="checkbox" id={id} value={name}/>
        <label for={name}>{name}</label>
      </li>
    )
  }

  // Create an unordered lists of checkboxes from a json string
  function createSearchOptions(json, list_id) {
    let checkboxes = []
    for (let i = 0; i < json.length; i++) {
      checkboxes.push(createSearchCheckbox(json[i].name, json[i].id))
    }
    return (
      <ul className='adv_search_options' id={list_id}>
        {checkboxes}
      </ul>
    )
  }

  // Generate a list of checkbox ids for only selected checkboxes for a given list_id
  function getSelectedCheckboxes(list_id) {
    let selected = []
    let options = document.getElementById(list_id)
    let checkboxes = options.querySelectorAll('input[type=checkbox]:checked')
    for (let i = 0; i < checkboxes.length; i++) {
      selected.push(checkboxes[i].id)
    }
    return selected
  }

  // Create a form with lists and options for Genre and Platform
  function createSearchForm() {

    function submitForm() {
      let platform_selection = getSelectedCheckboxes('platforms')
      let genre_selection = getSelectedCheckboxes('genres')
    }

    return (
      <div className="adv_search_form">
        <h3>Platforms</h3>
        {createSearchOptions(platforms, 'platforms')}
        <h3>Genres</h3>
        {createSearchOptions(genres, 'genres')}
        <button type="button" onClick={submitForm}>Submit</button>
      </div>
    )
  }
  useEffect(() => {
    getGenres()
    getPlatforms()
  })
  return (
  <div className="AdvSettingContainer">
      
    <div class="container">
      <h2>Advanced Settings</h2>
      
      <form id="settingsForm">
          <div class="section">
              <h3>Platforms</h3>
              <div id="platformsContainer">
                <input type='checkbox' value='xbox'></input>
              </div>
          </div>
          
          <div class="section">
              <h3>Genres</h3>
              <div id="genresContainer">
                <input type='checkbox' id='fantasy' value='fantasy'></input>
              </div>
          </div>

          <button type="button" onclick="submitForm()">Submit</button>
      </form>
    </div>
  </div>
  );
};

export default AdvSettings;
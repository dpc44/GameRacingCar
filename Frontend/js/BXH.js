import { getAllUsersData } from "./FireBaseFunctions.js";

var tabLinks = document.querySelectorAll(".tablinks");
var tabContent = document.querySelectorAll(".tabcontent");

tabLinks.forEach(function (el) {
   el.addEventListener("click", openTabs);
});

var levelSelect;

function openTabs(el) {
   var btn = el.currentTarget;
   var electronic = btn.dataset.gamemode;

   tabContent.forEach(function (el) {
      el.classList.remove("active");
   });

   tabLinks.forEach(function (el) {
      el.classList.remove("active");
   });

   document.querySelector("#" + electronic).classList.add("active");

   btn.classList.add("active");
   if (electronic === "Level") {
      levelSelect = document.getElementById('levelSelect');
      populateTableLevelMode(rankingDataLevel, levelSelect.value);
   } else {
      levelSelect = null;
   }
}
//----------Data---------
var dataUsers = await getAllUsersData();

const rankingDataChanllenge = dataUsers.map(user => {
   return {
       useremail: user.email,
       score: user.BestScoreChallengeMode
   };
});

const rankingDataLevel = dataUsers.map(user => {
   return {
       useremail: user.email,
       scores: user.BestScoreLevelMode
   };
});

function populateTableChallengeMode(data) {
   const tableBody = document.getElementById('ChanllengeModeRanking');

   // Sort the data in descending order based on the 'scores' property
   const filteredData = data.filter(entry => entry.score !== 0);
   filteredData.sort((a, b) => b.score - a.score);
   const displayData = filteredData.slice(0, Math.min(10, filteredData.length));
   displayData.forEach((entry, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
       <th scope="row">${index+1}</th>
       <td>${entry.useremail}</td>
       <td>${entry.score}</td>
     `;
      tableBody.appendChild(row);
   });
}
function convertTimeStringToSeconds(timeString) {
   const [minutes, seconds] = timeString.split(':').map(Number);
   return minutes * 60 + seconds;
}
// Function to populate the table for Level Mode
function populateTableLevelMode(data, selectedLevel) {
   const tableBody = document.getElementById('LevelModeRanking');
   tableBody.innerHTML = '';

   const filteredData = data.filter(entry => entry.scores[selectedLevel] !== "00:00");
   filteredData.sort((a, b) => {
      const scoreA = convertTimeStringToSeconds(a.scores[selectedLevel]);
      const scoreB = convertTimeStringToSeconds(b.scores[selectedLevel]);
      return scoreA - scoreB;
   });

   const displayData = filteredData.slice(0, Math.min(10, filteredData.length));
   displayData.forEach((entry, index) => {

      const row = document.createElement('tr');
      row.innerHTML = `
       <th scope="row">${index+1}</th>
       <td>${entry.useremail}</td>
       <td>${entry.scores[selectedLevel]}</td>
     `;
      tableBody.appendChild(row);
   });
}

function handleLevelChange(selectElement) {
   var selectedLevel = selectElement.value;
   populateTableLevelMode(rankingDataLevel, selectedLevel);

}
window.handleLevelChange = handleLevelChange;
// Call the functions with your ranking data
populateTableChallengeMode(rankingDataChanllenge);

const countryForm = document.getElementById("countryForm");
const sendButton = document.getElementById("sendButton");
// event listener för formet
countryForm.addEventListener("submit", function (event) {
  event.preventDefault();
  fetchCountryInfo();
});

sendButton.addEventListener("click", function () {
  fetchCountryInfo();
});

async function fetchCountryInfo() {
  const textInput = document.getElementById("textInput").value;
  const isCountrySelected = document.getElementById("country").checked;
  const landInfo = document.querySelector("#landinfo");
  landInfo.innerHTML = "";

  if (isCountrySelected) {
    apiUrl = `https://restcountries.com/v3.1/name/${textInput}`;
  } else {
    apiUrl = `https://restcountries.com/v3.1/lang/${textInput}`;
  }
  /// La in min ERROR funktion här
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Country/Language not found");
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
    const countryData = await response.json();
    
      // Här kommer sorteringen för att de skall falla i mest population först till minst.
    if (response.ok && countryData && countryData.length > 0) {
        countryData.sort((a, b) => b.population - a.population)};
    
    for (let i = 0; i < countryData.length; i++) {
      const countryImage = document.createElement("img");
      const countryName = document.createElement("h1");
      const subregion = document.createElement("p");
      const capital = document.createElement("p");
      const population = document.createElement("p");
      console.log(countryData);

      countryImage.src = countryData[i].flags.png;
      countryName.innerText = countryData[i].name.official;
      subregion.innerText = `Subregion: ${countryData[i].subregion}`;
      capital.innerText = `Capital: ${countryData[i].capital}`;
      population.innerText = `Population: ${countryData[i].population}`;

      landInfo.append(
        countryImage,countryName,subregion,capital,population);
    }
  } catch (error) {
    console.error("Error fetching country information:", error);
    const h1 = document.createElement('h1');
    h1.innerText = error;
    landInfo.append(h1);
  }
}
/* Global variables and weather API enpoinds */
const btn = document.getElementById("generate");
const apiKey = `e41ff39baf76f5b5d2edf9d6b8034ee3`;
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${apiKey}&zip=`;

// This function updates most recent entry UI
const updateUI = () => {
  // This performs GET request to retrieve most recent entry from server
  fetch("/getdata")
    .then(res => res.json())
    .then(data => {
      // Loops through postData to display most recent entry data in UI
      for (let i = 0; i < data.length; i++) {
        document.getElementById("date").innerHTML = data[i].date;
        document.getElementById("temp").innerHTML = data[i].temp + " °F";
        document.getElementById("content").innerHTML = data[i].feelings;
      }

    }).catch(err => {
      console.log("error", err);
    })
}

const postWeather = (url, data) => {
  // Posts temperature, content and date data into server
  fetch(url, {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .catch(err => {
      console.log("error", err);
    })
}

btn.addEventListener("click", () => {
  const zipCode = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;

  // If zip code input is not a number or not 5 digits, throws error
  if (zipCode.length !== 5 || isNaN(zipCode)) {
    document.querySelector(".zip-error").innerHTML = "Please enter a 5-digit zip code."
  }

  // If there is empty content, throws error
  if (content.length === 0) {
    document.querySelector(".content-error").innerHTML = "Please enter your thoughts."
  }

  // If no error, will make fetch call to update server data
  if (content.length > 0 && zipCode.length === 5 && !isNaN(zipCode)) {
    document.querySelector(".zip-error").innerHTML = "";
    document.querySelector(".content-error").innerHTML = "";

    // Combimes weather API endpoint with zip code
    fetch(weatherURL + zipCode)
      .then(res => res.json())
      .then(data => {
        const temp = Math.round(data.main.temp); // Rounds up temperature
        const d = new Date().toLocaleString('en-US');

        postWeather("/postdata", {
          date: d,
          temp: temp,
          feelings: content
        });
        updateUI(); // Function is called to update entry UI
      })
      .catch(err => {
        console.log("error", err);
      })
  }
});
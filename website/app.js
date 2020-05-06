/* Global Variables */
const btn = document.getElementById("generate");
// Create a new date instance dynamically with JS
let d = new Date().toLocaleString('en-US');
let apiKey = `e41ff39baf76f5b5d2edf9d6b8034ee3`;
let weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${apiKey}&zip=`;



const postWeather = async (url = "", data = {}) => {
 const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
  });
  try{
    const newData = await response;

    return newData;
  }catch(err){
    console.log("error", err);
  }
}

btn.addEventListener("click", () => {
  let zipCode = document.getElementById("zip").value;
  console.log(weatherURL + zipCode);
  fetch(weatherURL + zipCode)
    .then(res => res.json())
    .then(data => {
      const temp = Math.round(data.main.temp);

      postWeather("/postdata", {temp: temp})
    })

});
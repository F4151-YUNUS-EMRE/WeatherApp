const apiKey = "226b643ce59aeeeb00e4b2bb779743ab"

const form = document.querySelector("form")
const formInput = document.querySelector("input")
const warning = document.querySelector(".warning")
const resultArea = document.querySelector(".cities")

const currentCity = document.querySelector(".aktuel")

form.onsubmit = (e) => {
    e.preventDefault()
    getWeatherData()
}

const getWeatherData = async () => {
    let weatherType = `metric`
    let input = formInput.value
    const cityCart = document.createElement("div")
    cityCart.classList.add("city")
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=${weatherType}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
        const {
            main,
            name,
            sys,
            weather
        } = data
        const iconUrl = `https://openweathermap.org/img/wn/${weather[0].
icon}@4x.png`
        console.log(iconUrl)

        cityCart.innerHTML = `<div class="head">
<h2 class="cityName"><span>${name}</span><sup>${sys.country}</
sup>
</h2>
<div class="closeIcon">X</div>
</div>
<div class="cityTemp">${Math.round(main.temp)}<sup>°C</sup></div>
<img class="${iconUrl}" src="./image/cloud_89333.png">
<p>${weather[0].description}</p>`

        resultArea.appendChild(cityCart)
        warning.innerText = ""
        form.reset()

    } catch (error) {
        // console.log(error)
        warning.innerText = `The city could not be found`
        form.reset()
    }
}

resultArea.onclick = (e) => {
    // console.log(e.target.className)
    if (e.target.className === "closeIcon") {
        e.target.closest(".city").remove()
    }
}
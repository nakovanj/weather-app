// client side Javascript
//console.log('Client side javascript file is loading!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#Message-1')
const message2 = document.querySelector('#Message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    // console.log(location)

    //fetch API in browser
    message1.textContent = 'Loading...'

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            // console.log(data)
            if (data.error) {
                message1.textContent = data.error
                message2.textContent = ''
            } else {
                message1.textContent = ''
                message2.textContent = 'Forecast for: ' + data.address.Address + ', is ' +
                    data.forecast
            }
        }

        )
    })
}) 
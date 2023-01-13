import axios from 'axios'

async function callApi() {
    const date = new Date()
    const minutes = date.getMinutes()
    const evenMinutes = minutes % 2 === 0
    const randomPercent = Math.random()
    const isLogin = evenMinutes ? randomPercent > 0.3 : randomPercent <= 0.35
    const url = isLogin ? "http://localhost:4001/login" : "http://localhost:4001/logout"
    const response = await axios( { url });
    console.log("Response:", response.data);
} 

setInterval(callApi, 1 * 1000)
function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

function updateDate() {
    const now = new Date();

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = daysOfWeek[now.getDay()];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const daySuffix = getDaySuffix(day);

    document.querySelector('.date').innerHTML = `${dayOfWeek}, ${month} ${day}${daySuffix}`;
}

updateDate();
setInterval(updateDate, 1000);

function updateClock() {
    const now = new Date();

    const hours = (now.getHours() % 12);
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourDeg = (hours * 30) + (minutes * 0.5);
    const minuteDeg = minutes * 6;
    const secondDeg = seconds * 6;

    document.querySelector('.hour-hand').style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    document.querySelector('.minute-hand').style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    document.querySelector('.second-hand').style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;

    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    document.querySelector('.clock').innerHTML = timeString;
}

updateClock();
setInterval(updateClock, 1000);

function getGreeting() {
    const now = new Date();
    
    const hours = now.getHours();
    
    let timeMessage;

    if (hours >= 6 && hours < 12) {
        timeMessage = 'Good Morning'
    } else if (hours >= 12 && hours < 17) {
        timeMessage = 'Good Afternoon'
    } else if (hours >= 17 && hours < 21) {
        timeMessage = 'Good Evening'
    } else {
        timeMessage = 'Goodnight'
    }

    document.querySelector('#welcome').innerHTML = `${timeMessage}, mechanik`
}

getGreeting();

const api_url = "https://api.allorigins.win/raw?url=https://zenquotes.io/api/today/";

async function getapi(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        document.querySelector('.daily-message').innerHTML = `"${data[0].q}" - ${data[0].a}`

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

getapi(api_url);

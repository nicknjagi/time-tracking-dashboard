const stats = document.querySelectorAll('.stats-container')
const btns = document.querySelectorAll('.btns span')
const daily = document.getElementById('daily')
const weekly = document.getElementById('weekly')
const monthly = document.getElementById('monthly')


async function getData(time){
  const html = []
  const report = await fetch('./data.json') 
                    .then(response => response.json())
                    .then(data => data)

  report.map(el=>{
      html.push(el)
  })
  
  stats.forEach((el, i)=>{
    el.innerHTML = `
      <div class="title-container">
        <h3 class="title">${html[i]['title']}</h3>
        <div>
          <a href="#"><img class="link" src="./images/icon-ellipsis.svg" alt=""></a>
        </div>
      </div>
      <div class="hrs-container">
        <span class="current">${html[i]["timeframes"][time]["current"]}hrs</span>
        <span class="previous">Last Week - ${html[i]["timeframes"][time]["previous"]}hrs</span>
      </div>
    `
    })
  }

window.addEventListener("DOMContentLoaded", getData("weekly"))

daily.addEventListener('click', ()=>{
  getData("daily")
})
weekly.addEventListener('click', ()=>{
  getData("weekly")
})
monthly.addEventListener('click', ()=>{
  getData("monthly")
})


function removeActive(){
  btns.forEach((el) => {
    el.classList.remove('active')
  })
}

btns.forEach(el=>{
  el.addEventListener('click', ()=>{
    removeActive()
    el.classList.add('active')
  })
})
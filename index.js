const menu = document.querySelector('.menu');
const navBar = document.querySelector('.nav-bar');
const shortenBtn = document.querySelector('.shorten-btn');
const inputLink = document.querySelector('#input-link');
const shortlinkContainer = document.querySelector('.short-link-container');

menu.addEventListener('click',()=>{
    navBar.classList.add('nav-active')
});
shortenBtn.addEventListener('click',()=>{
  console.log(' i m clicked')
    shortenlink(inputLink.value).then(data=>{
        console.log(data.result.short_link)
      
        const output = 
        `
        <div class="link-container">
        <div class="original-link">
          ${inputLink.value}
        </div>
        <div class="short-link">
          <div class="last-col">
            ${data.result.short_link}
          </div>
          <div class="copy-btn">
            <button class="copy">copy</button>
          </div>
          </div>

        </div>
        `
        shortlinkContainer.innerHTML += output;
        inputLink.value=''
    });
});
const shortenlink= async(value)=>{
    const data = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputLink.value}`);
    const res = await data.json();
    return res;
};

const menu = document.querySelector('.menu');
const navBar = document.querySelector('.nav-bar');
const shortenBtn = document.querySelector('.shorten-btn');
const inputLink = document.querySelector('#input-link');
const shortlinkContainer = document.querySelector('.short-link-container');

menu.addEventListener('click',()=>{
    navBar.classList.add('nav-active')
});

// shortenBtn event listener
shortenBtn.addEventListener('click',()=>{
    if(localStorage.getItem('shortlink') === null){
        shortlinkArray = [];
    }else{
        shortlinkArray = JSON.parse(localStorage.getItem('shortlink'));
    }
    shortenlink(inputLink.value).then(data=>{
        // set value in local storage
        shortlinkArray.push(data.result.short_link);
        localStorage.setItem(`${inputLink.value}`,JSON.stringify(shortlinkArray));
        showShortlink();
        inputLink.value='';
      });
});
const shortenlink= async(value)=>{
    const data = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputLink.value}`);
    const res = await data.json();
    return res;
};

let showShortlink = ()=>{
  let result ='';
  // iterate on local Storage keys and values
  for(let i=0;i<localStorage.length;i++){
    const output = 
    `
    <div class="link-container">
    <div class="original-link">
        ${localStorage.key(i)}
        </div>
      <div class="short-link">
        <div class="last-col">
        ${localStorage.getItem(localStorage.key(i))}
        </div>
        <div class="copy-btn">
        <button class="copy">copy</button>
        </div>
        </div>
        
        </div>
        `;
        result+=output;
  }
  shortlinkContainer.innerHTML = result;
}

window.onload=()=>{
  showShortlink()
}

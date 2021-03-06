const menu = document.querySelector('.menu');
const navBar = document.querySelector('.nav-bar');
const shortenBtn = document.querySelector('.shorten-btn');
const inputLink = document.querySelector('#input-link');
const shortlinkContainer = document.querySelector('.short-link-container');

menu.addEventListener('click',()=>{
    navBar.classList.toggle('nav-active')
});

// Api call to short link
const shortenlink= async(value)=>{
  const data = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputLink.value}`);
  const res = await data.json();
  return res;
};

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

// show shortlink
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
        ${JSON.parse(localStorage.getItem(localStorage.key(i)))[0]}
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

  // copy to clipboard
  const copyBtn = document.querySelectorAll('.copy');
  copyBtn.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      console.log('i m cliked')
      let input = document.createElement('input');
      var val = input.value = e.target.parentElement.previousElementSibling.textContent;
      // input.select()
      navigator.clipboard.writeText(val)
      // document.execCommand('copy');
    });
  });
}

window.onload=()=>{
  showShortlink()
};

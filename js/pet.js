const isLoggedIn = true;

let petData = {
  name: "Luna",
  birthDate: "2023-09-21",
  image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Rostkatze.JPG",
  status: "lost",
  owner: { name: "Maria Lopez", location: "Palermo, CABA" },
  petInfo: { weight: "6 kg", size: "Medium", color: "Tabby" },
  notes: "She is calm and responds to her name."
};

let backup = {};

function getAgeText(birthDate) {
  const b = new Date(birthDate);
  const t = new Date();
  let m = (t.getFullYear() - b.getFullYear())*12 + (t.getMonth() - b.getMonth());
  if(t.getDate()<b.getDate()) m--;
  return m<24 ? `· ${m} months` : `· ${Math.floor(m/12)} years`;
}

function get(path){ return path.split('.').reduce((o,k)=>o[k], petData); }
function set(path,value){
  const keys = path.split('.');
  keys.slice(0,-1).reduce((o,k)=>o[k], petData)[keys.at(-1)] = value;
}

function render(){
  document.querySelectorAll("[data-field]").forEach(el=>{
    el.textContent = get(el.dataset.field);
  });
  petImage.src = petData.image;
  petAge.textContent = getAgeText(petData.birthDate);

  const badge = document.getElementById("statusBadge");
  if(petData.status==="lost"){badge.textContent="Lost!"; badge.className="status-badge lost";}
  else if(petData.status==="found"){badge.textContent="Found!"; badge.className="status-badge found";}
  else{badge.textContent=""; badge.className="status-badge";}
}

function enterEdit(){
  backup = JSON.parse(JSON.stringify(petData));

  document.querySelectorAll("[data-field]").forEach(el=>{
    let input = el.dataset.field === "notes" ? document.createElement("textarea") : document.createElement("input");
    input.value = get(el.dataset.field);
    input.dataset.field = el.dataset.field;
    Object.assign(input.style, {
      fontFamily: window.getComputedStyle(el).fontFamily,
      fontSize: window.getComputedStyle(el).fontSize,
      fontWeight: window.getComputedStyle(el).fontWeight,
      color: window.getComputedStyle(el).color,
      background: "rgba(255,255,255,0.2)",
      border: "1px solid #ccc",
      borderRadius: "6px",
      padding: "2px 4px",
      width: "100%",
      boxSizing: "border-box"
    });
    el.replaceWith(input);
  });

  const imgInput = document.createElement("input");
  imgInput.type="text";
  imgInput.value=petData.image;
  imgInput.dataset.field="image";
  imgInput.placeholder="Image URL";
  imgInput.style.cssText="width:100%;margin-bottom:8px;padding:4px;box-sizing:border-box;";
  document.querySelector(".image-container").prepend(imgInput);

  const select = document.createElement("select");
  select.dataset.field="status";
  ["","lost","found"].forEach(s=>{
    const opt=document.createElement("option");
    opt.value=s;
    opt.textContent=s==="lost"?"Lost":s==="found"?"Found":"None";
    if(petData.status===s) opt.selected=true;
    select.appendChild(opt);
  });
  select.style.cssText="margin-bottom:8px;padding:4px;width:100%;box-sizing:border-box;";
  document.querySelector(".image-container").prepend(select);

  editActions.style.display="flex";
  editBtn.style.display="none";
}

function exitEdit(save){
  if(!save) petData = backup;

  const imgInput=document.querySelector(".image-container input[type=text]");
  const select=document.querySelector(".image-container select");
  if(save){
    if(imgInput) petData.image=imgInput.value;
    if(select) petData.status=select.value;
  }
  if(imgInput) imgInput.remove();
  if(select) select.remove();

  document.querySelectorAll("input[data-field], textarea[data-field]").forEach(el=>{
    if(save) set(el.dataset.field, el.value);
    const span=document.createElement("span");
    span.dataset.field=el.dataset.field;
    if(el.dataset.field==="name") span.className="pet-name";
    else if(el.dataset.field==="notes") span.style.whiteSpace="pre-wrap";
    el.replaceWith(span);
  });

  render();
  editActions.style.display="none";
  editBtn.style.display="flex";
}

editBtn.onclick=enterEdit;
editActions.children[0].onclick=()=>exitEdit(true);
editActions.children[1].onclick=()=>exitEdit(false);

if(isLoggedIn) editBtn.style.display="flex";

render();

let lastScroll = 0;
const nav = document.querySelector('.bottom-nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if(currentScroll > lastScroll && currentScroll > 100) {
    // scroll down → ocultar
    nav.classList.add('hidden');
  } else {
    // scroll up → mostrar
    nav.classList.remove('hidden');
  }

  lastScroll = currentScroll;
});

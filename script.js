
function scrollToSection(sectionId){
const section=document.getElementById(sectionId);
if(section){
section.scrollIntoView({behavior:'smooth'});
}
}

function toggleMobileMenu(){
const mobileMenu=document.getElementById('mobileMenu');
if(mobileMenu){
mobileMenu.classList.toggle('show');
}
}

function closeMobileMenu(){
const mobileMenu=document.getElementById('mobileMenu');
if(mobileMenu){
mobileMenu.classList.remove('show');
}
}

window.addEventListener('scroll',()=>{
const progressBar=document.getElementById('progressBar');
if(progressBar){
const scrollTop=window.scrollY;
const docHeight=document.body.scrollHeight-window.innerHeight;
const progress=(scrollTop/docHeight)*100;
progressBar.style.width=progress+'%';
}

const scrollBtn=document.getElementById('scrollTopBtn');
if(scrollBtn){
if(window.scrollY>400){
scrollBtn.classList.add('show');
}else{
scrollBtn.classList.remove('show');
}
}

const navLinks=document.querySelectorAll('nav a');
const sections=document.querySelectorAll('section');

sections.forEach(section=>{
const top=window.scrollY;
const offset=section.offsetTop-160;
const height=section.offsetHeight;
const id=section.getAttribute('id');

if(top>=offset && top<offset+height){
navLinks.forEach(link=>{
if(link){
link.classList.remove('active');
}
});

const active=document.querySelector(`nav a[href="#${id}"]`);
if(active){
active.classList.add('active');
}
}
});

const reveals=document.querySelectorAll('.reveal');
reveals.forEach(item=>{
if(item && item.getBoundingClientRect().top < window.innerHeight - 100){
item.classList.add('active');
}
});
});

const counters=document.querySelectorAll('.counter');
let statsStarted=false;

function startCounters(){
if(statsStarted) return;

const statsSection=document.getElementById('stats');
if(!statsSection) return;

const top=statsSection.getBoundingClientRect().top;

if(top < window.innerHeight - 100){
statsStarted=true;

counters.forEach(counter=>{
const target=+counter.getAttribute('data-target');
let count=0;
const increment=Math.ceil(target/80);

const updateCounter=()=>{
count += increment;

if(count >= target){
counter.innerText=target + '+';
}else{
counter.innerText=count + '+';
requestAnimationFrame(updateCounter);
}
};

updateCounter();
});
}
}

window.addEventListener('DOMContentLoaded',()=>{
const loader=document.getElementById('loadingScreen');

if(loader){
setTimeout(()=>{
loader.classList.add('hide');
},800);
}
});

window.addEventListener('scroll',startCounters);
startCounters();
window.dispatchEvent(new Event('scroll'));

const galleryImages=[
'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop',
'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop',
'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop',
'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop'
];

const galleryCards=document.querySelectorAll('.gallery-card');
const popup=document.getElementById('galleryPopup');
const popupGrid=document.getElementById('galleryPopupGrid');

galleryCards.forEach(card=>{
card.addEventListener('click',()=>{
popupGrid.innerHTML='';

galleryImages.forEach(img=>{
const image=document.createElement('img');
image.src=img;
popupGrid.appendChild(image);
});

popup.classList.add('show');
document.body.style.overflow='hidden';
});
});

function closeGalleryPopup(){
popup.classList.remove('show');
document.body.style.overflow='auto';
}
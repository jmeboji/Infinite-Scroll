const imageContainer = document.getElementById ('image-container');
const loader = document.getElementById ('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "NZzu5NI6wSoxRJDLyWFT5YHIj0_FvyiJ8UPzf_22iO8";
const unsplashApi = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
function updateAPIurl(num){
    unsplashApi = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${num}`;
} 
// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages) {
       ready = true;
       loader.hidden = true;
       console.log('ready =', ready); 
    }   
}
// Helper funtion to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos, add API to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,

        });
        // Event listner, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // img.setAttribute('src', photo.url.regular);
        // img.setAttribute('title', photo.alt_description);
        // Put <img> inside the <a>, then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
//Get photos from unsplash API
async function getPhotos() {
try {
    const response = await fetch(unsplashApi);
    photosArray = await response.json();
    displayPhotos();
    // console.log(photosArray);
    // console.log(data);
} catch (error) {
    // catch error here
}
}
// Check to see if scrolling near bottom of page, load More photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
      ready = false;
      getPhotos();
  }
});

// On load
getPhotos();
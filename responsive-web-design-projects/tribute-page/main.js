'use strict';

// HAMBURGUER NAV

var nav = document.querySelector('nav');
var navBtn = document.querySelector('.nav-btn');
var closeBtn = document.querySelector('.close-btn');

navBtn.addEventListener('click', function () {
  setTimeout(function () {
    navBtn.style.display = 'none';
  }, 200);
  nav.style.top = '0';
});

closeBtn.addEventListener('click', function () {
  setTimeout(function () {
    navBtn.style.display = 'block';
  }, 500);
  nav.style.top = '-100vh';
});

// LIGHTBOX
var windowHeight = window.outerHeight;
var windowWidth = window.outerWidth;
var imgs = document.querySelectorAll('#main img');
var lightboxDiv = document.querySelector('.lightbox');
var lightboxFig = document.querySelector('.lightbox figure');
var lightboxImg = document.querySelector('.lightbox img');
var lightboxCaption = document.querySelector('.lightbox figcaption');

function scaleEl(elHeight, elWidth, screenHeight, screenWidth) {
  var maxHeight = screenHeight - screenHeight * 0.05;
  var maxWidth = screenWidth - screenWidth * 0.05;
  return Math.min(maxHeight / elHeight, maxWidth / elWidth);
}

function onOrientationChange(screenHeight, screenWidth, elHeight, elWidth) {
  var newWindowHeight = window.outerHeight;
  var newWindowWidth = window.outerWidth;
  return scaleEl(elHeight, elWidth, newWindowHeight, newWindowWidth);
}

function lightbox(e) {
  windowHeight = window.outerHeight;
  windowWidth = window.outerWidth;
  var scale = scaleEl(e.target.naturalHeight, e.target.naturalWidth, windowHeight, windowWidth);
  lightboxImg.setAttribute('src', e.target.src);
  lightboxImg.setAttribute('alt', e.target.alt);
  lightboxCaption.innerText = e.target.alt;
  lightboxFig.style.height = e.target.naturalHeight * scale + 'px';
  lightboxFig.style.gridTemplate = 'minmax(0, 95vh) min-content / minmax(0, ' + e.target.naturalWidth * scale + 'px)';
  lightboxDiv.classList.add('open');
  e.target.alt.length === 0 ? lightboxCaption.style.display = 'none' : lightboxCaption.style.display = 'block';
  window.addEventListener('resize', function () {
    scale = onOrientationChange(windowHeight, windowWidth, lightboxImg.naturalHeight, lightboxImg.naturalWidth);
    lightboxFig.style.height = lightboxImg.naturalHeight * scale + 'px';
    lightboxFig.style.gridTemplate = 'minmax(0, 95vh) min-content / minmax(0, ' + lightboxImg.naturalWidth * scale + 'px)';
  });
}

imgs.forEach(function (img) {
  img.addEventListener('click', lightbox);
});
lightboxDiv.addEventListener('click', function () {
  return lightboxDiv.classList.remove('open');
});
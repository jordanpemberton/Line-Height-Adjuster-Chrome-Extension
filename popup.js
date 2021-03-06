
var slider = document.getElementById('slider');
var line_height_input = document.getElementById('line_height_input');
var output = document.getElementById('output');
var clear_btn = document.getElementById('clear_btn');

function updateOutput() {
  output.value = slider.value;
}

function clearSlider() {
slider.value = 1;
output.innerHTML = '1';
}

function clearLineHeightInput () {
  line_height_input.value = '';
}


function clear_style() {
  chrome.tabs.executeScript(null,
    {code:"var paras = document.getElementsByTagName('p');for (var i = 0; i < paras.length; i++) {paras[i].style.removeProperty('line-height');}"}
  );
  clearSlider();
  clearLineHeightInput();
}

function slider_line_height () {
  chrome.tabs.executeScript(null,
    {code:"var paras = document.getElementsByTagName('p');for (var i = 0; i < paras.length; i++) {paras[i].setAttribute('style', 'line-height:" + slider.value + " !important');}"}
  );
  clearLineHeightInput();  
}

function slider_line_height_input () {
  chrome.tabs.executeScript(null,
    {code:"var paras = document.getElementsByTagName('p');for (var i = 0; i < paras.length; i++) {paras[i].setAttribute('style', 'line-height:" + line_height_input.value + " !important');}"}
  );
  clearSlider();
}

function input_listener(identifier, func) {
identifier.addEventListener('change', function() {
  func();
});

identifier.addEventListener('paste', function() {
  func();
});

identifier.addEventListener('input', function() {
  func();
});
}

function click_listener(identifier, func) {
identifier.addEventListener('click', function() {
  func();
});
}

document.addEventListener('DOMContentLoaded', function () {

input_listener(slider, slider_line_height); 
input_listener(slider, updateOutput); 
input_listener(line_height_input, slider_line_height_input); 
click_listener(clear_btn, clear_style); 

});

let x = 1;
function a() {
  let y = 2;
  output(x);
}
function b() {
  let z = 3;
  output(x);
}
function output(value) {
  let para = document.createElement('p');
  document.body.appendChild(para);
  para.textContent = 'Value: ' + value;
}
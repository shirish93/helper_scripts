async function clickAll(){
  var i = items.length
  for (i = items.length-1; i >= 0; i--){
    await sleep(200);
    items[i].click();
    console.log(i);
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

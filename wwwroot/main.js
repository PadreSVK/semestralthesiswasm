var rawArrayToString = function (buffer, position) {
  let decoder = new TextDecoder("utf-8");
  let bufferTmp = buffer.subarray(position, buffer.length - 1);
  let position2 = bufferTmp.findIndex(e => !e);
  return (position2 > 0) 
            ? decoder.decode(bufferTmp.subarray(0, position2)) 
            : "";
}

fetch('./main.wasm').then(response =>
  response.arrayBuffer()
).then(bytes => WebAssembly.instantiate(bytes)).then(results => {
  instance = results.instance;
  document.getElementById("numberContainer").textContent = instance.exports.main();
  let uint8Array = new Uint8Array(instance.exports.memory.buffer);
  let position = instance.exports.hello();
  document.getElementById("textContainer").textContent = rawArrayToString(uint8Array, position);
}).catch(console.error);
<template>
  <div>
    <button @click="replaceImageUrl">modify</button>
  </div>
</template>

<script setup>
import { metadata } from "./../full-metadata.js";
import { saveAs } from "file-saver";

const image_base_url = "ipfs://QmYVrzsdg5en8NBtrAbfp7co1TXz847c8r2ezaEqwr43ry";

function replaceImageUrl() {
  for (let i = 0; i < metadata.length; i++) {
    let delay = (i + 1) * 500;
    setTimeout(function () {
      let current = metadata[i];
      current.image = `${image_base_url}/${i}.png`;
      console.log(current);
      downloadMetadata(current, i);
    }, delay);
  }
  downloadMetadata(metadata, 56);
}

function downloadMetadata(json, index) {
  var data = JSON.stringify(json);
  var blob = new Blob([data], {
    type: "text/plain",
  });
  let filename = `${index}.json`;
  saveAs(blob, filename);
}
</script>

<style scoped></style>

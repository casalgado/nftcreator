<template>
  <div class="home">
    <div id="container">
      <img />
    </div>
  </div>
</template>

<script>
import mergeImages from "merge-images";
export default {
  name: "Home",
  data() {
    return {
      imageNames: [],
    };
  },
  methods: {
    src: function (name) {
      return require(`../assets/${name}.png`);
    },
  },
  mounted() {
    let base = ["Base"];
    let bgs = ["B1", "B2", "B3"];
    let hat = ["Hat1", "Hat2", "None"];
    let mouth = ["Mouth1", "Mouth2", "None"];
    let combined = [bgs, base, hat, mouth];
    for (let i = 0; i < combined.length; i++) {
      let current = combined[i];
      this.imageNames.push(current[Math.floor(Math.random() * current.length)]);
    }
    let srcs = [];
    for (let i = 0; i < this.imageNames.length; i++) {
      srcs.push(this.src(this.imageNames[i]));
    }
    mergeImages([srcs[0], srcs[1], srcs[2], srcs[3]]).then(
      (b64) => (document.querySelector("img").src = b64)
    );
  },
};
</script>
<style scoped>
.container {
  position: relative;
  width: 500px;
  margin: 0 auto;
}

img {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

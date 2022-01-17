<template>
  <div class="home">
    <div class="container">
      <img id="img0" />
      <img id="img1" />
      <img id="img2" />
      <img id="img3" />
      <img id="img4" />
      <img id="img5" />
      <img id="img6" />
      <img id="img7" />
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
      collectionSize: 52,
      traits: [
        {
          category: "base",
          distribution: [{ name: "base", url: "base", amount: 52 }],
        },
        {
          category: "sky",
          distribution: [
            { name: "daylight", url: "sky1", amount: 39 },
            { name: "sunset", url: "sky2", amount: 13 },
          ],
        },
        {
          category: "coconuts",
          distribution: [
            { name: "double brown", url: "coconut1", amount: 9 },
            { name: "triple brown", url: "coconut2", amount: 9 },
            { name: "double purple", url: "coconut3", amount: 7 },
            { name: "triple purple", url: "coconut4", amount: 7 },
            { name: "double orange", url: "coconut5", amount: 5 },
            { name: "triple orange", url: "coconut6", amount: 5 },
            { name: "double green", url: "coconut7", amount: 4 },
            { name: "triple green", url: "coconut8", amount: 4 },
            { name: "double gray", url: "coconut9", amount: 1 },
            { name: "triple gray", url: "coconut10", amount: 1 },
          ],
        },
        {
          category: "birds",
          distribution: [
            { name: "birds", url: "birds", amount: 26 },
            { name: "none", url: "empty", amount: 26 },
          ],
        },
        {
          category: "rock",
          distribution: [
            { name: "rock", url: "rock", amount: 26 },
            { name: "none", url: "empty", amount: 26 },
          ],
        },
        {
          category: "boats",
          distribution: [
            { name: "left", url: "boat1", amount: 13 },
            { name: "right", url: "boat2", amount: 13 },
            { name: "both", url: "boat3", amount: 13 },
            { name: "none", url: "empty", amount: 13 },
          ],
        },
        {
          category: "towel",
          distribution: [
            { name: "blue", url: "towel1", amount: 8 },
            { name: "red", url: "towel2", amount: 18 },
            { name: "orange", url: "towel3", amount: 26 },
          ],
        },
        {
          category: "leaves",
          distribution: [
            { name: "green", url: "rock", amount: 26 },
            { name: "yellow", url: "empty", amount: 13 },
            { name: "red", url: "empty", amount: 8 },
            { name: "blue", url: "empty", amount: 5 },
          ],
        },
      ],
    };
  },
  methods: {
    src: function (name) {
      return require(`../assets/${name}.png`);
    },
    generate: function () {
      let attributes = {};
      let traits = this.traits;
      for (let i = 0; i < traits.length; i++) {
        attributes[traits[i].name] = [];
        for (let k = 0; k < traits.distribution.length; k++) {
          distribution[traits[i].name].push();
        }
      }
    },
  },
  mounted() {
    let base = ["Base"];
    let bgs = ["B1", "B2", "B3"];
    let hat = ["Hat1", "Hat2", "None"];
    let mouth = ["Mouth1", "Mouth2", "None"];
    for (let k = 0; k < 8; k++) {
      this.imageNames = [];
      let combined = [bgs, base, hat, mouth];
      for (let i = 0; i < combined.length; i++) {
        let current = combined[i];
        this.imageNames.push(
          current[Math.floor(Math.random() * current.length)]
        );
      }
      let srcs = [];
      for (let i = 0; i < this.imageNames.length; i++) {
        srcs.push(this.src(this.imageNames[i]));
      }
      let id = "img" + k;
      mergeImages([srcs[0], srcs[1], srcs[2], srcs[3]]).then(
        (b64) => (document.getElementById(id).src = b64)
      );
    }
  },
};
</script>
<style scoped>
.home {
  width: 100%;
}
.container {
  position: relative;
  width: 1090px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

img {
  width: 250px;
}
</style>

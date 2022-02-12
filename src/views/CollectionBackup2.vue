<template>
  <div class="home">
    <button @click="generateCollection">generate</button>
    <div class="container">
      <img v-for="n in 52" :key="n" :id="`img${n - 1}`" />
    </div>
    <p v-for="d in metadata" :key="d.name">{{ d }}</p>
  </div>
</template>

<script>
import mergeImages from "merge-images";
import { standard } from "../tokenStandard";
import { saveAs } from "file-saver";
export default {
  name: "Home",
  data() {
    return {
      metadata: [],
      collectionSize: 52,
      traits: [
        {
          category: "base",
          distribution: [{ trait_value: "base", url: "base", amount: 52 }],
        },
        {
          category: "sky",
          distribution: [
            { trait_value: "daylight", url: "sky1", amount: 39 },
            { trait_value: "sunset", url: "sky2", amount: 13 },
          ],
        },
        {
          category: "coconuts",
          distribution: [
            { trait_value: "triple brown", url: "coconut1", amount: 9 },
            { trait_value: "double brown", url: "coconut2", amount: 9 },
            { trait_value: "triple purple", url: "coconut3", amount: 7 },
            { trait_value: "double purple", url: "coconut4", amount: 7 },
            { trait_value: "triple orange", url: "coconut5", amount: 5 },
            { trait_value: "double orange", url: "coconut6", amount: 5 },
            { trait_value: "triple green", url: "coconut7", amount: 4 },
            { trait_value: "double green", url: "coconut8", amount: 4 },
            { trait_value: "triple gray", url: "coconut9", amount: 1 },
            { trait_value: "double gray", url: "coconut10", amount: 1 },
          ],
        },
        {
          category: "birds",
          distribution: [
            { trait_value: "birds", url: "birds", amount: 39 },
            { trait_value: "none", url: "empty", amount: 13 },
          ],
        },
        {
          category: "rock",
          distribution: [
            { trait_value: "rock", url: "rock", amount: 26 },
            { trait_value: "none", url: "empty", amount: 26 },
          ],
        },
        {
          category: "boats",
          distribution: [
            { trait_value: "left", url: "boat1", amount: 13 },
            { trait_value: "right", url: "boat2", amount: 13 },
            { trait_value: "both", url: "boat3", amount: 13 },
            { trait_value: "none", url: "empty", amount: 13 },
          ],
        },
        {
          category: "towel",
          distribution: [
            { trait_value: "blue", url: "towel1", amount: 26 },
            { trait_value: "red", url: "towel2", amount: 18 },
            { trait_value: "orange", url: "towel3", amount: 8 },
          ],
        },
        {
          category: "leaves",
          distribution: [
            { trait_value: "green", url: "leaves1", amount: 26 },
            { trait_value: "blue", url: "leaves2", amount: 8 },
            { trait_value: "red", url: "leaves3", amount: 5 },
            { trait_value: "yellow", url: "leaves4", amount: 13 },
          ],
        },
      ],
    };
  },
  methods: {
    src: function (name) {
      return require(`../assets/palm/${name}.png`);
    },
    shuffle: function (array) {
      return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    },
    generateAttributeArrays: function () {
      /**
       in this method, an attributes objects will be created where the keys are the traits and the values are the trait distributions
       it will have the form: 
       {
         traitCategory: [array of distributions]
       }
       array of distributions will be an array of objects of the form:
       {value: '', url: ''}
       */
      let attributes = {};
      let traits = JSON.parse(JSON.stringify(this.traits));
      for (let i = 0; i < traits.length; i++) {
        attributes[traits[i].category] = [];
        for (let k = 0; k < traits[i].distribution.length; k++) {
          let t = traits[i].distribution[k];
          for (let j = 0; j < t.amount; j++) {
            attributes[traits[i].category].push({
              value: t.trait_value,
              url: t.url,
            });
          }
        }
        attributes[traits[i].category] = this.shuffle(
          attributes[traits[i].category].flat()
        );
      }
      return attributes;
    },
    generateCollection: function () {
      this.metadata = [];
      let attributes = this.generateAttributeArrays();

      for (let i = 0; i < 52; i++) {
        let delay = i * 500;
        setTimeout(
          function () {
            let id = "img" + i;
            let metadata = this.createMetadata(attributes, i);
            this.downloadMetadata(metadata, i);
            this.metadata.push(metadata);

            mergeImages([
              this.src(attributes.sky[i].url),
              this.src(attributes.base[i].url),
              this.src(attributes.leaves[i].url),
              this.src(attributes.coconuts[i].url),
              this.src(attributes.towel[i].url),
              this.src(attributes.boats[i].url),
              this.src(attributes.birds[i].url),
              this.src(attributes.rock[i].url),
            ]).then((b64) => {
              console.log(b64);
              document.getElementById(id).src = b64;
              saveAs(b64, `${i}.png`);
            });
          }.bind(this),
          delay
        );
      }
    },
    createMetadata: function (attributes, index) {
      let metadata = JSON.parse(JSON.stringify(standard));
      metadata.name = `palmera ${index + 1}`;
      metadata.description = `A collection of 52 palms on the blockchain. This is palm number ${
        index + 1
      }/52`;
      metadata.image = `${index}.png`;
      metadata.properties.files = [{ uri: `${index}.png`, type: "image/png" }];
      metadata.attributes = [
        { trait_type: "sky", value: attributes.sky[index].value },
        { trait_type: "base", value: attributes.base[index].value },
        { trait_type: "leaves", value: attributes.leaves[index].value },
        { trait_type: "coconuts", value: attributes.coconuts[index].value },
        { trait_type: "towel", value: attributes.towel[index].value },
        { trait_type: "boats", value: attributes.boats[index].value },
        { trait_type: "birds", value: attributes.birds[index].value },
        { trait_type: "rock", value: attributes.rock[index].value },
      ];
      return metadata;
    },
    downloadMetadata: function (json, index) {
      var data = JSON.stringify(json);
      var blob = new Blob([data], {
        type: "text/plain",
      });
      let filename = `${index}.json`;
      console.log(blob + filename);
      saveAs(blob, filename);
    },
  },
  mounted() {},
};
</script>
<style scoped>
.home {
  width: 100%;
}
.container {
  position: relative;

  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  gap: 5px;
}

img {
  width: 120px;
}
</style>

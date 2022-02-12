<template>
  <div class="home">
    <button @click="showCollection">generate</button>
    <button @click="downloadCollection">download</button>
    <div class="container">
      <img v-for="n in collectionSize" :key="n" :id="`img${n - 1}`" />
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
      collectionSize: 50,
      trait_distribution: {},
      traits: [
        {
          category: "fondo",
          distribution: [
            { trait_value: "1", url: "BG", amount: 1 },
            { trait_value: "2", url: "BG", amount: 1 },
            { trait_value: "3", url: "BG", amount: 1 },
            { trait_value: "4", url: "BG", amount: 1 },
            { trait_value: "5", url: "BG", amount: 1 },
            { trait_value: "6", url: "BG", amount: 1 },
            { trait_value: "7", url: "BG", amount: 1 },
            { trait_value: "8", url: "BG", amount: 1 },
            { trait_value: "9", url: "BG", amount: 1 },
            { trait_value: "10", url: "BG", amount: 1 },
            { trait_value: "11", url: "BG", amount: 1 },
            { trait_value: "12", url: "BG", amount: 1 },
            { trait_value: "13", url: "BG", amount: 1 },
            { trait_value: "14", url: "BG", amount: 1 },
            { trait_value: "15", url: "BG", amount: 1 },
          ],
        },
        {
          category: "cuerpo",
          distribution: [
            {
              trait_value: "amarillo",
              url: "CUERPO",
              amount: 1,
              variant: "A",
            },
            { trait_value: "maduro", url: "CUERPO", amount: 1 },
            { trait_value: "verde", url: "CUERPO", amount: 1 },
          ],
        },
        {
          category: "boca",
          distribution: [
            { trait_value: "def", url: "BOCA", amount: 1 },
            { trait_value: "dientes", url: "BOCA", amount: 1 },
            { trait_value: "kike", url: "BOCA", amount: 1 },
            { trait_value: "mellow", url: "BOCA", amount: 1 },
            { trait_value: "angry", url: "BOCA", amount: 1 },
            { trait_value: "spartan", url: "BOCA", amount: 1 },
            { trait_value: "mono", url: "BOCA", amount: 1 },
            { trait_value: "tee", url: "BOCA", amount: 1 },
          ],
        },
        {
          category: "cabeza",
          distribution: [
            { trait_value: "1", url: "HEAD", amount: 1 },
            { trait_value: "2", url: "HEAD", amount: 1 },
            { trait_value: "3", url: "HEAD", amount: 1 },
            { trait_value: "4", url: "HEAD", amount: 1 },
            { trait_value: "5", url: "HEAD", amount: 1 },
            { trait_value: "6", url: "HEAD", amount: 1 },
            { trait_value: "7", url: "HEAD", amount: 1 },
            { trait_value: "8", url: "HEAD", amount: 1 },
          ],
        },
        {
          category: "ojos",
          distribution: [
            { trait_value: "1", url: "OJOS", amount: 1 },
            { trait_value: "2", url: "OJOS", amount: 1 },
            { trait_value: "3", url: "OJOS", amount: 1 },
            { trait_value: "4", url: "OJOS", amount: 1 },
            { trait_value: "5", url: "OJOS", amount: 1 },
            { trait_value: "6", url: "OJOS", amount: 1 },
            { trait_value: "7", url: "OJOS", amount: 1 },
            { trait_value: "8", url: "OJOS", amount: 1 },
            { trait_value: "9", url: "OJOS", amount: 1 },
            { trait_value: "10", url: "OJOS", amount: 1 },
            { trait_value: "11", url: "OJOS", amount: 1 },
          ],
        },
        {
          category: "porro",
          distribution: [
            { trait_value: "porro", url: "PORRO", amount: 2 },
            { trait_value: "no", url: "NONE", amount: 8 },
          ],
        },
      ],
    };
  },
  methods: {
    src: function (name) {
      return require(`../assets/mnk/${name}.png`);
    },
    shuffle: function (array) {
      return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    },
    setColorVariant: function (object) {
      if (object.value == "amarillo") {
        return "A";
      } else if (object.value == "maduro") {
        return "M";
      } else {
        return "V";
      }
    },
    calculateTraitAmountsBasedOnCollectionSize: function (traits) {
      for (let i = 0; i < traits.length; i++) {
        const trait = traits[i];
        let relative_variance = trait.distribution.map((e) => {
          return e.amount;
        });
        // reset distributions
        trait.distribution = trait.distribution.map((e) => {
          e.amount = 0;
          return e;
        });
        console.log(trait.distribution);
        let allocated = 0;
        for (let j = 0; j < this.collectionSize; j++) {
          let index = j % relative_variance.length;
          trait.distribution[index].amount += relative_variance[index];
          allocated += relative_variance[index];
          if (allocated >= this.collectionSize) {
            let difference = allocated - this.collectionSize;
            trait.distribution[index].amount -= difference;
            break;
          }
        }
        console.log(allocated);
        console.log(trait.distribution);
      }
      return traits;
    },
    modifyUrlBasedOnBodyColor: function (attributes) {
      let modified = attributes.boca.map((e, i) => {
        return {
          value: e.value,
          url: e.url.slice(0, -1) + this.setColorVariant(attributes.cuerpo[i]),
        };
      });
      for (let i = 0; i < attributes.ojos.length; i++) {
        const element = attributes.ojos[i];
        if (element.url == "OJOS_9_A") {
          element.url =
            element.url.slice(0, -1) +
            this.setColorVariant(attributes.cuerpo[i]);
        }
      }
      attributes.boca = modified;
      return attributes;
    },
    generateTraitDistributions: function (trait_object) {
      /**
       in this method, an attributes objects will be created where the keys are the traits and the values are the trait distributions
       it will have the form: 
       {
         traitCategory: [array of distributions]
       }
       array of distributions will be an array of objects of the form:
       {value: '', url: ''}
       */
      let traits = JSON.parse(JSON.stringify(trait_object));
      traits = this.calculateTraitAmountsBasedOnCollectionSize(traits);
      let attributes = {};
      for (let i = 0; i < traits.length; i++) {
        attributes[traits[i].category] = [];
        for (let k = 0; k < traits[i].distribution.length; k++) {
          let trait = traits[i].distribution[k];
          for (let j = 0; j < trait.amount; j++) {
            attributes[traits[i].category].push({
              value: trait.trait_value,
              url: `${trait.url}_${k + 1}_A`,
            });
          }
        }
        attributes[traits[i].category] = this.shuffle(
          attributes[traits[i].category].flat()
        );
      }

      return this.modifyUrlBasedOnBodyColor(attributes);
    },
    showCollection: function () {
      this.metadata = [];
      this.trait_distribution = this.generateTraitDistributions(this.traits);
      let trait_distribution = this.trait_distribution;
      for (let i = 0; i < this.collectionSize; i++) {
        let delay = i * 5;
        setTimeout(
          function () {
            let id = "img" + i;
            let metadata = this.createMetadata(trait_distribution, i);
            //this.downloadMetadata(metadata, i);
            this.metadata.push(metadata);

            mergeImages([
              this.src(trait_distribution.fondo[i].url),
              this.src(trait_distribution.cuerpo[i].url),
              this.src(trait_distribution.boca[i].url),
              this.src(trait_distribution.cabeza[i].url),
              this.src(trait_distribution.ojos[i].url),
              this.src(trait_distribution.porro[i].url),
            ]).then((b64) => {
              document.getElementById(id).src = b64;
            });
          }.bind(this),
          delay
        );
      }
    },
    downloadCollection: function () {
      let trait_distribution = this.trait_distribution;
      for (let i = 0; i < this.collectionSize; i++) {
        let delay = i * 500;
        setTimeout(
          function () {
            let id = "img" + i;
            let metadata = this.metadata[i];
            this.downloadMetadata(metadata, i);

            mergeImages([
              this.src(trait_distribution.fondo[i].url),
              this.src(trait_distribution.cuerpo[i].url),
              this.src(trait_distribution.boca[i].url),
              this.src(trait_distribution.cabeza[i].url),
              this.src(trait_distribution.ojos[i].url),
              this.src(trait_distribution.porro[i].url),
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
      metadata.name = `mnkbnn ${index + 1}`;
      metadata.description = `A collection of ${
        this.collectionSize
      } mnkbnn's on the blockchain. This is mnkbnn number ${index + 1}/${
        this.collectionSize
      }`;
      metadata.image = `${index}.png`;
      metadata.properties.files = [{ uri: `${index}.png`, type: "image/png" }];
      metadata.attributes = [
        { trait_type: "fondo", value: attributes.fondo[index].value },
        { trait_type: "cuerpo", value: attributes.cuerpo[index].value },
        { trait_type: "boca", value: attributes.boca[index].value },
        { trait_type: "cabeza", value: attributes.cabeza[index].value },
        { trait_type: "ojos", value: attributes.ojos[index].value },
        { trait_type: "porro", value: attributes.porro[index].value },
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
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
}

img {
  width: 400px;
}
</style>

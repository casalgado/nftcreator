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
      collectionSize: 222,
      trait_distribution: {},
      traits: [
        {
          category: "fondo",
          distribution: [
            { trait_value: "Haze", url: "BG", amount: 4 },
            { trait_value: "YCNSM", url: "BG", amount: 4 },
            { trait_value: "Pixelated", url: "BG", amount: 4 },
            { trait_value: "Uva", url: "BG", amount: 15 },
            { trait_value: "Esmeralda", url: "BG", amount: 15 },
            { trait_value: "Pasto", url: "BG", amount: 15 },
            { trait_value: "Mango", url: "BG", amount: 15 },
            { trait_value: "Indigo", url: "BG", amount: 15 },
            { trait_value: "Melon", url: "BG", amount: 15 },
            { trait_value: "Manzana", url: "BG", amount: 15 },
            { trait_value: "Ponche", url: "BG", amount: 16 },
            { trait_value: "Durazno", url: "BG", amount: 16 },
            { trait_value: "Ceruleo", url: "BG", amount: 16 },
            { trait_value: "Orquidea", url: "BG", amount: 16 },
            { trait_value: "Purpura", url: "BG", amount: 16 },
          ],
        },
        {
          category: "cuerpo",
          distribution: [
            {
              trait_value: "Banano",
              url: "CUERPO",
              amount: 5,
              variant: "A",
            },
            { trait_value: "Maduro", url: "CUERPO", amount: 3 },
            { trait_value: "Platano", url: "CUERPO", amount: 2 },
          ],
        },
        {
          category: "boca",
          distribution: [
            { trait_value: "Mellow", url: "BOCA", amount: 9 },
            { trait_value: "Coraje", url: "BOCA", amount: 5 },
            { trait_value: "Kike", url: "BOCA", amount: 5 },
            { trait_value: "Smile", url: "BOCA", amount: 9 },
            { trait_value: "The Mask", url: "BOCA", amount: 5 },
            { trait_value: "Samurai", url: "BOCA", amount: 3 },
            { trait_value: "R2", url: "BOCA", amount: 5 },
            { trait_value: "Mono", url: "BOCA", amount: 5 },
            { trait_value: "Tres Dias", url: "BOCA", amount: 5 },
          ],
        },
        {
          category: "cabeza",
          distribution: [
            { trait_value: "MNKY Cafe", url: "HEAD", amount: 1 },
            { trait_value: "Midnight Language", url: "HEAD", amount: 1 },
            { trait_value: "Beanie Beta", url: "HEAD", amount: 3 },
            { trait_value: "MNKY Gris", url: "HEAD", amount: 2 },
            { trait_value: "Peeled", url: "HEAD", amount: 4 },
            { trait_value: "Bombin", url: "HEAD", amount: 6 },
            { trait_value: "Fuego", url: "HEAD", amount: 1 },
            { trait_value: "Mono", url: "HEAD", amount: 6 },
            { trait_value: "Banana", url: "HEAD", amount: 4 },
            { trait_value: "Gorra Ramo", url: "HEAD", amount: 2 },
          ],
        },
        {
          category: "ojos",
          distribution: [
            { trait_value: "MNKY", url: "OJOS", amount: 10 },
            { trait_value: "Susto", url: "OJOS", amount: 10 },
            { trait_value: "Kike", url: "OJOS", amount: 5 },
            { trait_value: "Bravos", url: "OJOS", amount: 10 },
            { trait_value: "Eva", url: "OJOS", amount: 10 },
            { trait_value: "Rayban", url: "OJOS", amount: 5 },
            { trait_value: "El Siguiente Programa", url: "OJOS", amount: 5 },
            { trait_value: "Trippin", url: "OJOS", amount: 1 },
            { trait_value: "High", url: "OJOS", amount: 3 },
            { trait_value: "La Forge", url: "OJOS", amount: 1 },
            { trait_value: "Sayayin", url: "OJOS", amount: 1 },
          ],
        },
        {
          category: "porro",
          distribution: [
            { trait_value: "si", url: "PORRO", amount: 2 },
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
      if (object.value == "Banano") {
        return "A";
      } else if (object.value == "Maduro") {
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
      console.log(attributes);
      // the method below modifies all mouths
      let modifiedBocas = attributes.boca.map((e, i) => {
        return {
          value: e.value,
          url: e.url.slice(0, -1) + this.setColorVariant(attributes.cuerpo[i]),
        };
      });
      attributes.boca = modifiedBocas;

      // the method below modifies selected eyes
      for (let i = 0; i < attributes.ojos.length; i++) {
        const element = attributes.ojos[i];
        if (element.url == "OJOS_9_A") {
          element.url =
            element.url.slice(0, -1) +
            this.setColorVariant(attributes.cuerpo[i]);
        }
      }

      // here it covers the special case with head 8 where body url has to be changed

      // the method below modifies selected heads
      let modifiedHeads = ["HEAD_5_A", "HEAD_8_A", "HEAD_9_A"];
      for (let i = 0; i < attributes.cabeza.length; i++) {
        const element = attributes.cabeza[i];
        if (modifiedHeads.includes(element.url)) {
          if (element.url == "HEAD_8_A") {
            attributes.cuerpo[i].url =
              attributes.cuerpo[i].url.slice(0, -1) + "F";
          }
          element.url =
            element.url.slice(0, -1) +
            this.setColorVariant(attributes.cuerpo[i]);
        }
      }

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
        let delay = (i + 1) * 500;
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
      this.downloadMetadata(this.metadata, this.collectionSize);
    },
    createMetadata: function (attributes, index) {
      let metadata = JSON.parse(JSON.stringify(standard));
      metadata.name = `MNKY BANANA ${index + 1}`;
      metadata.description = `A collection of ${
        this.collectionSize
      } MNKY BANANAS on the blockchain. This is MNKY BANANA number ${
        index + 1
      }/${this.collectionSize}`;
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
  grid-template-columns: repeat(8, 1fr);
  gap: 5px;
}

img {
  width: 200px;
}
</style>

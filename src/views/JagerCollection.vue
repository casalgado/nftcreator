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
import { standard } from "../jagerStandard";
import { saveAs } from "file-saver";
export default {
  name: "Home",
  data() {
    return {
      metadata: [],
      collectionSize: 56,
      trait_distribution: {},
      traits: [
        {
          category: "fondo",
          distribution: [
            // { trait_value: "Haze", url: "BG_1", amount: 1 },
            // { trait_value: "YCNSM", url: "BG_2", amount: 1 },
            // { trait_value: "Pixelated", url: "BG_3", amount: 1 },
            { trait_value: "Uva", url: "BG_4", amount: 1 },
            { trait_value: "Esmeralda", url: "BG_5", amount: 1 },
            { trait_value: "Pasto", url: "BG_6", amount: 1 },
            { trait_value: "Mango", url: "BG_7", amount: 1 },
            { trait_value: "Indigo", url: "BG_8", amount: 1 },
            { trait_value: "Melon", url: "BG_9", amount: 1 },
            { trait_value: "Manzana", url: "BG_10", amount: 1 },
            { trait_value: "Ponche", url: "BG_11", amount: 1 },
            { trait_value: "Durazno", url: "BG_12", amount: 1 },
            { trait_value: "Ceruleo", url: "BG_13", amount: 1 },
            { trait_value: "Orquidea", url: "BG_14", amount: 1 },
            { trait_value: "Purpura", url: "BG_15", amount: 1 },
            {
              trait_value: "Jager Green",
              url: "BG_16",
              amount: 1,
              jager: true,
            },
          ],
        },
        {
          category: "cuerpo",
          distribution: [
            {
              trait_value: "Banano",
              url: "CUERPO_1",
              amount: 4,
              variant: "A",
            },
            { trait_value: "Platano", url: "CUERPO_3", amount: 4 },
          ],
        },
        {
          category: "boca",
          distribution: [
            { trait_value: "Mellow", url: "BOCA_1", amount: 1 },
            { trait_value: "Coraje", url: "BOCA_2", amount: 1 },
            { trait_value: "Kike", url: "BOCA_3", amount: 1 },
            { trait_value: "Smile", url: "BOCA_4", amount: 1 },
            { trait_value: "The Mask", url: "BOCA_5", amount: 1 },
            { trait_value: "Samurai", url: "BOCA_6", amount: 1 },
            { trait_value: "R2", url: "BOCA_7", amount: 1 },
            { trait_value: "Mono", url: "BOCA_8", amount: 1 },
            { trait_value: "Tres Dias", url: "BOCA_9", amount: 1 },
          ],
        },
        {
          category: "cabeza",
          distribution: [
            // { trait_value: "MNKY Cafe", url: "HEAD_1", amount: 1 },
            // { trait_value: "Midnight Language", url: "HEAD_2", amount: 1 },
            // { trait_value: "Beanie Beta", url: "HEAD_3", amount: 1 },
            // { trait_value: "MNKY Gris", url: "HEAD_4", amount: 1 },
            { trait_value: "Peeled", url: "HEAD_5", amount: 1 },
            { trait_value: "Bombin", url: "HEAD_6", amount: 1 },
            { trait_value: "Fuego", url: "HEAD_7", amount: 1 },
            { trait_value: "Mono", url: "HEAD_8", amount: 1 },
            { trait_value: "Banana", url: "HEAD_9", amount: 1 },
            { trait_value: "Gorra Ramo", url: "HEAD_10", amount: 1 },
            {
              trait_value: "Jager Beanie",
              url: "HEAD_12",
              amount: 1,
              jager: true,
            },
            {
              trait_value: "Jager Antler",
              url: "HEAD_11",
              amount: 1,
              jager: true,
            },
          ],
        },
        {
          category: "ojos",
          distribution: [
            { trait_value: "MNKY", url: "OJOS_1", amount: 1 },
            { trait_value: "Susto", url: "OJOS_2", amount: 1 },
            { trait_value: "Kike", url: "OJOS_3", amount: 1 },
            { trait_value: "Bravos", url: "OJOS_4", amount: 1 },
            { trait_value: "Eva", url: "OJOS_5", amount: 1 },
            { trait_value: "Rayban", url: "OJOS_6", amount: 1 },
            { trait_value: "El Siguiente Programa", url: "OJOS_7", amount: 1 },
            // { trait_value: "Trippin", url: "OJOS_8", amount: 1 },
            // { trait_value: "High", url: "OJOS_9", amount: 3 },
            {
              trait_value: "Jager Forge",
              url: "OJOS_12",
              amount: 1,
              jager: true,
            },
            { trait_value: "Sayayin", url: "OJOS_11", amount: 1 },
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
    modifyTraits: function (attributes) {
      console.log(attributes);

      // makes sure each nft has a jager trait.
      let jagerTraits = [
        { type: "fondo", value: "Jager Green", url: "BG_16_A" },
        { type: "cabeza", value: "Jager Antler", url: "HEAD_11_A" },
        { type: "cabeza", value: "Jager Beanie", url: "HEAD_12_A" },
        { type: "ojos", value: "Jager Forge", url: "OJOS_12_A" },
      ];

      for (let i = 0; i < attributes.fondo.length; i++) {
        // get random jager trait
        let jagerTrait = jagerTraits[Math.floor((Math.random() * 10) % 4)];
        attributes[jagerTrait.type][i].value = jagerTrait.value;
        attributes[jagerTrait.type][i].url = jagerTrait.url;
      }

      // make sure there is at least one NFT with all jager traits
      let index = [Math.floor((Math.random() * 100) % this.collectionSize)];
      attributes.fondo[index].value = "Jager Green";
      attributes.fondo[index].url = "BG_16_A";
      attributes.cabeza[index].value = "Jager Antler";
      attributes.cabeza[index].url = "HEAD_11_A";
      attributes.ojos[index].value = "Jager Forge";
      attributes.ojos[index].url = "OJOS_12_A";

      // modifies all mouths to match body color
      let modifiedBocas = attributes.boca.map((e, i) => {
        return {
          value: e.value,
          url: e.url.slice(0, -1) + this.setColorVariant(attributes.cuerpo[i]),
        };
      });
      attributes.boca = modifiedBocas;

      // modifies selected eyes to match body color
      for (let i = 0; i < attributes.ojos.length; i++) {
        const element = attributes.ojos[i];
        if (element.url == "OJOS_9_A") {
          element.url =
            element.url.slice(0, -1) +
            this.setColorVariant(attributes.cuerpo[i]);
        }
      }

      // modifies selected heads to match body color and
      // it covers the special case with head 8 and 11 where body url has to be changed
      let modifiedHeads = ["HEAD_5_A", "HEAD_8_A", "HEAD_9_A", "HEAD_11_A"];
      for (let i = 0; i < attributes.cabeza.length; i++) {
        const element = attributes.cabeza[i];
        if (modifiedHeads.includes(element.url)) {
          if (element.url == "HEAD_8_A" || element.url == "HEAD_11_A") {
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
      }
      return traits;
    },
    generateTraitDistributions: function (traits_object) {
      /**
       in this method, an attributes objects will be created where the keys are the traits and the values are the trait distributions
       it will have the form:
       {
         traitCategory: [array of distributions]
       }
       array of distributions will be an array of objects of the form:
       {value: '', url: ''}
       */
      let traits = JSON.parse(JSON.stringify(traits_object));
      traits = this.calculateTraitAmountsBasedOnCollectionSize(traits);
      let attributes = {};
      for (let i = 0; i < traits.length; i++) {
        attributes[traits[i].category] = [];
        for (let k = 0; k < traits[i].distribution.length; k++) {
          let trait = traits[i].distribution[k];
          for (let j = 0; j < trait.amount; j++) {
            attributes[traits[i].category].push({
              value: trait.trait_value,
              url: `${trait.url}_A`,
              jager: trait.jager ? trait.jager : null,
            });
          }
        }
        attributes[traits[i].category] = this.shuffle(
          attributes[traits[i].category].flat()
        );
      }

      return this.modifyTraits(attributes);
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
            ]).then((b64) => {
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
      metadata.name = `JAGER BANANA ${index + 1}`;
      metadata.description = `A collection of ${
        this.collectionSize
      } JAGER BANANAS on the blockchain. This is JAGER BANANA number ${
        index + 1
      }/${this.collectionSize}`;
      metadata.image = `${index}.png`;
      metadata.attributes = [
        { trait_type: "fondo", value: attributes.fondo[index].value },
        { trait_type: "cuerpo", value: attributes.cuerpo[index].value },
        { trait_type: "boca", value: attributes.boca[index].value },
        { trait_type: "cabeza", value: attributes.cabeza[index].value },
        { trait_type: "ojos_", value: attributes.ojos[index].value },
      ];
      return metadata;
    },
    downloadMetadata: function (json, index) {
      var data = JSON.stringify(json);
      var blob = new Blob([data], {
        type: "text/plain",
      });
      let filename = `${index}.json`;
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

<template>
  <div class="home">
    <div id="container">
      <img
        v-for="name in imageNames"
        :key="name"
        :alt="name"
        :src="src(name)"
      />
    </div>
  </div>
</template>

<script>
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
    let hat = ["Hat1", "Hat2"];
    let mouth = ["Mouth1", "Mouth2"];
    let combined = [bgs, base, hat, mouth];
    for (let i = 0; i < combined.length; i++) {
      let current = combined[i];
      this.imageNames.push(current[Math.floor(Math.random() * current.length)]);
    }
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

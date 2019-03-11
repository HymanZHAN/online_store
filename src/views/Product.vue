<template>
  <div class="overlay">
    <div class="overlay__inner">
      <a class="overlay__close" href="#" aria-label="close" @click.prevent="$router.back()">x</a>
      <section class="wrapper">
        <div class="flex-col">
          <img :src="makeImagePath(product)" alt class="flex-col--2">
          <div class="flex-col--2">
            <h2>{{ product.name }}</h2>
            <button @click="addToCart" class="btn btn--grey">Add to Cart</button>
            <p>Price: ${{ product.price }}</p>
            <p v-if="typeof product.size === 'string'">Size: {{ product.size }}</p>
            <div v-if="typeof product.size === 'object'">
              <p>Size:</p>
              <p
                class="sub-item"
                v-for="(value, key, index) in product.size"
                v-bind:item="value"
                v-bind:index="index"
                v-bind:key="value.id"
              >&nbsp;&nbsp;{{key}}: {{value}}</p>
            </div>
            <p>Color: {{ product.color }}</p>
            <p>
              <em>{{ product.quantity }} left in stock</em>
            </p>
            <h3>Details</h3>
            <ul>
              <li>Material: {{ product.details.material }}</li>
              <li>Fit: {{ product.details.fit }}</li>
              <li>Maintenance: {{ product.details.maintenance }}</li>
              <li v-if="product.details.additional">Additional: {{ product.details.additional }}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { imagePath } from "@/mixins/imagePath.js";

export default {
  name: "product",
  mixins: [imagePath],
  data() {
    return {
      product: this.$store.getters.product(this.$route.params.id)
    };
  },
  methods: {
    addToCart() {
      this.$store.dispatch("addToCart", this.$route.params.id);
    }
  }
};
</script>

<style lang="scss">
.flex-col {
  display: flex;
  align-items: flex-start;
}

.flex-col--2 {
  width: 50%;
}

li {
  line-height: 150%;
}

.btn {
  padding: 0.5rem 0.75rem;
  border-radius: 3px;
  border: none;
  background-color: transparent;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn--grey {
  background-color: #2c3e50;
  color: #fff;
  &:hover,
  &:focus {
    &:not([disabled]) {
      background-color: #42b983;
      cursor: pointer;
    }
    &:disabled {
      cursor: default;
    }
  }
}

img {
  margin: 25px;
}

.overlay {
  position: fixed;
  top: 10rem;
  right: 20rem;
  bottom: 0;
  left: 20rem;
  overflow: hidden;
  background: #fff;
  &__inner {
    position: relative;
    max-width: 42em;
    margin-right: auto;
    margin-left: auto;
    padding: 1em;
  }
  &__close {
    position: absolute;
    top: 1em;
    right: 1em;
    text-decoration: none;
    font-size: 1.25em;
    color: #2c3e50;
    transition: color 0.2s;
    &:hover,
    &:focus {
      color: #42b983;
    }
  }
}
</style>
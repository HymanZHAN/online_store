<template>
  <div class="wrapper">
    <h2>Cart</h2>
    <h3 v-if="totalCount===0">Your shopping cart is empty...
      <router-link to="/" id="store-link">Explore our store!</router-link>
    </h3>

    <div class="flex-col">
      <ul class="cart-list">
        <li class="flex-col cart-list__item" v-for="item in cartItems" :key="item.id">
          <router-link :to="{ name: 'product', params: { id: item.id }}">
            <img :src="makeImagePath(item)" class="thumbnail" alt>
          </router-link>
          <div class="flex-col cart-list__item__details">
            <div class="product-summary">
              <p>{{ item.name }}</p>
              <p v-if="typeof item.size !== 'object'">Size: {{ item.size }}</p>
              <div v-if="typeof item.size === 'object'">
                <p>Size:</p>
                <p class="sub-item">&nbsp;&nbsp;Waist: {{item.size.waist}}</p>
                <p class="sub-item">&nbsp;&nbsp;Length: {{item.size.length}}</p>
              </div>
              <p>Color: {{ item.color }}</p>
            </div>
            <div class="price-and-quantity">
              <p>${{ item.price }}</p>
              <p>Quantity: {{ itemCount[item.id] }}</p>
            </div>
            <button @click="removeFromCart(item.id)" class="btn cart-list__btn-remove">Remove</button>
          </div>
        </li>
      </ul>

      <section class="total-section" v-if="totalCount>0">
        <ul class="total-section-list">
          <li class="total-section__item">
            <p class="total-section__item__label">{{ totalCount }} items</p>
            <p>$ {{ itemsSubtotal }}</p>
          </li>
          <li class="total-section__item">
            <p class="total-section__item__label">Shipping</p>
            <select v-model="selectedShippingOption">
              <option value disabled>Please select an option</option>
              <option
                v-for="option in shippingOptionsArray"
                :key="option.text"
                :value="option.rate"
              >{{option.text}} (${{option.rate}})</option>
            </select>
          </li>
          <li class="total-section__item">
            <p class="total-section__item__label">Tax</p>
            <p>$ {{ salesTaxApplied }}</p>
          </li>
          <li class="total-section__item">
            <p class="total-section__item__label">Subtotal</p>
            <p>$ {{ subtotal }}</p>
          </li>
          <li class="total-section__item">
            <p class="total-section__item__label">Total</p>
            <p>$ {{ total }}</p>
          </li>
        </ul>
        <button
          :disabled="!this.selectedShippingOption"
          class="btn btn--grey total-section__checkout-button"
        >
          <span v-if="!this.selectedShippingOption">Choose a shipping option...</span>
          <span v-if="this.selectedShippingOption">Check out</span>
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import { imagePath } from "@/mixins/imagePath.js";

export default {
  name: "cart",
  mixins: [imagePath],
  data() {
    return {
      selectedShippingOption: "",
      shippingOptionsArray: [
        {
          text: "One day",
          rate: 20
        },
        {
          text: "Two days",
          rate: 15
        },
        {
          text: "Three to five days",
          rate: 10
        },
        {
          text: "One week or more",
          rate: 5
        }
      ],
      salesTax: 0.06
    };
  },
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
    itemCount() {
      return this.$store.getters.itemCount;
    },
    totalCount() {
      return this.$store.state.cart.length;
    },
    itemsSubtotal() {
      return this.cartItems
        .reduce((total, item) => {
          return total + item.price * this.itemCount[item.id];
        }, 0)
        .toFixed(2);
    },
    salesTaxPercentage() {
      return `${this.salesTax * 100}%`;
    },
    salesTaxApplied() {
      if (this.selectedShippingOption) {
        return (this.subtotal * this.salesTax).toFixed(2);
      }
      return "---";
    },
    subtotal() {
      if (this.selectedShippingOption) {
        return (
          Number(this.itemsSubtotal) + Number(this.selectedShippingOption)
        ).toFixed(2);
      }
      return "---";
    },
    total() {
      if (this.selectedShippingOption) {
        return Number(this.subtotal) + Number(this.salesTaxApplied);
      }
      return "---";
    }
  },
  methods: {
    removeFromCart(itemId) {
      this.$store.dispatch("removeFromCart", itemId);
    }
  }
};
</script>

<style lang="scss">
.cart-list {
  width: 70%;
  margin-right: 1rem;
  @media only screen and (max-width: 832px) {
    width: 100%;
  }
}
.cart-list__item {
  width: 100%;
  border-bottom: 1px solid #2c3e50;
}
.cart-list__item__details {
  flex: 2;
  justify-content: space-between;
  margin-left: 2rem;
}
.product-summary {
  width: 10rem;
}
.price-and-quantity {
  width: 5rem;
  float: right;
}
.cart-list__btn-remove {
  margin-top: 0.5rem;
  &:hover {
    color: red;
  }
}
.thumbnail {
  max-width: 6rem;
  margin: 0.5rem;
  padding-top: 0.5rem;
}
.total-section {
  background: #fafafa;
  padding: 0 1rem 1rem;
  min-width: 33%;
}
.total-section-list {
  margin: 0;
}
.total-section__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.total-section__item__label {
  font-weight: bold;
  margin-right: 1rem;
}

.total-section__checkout-button {
  width: 100%;
}

#store-link {
  color: #42b983;
}
</style>

<script setup>
import { onMounted } from "vue";
import { useCartStore } from "../stores/cart";
import { storeToRefs } from "pinia"; //it helps to add reactivity to the state
const store = useCartStore();
const { itemsArray} = storeToRefs(store);

onMounted(() => {
  let retrievedData = localStorage.getItem("items");
  if (retrievedData) itemsArray.value = JSON.parse(retrievedData);
});

</script>
<template>
  <h1>Your cart</h1>
  <v-container class="bg-grey">
    <div v-if="itemsArray.length > 0">
      <v-row>
      <v-col
        v-for="i in itemsArray"
        :key="i.id"
        cols="12" sm="6" md="4"
      >
        <v-card
          class="pa-10 ma-5 d-flex flex-column justify-center ga-3 bg-primary text-h4"
        >
          <v-card-title>{{ i.name }}</v-card-title>
          <v-img :src="i.designUrl" alt="Design Image"></v-img>
          <p>{{ i.finalPrice }}</p>
        </v-card>
      </v-col>
    </v-row>
    </div>
    <main v-else>
      <h2>There is nothing in your cart</h2>
    </main>
  </v-container>
</template>

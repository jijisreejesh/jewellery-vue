<script setup>
import { ref, onMounted } from "vue";
import { useCartStore } from "../stores/cart";
import { storeToRefs } from "pinia";
import {IconUpload,IconPhotoFilled} from '@tabler/icons-vue'
const store=useCartStore();
const {itemsArray}=storeToRefs(store)
const {editedItemSave,uploadImage}=store;
const props=defineProps({
    id:String
})
const editedItem = ref({
  id: "",
  name: "",
  category: "",
  description: "",
  totalPrice: 0,
  designUrl: "",
        composition: [
          {
            material: "",
            count: 0,
            weight: 0,
            price: 0,
            purity: "",
          },
        ],
});
let retrievedItem;
onMounted(()=>{
  let retrievedData=localStorage.getItem("items");
  if(retrievedData)
     itemsArray.value=JSON.parse(retrievedData)
     if(props.id)
{
  retrievedItem=itemsArray.value.find((item)=>{
        return props.id===item.id;
    })
    editedItem.value=retrievedItem;  
}
})
const cancelEdit=()=>{
  console.log(retrievedItem);
  
    editedItem.value=retrievedItem;
}

</script>

<template>
<v-container>
<!-- <span class="text-h5 text-center bg-grey">EDIT ITEM</span> -->

<v-row>

<v-col cols="4">
<v-card class="h-100" >
<h1>Image</h1>
<IconPhotoFilled/>
<v-img
  :width="300"
  aspect-ratio="16/9"
  cover
  :src="editedItem.designUrl?editedItem.designUrl: IconPhotoFilled"
></v-img>
<v-text-field v-model="editedItem.designUrl" label="Enter your image url" class="ma-4 outlined">
  <template #append>
    <IconUpload @click="uploadImage(editedItem)"/>
  </template>
</v-text-field>
</v-card>
</v-col>

<v-col cols="8" >
<v-card class="h-100">
            <v-card-title>
              <span class="text-h5">New Item</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name of item"
                      
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    
                    <v-select
                      label="Select Category"
                      v-model="editedItem.category"
                      :items="[
                        'EarRing',
                        'Pendant',
                        'Ring',
                        'Chain',
                        'Necklace',
                        'Bangle',
                        'Bracelet',
                      ]"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                    type="Number"
                      v-model="editedItem.totalPrice"
                      label="TotalPrice"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
              </v-container>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="cancelEdit">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="editedItemSave(editedItem)">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
</v-col>

</v-row>


</v-container>

</template>
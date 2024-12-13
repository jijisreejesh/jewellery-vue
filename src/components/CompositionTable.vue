<script setup>
import {ref,computed, onMounted} from 'vue';
import { useCartStore } from "../stores/cart";
import { storeToRefs } from "pinia";
import { IconTrash,IconPencil } from "@tabler/icons-vue";
const store = useCartStore();
const { itemsArray ,defaultItem} = storeToRefs(store);
const {compositionSave}=store;
const props=defineProps({
    id:{
        type:String
    }
})

let retrievedItem;
onMounted(() => {
  let retrievedData = localStorage.getItem("items");
  if (retrievedData) itemsArray.value = JSON.parse(retrievedData);
  if (props.id) {
    retrievedItem = itemsArray.value.find((item) => {
      return props.id === item.id;
    });
    editedItem.value = { ...retrievedItem };
  }
});
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
      const composition=ref({
            material: "",
            count: 0,
            weight: 0,
            price: 0,
            purity: "",
      })
const headers = [
  { title: "Material,", key: "material" },
  { title: "count", key: "count" },
  { title: "Weight", key: "weight" },
  { title: "Price", key: "price" },
  { title: "Purity", key: "purity" },
  { title: 'Actions', key: 'actions'}
];
const dialog = ref(false);
const dialogDelete=ref(false);
const editedIndex=ref(-1)
const formTitle=computed(()=>{
  return  editedIndex.value === -1 ? 'New Item' : 'Edit Item'
})
const closeComposition=(()=>{
   dialog.value=false;
   editedItem.value=Object.assign({}, defaultItem.value)
})
const closeDeleteCompositionDialog=(()=>{
dialogDelete.value=false;
editedItem.value=Object.assign({}, defaultItem.value);
})

const showCompositionDialog=()=>{
  dialogDelete.value = true;
  //editedItem.value=item;
}
const save=(()=>{
  if(editedItem.composition[0].count===0 && editedItem.composition[0].material===''&&editedItem.composition[0].purity===''&&editedItem.composition[0].price===0&&editedItem.composition[0].weight===0)
   {
    item.composition[0]=composition;
    console.log(item);
   }
   else
   {
    editedItem.composition.push(composition)
    console.log(editedItem);
   }
   compositionSave(editedItem)
})
</script>

<template>
    <v-data-table :headers="headers" :items="editedItem.composition" class="ma-5">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="ma-3">COMPOSITION</v-toolbar-title>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="composition.material"
                      label="Enter material"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="composition.count"
                      label="Count of material"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="composition.weight"
                      label="Weight(g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="composition.price"
                      label="Price"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="composition.purity"
                      label="Purity"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="closeComposition"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>        
          </v-card>
        </v-dialog>
        
        <!-- Dialog box for delete -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDeleteCompositionDialog">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteCompositionConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>

    <template v-slot:item.actions="{item  }">
      <v-icon class="ma-2" size="small" @click="" style="color:blue">
        <IconPencil/>
      </v-icon>
      <v-icon size="small" @click="showCompositionDialog" style="color: red;"> <IconTrash/> </v-icon>
    </template>  
   
  </v-data-table>

</template>
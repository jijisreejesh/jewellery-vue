import { ref, computed} from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from "uuid";
export const useCartStore=defineStore("cart",()=>{
    const itemsArray=ref([]);
    const defaultItem = ref({
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
    //actions
    const save = (editedItem) => {
        // if (editedIndex.value > -1) {
        //   Object.assign(itemsArray.value[editedIndex.value], editedItem.value);
        // } else {
          editedItem.id = uuidv4();
          itemsArray.value.push(editedItem);
       // }
      localStore();
         
      };
      const localStore=()=>{
        localStorage.setItem("items",JSON.stringify(itemsArray.value))
      }
      
const deleteItemConfirm=(item)=>{
    const itemSearch = itemsArray.value.find((i) => {
        return i.id === item.id;
      });
      let index = itemsArray.value.indexOf(itemSearch);
      itemsArray.value.splice(index, 1);
      localStore();
  }
  
    return {itemsArray,save,defaultItem,deleteItemConfirm};
});

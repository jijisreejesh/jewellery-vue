import { ref,computed} from 'vue';
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
        ],
        finalPrice:0
      });
      const fPrice = computed(() => {
        const totalPrice = Number(defaultItem.value.totalPrice) || 0;
        const  compositionPrice = defaultItem.value.composition.reduce((acc, item) => acc +(Number (item.price )|| 0),0);
        return totalPrice + compositionPrice;
      });
    const save = () => {
         defaultItem.value.id = uuidv4();
         defaultItem.value.finalPrice=fPrice;
          itemsArray.value.push(defaultItem.value);
      localStore();
         
      };
      const localStore=()=>{
        localStorage.setItem("items",JSON.stringify(itemsArray.value))
      }
      
const deleteItemConfirm=()=>{
    const itemSearch = itemsArray.value.find((i) => {
        return i.id === defaultItem.value.id;
      });
      let index = itemsArray.value.indexOf(itemSearch);
      itemsArray.value.splice(index, 1);
      localStore();
  }
  const editedItemSave=(()=>{
    const itemSearch = itemsArray.value.find((i) => {
      return i.id === defaultItem.value.id;
    });
    let index = itemsArray.value.indexOf(itemSearch);
    defaultItem.value.finalPrice=fPrice;
    Object.assign(itemsArray.value[index],defaultItem.value);
    localStore();
  })
 
 const compositionSave=(()=>{
  // const itemSearch = itemsArray.value.find((i) => {
  //   return i.id === defaultItem.value.id;
  // });
  // console.log(itemSearch);
  // let index = itemsArray.value.indexOf(itemSearch);
  // console.log(index);
  
  //   Object.assign(itemsArray.value[index], defaultItem.value);
    localStore();   
 
 })
 
       
const deleteCompositionConfirm=((index)=>{
  const itemSearch = itemsArray.value.find((i) => {
      return i.id === defaultItem.value.id;
    });
    let itemIndex = itemsArray.value.indexOf(itemSearch);
    defaultItem.value.finalPrice=fPrice;
    itemsArray.value[itemIndex].composition.splice(index, 1);
    localStore();
})

    return {itemsArray,save,defaultItem,deleteItemConfirm,deleteCompositionConfirm,editedItemSave,compositionSave};
});
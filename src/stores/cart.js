import { ref, computed} from 'vue';
import { defineStore } from 'pinia';

export const useCartStore=defineStore("cart",()=>{
    const itemsArray=ref([]);

    //actions
    const addItems=(item)=>{
        itemsArray.value.push(item)
    }
    /*const removeItems=(id)=>{
        cartItems.value=cartItems.value.filter((x)=>x.id!==id)
    }
    // getters
    const sortItems=computed(()=>{
      
        cartItems.value.sort((a, b) => a.title.localeCompare(b.title));
       
    })*/
    return {itemsArray,addItems};
});

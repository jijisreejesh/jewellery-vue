
import {createRouter,createWebHistory} from 'vue-router';
import Home from '../components/Home.vue';
import CartView from '../components/CartView.vue';
import EditCart from '../components/EditCart.vue';
const router=createRouter({
    history : createWebHistory(),
    routes:[
        {
            path:'/',
            name:'home',
            component: Home
        },
        
        {
            path:'/cart',
            name:"cart",
            component:CartView
        },
        {
            path:'/edit/:id',
            name:'editingPage',
            component:EditCart,
            props:true
        }
    ]
})
export default router;
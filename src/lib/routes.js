
import {
    Home
} from '@/pages';


export default {
    boot: (params)=>{
        return new Promise((resolve, reject)=>{
            resolve();
        })
    },
    // bootComponent:Boot,
    // root: "home",
    root: async ()=>{
        return {
            path: "home"
        }
    },
    beforeEachRoute: (from, to)=>{
        return Promise.resolve(true)
    },
    afterEachRoute: async (req)=>{
        // console.log("AFTER:", req)
    },
    routes: [
        {
            path: 'home',
            component: Home,
        },
        // {
        //     path: '*',
        //     component: NotFound,
        //     beforeNavigate: async (from, to)=>{
        //         return true
        //     },
        //     on: async ()=>{
        //         Router.navigate("home")
        //     },
        //     hook: (e)=>{
        //         console.log("error somewhere", e)
        //     }
        // },
        // {
        //     path: '!',
        //     component: Error,
        //     hook:(e)=>{
        //         console.log("HOOKED ON ERROR", e)
        //     }
        // }
    ]
}

import {
    Main, ButtonDemo, ListDemo
} from '@/pages';


export default {
    boot: (params)=>{
        return new Promise((resolve, reject)=>{
            resolve();
        })
    },
    root: async ()=>{
        return {
            path: "main"
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
            path: 'main',
            component: Main,
        },{
            path: 'buttonsdemo',
            component: ButtonDemo,
        },{
            path: 'listdemo',
            component: ListDemo,
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
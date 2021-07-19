import {
    Main, ButtonDemo, ListDemo, CarouselDemo, MapDemo, RotatedCollision, DistanceDemo
} from '@/pages';


export default {
    boot: (params) => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    },
    root: async () => {
        return {
            path: "main"
        };
    },
    beforeEachRoute: (from, to) => {
        return Promise.resolve(true);
    },
    afterEachRoute: async (req) => {
        // console.log("AFTER:", req)
    },
    routes: [
        {
            path: 'main',
            component: Main,
        }, {
            path: 'buttonsdemo',
            component: ButtonDemo,
        }, {
            path: 'listdemo',
            component: ListDemo,
        },{
            path: 'listdemo2',
            component: CarouselDemo,
        }, {
            path: 'mapdemo',
            component: MapDemo,
        }, {
            path: 'rotatedcollision',
            component: RotatedCollision,
        }, {
            path: 'distancedemo',
            component: DistanceDemo,
        }
    ]
};
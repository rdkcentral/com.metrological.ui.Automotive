import {
    Main, ButtonDemo, ListDemo, CarouselDemo, MapDemo, RotatedCollision, DistanceDemo, ControlsDemo, TouchIdentification
} from '@/pages';


export default {
    root: 'main',
    routes: [
        {
            path: 'main',
            component: Main,
        },{
            path: 'touchidentification',
            component: TouchIdentification,
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
        }, {
            path: 'controlsdemo',
            component: ControlsDemo,
        }
    ]
};
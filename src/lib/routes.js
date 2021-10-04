/*
* If not stated otherwise in this file or this component's LICENSE file the
* following copyright and licenses apply:
*
* Copyright 2020 Metrological
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import {
    Main, ButtonDemo, ListDemo, CarouselDemo, MapDemo, RotatedCollision, DistanceDemo, ControlsDemo, TouchIdentification
} from '@/pages';


export default {
    root: 'main',
    routes: [
        {
            path: 'main',
            component: Main,
            widgets: ['DemoSelector']
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
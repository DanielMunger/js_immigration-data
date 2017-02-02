import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { D3GraphComponent } from './d3-graph/d3-graph.component';
import { MapViewerComponent } from './map-viewer/map-viewer.component';

const appRoutes: Routes = [
    {
        path: '',
        component: SplashComponent
    },
    {
        path: 'map',
        component: MapViewerComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
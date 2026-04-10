import { Routes } from '@angular/router';
import { AboutMe } from './ui/pages/about-me/about-me';
import { Blog } from './ui/pages/blog/blog';

export const routes: Routes = [
    { path: '', component: AboutMe},
    { path: 'aboutme', component: AboutMe},
    { path: 'blog', component: Blog}
];

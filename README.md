This code is not perfect. It's my *testing* ground for a lightweight and custom approach on creating 
statically generated websites that only require a few pages. That said, I do like the overall setup (for the most 
part) and find it much more liberating and powerful than many of the popular static-site-generators and 
single-page-app frameworks currently out there. It is all that's really needed in lieu of a true backend framework.
There's nothing that I couldn't accomplish using this setup for a small website that I could with React, Vue, 
Angular, or anything similar. 

For the frontend, the combination of Github's Catalyst and Hotwire's Turbo is truly magnificient and perfectly 
pairs with an actual multi-page backend of almost any size.

## Main Technologies Used

* [Github Catalyst](https://catalyst.rocks/) *(v2, for javascript interactions)*
* [Hotwire Turbo](https://turbo.hotwired.dev/) *('Turbo Drive' only, for making the multi-page-app behave like a SPA)*
* [Tailwind](https://tailwindcss.com/) *(for styling)*
* [GSAP](https://gsap.com/) *(for javascript-based animations)*
* [Twig](https://twig.symfony.com/doc/3.x/) *(for "backend" html templating)*
* [ThreeJS](https://threejs.org/) *(for the background basketball animation)*

## Development 

Install [node](https://nodejs.org) and then run:

    npm install
    npm start

A browser will open automatically and refresh as you make changes.

## Production

Run:

    npm run build

All files that need hosted will be in `/dist`. Since this is a statically generated site with no backend or other 
dependencies, the files can simply be dumped as-is onto a webserver or CDN.

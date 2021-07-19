<p align="center">
  <a href="http://mixdup.vercel.app/" target="_blank">
    <img src="./public/headphones.svg" width="110px"/>
  </a>
  <h1 align="center" style="color:#78A3AD">MixDup</h1>
</p>
  
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
<!-- 
  <a href="https://restaurant-locator-3000.herokuapp.com/">Site</a>
  · -->
  <a href="http://mixdup.vercel.app/" target="_blank">View the Site</a> ·
  <a href="https://github.com/GreysonElkins/mixdup/issues">Report Bug</a>
  ·
  <a href="https://github.com/GreysonElkins/mixdup/issues">Request Feature</a>

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started Locally](#getting-started-locally)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project

Mixdup is a progressive web app for making weekly playlists with friends to find new music. Users can vote on their favorite songs each week to prove they have the ultimate hipster clout.

The concept was developed by our Back End team, [Ruthie Rabinovitch](https://github.com/rrabinovitch) and [Noa Harnik](https://github.com/HarnikNoa)

Currently Mixdup consumes data from a [Firebase Realtime database](https://firebase.google.com/docs/database) and the Spotify API. Depending on the call, the data is sometimes provided by a [middleware express app](https://github.com/DupMix/microservice) with it's own Spotify API authentication, but users have the option to authenticate their account as well in the Front End. 

This middleware will be depricated by a graphQL database in the future. 

### Built With
[React Hooks](https://reactjs.org)  
[Typescript](https://www.typescriptlang.org)  
[SCSS](https://sass-lang.org)  
[Firebase](https://firebase.google.com/)  
[Spotify API](https://developer.spotify.com/documentation/web-api/reference/#category-playlists)


<!-- GETTING STARTED Locally -->
## Getting Started Locally
### Prerequisites:
* npm: (`npm install npm@latest -g`)

### Instructions:
1. Follow the instructions in the [Mixdup Back End Repo](https://github.com/DupMix/microservice) to run the server side of the app.
2. Fork the repo
3. Clone down the forked repo
4. `cd` into your local project and run `npm install`
5. You will need to add the following variables into a `.env` file in the root directory. These values can be created at the Spotify Developer dashboard and with a Firebase account. 
```
REACT_APP_MIXDUP_SPOTIFY_CLIENT_ID,
REACT_APP_SPOTIFY_CLIENT_ID,
REACT_APP_FIRE_API_KEY,
REACT_APP_FIRE_AUTH_DOMAIN,
REACT_APP_FIRE_DATABASE_URL,
REACT_APP_FIRE_PROJECT_ID,
REACT_APP_FIRE_STORAGE_BUCKET,
REACT_APP_FIRE_APP_ID,
REACT_APP_FIRE_SENDER_ID
```
4. Run the app!
```sh
npm start
```
5. Go to `localhost:3000` in your browser

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/GreysonElkins/mixdup/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request to this branch

<!-- CONTACT -->
## Contact

[Greyson Elkins](https://www.linkedin.com/in/greyson-elkins/) - greysonelkins@gmail.com  

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/GreysonElkins/mixdup.svg?style=flat-square
[contributors-url]: https://github.com/GreysonElkins/mixdup/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/GreysonElkins/mixdup.svg?style=flat-square
[forks-url]: https://github.com/GreysonElkins/mixdup/network/members
[stars-shield]: https://img.shields.io/github/stars/GreysonElkins/mixdup.svg?style=flat-square
[stars-url]: https://github.com/GreysonElkins/mixdup/stargazers
[issues-shield]: https://img.shields.io/github/issues/GreysonElkins/mixdup.svg?style=flat-square
[issues-url]: https://github.com/GreysonElkins/mixdup/issues
[license-shield]: https://img.shields.io/github/license/GreysonElkins/mixdup.svg?style=flat-square

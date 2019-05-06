# Musicon 

## Project setup
```
npm install && cd client && npm install
```

### Compiles and hot-reloads for development
```
npm start (backend)

cd client && npm run start (frontend)
```

### Compiles and minifies for production
```
cd client && npm run build
```

### Project Description

Musicon is a full-stack web application that is built on Spotify's API in order to generate music suggestions based on the user’s favorite genres. This application is built on a combination of React and TypeScript, which makes code highly readable and scalable. Spotify API’s OAuth2 is used to authenticate and receive information about the user’s profile. Musicon allows a user to choose up to three favorite music genres, then provides a list of suggested tracks with snippets of a song that can be listened to. Finally, a user can select and transfer tracks that he liked straight to any of his real Spotify playlists. All of the data is queried using GraphQL (Apollo), which makes the data flow in the application extremely fast since it allows to request and receive only the data that is required in the application. To make things a little bit spicier, Musicon was built using the new React Hooks API and is a 100% “classless”. Only functions!
### Technologies used 

React, TypeScript, GraphQL (Apollo), React-Router, Spotify API

### https://musiconn.herokuapp.com

<img width="1635" alt="Screen Shot 2019-05-06 at 12 22 51 AM" src="https://user-images.githubusercontent.com/31712161/57206616-269acc00-6f95-11e9-9740-24f2f1b3d811.png">

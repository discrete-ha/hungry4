# Hungry4

What are you HUNGRY FOR? 

[__HUNGRY4__](http://hungry4.s3-website-ap-northeast-1.amazonaws.com/) helps the hungry workers at Cogent Labs find delicious restaurants within a one kilometer radius using  [Foursquare API](https://foursquare.com/).
Don't know what you want to eat? Hungry4 can also generate a random restaurant suggestion and help you on your way to a full stomach.

### Random
<img width="300" alt="random" src="https://user-images.githubusercontent.com/4373428/33794303-67b31426-dd0c-11e7-98f5-283a2dda6ad6.gif">

### Keyword Search
<img width="300" alt="random" src="https://user-images.githubusercontent.com/4373428/33794304-6999391e-dd0c-11e7-92be-4d8691b69e92.gif">

## Demo
[Demo](http://hungry4.s3-website-ap-northeast-1.amazonaws.com/)

## Prerequisites

You will need [Node](http://nodejs.org/) and [NPM](https://npmjs.org/) installed on your environment.
You should be able to run the command below after the installation procedure.

```
$ node --version
v6.10.2

$ npm --version
4.6.1
```

## Installation

Use the commands below for installation.

```
$ git clone https://github.com/discreteb/hungry4.git
$ cd hungry4
$ npm install
```

## Test
```
$ npm run test
```


## Start & Watch
```
$ npm run start
```

## Build
```
$ npm run build
```

## Deployment

Get [AWS Security Credentials](http://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html) from HUNGRY4 administrator to deploy to AWS.

```
$ npm run deploy
```

## Built With

* [React](https://reactjs.org/) - The web framework used
* [redux](https://redux.js.org/) - A state container for JavaScript apps
* [react-redux](https://github.com/reactjs/react-redux) - The Official React bindings for Redux
* [react-animations](https://github.com/FormidableLabs/react-animations) - An animation library for react apps
* [radium](https://github.com/FormidableLabs/radium) - A library to manage inline styles on React elements for css animation
* [react-fontawesome](https://github.com/danawoodman/react-fontawesome) - A React component for the font-awesome icon library
* [react-foursquare](https://github.com/foursquare/react-foursquare) - [Foursquare](https://foursquare.com/) api library
* [google-maps-react](https://github.com/tomchentw/react-google-maps) - The Google Map component for react apps
* [react-image-gallery](https://github.com/xiaolin/react-image-gallery) - A React component for building image galleries and carousels

## Strong Points
* Data handling
  -Hungry4 calls API to retrieve and store venue details on the first click- eliminating the need to use API for subsequent clicks of the same venue even if the search result are produced with a different keyword.
* Simple UI
* Easy to install, develop and deploy

## Remaining Issues
* UI, UX
  -Excluding map view, search results are displayed in text boxes as maps require too much space on mobile devices. The next update with have separate mobile and PC web views.
* Error handling
  -Hungry4 only works with successful requests (200) to Foursquare API.
* Paging
  -Search results are limited to a maximum of ten venues
* Test code
  -Existing test code is only for rendering components.
* Refactoring Code

## Author
* **John Ha** 
[Resume](https://drive.google.com/open?id=0B6f4DTfeSkVCby0tT1JRRjI5MTQ)
[linkedin](https://www.linkedin.com/in/jeong-hoon-ha-5b5870a3/)
[github](https://github.com/discreteb)



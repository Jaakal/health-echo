# Health Echo

It's an app for the body treatment franchise. Users can create an account and book services from different body treatment studios.

<div class="button-group">
  <a href="https://health-echo.herokuapp.com/" class="button">Live Version</a> |
  <a href="#screenshot" class="button">Screenshot</a> |
  <a href="#getting-started" class="button">Getting Started</a> |
  <a href="#available-scripts" class="button">Available Scripts</a> |
  <a href="#available-scripts" class="button">Deployment</a> |
  <a href="#built-with" class="button">Built With</a> |
  <a href="#assets" class="button">Assets</a> |
  <a href="#authors" class="button">Authors</a> |
  <a href="#license" class="button">License</a>
</div>

## Screenshot

![Screenshot of the webpage](/screenshot.gif)

## Getting Started

Clone the repository into your local computer.

### Prerequisites

Ruby, '2.6.4'

Ruby on Rails, '~> 6.0.2', '>= 6.0.2.1'

### Setup

Instal gems with:

```
bundle install
```

Setup database with:

```
   rails db:create
   rails db:migrate
   rails db:seed
```

### Installing

First you'll have to install the newest version of [Node](https://nodejs.org/en/download/). Then move into the project main directory on the console and follow the instructions below. 

Install all the necessary packages:

```
$ npm install
```

To be sure, that npm is able to run scripts, lets set the `ignore-scripts` configuration key to false:

```
$ npm config set ignore-scripts false
```

> You can find the scripts in the `package.json` file in the `scripts` section.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will reload if you make edits.<br />

### `npm test`

Launches the test runner for both, Rspec and React & Reducx.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Deployment

In order to deploy it to Heroku, then one the console in root directory of the project run commands in order shown below (current branch needs to be master):

```
heroku apps:create <app-name>

git add .
git commit -m "Deploy to Heroku"
git push heroku master

heroku run rails db:migrate
heroku run rails db:seed
heroku open

```

## Built With

* [Ruby](https://www.ruby-lang.org/en/) - Programming language used
* [Ruby on Rails](https://rubyonrails.org/) - Ruby framework used
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Redux](https://redux.js.org/) - A Predictable State Container for JS Apps
* [JavaScript](https://www.javascript.com/) - Programming language used
* [HTML](https://en.wikipedia.org/wiki/HTML) - Hypertext Markup Language
* [SCSS](https://sass-lang.com/) - Sassy CSS
* [CSS](https://www.w3.org/Style/CSS/Overview.en.html) - Cascading Style Sheets
* [VS Code](https://code.visualstudio.com/) - The code editor used

## Assets

* [Murat Korkmaz on Behance](https://www.behance.net/gallery/26425031/Vespa-Responsive-Redesign) - Web layout design used

## Authors

👤 **Jaak Kivinukk**

<a href="https://github.com/Jaakal" target="_blank">

  ![Screenshot Image](/jaak-profile.png) 

</a>

- Github: [@Jaakal](https://github.com/Jaakal)
- Twitter: [@JKivinukk](https://twitter.com/JKivinukk)
- Linkedin: [Jaak Kivinukk](https://www.linkedin.com/in/jaak-kivinukk)
- Email: [jaak.kivinukk@gmail.com](jaak.kivinukk@gmail.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/
troubleshooting#npm-run-build-fails-to-minify)

# Documentation

### Project Scope

The aim of this project was to develop a web application that allowed users to create an account and log games that they are either playing, plan to play, or have finished. The user can do this by first signing up, and then searching for any game they desire to add to their account. Upon adding the game, they will be presented with an option to add the title to the following categories ('In Progress', 'Planned', 'Finished', 'Dropped'). The user can then view these titles in their respective categories and adjust the status of each title accordingly.

### What We Implemented

In terms of what we originally set out to do with our website, we managed to achieve almost everything, this includes:

• We managed to create a sign-up and login page which worked. It also prevented multiple users with the same name from being made and had some encrypted passwords for security
• Made it so that we can get game information from the API and make it appear on a page, both as a list of games with thumbnail images, and individual pages with more specific information about a game
• Was able to create a user page that displayed not only the users username and a editable summary about them, but also all their games along with their status's
• Was able to create a search bar, that searched for games based of specific words, allowing for a user to pick and chose any game from the API
• Created dynamic pages that changed depending on whether a user was logged in or not

### Source Code Guide

All changes and work can be found in the 'src' folder.
Work was done in both 'App.js', App.cs' and the components created by team members can be found in the 'Services' folder.
The backend and server can be found in the 'server' folder.

### What Our Next Steps Would Be

From the point our website is at, their would be two major things I believe we would need to add, they are:

• The ability for other users to view your specific user page, summary and game lists.
• The ability to leave reviews on the games or thoughts and people being able to view them to form their own opinions.

Both of these aspects we would of liked to add to the final website, however time constraints would of not allowed for this, as it most likely would of taken another few weeks to successfully implement this, to prevent certain things such as being able to edit other user pages from occuring.

### Roles and Contributions From Team Members

#### Dylan Neilson (47004029)

My role was to primarily focus on the navigation, layout and design of the website. I primarily used CSS and structured many of the react components to follow along the initial design I had planned for the project. This meant I was responsible for styling the layout, navigation, submission forms, and various other pages within the project. I made sure everything was coherent with eachother and flow between pages made sense. Along with this, I made sure that elements created by other team memebers were still styled to fit uniformly with every other component and aspect of the site. I also integrated icons from GoogleFonts, which made the design of the site more minimalistic and modern.

#### Adrian Mariani (46549757)

I was primarily responsible for backend operations, developing mechanisms to connect to and fetch from the IGDB API, in order to provide game data to the site in a useable form. This meant creating function groups that could make the required POST requests dynamically, with all the versatility provided by the API. I also took responsibility for deployment and maintenance of the deployed site, while doing general code cleanup here and there to maintain readability.

#### Justin Kimble (46587969)

I was responsible handling all things user related. This included the ability to login as an existing user and create a new user with the specified details. This included having to create a way to encrypt users passwords and reading it so that some sort of security was added for users. I also created a user page were a individual would be able to view a short summary about themselves which they could edit along with all of the games they have added to their list and the status of those games. Other things included making game pages only allow the ability to add games when logged in and being able to update the status of a game once added. I also helped other aspects such as getting the API to work in a troubleshooting aspect when I had nothing to do.

#### Luke Jennings

I was responsible for making the search bar work and making the different pages for each game. I contributed to the styling of the CSS by making the card displays for the main/search pages. Making the API functions for the covers working. Helping around by trying to fix any errors that people had and reviewing/testing other team members code.

### All communication was done either in-class or via Discord.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Drupal Media - News Aggregator

This project includes a magazine-style Drupal news aggregator at `/news`. It features:

- **Magazine-style theme** inspired by Tablet Magazine
- **YouTube integration** with embedded videos from Drupal Media channel
- **Multiple Drupal news sources** including:
  - Dries Buytaert's blog
  - Planet Drupal
  - Lullabot
  - Drupalize.Me
  - Pantheon Blog
  - DrupalEasy
  - Wim Leers
- **Featured articles section** with hero layout
- **Source filtering** via category tabs and sidebar
- **Trending section** showing most recent articles
- **Responsive design** for mobile and desktop

### Run the News App

1. Start the news scraper server:
   ```bash
   npm run start:news
   ```
   This runs the server at `http://localhost:3001`

2. In another terminal, start the React app:
   ```bash
   npm start
   ```

3. Visit `http://localhost:3000/news` to see the Drupal news magazine

### Configuration

- The scraper runs at `http://localhost:3001` by default
- Set `REACT_APP_NEWS_API_URL` to customize the API endpoint
- Set `NEWS_SCRAPER_PORT` to change the server port

### Theme Features

The magazine theme includes:
- Elegant serif typography (Playfair Display) for headlines
- Clean sans-serif body text (Inter)
- Color-coded sources for visual distinction
- Smooth hover animations
- Dark header bar with stats
- Category/source filtering
- Sidebar with trending articles

# Chattermill App

## Installation

**Packages installation**

```sh
npm install
# or yarn install
```

## Start the app

The simplest way is to run this command from root directory

```shell
npm run watch
```

### Access to app

Follow to the link <localhost: port> (ex: localhost:3000)
You will be redirected to the login page.
Please use the following username and password to authenticate with the server:

Username: `chattermill` Password: `SuperSecretChattermillPassword!`

## Test the app

Run this command to run tests

```shell
npm run test
```

## Architecture

```
assets/              -> Icons for Themes (NegativeIcon, PositiveIcon)
components/          -> React components (Dropdown, Review, Sentiment, Spinner)
constants/
core/
    kit/             -> buttons, divider etc.
    global-styles.ts
    routes.tsx       -> setting up routes
hooks/
pages/               -> this app consist of 2 screens
    FeedScreen/      -> on this screen we show feed of customer feedback with themes and
emotional sentiment displayed besides each product review
    LoginScreen/     -> here clients simply sign in with their username/password
app.tsx
index.ejs

```

## Functional features

### Handling token expiration.

After authorization, you will have 1 hour of active use of the application. After that, you will be logged out and you will need to enter your `username` and `password` again. This is done because: it is not safe to store the password in `localStorage`, and we do not receive a refresh token from the server.

### Infinite scrolling

Data can be loaded in two ways:

1. by clicking on the `Load more` button (it is necessary to press until the page contains enough content)
2. then by scrolling you can load data (`Load more` button is also available)

### Filter panel

At the moment, a filter on one topic has been implemented, at the bottom of the dropdown there is a button to reset the filter (the task is not entirely clear, it can be interpreted as a filter on one theme or a filter on several themes).

#### Current implementation:

1. No filters applied: 5 reviews are requested (first by button, then by infinite scrolling)
2. ??dded a filter by theme after uploading reviews : the loaded reviews on this topic will be displayed, then you can upload data as in point 1
3. If after step 2 you switch to another filter: loaded reviews on this topic will be displayed
4. if you reset the filters, point 1 will be repeated

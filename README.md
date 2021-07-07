# ViriCiti Vue Assignment 🚌

### What is it?

Welcome to FleetManager! A technical vue assignment for ViriCiti. The requirements for the assignment can be found in the file requirements.md in project root.

### Features

The app has three pages: Home, Vehicle and Activity Log. These pages can be navigated to to using the navigation bar in the top left corner of the app. The requirements for the assignments is mainly fulfilled by the Vehicle page. However, the assignment also suggested me to be creative, and so I have created an activity log page where incidents, errors and warning messages are displayed in a table that can be filtered.

I also really wanted to build a "history mode" page, where the user can chose to record the vehicle trajectory on the map by duplicating the map placeholder for every _n_ message received from the socket connection, leaving a trail of "crumbs" on the map that the user could interact with (i.e displaying a tooltip on mouse over), but sadly there was no time for me to implement this.

### A note on testing

While developing this application, I notice that the data broadcasted from the server sometimes would send an empty string for numerical values, due to empty cells in the provided csv file (For example see row 449 and 526). I therefore choose to overwrite empty strings meant for numerical values with the number zero in a vuex action. This way I did not have to rely on prop type checking throughout the client app. As many components in the app rely on this, I decided to write a unit test for this action. If I had more time I would also have had tested the filter functionality in the activity log page, the routeConnection service as well as the average profile line method in the Chart component.

### Wish list

Task I wished I could complete within the given timeframe

- [ ] Extract atomic components with v- prefix. I.e v-button in activity log page
- [ ] Finish History Mode Feature
- [ ] Write additional unit tests
- [ ] Create a Layouts dir in client app with layout component for pages
- [ ] Dockerize with docker-compose for easier demoing
- [ ] Connection lost page
- [ ] Reconnect handler in routeConnectionService
- [ ] Notification bar component
- [ ] Improve separation of concerns for Chart component: BaseChart.vue, ChartLayout.vue, ChartController.vue

#### Project setup

In root dir /

```
yarn
```

Change directory to client and run yarn

```
cd src/client
yarn
```

#### Run server

In root dir /

```
yarn start
```

#### Run client in local development mode

In /src/client

```
yarn serve
```

#### Compile client for production

In /src/client

```
yarn build
```

#### Serve client production build locally

In /src/client

```
yarn global add serve
serve -s dist
```

#### Run unit tests

In /src/client

```
yarn test:unit
```

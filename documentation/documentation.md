# Introduction

In this document you will find the explanation of the decisions concerning the design of the application.
The structure of the backend (such as explanation of appliance of separation of concerns principle) and frontend (such as hierarchy of components and details of stores usages) will be explained. You will also find API specification and the data storage structure.

## Back-End

### Structure

The backend is built using Node.js with Express.js. The backend has the following architecture:

---- **controllers (directory)** : each file in this directory represents a controller which is responsible for handling the requests coming from the client(-s). Each controller has functions which are called when a specific route is hit. The controller functions call the model functions which are responsible for the business logic and service functions which handle validation.
Controllers handle the request and response objects and send the response back to the client.


    auth-controller.js
    items-controller.js
    user-controller.js

---- **middleware (directory)** : includes middleware which is used when routing requests. It checks for the conditions such as if the user is logged in, if the user is an admin etc.

    isAdmin.js
    isLoggedIn.js

---- **model (directory)** : each file in this directory represents the data access layer. As there is no database, the data is stored in the JS arrays
right in these files. Functions implement the CRUD functionality. This is where the back-end data validation happens.

    items-model.js
    uesr-model.js

---- **routes (directory)** : each file in this directory is a router which routes HTTP requests coming from the client(-s) and
applies middleware (if needed). 

    auth.js
    items.js
    users.js

---- **service (directory)** : includes the functions that are reused across the whole application such as
token generation, new Id generation, validation utilities etc.

    auth-service.js
    items-service.js
    users-service.js

---- **index.js** : configures express application and applies the routes, loads the environment variables

### Environment variables

The following environment variables are used in the application:

- JWT_SECRET 

Stored in the .env file, used for token generation

-  "protocol": "http://",
-  "host": "localhost",
-  "port": "3000"

Used for the base URL when testing, stored in http.client.env.json

### Flow of the application

Request -> Router -> Middleware -> Controller -> Model -> Service -> Response

## Front-End

### Structure 

The front-end is built using Svelte. The front-end has the following architecture:

---- **components (directory)** : each file in this directory represents a component which is responsible for rendering a part of the UI. Each component has its own logic and styling.

    AddAuctionModal.svelte
    EditAuctionModal.svelte
    Header.svelte
    LoginModal.svelte
    ProductCard.svelte
    ProductSection.svelte
    SearchBar.svelte
    SideBar.svelte

---- **pages (directory)** : each file in this directory represents a page which is responsible for rendering a page of the UI. Each page has its own logic and styling. Pages mainly consist of components.

    AdminDashboard.svelte
    Home.svelte
    ProductDetail.svelte
    WonAuctions.svelte

---- **stores (directory)** : includes the stores which are used to store the data that is shared across the whole application.

    authStore.js

This store is used to store the token for authorization. The token is needed across the whole application to make requests to the server.
The token has to be included in the "Authorization" header of the request so that the server can verify the user. Also, the token is used to determine if the user is logged in or not to display the correct UI.

    currentPathStore.js

This store is used to store the current path of the page. The current path is needed to determine which page is currently being displayed in the Header component. The Header component is out of the hierarchy, so I can't pass the current path as a prop to it. I need it to determine whether I should display the search bar, the "GO back" button or the "Admin Dashboard" button etc.

    searchStore.js

This store is used to store the search query from the SearchBar in the Header component. The Header component is directly applied in the App.svelte file, so it is out of the hierarchy. I can't pass the search query as a prop to the ProductSection where it is used to fetch the products. 

The usage of the two stores mentioned above was approved by the teacher, even though it was required to make use of only one store - to store the token.

---- **utils (directory)** : includes the utility functions which are used across the whole application. Such as datatime formatting, user utilities, validation etc. (This is where the front-end data validation happens)
    
        date-time.js
        user-utils.js
        validation.js

## Important design decisions

- Header.svelte component is applied directly in the App.svelte so that it stays on the screen regardless of the page the user is on. This way, the user can always see the search bar or the "GO back" button, the "Won Auctions" button if the user is logged in, and the "Admin Dashboard" button if the user is logged in as the user etc.

- The admin reserved functionality is implemented in the AdminDashboard.svelte page. The admin can add, edit and delete auctions.




# API Specification

Below is a route-by-route API specification in **Markdown** format. Each route includes a short description, parameters (query/path/body), and possible responses with sample JSON structures.

---

## **AUTH ROUTES**

### **POST** `/auth`
**Description:** Obtain a JSON Web Token (JWT) by providing valid credentials.

| **Parameters** | **Name**   | **Type** | **Description**                                |
|:--------------:|:----------:|:--------:|:----------------------------------------------:|
| **Body \***    | `email`    | String   | The user’s email                               |
|                | `password` | String   | The user’s password (plain text)               |

- (\*) required in request body.

**Responses:**

| **Code** | **Description / Example**                                                    |
|:--------:|:----------------------------------------------------------------------------:|
| **200**  | Returns a JSON object containing the token: <br>`{ "token": "eyJhbGciOi..." }`|
| **400**  | Bad credentials (wrong email or password): <br>`{ "error": "Bad credentials" }`|
| **500**  | Internal server error                                                        |

---

## **ITEMS ROUTES**

### **GET** `/items`
**Description:** Get all items, optionally filtered by query parameters.

| **Parameters**         | **Name**    | **Type**   | **Description**                                                                                                                  |
|:----------------------:|:----------:|:----------:|:--------------------------------------------------------------------------------------------------------------------------------:|
| **Query (optional)**   | `minPrice` | Number     | Minimum price filter (default: 50).                                                                                              |
|                        | `maxPrice` | Number     | Maximum price filter (default: 4000).                                                                                            |
|                        | `like`     | String     | Substring search term applied to item titles/descriptions.                                                                       |
|                        | *(others)* | Various    | Additional query filters (e.g., category). The controller processes them as needed.                                              |

**Responses:**

| **Code** | **Description / Example**                                                                                              |
|:--------:|:----------------------------------------------------------------------------------------------------------------------:|
| **200**  | Returns a list of items in JSON format: <br>`[ { "id": 1, "title": "...", ... }, ... ]`                                |
| **500**  | Internal server error                                                                                                  |

---

### **GET** `/items/:id`
**Description:** Get a single item by its ID.

| **Parameters**  | **Name** | **Type** | **Description**               |
|:---------------:|:--------:|:--------:|:-----------------------------:|
| **Path \***     | `id`     | Number   | The ID of the item (required) |

**Responses:**

| **Code** | **Description / Example**                                               |
|:--------:|:-----------------------------------------------------------------------:|
| **200**  | Returns the requested item: <br>`{ "id": 42, "title": "Sample", ... }`  |
| **404**  | Item not found: <br>`{ "message": "Item not found" }`                   |
| **500**  | Internal server error                                                   |

---

### **POST** `/items`
**Description:** Create a new item. **Requires user to be logged in and be an admin**.

| **Parameters** | **Name**         | **Type** | **Description**                                                   |
|:-------------:|:----------------:|:--------:|:-----------------------------------------------------------------:|
| **Headers**    | `Authorization` | String   | Bearer token (JWT). Required for protected endpoints.             |
| **Body \***    | e.g. `title`... | Various  | Item data, e.g. `{ "title": "Laptop", "startingPrice": 100 }`.     |

**Responses:**

| **Code** | **Description / Example**                                                                |
|:--------:|:----------------------------------------------------------------------------------------:|
| **201**  | Item created successfully: <br>`{ "message": "Item created successfully", "id": 123 }`    |
| **400**  | Validation or request error: <br>`{ "error": "Missing title", ... }`                     |
| **401**  | Unauthorized if no valid token                                                            |
| **403**  | Forbidden if user is not an admin                                                         |
| **500**  | Internal server error                                                                     |

---

### **PUT** `/items/:id`
**Description:** Update an existing item by its ID. **Requires user to be logged in and be an admin**.

| **Parameters** | **Name**         | **Type** | **Description**                                               |
|:-------------:|:----------------:|:--------:|:-------------------------------------------------------------:|
| **Path \***    | `id`            | Number   | The ID of the item to update.                                 |
| **Headers**    | `Authorization` | String   | Bearer token (JWT). Required for protected endpoints.         |
| **Body**       | *(partial)*     | Various  | Fields to update, e.g. `{ "title": "New Title", "price": 200 }`|

**Responses:**

| **Code** | **Description / Example**                                                   |
|:--------:|:---------------------------------------------------------------------------:|
| **200**  | `{ "message": "Item updated successfully" }`                                |
| **400**  | Validation error or invalid data: <br>`{ "message": "Error updating item" }` |
| **401**  | Unauthorized if no valid token                                              |
| **403**  | Forbidden if user is not an admin                                           |
| **404**  | Item not found: <br>`{ "message": "Item not found" }`                       |
| **500**  | Internal server error                                                       |

---

### **DELETE** `/items/:id`
**Description:** Delete an item by its ID. **Requires user to be logged in and be an admin**.

| **Parameters** | **Name**         | **Type** | **Description**                     |
|:-------------:|:----------------:|:--------:|:-----------------------------------:|
| **Path \***    | `id`            | Number   | The ID of the item to delete        |
| **Headers**    | `Authorization` | String   | Bearer token (JWT).                 |

**Responses:**

| **Code** | **Description / Example**                                                         |
|:--------:|:---------------------------------------------------------------------------------:|
| **200**  | `{ "message": "Item deleted successfully" }`                                      |
| **401**  | Unauthorized if no valid token                                                    |
| **403**  | Forbidden if user is not an admin                                                 |
| **404**  | Item not found: <br>`{ "message": "Item not found" }`                              |
| **500**  | Internal server error                                                             |

---

### **POST** `/items/:id/bids`
**Description:** Submit a bid for a specific item. **Requires user to be logged in**.

| **Parameters** | **Name**         | **Type** | **Description**                                           |
|:-------------:|:----------------:|:--------:|:---------------------------------------------------------:|
| **Path \***    | `id`            | Number   | The ID of the item to bid on                              |
| **Headers**    | `Authorization` | String   | Bearer token (JWT). Required for protected endpoints.      |
| **Body \***    | `amount`        | Number   | The bid amount. Other bid data as needed.                  |

**Responses:**

| **Code** | **Description / Example**                                           |
|:--------:|:-------------------------------------------------------------------:|
| **200**  | `{ "message": "Bid added successfully" }`                           |
| **400**  | Invalid bid or other error: <br>`{ "result": "Error message" }`      |
| **401**  | Unauthorized if no valid token                                      |
| **500**  | Internal server error                                               |

---

### **GET** `/items/:id/bids/stream`
**Description:** Open a **Server-Sent Events** (SSE) stream of new bids for a specific item.

| **Parameters** | **Name** | **Type** | **Description**                |
|:-------------:|:--------:|:--------:|:------------------------------:|
| **Path \***    | `id`     | Number   | The ID of the item (required). |

**Notes:**
- This endpoint keeps the connection open to push SSE updates of the latest bid. The client must handle SSE.

**Responses:**

| **Code** | **Description**                                                                                                      |
|:--------:|:--------------------------------------------------------------------------------------------------------------------:|
| **200**  | Opens an SSE connection. Each event is JSON data for the latest bid.                                                 |
| *(none)* | The stream ends if the client disconnects.                                                                           |

---

### **GET** `/items/wins/:userId`
**Description:** Get a list of won auctions for a particular user. **Requires user to be logged in**.

| **Parameters** | **Name**   | **Type** | **Description**                                |
|:-------------:|:----------:|:--------:|:----------------------------------------------:|
| **Path \***    | `userId`  | Number   | The ID of the user whose won auctions to get   |
| **Headers**    | `Authorization` | String | Bearer token (JWT). Required for protected endpoints. |

**Responses:**

| **Code** | **Description / Example**                                                          |
|:--------:|:----------------------------------------------------------------------------------:|
| **200**  | Returns list of won items: <br>`[ { "id": 10, "title": "Laptop", ... }, ... ]`      |
| **401**  | Unauthorized if no valid token                                                     |
| **404**  | No won auctions found: <br>`{ "message": "No won auctions found for this user." }` |
| **500**  | Internal server error                                                              |

---

## **USERS ROUTES**

### **GET** `/users`
**Description:** Retrieve all users, or a single user by email if `?email=` query param is provided.

| **Parameters**       | **Name** | **Type** | **Description**                                                      |
|:--------------------:|:-------:|:--------:|:--------------------------------------------------------------------:|
| **Query (optional)** | `email` | String   | If provided, returns only the user matching this email.              |

**Responses:**

| **Code** | **Description / Example**                                                                         |
|:--------:|:-------------------------------------------------------------------------------------------------:|
| **200**  | When `?email=` specified: returns the matching user object. Otherwise returns an array of users.   |
| **404**  | User not found if `?email=` is provided but no matching user                                       |
| **500**  | Internal server error                                                                              |

---

### **GET** `/users/:id`
**Description:** Get a user by their ID.

| **Parameters** | **Name** | **Type** | **Description**           |
|:-------------:|:--------:|:--------:|:-------------------------:|
| **Path \***    | `id`     | Number   | The user’s ID (required). |

**Responses:**

| **Code** | **Description / Example**                                   |
|:--------:|:-----------------------------------------------------------:|
| **200**  | `{ "id": 42, "email": "user@x.com", ... }`                  |
| **404**  | User not found: <br>`{ "message": "User not found" }`       |
| **500**  | Internal server error                                       |

---

### **POST** `/users`
**Description:** Create a new user account. On success, returns the user’s ID and a JWT.

| **Parameters** | **Name**   | **Type**  | **Description**                                   |
|:-------------:|:----------:|:---------:|:-------------------------------------------------:|
| **Body \***    | `email`    | String    | Must be unique.                                   |
|                | `password` | String    | The user’s password.                              |
|                | `isAdmin`  | Boolean   | Flag for admin privilege (default: false).        |

**Responses:**

| **Code** | **Description / Example**                                                         |
|:--------:|:---------------------------------------------------------------------------------:|
| **201**  | `{ "message": "User created successfully", "id": 101, "token": "<JWT>" }`          |
| **400**  | Invalid input: <br>`{ "error": "Validation message" }`                             |
| **500**  | Internal server error                                                              |

---

## **General Notes**

1. **Authorization Header**: Protected routes require a Bearer token in the `Authorization` header:
   ```http
   Authorization: Bearer <your_JWT_here>

# Functional design

- [Introduction](./functional-design.md#introduction)
- [Requirements](./functional-design.md#requirements)
  - [Functional](./functional-design.md#functional)
  - [Non functional](./functional-design.md#non-functional)
- [User stories](./functional-design.md#userstories)
- [Wireframes](./functional-design.md#wireframes)

## Introduction

This documentation is a (partial) functional description for the 2.1 Web Advanced course.

In order to be graded you need to hand in a project consisting of both a front-end and backend as well as some 
documentation and tests.

The project is an auction site where administrators can add, remove and modify auction items. Site visitors can then
view the items up for auction. If they wish to place a bid they will need to log into the site. If they do not have an
account yet, they will have to register first.

Though the idea of an auction site is pre-determined you are free to choose the item type you are going to put up for
auction. Make sure you select a singe type of items. Also make sure the items you are going to put up for auction have
enough properties (or attributes) to filter. You will need at least three of them.

In the event something is unclear, or you have any questions, please let your teacher know.

## Requirements

The requirements for this project have been split into functional and non-functional requirements.

### Functional

|  ID   | Description                                                                                                                                                                                                                          | MoSCoW  |
|:-----:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------:|
|  F1   | Display a list of auctionable products or services                                                                                                                                                                                   |    M    |
|  F2   | For each products or services show at least the following: <br> - Product or service name <br> - The price (these should be integer values) <br> - Who placed bids <br> - When will the auction end                                  | M |
| F3 | It must be possible to search the list of auctions on a title or name                                                                                                                                                                | M | 
| F4 | Bids cannot be removed or modified once they are made                                                                                                                                                                                | M |
| F5 | Input is validated client side before sending it to the server                                                                                                                                                                       | M |
| F6 | Input is validated server side                                                                                                                                                                                                       | M |
| F7 | The list of auctions can be filtered on at least 3 attributes that are logical for the chosen service or product. I.e.: <br> - all trips in Twente<br> - all yellow sneakers<br> - all paintings that are worth over 3 million euros | M |
| F8 | A list of bids updates in realtime if another user places a bid on the product or service                                                                                                                                            | S |
| F9 | Only users with a `bidder` role can place bids | M |
| F10 | Only users with an `admin` role can manage auctions | M |

### Non functional

|  ID  | Description                                                                                                                                         | MoSCoW  |
|:----:|-----------------------------------------------------------------------------------------------------------------------------------------------------| :---: |
| NF1  | The API returns valid JSON objects or arrays                                                                                                        | M |
| NF2  | The API returns appropriate/correct [HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)                                    | M |
| NF3  | The API uses the correct HTTP verbs for its operations                                                                                              | M |
| NF4  | The API implements at least ReST level 3                                                                                                            | M |
| NF5  | The API uses query parameters for filtering the result set                                                                                          | M |
| NF6  | The API uses query parameters for sorting the result set                                                                                            | S |
| NF7  | The API uses query parameters for limiting the result set                                                                                           | S |
| NF8  | Both the front-end and backend provide descriptive error messages: 'You already placed a bid', 'Bid already exists', 'User X not allowed to do ...' | M |
| NF 9 | Both front-end and backend apply the separation of concerns principle                                                                               | M |
| NF10 | API endpoints have meaningfull good and bad weather tests                                                                                           | M |
| NF11 | The traceability matrix, test plan and test report are documented in [testing.md](../documentation/testing.md)                                      | M |
| NF12 | After registration the user should be logged in. They should not have to log in again before being able to place a bid                              | M |
| NF13 | The front-end is build using Svelte (not Svelte Kit)                                                                                                | M |
| NF14 | The backend is built using Node js with Express                                                                                                     | M |
| NF15 | The front-end is composed of (re-usable) components using a logical structure                                                                       | M |
| NF16 | The API uses JSON Web tokens for authorization                                                                                                      | M |
| NF17 | The API uses Bcrypt for password hashing | M |
| NF18 | The system uses role-based authentication and authorization | M | 
| NF19 | Users can have multiple roles | M |

## Userstories

- [ ] As an administrator I want to be able to add, remove and modify auctions, so I can maintain the website
- [ ] As a user I want to be able to register (with email-address and password), so I can use the website
- [ ] As an administrator I want to be able to log in, so I can maintain the auction site.
- [ ] As a user I want to be able to log in, so I can place bids
- [ ] As a user I want to be able to place a bid on an auction, so I have a chance of winning the item
- [ ] As I want to see a list of all auctions I won, so I can see how much I have to pay
- [ ] As a user I want to see a countdown of the number of days, hours, minutes and seconds I have left to bid

## Wireframes

Below are some wireframes providing an indication of how the website should look. Please keep in mind this is an 
indication. They are incomplete, and you are allowed to take some design liberties. 

**Screens for managing users and items have been omitted.**

### Homepage

![](assets/homepage.jpeg)

The homepage should show a list of items up for auction. Users should be able to filter and search the items. If a user is not logged in the user should be able to log in. Items should link to the item details page. A change in filter values should immediately be visible in the list of auction items.  

### Details

![](assets/details.jpeg)

The details page should show the details of a single item up for auction. If a user is logged in they should have the option to place a bid. If not they should be able to log in. Please keep in mind that uploading images is not a part of the assignment. You can use some default images for the items. If, while viewing this page, another user places a bid that users bid should appear in this list of bids as well without having to reload the page.

### Login

![](assets/login.jpeg)

The login page should allow the user to log in using an e-mail address and password.

### Register

![](assets/register.jpeg)

The registration page should allow the user to enter their personal information, so they can place bids.

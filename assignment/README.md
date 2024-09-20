# Assignment

## Contents
- [Introduction](./README.md#introduction)
- [Description](./README.md#description)
- [Entry requirements](./README.md#entry-requirements)
- [Testing](./README.md#testing)


## Introduction

For this course you will be creating a web application consisting of a front-end and backend. The front-end will be 
created using Svelte [svelte.dev](https://svelte.dev). The backend will be created using Nodejs 
[node.js](https://nodejs.org/) and Express [expressjs.com](https://expressjs.com/).

This template contains the basis for the assignment. You will not have to install Svelte or Express they are contained 
in this template.
You should have a working version of Node on your computer. This is required for development of the assignment.

If you do not have Node yet you can download it [here](https://nodejs.org/en/download/).

In order to receive a grade, the assignment you submit must pass [entry requirements](./README.md#entry-requirements). 

**If your entry does not meet these requirements your assignment will not be graded!!**

[back to top](./README.md#contents)

## Description

For this assignment you will be designing, implementing and testing an auction site. Details for what you should create exactly can be found in the (partial) [functional design](./functional-design.md).

In short, people should be able to view items put up for aution on this site. only administrators can manage the items for auction. Meaning they can create update and delete them. If they would like to place a bid, users should register for an account and log in. Once logged in, they can place a bid.  

The [functional design](./functional-design.md) describes how the site should work since this is generic for all auction sites. Exactly what is put up for auction is up to you. You should select a single type of items, such as bikes, computers, shoes, etc. The main point is that the selected item type can be filtered on at least three properties. For computers one might filter on type (laptop, desktop, server, etc.), Processor (Core i5, M-Series, Ryzen, etc.) and graphics card(NVIDIA, AMD, etc). A good idea on how this should work can be found on online stores such as [mediamarkt.nl](https://mediamarkt.nl) and [bol.com](https://bol.com) 

[back to top](./README.md#contents)

## Entry requirements

Below are the entry requirements for your assignment. If you do not meet these requirements your assignment will **NOT** be graded!

- Your application does not use component libraries.
- You provide the credentials for at least two user accounts (one administrator and a regular user). Put the credentials 
in the [user file](../documentation/users.md)
- Your project does not contain `node_modules` directories.
- Teachers can start the application by performing `npm install` and `npm start` for both the front-end and backend.
- Your application does not depend on external systems such as an online database server.
- All documentation is written in [Markdown](https://www.jetbrains.com/help/upsource/markdown-syntax.html) and present in the [`documentation`](../documentation) directory.

[back to top](./README.md#contents)

## Testing

The backend of your application needs to be tested. For this we will use the REST client in IntelliJ which can be used to write out and test REST calls. As an example we created a [file](../tests/rest/auth.http) to test the authentication flow. Feel free to take a look. An in depth description of how this works can be found [here](../tests/rest/README.md). This testing resembles testing you might have done earlier using Postman. A benefit for using these files is that you can create one for each resource you need. This file can then be committed to version control andother developers will have up-to-date documentation and tests available to continue working.

You should place your rest file in [`/tests/rest`](../tests/rest).

[back to top](./README.md#contents)

## Database/Data storage

For this course we will not be using a database server. Read the [data storage section](./data-storage.md) on how you need to store your data.

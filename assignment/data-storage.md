# Data storage

This page will explain how data is to be stored in your application. 

- [NO DATABASE](./data-storage.md#no-database)
- [Node modules](./data-storage.md#node-modules)
- [Data module](./data-storage.md#data-module)
- [Javascript arrays](./data-storage.md#javascript-arrays)
- [Next steps](./data-storage.md#next-step)

## **NO DATABASE**

Even though it is required for the assignment to be able to store information. We will **not** be using a database management system for this. This means it is not allowed to use databases like SQLite, Postgres or MongoDB. This course is focussed on web technologies (as the course name might hint). Therefor we will be using Javascript arrays to store our data.

With Javascript arrays a JSON syntax can be used to store data. Javascript offers some very powerful ways of interacting with arrays making them fast and efficient.

## Node modules

Node structures applications by using modules. Individual javascript files are each their own module. These modules export items like functions and variables which can then be imported in other parts (modules) of an application for usage.

By default Node js uses CommonJS style modules. This means you will need to `require` modules. You may have also seen node applications using the `import` statement which is the ECMAScript style of modules. Following the Web Basic course you must use the ECMAScript style of imports. You can find more information on them here:

- [CommonJS](https://nodejs.org/api/modules.html)
- [ECMAScript](https://nodejs.org/api/esm.html)

## Data module

As stated we will be using a module with a Javascript array as our database. This means a file has to be created which exports the array

```javascript
export default [
    {
        name: "Millenium Falcon",
        tag: "millenium-falcon-75257",
        number: "75257",
        pieces: 1353,
        age: "9",
    }
]
```

The above example is a CommonJS style module exporting a Javascript array with a single element. This array can now be imported and used in other parts of your application. Any changes you make there will also be visible at other locations where the module is imported. This way the entire application has access to the same data. Keep in mind that the data structure does not have to resemble tables as used with SQL and relational databases. Any valid Javascript structure can be used. 

This way of storing data has a downside. Whenever the REST server restarts the data will revert to the original data in the array. Anything you added or changed will be lost. This is because the data is stored in memory and not written to file.

**This is sufficient for the assignment**

## Javascript arrays

Because data is being stored in JAvascript arrays we can use the Javascript array methods to interact with it. Javascript arrays are actually quite powerful and versatile. [javascript.info](https://javascript.info/array) has a good tutorial on them. Documentation on the functions they offer can be found on 
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), the Mozilla Developer Network. An awesome resource on Javascript.

Please take a look at the following functions, you will find them useful for the assignment:

- [`filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [`find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)



## Next step

It would of course be better if the changes were not lost when the server restarts. To make this happen it is possible to store the Javascript array to a JSON file.

_Please note that storing to a file is **not** part of the assignment!_

However, if you would like to check out [Reading and Writing JSON Files with Node.js](https://stackabuse.com/reading-and-writing-json-files-with-node-js/)

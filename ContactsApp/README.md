# In-Class Project: Contacts App

The codes originate from
* [Udacity Contacts App Frontend](https://github.com/udacity/reactnd-contacts-complete)
* [Udacity Contacts App Server](https://github.com/udacity/reactnd-contacts-server)

## How to run the app

### Frontend

```shell
$ cd frontend
$ npm install
$ npm audit fix --force
$ npm start
```

### Backend
```shell
$ cd backend
$ npm install
$ node server.js
```

## Learning notes

### Frontend

#### `App.js`
##### Class `App` 
* variable `state` stores some information
    * variable `contacts` is a list storing contacts to show
* method `componentDidMount` is called by instantiation
    * fetch data (all the contacts) from database and stores these in the state
* method `removeContact` removes contact
    * removes the contact in the state
    * removes the contact in the database
* method `createContact` creates new contact
    * add a new contact in the state
* method `render` returns a rendered page
    * Route `/` create component `ListContacts`
        * assign the method `removeContact` to `onDeleteContact`
        * assign the state to `contacts`
    * Route `/create` creates component `CreateContact`
        * assign an anonymous function to `onCreateContact`
            * create a new contact calling `creatContact` method
            * route back to `/`
            
#### `ListContacts.js`
##### Class `ListContacts`
* var `state` stores a string `query`
* var `contacts` stores the contacts to show
* var `onDeleteContact` is a pointer to an outside function
* method `updateQuery` updates the var `state`
* method `clearQuery` makes the var `state.query` to `''`
* method `render` returns the visual component
    * assign var `onDeleteContact`, `contacts` vars to the local vars
    * define a local var `showingContacts` according to the var `query`
    * return the page
        * a `<input>` component for the searching
            * assign method `updateQuery` to `onChange`
        * a `<Link>` component redirecting to `/create`
        * a list item containing the var `contacts`
            * at the end there is a button, its `onClick` is mapped to var `onDeleteContact`
       
#### `CreateContact.js`
##### Class `CreateContact`
* method `handleSubmit` called when submitting
    * serialize the data from the form
    * call the method `onCreateContact` (assigned outside this class)
* method `render` returns a page
    * `<Link>` redirects to `/`
    * a `form` component
        * `onSubmit` is assigned with method `handleSubmit`

#### `ImageInput.js`
##### Function `readFileAsDataURL`

##### Function `resizeImage`

##### Class `ImageInput` 
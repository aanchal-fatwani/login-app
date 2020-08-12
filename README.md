# Users Dashboard

An app representing a dashboard to see all the users and sunsequently their details. The primary pages of the application are:<br>

1. Display a login form for the user to login into the application and view further content.
2. Check all the possible users available in the system.
3. Check the details of a particular user.

## To get started:

1. Install [NodeJS](http://www.nodejs.org)
2. Download this repo
3. Open the command line of your choice and cd to a sample directory within this repo on your machine
4. `npm install` - Installs packages
5. `npm start` - Builds the project and launch a lite web server (webpack-dev-server).
6. Navigate to [http://localhost:3000/](http://localhost:3000/) if your browser doesn't open automatically.


## Scripts

In the project directory, try running:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Technical Details

The project has been developed using ReactJs. <br>
The login credentials have been mapped from a remote endpoint containing sample data for a set of users. (https://reqres.in/) <br>
Authorization has also been ensured at multiple stages for proper and secure flow of data.<br>


## Page Specific Details

### Login Page (/login)

API Endpoint : https://reqres.in/api/login (POST) <br>
(Takes Username and Password to checkk if they correspond to valid user) <br>

On successful login, an user session is created limiting to 3 mins for short term browsing rights, and to 10 mins for when the user wants to be kept logged in.<br>
This is done with the help of cookie storage which stores encoded value to prevent data leakage.<br>
In case of unsuccessful login, the user is prompted relevant error to enter correct details.

### Dashboard Page (/users)

API Endpoint : https://reqres.in/api/users?page=1 <br>

Shows the list of users if the page is accessed within login session, else the user is taken to Login page. <br>
The page shows only the initial set of results along with pagination feature to check further results.

### User Detail Page (/users/:id)

API Endpoint : https://reqres.in/api/users/1 <br>

Shows the details of user if the page is accessed within login session, else the user is taken to Login page.



## Future Scope Of Improvement

The project can be extended by adding features to provide session based access along with Logout option. Also, the feature for a user to Signup can be added for repeated browsing.

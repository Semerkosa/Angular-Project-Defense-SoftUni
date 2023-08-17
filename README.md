# Gimy

The src code of my first Angular project at SoftUni, which I will have to defend a few days from its creation... 

Project **Gimy** is about working out. Customers can buy a workout program or hire an online coach to help them on their journey.

Guest users have access to the home, login and register pages. They can also browse through the avaible programs and read the reviews of the satisfied customers, who have previously purchased a given workout program.

Logged in users can:
- See the home page (slightly different)
- Browse through the available workout programs and purchase one;
- Browse through the available online coaches and hire one;
- Read reviews of a specific program/coach;
- See their profile
- See a page with the workout programs they have already purchased;

The navigation menu changes according to the authentication status (whether loggin in or not).

## Instructions to run the project:
> Json server and Json server auth are used to replicate a real backend server [Json Server](https://www.npmjs.com/package/json-server) [Json Server Auth](https://www.npmjs.com/package/json-server-auth).

- Clone the project, go into the root directory (named 'project') and open two separate terminals;
- Download all the vital modules with `npm i`
- Download both json servers with `npm i -g json-server` and `npm i -g json-server-auth`
- Start the json server (by default on port 5000) with `npm run json-server`
- Start the Angular app with `ng serve`

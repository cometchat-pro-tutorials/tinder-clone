# How to Create a Dating Web App In Node Js [with CometChat Javascript SDK]

Read the full tutorial here: [**>> How to Create a Dating Web App In Node Js [with CometChat Javascript SDK]**](https://www.cometchat.com/tutorials/#)

How to Create a Dating Web App In Node Js [with CometChat Javascript SDK]:

![How to Create a Dating Web App In Node Js [with CometChat Javascript SDK]](/screenshots/0.gif)

<center><figcaption>Dating Web App In Node Js [with CometChat Javascript SDK]</figcaption></center>

## Technology

This demo uses:

- CometChat Javascript SDK
- Node.js
- Express.js
- MySQL
- Body-parser
- Cors
- Dotenv
- Nodemon

## Running the demo

To run the demo follow these steps:

1. [Head to CometChat Pro and create an account](https://app.cometchat.com/signup)
2. From the [dashboard](https://app.cometchat.com/apps), add a new app called **"tinder-clone"**
3. Select this newly added app from the list.
4. From the Quick Start copy the **APP_ID, APP_REGION and AUTH_KEY**. These will be used later.
5. Also copy the **REST_API_KEY** from the API & Auth Key tab.
6. Navigate to the Users tab, and delete all the default users and groups leaving it clean **(very important)**.
7. Download the repository [here](https://github.com/hieptl/tinder-clone/archive/main.zip) or by running `git clone https://github.com/hieptl/tinder-clone.git` and open it in a code editor.
8. Create a file called **config.js** in the ”public/js” folder of your project.
9. Import and inject your secret keys in the **config.js** file containing your CometChat in this manner.

```js
const config = {
  CometChatAppId: xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx,
  CometChatRegion: xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx,
  CometChatAuthKey: xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx,
  CometChatAPIKey: xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx
};
```
10. We will use the MySQL database. For this reason, this section describes how to create the database and its table. Before proceeding, you need to make sure that you have installed the MySQL database on your computer already. To create the database and its table, you need to get the tinder_clone.sql and run it.
11. Create .env file and replace the below information with the information of your database connection.
```js
PORT=xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx
DB_HOST=xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx
DB_USER_NAME=xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx
DB_USER_PASSWORD=xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx
DB_NAME=xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx
DB_PORT=xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx
```
12. Install all the dependencies of the applicatoin by running
```js
npm install
```
13. Because we are installing the nodemon library. Therefore you can run one of the follow statements to run your project.
```js
node index.js 
or 
npx nodemon index.js
```
14. Make sure to include the .env file and the config.js file in your gitIgnore file from being exposed online.

Questions about running the demo? [Open an issue](https://github.com/hieptl/tinder-clone/issues). We're here to help ✌️

## Useful links

- 🏠 [CometChat Homepage](https://app.cometchat.com/signup)
- 🏠 [CometChat Widget](https://prodocs.cometchat.com/v2.1/docs/web-chat-widget)
- 🚀 [Create your free account](https://app.cometchat.com/apps)
- 📚 [Documentation](https://prodocs.cometchat.com)
- 👾 [GitHub](https://www.github.com/cometchat-pro)
- ✨ [Live Demo]()

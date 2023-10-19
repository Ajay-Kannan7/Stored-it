# Store-it
Store-it happens to be an e-commerce website which has extensively utilized certain tools on both the client-side and the server-side, and those tools are:
  
  i) Client-side: react-router,redux,axios,hooks,props,localStorage
  
  ii) Server-side: mongoose,express,mongodb

This e-commerce website has all the necessary functionalities that we usually come across on various e-commerce websites, such as browsing products, adding it to your cart, checking out the items through a payment gateway, 
and so on and so forth. The data is basically being rendered from the backend using APIs created using express, and the data is fetched from the connected database in 
mongodb using mongoose. We're sending requests for fetching data from the backend by utilzing the axios library, which is solely being used in this project for rendering data,
logging in and registering for when the user visits the website. Furthermore, we're using redux to manage state across the application to render the data on the user interface.
We're also utlizing localStorage for maintaining the session after the user has logged in so that it doesn't refresh on page reload. The localStorage is being used in also the case
of keeping the cart items visible for when a user adds a product to the cart. 

## What I learnt?

  ### 1) Using mongodb commands
  I've extensively used commands to fetch documents from the database and also to connect the database in the first place
  
  ```
  // For connecting with the database, the dbURL is the database collection link
  mongoose.connect(dbURL)
  .then()
  .catch()
  
  // For fetching documents all at once and send it to the client-side in the form of an array
  let db=mongoose.connection.db;
    db.collection("products").find().toArray((err,results)=>{
        if(err) throw err;
        res.send({allData:results})
    })
    
  // For finding a certain document from the database based on a query
  signInModel.findOne({email:email},(err,user)=>{})
  // {email:email} is the query for matching a certain document from the database
  ```
  
  ### 2) Using localStorage
  
  ```
  localStorage.setItem("<name-of-the-key",<value>)  //to set the localStorage key-value pairs
  localStorage.getItem("<name-of-the-key>")  //to fetch a particular key value-pair that's already been set
  localStorage.setItem("<name-of-the-key>",JSON.stringify())  //to set an array of objects
  JSON.parse(localStorage.getItem("<name-of-the-key>"))  //for getting an array of objects
  ```
  
  ### 3) Axios get and post requests
  
   ```
   axios.get("<URL of the backend API>") // for sending GET requests
   axios.post("<URL of the backend API>", <data-to-be-sent>)  //for sending POST requests
   ```
   
  ### 4) Payment gateway using Stripe
  
  I've integrated the backend API provided by Stripe within the Stripe docs to get data of the products from the backend
  and process payment accordingly in a test mode.
  
  ```
  // Setup Stripe variable
  const stripe = require('stripe')(<Your secret key in the dashboard>);
  
  // API for Stripe payment, in the POST format
      app.post('/create-checkout-session', async (req, res) => {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: '{{PRICE_ID}}',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
      });

      res.redirect(303, session.url);
    });
  ```
   
   ## Desktop Design
   ![image](https://user-images.githubusercontent.com/78952955/199300955-f0ad13dc-613a-4c37-9004-dfb238824e61.png)

   ## Mobile Design
   ![image](https://user-images.githubusercontent.com/78952955/199301201-a69db0da-dc57-47a7-9604-10dc205fbf07.png)
   
   ## Hosting
   Front-end: Netlify
   
   Back-end: Render
   
   ## Live URL
   https://store-it.netlify.app/ 

require('dotenv').config()
const express =require('express');
const  cors =require('cors');
const app=express();
const jwt = require("jsonwebtoken");
const port =process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



//middleware
app.use(cors());
app.use(express.json());


// JWT Verify Token
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  // bearer token
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.eeu0ppt.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {

  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbConnect = async () => {
  try {
    client.connect();
    console.log(" Database Connected Successfully✅ ");

  } catch (error) {
    console.log(error.name, error.message);
  }
}
dbConnect()


 const RecipeCollection = client.db("RecipesDB").collection("allRecipes");
 const userCollection = client.db("RecipesDB").collection("users");


 // JWT: Json Web Token
 app.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});




app.get('/', (req, res) => {
  res.send('Lets Share Your Recipe')
})
//user collection

app.get('/users', async (req, res) => {
    const result = await userCollection.find().toArray();
    res.send(result);
  })
  

app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  try {
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: 'User already exists', user: existingUser });
    }

    const newUser = { name, email, coins: 50 }; // Add 50 coins for new users
    const result = await userCollection.insertOne(newUser);

    if (result.insertedId) {
      const createdUser = await userCollection.findOne({ _id: result.insertedId });
      res.status(201).json({ message: 'User created successfully', user: createdUser });
    } else {
      res.status(500).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// task collection
app.post('/addRecipe', async (req, res) => {
  const body = req.body;
  console.log(body);
  const result = await RecipeCollection.insertOne(body);
  // res.send(result);
  if (result?.insertedId) {
    return res.status(200).send(result);
  } else {
    return res.status(404).send({
      message: "can not insert try again later",
      status: false,
    });
  }
})

app.get('/allRecipe', async (req, res) => {
  const result = await RecipeCollection.find().toArray();
  res.send(result);
})


//single user added
app.get('/users/:email',  async (req, res) => {
  const { email } = req.params;
  try {
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//patch function

app.patch('/users/:email', async (req, res) => {
  const { email } = req.params;
  const { coins } = req.body;

  try {
    // Update user's coins in the database
    await userCollection.findOneAndUpdate({ email }, { coins });
    res.status(200).json({ message: 'User coins updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.patch('/allRecipe/:id', async (req, res) => {
  const { id } = req.params;
  const { purchased_by, watchCount } = req.body;

  try {
    // Update recipe's purchased_by and watchCount in the database
    await RecipeCollection.findByIdAndUpdate(id, { purchased_by, watchCount });
    res.status(200).json({ message: 'Recipe details updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get("/allRecipe/:id", async (req, res) => {
  const id = (req.params.id);
  const query = { _id: new ObjectId(id) }
  const result = await RecipeCollection.findOne(query);
  res.send(result);
})


app.post('/api/reactions', (req, res) => {
  const { itemId } = req.body;
  const userId = req.headers['user-id']; // Assuming userId is passed in headers

  // Check if the user has already reacted to the item
  if (reactions[itemId] && reactions[itemId].includes(userId)) {
    // User has already reacted, so remove the reaction
    reactions[itemId] = reactions[itemId].filter((id) => id !== userId);
    res.status(200).json({ reacted: false });
  } else {
    // User has not reacted yet, so add the reaction
    reactions[itemId] = reactions[itemId] ? [...reactions[itemId], userId] : [userId];
    res.status(200).json({ reacted: true });
  }
});




app.listen(port, () => {
    console.log(`Lets run the Task server site on port : ${port}`)
  })
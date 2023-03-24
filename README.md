### Setup 
1. git clone repo 
2. npm install
3. npm start 

## Pushing Work 
1. Create branch -> git checkout -m "feature_<name>" or git checkout -m "bug_<name>"
2. Create a pull request on that branch 
3. Merge on review 

## Stack 
- Express: Server side framework used 
- MongoDB: Database 


# Run in docker 
1. Have docker desktop installed 
2. In the terminal at the root of the project run `docker compose up`
3. view container in docker desktop to open in browser or open http://localhost:3000/  


# Run locally 
1. Install mongodb [as described here](https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database)
2. open mongo Compass and create a database called ot_database
3. In file util/connect.js
    change: 
    `mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));`

    to 

    `mongoose.connect('mongodb://localhost:27017/ot_database', { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));`
4. your done 
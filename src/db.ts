import { MongoClient } from 'mongodb';

export const client = new MongoClient(
  'mongodb+srv://snickerdev:snickerdev@todoapp.jvrm00s.mongodb.net/?retryWrites=true&w=majority'
);
export const db = client.db();

/* ##################### */

// const uri =
//   'mongodb+srv://snickerdev:snickerdev@todoapp.jvrm00s.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// export const client = new MongoClient(process.env.MONGO_URI as string, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 });
//     // console.log(
//     //   'Pinged your deployment. You successfully connected to MongoDB!'
//     // );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// export const db = client.db();

import app from "./app";
import { connectMongoDB } from "./infrastructure/db/MongoDBConnection";

const PORT = process.env.PORT || 3000;

connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

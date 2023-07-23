import mongoose from 'mongoose';

const connectToMongo = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1/my-db');

    console.log('Connect to mongodb successfully');
  } catch (error) {
    console.error(error);
    process.exit(0);
  }

}

export default connectToMongo;

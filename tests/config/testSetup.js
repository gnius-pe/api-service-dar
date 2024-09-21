// tests/config/testSetup.js
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import TestPatient from '../../src/models/patient.model.js';
import Specialty from '../../src/models/specialty.model.js';
import User from '../../src/models/user.model.js';
import Mision from '../../src/models/mision.model.js'; // Asegúrate de importar el modelo de Mision

let mongoServer;

export const setupTestDB = () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    if (mongoose.connection.readyState === 1) {
      await TestPatient.deleteMany({}); // Limpia la colección de TestPatient
      await Specialty.deleteMany({});   // Limpia la colección de Specialty
      await User.deleteMany({});        // Limpia la colección de User
      await Mision.deleteMany({});      // Limpia la colección de Mision
      // Puedes agregar más modelos si es necesario
    }
  });
};

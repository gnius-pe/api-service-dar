// src/controllers/basicController.js
export const getBasicResponse = (req, res) => {
    res.status(200).json({ message: 'Hello, world!' });
  };
  
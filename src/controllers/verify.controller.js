export const verifyNumberEvenOdd = async (req, res) => {
    const number = parseInt(req.params.number, 10);
    // Sentencias a probar
    if (isNaN(number)) {
        res.status(400).send('Not a number');
    } else if (number % 2 === 0) {
        res.send(`${number} is even`);
    } else {
        res.send(`${number} is odd`);
    }
};

export const grade = (req, res) => {
    const score = parseInt(req.params.score, 10);
  
    if (isNaN(score) || score < 0 || score > 100) {
      res.status(400).send('Invalid score');
    } else if (score >= 90) {
      res.send('Grade A');
    } else if (score >= 80) {
      res.send('Grade B');
    } else if (score >= 70) {
      res.send('Grade C');
    } else if (score >= 60) {
      res.send('Grade D');
    } else {
      res.send('Grade F');
    }
};
export default {
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    testEnvironment: 'node',
    collectCoverage: true, // Asegúrate de que la cobertura esté habilitada
    collectCoverageFrom: [
      "src/service/**/*.js" // Aquí indicamos que solo recoja cobertura de la carpeta controllers
    ],
    coverageDirectory: 'coverage',
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    reporters: [
      "default",
      ["jest-html-reporters", {
        "publicPath": "./reports",
        "filename": "report.html",
        "expand": true
      }]
    ],
    verbose: true,
  };
  
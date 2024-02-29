const optionsCORS = {
  origin: [
    'http://localhost:3000',
    'https://mv781mestofront.nomoredomainsmonster.ru',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

export default optionsCORS;

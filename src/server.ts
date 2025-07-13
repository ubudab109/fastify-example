import app from './app';

const PORT = process.env.PORT || 3000;
app.listen({ port: +PORT }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server running at ${address}`);
});

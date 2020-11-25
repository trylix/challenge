import "dotenv/config";

import AppModule from "./app.module";

const port = process.env.PORT || 8000;

const bootstrap = async () => {
  AppModule.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

bootstrap();

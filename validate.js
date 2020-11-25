const fs = require("fs").promises;
const path = require("path");
const inquirer = require("inquirer");
const ora = require("ora");

const awaitWarning = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("\nPROJECT GENERATOR\n");
      resolve();
    });
  });
};

const validateIfSecretsExists = async () => {
  console.log("validating if .env exists...");

  await fs.readFile(`${path.resolve(__dirname)}/.env`);

  console.log(".env file found");
};

const replaceContent = async (file, replacers) => {
  let content = await fs.readFile(file, "utf8");

  for (let replacer of replacers) {
    content = content.replace(replacer.from, replacer.to);
  }

  await fs.writeFile(file, content);
};

const cleanUpEnvironment = async (params) => {
  await fs.copyFile("./.env.example", "./.env");

  await replaceContent("./.env", [
    {
      from: "{0}",
      to: params.port,
    },
    {
      from: "{1}",
      to: params.giphyKey,
    },
  ]);
};

const askParams = async () => {
  const params = await inquirer.prompt([
    {
      name: "port",
      default: 8000,
      message: "Em qual porta você pretende iniciar a API?",
    },
    {
      name: "giphyKey",
      validate: (i) =>
        i.length > 0
          ? true
          : "Você precisa definir uma API key para utilizar o Giphy",
    },
    {
      name: "confirmed",
      type: "confirm",
      message: "Confirma as configurações?",
    },
  ]);

  if (!params.confirmed) {
    console.log("---- Responda novamente:");

    return askParams(params);
  }

  return params;
};

const init = async () => {
  try {
    await validateIfSecretsExists();
  } catch (e) {
    await awaitWarning();

    console.error(`file .env does not exists, ${e}`);

    const params = await askParams();

    let promise = cleanUpEnvironment(params);
    ora.promise(promise, "setting up the project");
    await promise;
  }
};

init().catch((err) => {
  console.error(err);
  process.exit(-1);
});

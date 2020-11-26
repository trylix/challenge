## Instalação e execução

**Faça um clone desse repositório**

Na pasta root do projeto:

- Executando o projeto sem Docker:

  - Execute o comando `npm install` ou `yarn install` para instalar as dependências do projeto;
  - Exexute o comando `npm run configure` ou `yarn configure` para configurar o projeto; \
    (você também pode configurar o projeto, fazendo uma cópia do arquivo `.env.example` e alterandos valores de `PORT` e `GIPHY_API_KEY`)
  - Execute o comando `npm run start` ou `yarn start` para iniciar a aplicação;
  - Você pode acessar a aplicação através do endpoint `http://{SEU_HOST}:{SUA_PORTA}/recipes/?i={ingredient_1},{ingredient_2}` \
    (Exemplo: http://127.0.0.1:8000/recipes/?i=onion,tomato)

- Executando o projeto com Docker:

  - Execute o comando `docker run -ti -p {SUA_PORTA}:8000 brendenson/devmuch` para criar e executar o container a partir da imagem no DockerHub;
  - Você pode acessar a aplicação através do endpoint `http://{SEU_HOST}:{SUA_PORTA}/recipes/?i={ingredient_1},{ingredient_2}` \
    (Exemplo: http://127.0.0.1:8000/recipes/?i=onion,tomato)

## Executando testes automatizados

- Executando testes sem Docker:

  - _Execute o comando `npm install` ou `yarn install` para instalar as dependências do projeto;_ \
    _(caso ainda não o tenha feito)_
  - Execute o comando `npm run test` ou `yarn test` para executar;

- Executando testes com Docker:

  - Execute o comando `docker run -ti brendenson/devmuch-tests` para criar e executar o container a partir da imagem no DockerHub;

Para visualizar o desafio, [clique aqui](DESAFIO)

---

Feito com ♡ by Brendenson [Github](https://github.com/trylix) | [GitLab](https://gitlab.com/brendenson) | [LinkedIn](https://www.linkedin.com/in/dobrendenson)

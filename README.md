# Vehicle Manager API
Teste de proficiência em desenvolvimento Node.JS Maqplan.  

**Links úteis:**  
Link do demo: [Hospedado na Heroku](https://vehicle-manager-api.herokuapp.com/v1)  
Documentação da API: [Documentação interativa](https://vehicle-manager-api.herokuapp.com/v1/docs)  

## Como instalar
Você precisa simplesmente clonar esse repositório no seu computador, e logo em seguida instalar as dependências:  
```
yarn install
// ou
npm install
```
Agora você deve renomear o arquivo `.env.example` para `.env` e trocar as variáveis de conexão com o seu banco de dados

## Como rodar
Esse projeto possui 3 scripts:  

* `dev` para rodar a versão de desenvolvimento
* `build` para gerar a versão final de produção (gera uma pasta dist)
* `start` para rodar a versão de produção (deve executar o build antes)

Basta executá-los com yarn ou npm, de acordo com sua preferência

```
yarn dev

// para gerar o build final
yarn build
yarn start
```
Com npm:  
```
npm run dev

// para gerar o build final
npm run build
npm start
```

# postgresql_cra

# Running

Start client app

```
cd client/
yarn
yarn start

```

Start server app
```
cd server/
yarn
sequelize init:migrations
sequelize db:migrate
sequelize db:seed:all
yarn dev 
```


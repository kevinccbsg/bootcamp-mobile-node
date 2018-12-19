# Nodepop API

API to get access the Nodepop services.

## Getting started

### Installation

### Run command

```
npm install
```

**NOTE** we recommend to have installed [mongodb](https://www.mongodb.com/) or [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/).

## Run prod

Please if you have docker and docker compose installed you can run these commands in order to have the API and the database running. (Run seperatly)

```
// this will run the DDBB and the API
npm run deploy
```

```
// load some data
npm run installDB
```

If you have mongo on mongodb://localhost:27017 it won't be necesary to run those commands. Tou will have to run instead

```
DB_URL=mongodb://localhost:27017 npm start
```

but we recommend to use *docker* instead.

## Running on dev

### Run DDBB

```
docker run --name some-mongo -p 27017:27017  -d mongo
```

```
npm run installDB // load some data
```

If you have mongo on mongodb://localhost:27017 it won't be necesary to run those communds, but we recommend to use docker instead.

#### Run command

```
npm run dev
```

An API should be running on http://localhost:3000.

If you want to load some sata you can run the following command:

```
npm run installDB
```

Once you call http://localhost:3000 you will see the available routes.

You can test the endpints using the swagger UI on http://localhost:3000/api-docs

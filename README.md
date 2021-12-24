## install
npm install

## run
npm start

## test
A postman collection is available with all api requests

## api
Create game:
POST - http://localhost:8080/game/create
body: {
    "playerName": "David"
    }

Join Game:
POST - http://localhost:8080/game/join
body:{
    "gameId":0,
    "playerName":"Ilan"
    }

Make Move:
POST - http://localhost:8080/game/makeMove
body:{
    "gameId":0,
    "playerName":"David",
    "x":0,
    "y":2
    }

Game by type:
GET - http://localhost:8080/game/gamesByType
body:{
    "gameStatus":"ALL"
    }

Game by id:
GET - http://localhost:8080/game/gameById
body:{
    "gameId":"0"
    }

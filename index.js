// index.js
const functions = require("firebase-functions");
// Expressの読み込み
const express = require("express");
const requestPromise = require("request-promise-native"); // 追加


const app = express();
app.use(cors());

const getDataFromApi = async (keyword) => {
  // cloud functionsから実行する場合には地域の設定が必要になるため，`country=JP`を追加している
  const requestUrl =
    "https://www.googleapis.com/books/v1/volumes?country=JP&q=intitle:";
  const result = await requestPromise(`${requestUrl}${keyword}`);
  return result;
};

app.get("/hello", (req, res) => {
  // レスポンスの設定
  res.send("Hello Express!");
});

app.get("/user/:userID",(req,res)=>{
  const users = [
   { id: 1, name: 'ジョ'},
   { id: 2, name: 'ジョナ'},
   { id: 3, name: 'ジョナサ'},
   { id: 4, name: 'ジョナサン'},
   { id: 5, name: 'ジョナサンン'}
  ];
  const targetUser = users.find(user => user.id === Number(req.params.userID));
  res.send(targetUser);
});

app.get('/gbooks/:keyword', cors(), async(req, res)=>{
  const response = await getDataFromApi(req.params.keyword);
  res.send(response);
});

// 出力
const api = functions.https.onRequest(app);
module.exports = { api };
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// 提供 public 資料夾的靜態檔案（遊戲頁面）
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('🚀 A user connected');

  socket.on('chat', (msg) => {
    io.emit('chat', msg); // 廣播訊息給所有人
  });

  socket.on('disconnect', () => {
    console.log('❌ A user disconnected');
  });
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

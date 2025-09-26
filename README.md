# Node.js 智慧步態與跌倒偵測系統 (nodejsblu)

這是一個我在大學時期 (2021) 開發的全端網頁應用程式，主要用來做**步態分析與跌倒偵測**，特別針對高齡者或復健病患的需求。

## 功能特色

* **使用者系統**：註冊 / 登入 / 身份驗證（`passport.js`）
* **資料上傳與分析**：護理人員介面 (`nurse.pug`) 與後端處理 (`upload_data.js`)
* **儀表板**：用圖表呈現步態 (`gait.pug`)、跌倒 (`fall.pug`)、復健 (`rehab.pug`) 數據
* **多角色**：一般使用者 vs. 護理人員
* **HTTPS 加密**：內建 SSL 憑證設定

## 技術堆疊

**後端**

* Node.js + Express.js
* MongoDB (Mongoose ODM)
* Passport.js (身份驗證)
* Helmet.js (安全防護)
* 內建 http/https server

**前端**

* Pug (模板引擎)
* jQuery 3.4.1
* Bootstrap 4.4.1
* Web Bluetooth API

**開發工具**

* Webpack
* Nodemon

## 專案架構

```
.
├── app.js              # 入口 & middleware 設定
├── bin/www             # 伺服器啟動
├── model/              # 資料庫模型
├── public/             # 靜態資源
├── routes/             # 路由
├── views/              # Pug 樣板
├── package.json
└── webpack.config.js
```

## 快速開始

**需求**

* Node.js (建議 v14+)
* npm
* MongoDB

**安裝**

```bash
git clone https://github.com/your-username/nodejsblu.git
cd nodejsblu
npm install
```

**設定環境變數**
建議建立 `.env` 管理資料庫連線字串等敏感資訊。

**啟動**

```bash
npm start
```

打開瀏覽器進到 `http://localhost:3000` 就能看到介面。

## Arduino

**硬體**：
* Arduino
* HM10 藍芽模組
* GY521 陀螺儀加速度模組

## 相關論文
Chang, M.-H.; Wu, Y.-C.; Niu, H.-Y.; Chen, Y.-T.; Juang, S.-H. Cross-Platform Gait Analysis and Fall Detection Wearable Device. Appl. Sci. 2023, 13, 3299. https://doi.org/10.3390/app13053299

## 授權

依據 [LICENSE](LICENSE) 條款授權。
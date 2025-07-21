# 📈 Stock Market Portfolio App Updates

A full-stack MERN (MongoDB, Express, React, Node.js) application for tracking stocks with real-time market data.

## ✨ Features

- **📊 Stock Listing**: Browse and view detailed stock information
- **⭐ Watchlist**: Add stocks to your personal watchlist
- **📈 Real-time Ticker**: Live Dow Jones and S&P 500 updates every 5 seconds
- **🎨 Modern UI**: Beautiful gradient design with glass-morphism effects
- **📱 Responsive**: Works on desktop and mobile devices
- **🏷️ Market Indices**: Special highlighting for market indices

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **CSS3** - Modern styling with gradients and animations
- **Alpha Vantage API** - Real-time stock data

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/stock-market-portfolio.git
   cd stock-market-portfolio
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd stock-market-frontend
   npm install
   cd ..
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Start the backend server**
   ```bash
   npm start
   ```
   Server will run on `http://localhost:5000`

6. **Start the frontend (in a new terminal)**
   ```bash
   cd stock-market-frontend
   npm start
   ```
   App will open on `http://localhost:3000`

## 📁 Project Structure

```
stock-market-portfolio/
├── server.js              # Express server & MongoDB connection
├── package.json           # Backend dependencies
├── stock-market-frontend/ # React frontend
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Main styles
│   │   ├── TickerTape.js  # Real-time ticker component
│   │   └── TickerTape.css # Ticker styles
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## 🎯 API Endpoints

- `GET /api/stocks` - Get all stocks
- `GET /api/stocks/:symbol` - Get stock by symbol
- `POST /api/watchlist` - Add stock to watchlist

## 🔧 Configuration

### Alpha Vantage API
1. Get a free API key from [alphavantage.co](https://www.alphavantage.co/support/#api-key)
2. Replace `'demo'` in `TickerTape.js` with your API key:
   ```javascript
   const API_KEY = 'your_api_key_here';
   ```

### MongoDB Connection
Update the MongoDB connection string in `server.js` if needed:
```javascript
mongoose.connect("mongodb://localhost:27017/stock-portfolio")
```

## 📊 Real-time Features

- **Live Updates**: Ticker updates every 5 seconds
- **Fallback Data**: Simulated data when API is unavailable
- **Visual Feedback**: Color-coded price changes (green/red)
- **Timestamps**: Shows last update time

## 🎨 UI Features

- **Gradient Backgrounds**: Modern purple-blue gradients
- **Glass Morphism**: Transparent cards with blur effects
- **Hover Animations**: Interactive button and card effects
- **Market Index Badges**: Special styling for indices
- **Responsive Design**: Mobile-friendly layout

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Stock data from various financial APIs
- Icons and styling inspiration from modern web design
- Alpha Vantage for real-time market data

## Jake is here now 
## Vatsan is here now
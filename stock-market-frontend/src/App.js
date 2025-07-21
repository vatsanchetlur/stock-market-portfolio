import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	NavLink,
} from "react-router-dom";
import "./App.css";
import TickerTape from "./TickerTape";

const Stocks = ({ addToWatchlist }) => {
	const [stocks, setStocks] = useState([]);

	useEffect(() => {
		// Fetch stock data from the backend
		fetch("http://localhost:5000/api/stocks")
			.then((res) => res.json())
			.then((data) => setStocks(data))
			.catch((error) => console.error("Error fetching stocks:", error));
	}, []);

	const getRandomColor = () => {
		const colors = ["#48bb78", "#e53e3e", "#3182ce", "#805ad5", "#d69e2e"]; // Green, Red, Blue, Purple, Orange
		return colors[Math.floor(Math.random() * colors.length)];
	};

	const isMarketIndex = (symbol) => {
		return ['DJI', 'SPX', 'IXIC', 'RUT'].includes(symbol);
	};

	return (
		<div className="App">
			<h1>Stock Market Portfolio</h1>
			<h2>Available Stocks</h2>
			{stocks.length === 0 ? (
				<div className="empty-state">Loading stocks...</div>
			) : (
				<ul>
					{stocks.map((stock) => (
						<li key={stock.symbol} className={isMarketIndex(stock.symbol) ? 'market-index' : ''}>
							<div className="stock-info">
								<div className="stock-company">
									{stock.company}
									{isMarketIndex(stock.symbol) && <span className="index-badge">INDEX</span>}
								</div>
								<div className="stock-symbol">({stock.symbol})</div>
							</div>
							<span className="stock-price" style={{ color: getRandomColor() }}>
								${stock.initial_price}
							</span>
							<button onClick={() => addToWatchlist(stock)}>
								Add to Watchlist
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

const Watchlist = ({ watchlist }) => {
	const getRandomColor = () => {
		const colors = ["#48bb78", "#e53e3e", "#3182ce", "#805ad5", "#d69e2e"]; // Green, Red, Blue, Purple, Orange
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<div className="App">
			<h1>Stock Market Portfolio</h1>
			<h2>My Watchlist</h2>
			{watchlist.length === 0 ? (
				<div className="empty-state">
					Your watchlist is empty. Add some stocks to get started!
				</div>
			) : (
				<ul>
					{watchlist.map((stock) => (
						<li key={stock.symbol}>
							<div className="stock-info">
								<div className="stock-company">{stock.company}</div>
								<div className="stock-symbol">({stock.symbol})</div>
							</div>
							<span className="stock-price" style={{ color: getRandomColor() }}>
								${stock.initial_price}
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

function App() {
	const [watchlist, setWatchlist] = useState([]);

	const addToWatchlist = (stock) => {
		// Add stock to watchlist
		fetch("http://localhost:5000/api/watchlist", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(stock),
		})
			.then((res) => res.json())
			.then((data) => {
				// Show an alert with the message received from the server
				alert(data.message);
				setWatchlist([...watchlist, stock]);
			})
			.catch((error) =>
				console.error("Error adding to watchlist:", error)
			);
	};

	return (
		<Router>
			<div className="app-layout">
				<div className="main-content">
					<nav>
						<NavLink to="/stocks">Stocks</NavLink>
						<NavLink to="/watchlist">Watchlist</NavLink>
					</nav>
					<Routes>
						<Route
							path="/"
							element={<Stocks addToWatchlist={addToWatchlist} />}
						/>
						<Route
							path="/stocks"
							element={<Stocks addToWatchlist={addToWatchlist} />}
						/>
						<Route
							path="/watchlist"
							element={<Watchlist watchlist={watchlist} />}
						/>
					</Routes>
				</div>
				<TickerTape />
			</div>
		</Router>
	);
}

export default App;

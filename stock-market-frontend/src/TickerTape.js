import React, { useState, useEffect } from 'react';
import './TickerTape.css';

const TickerTape = () => {
    const [tickerData, setTickerData] = useState([
        { symbol: 'DJI', name: 'Dow Jones', price: 0, change: 0, changePercent: 0 },
        { symbol: 'SPX', name: 'S&P 500', price: 0, change: 0, changePercent: 0 }
    ]);

    const fetchRealTimeData = async () => {
        try {
            // Using Alpha Vantage API (free tier)
            const API_KEY = 'demo'; // Replace with your actual API key from alphavantage.co
            
            const symbols = ['DJI', 'SPX'];
            const promises = symbols.map(async (symbol) => {
                try {
                    const response = await fetch(
                        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
                    );
                    const data = await response.json();
                    
                    if (data['Global Quote']) {
                        const quote = data['Global Quote'];
                        return {
                            symbol: symbol,
                            name: symbol === 'DJI' ? 'Dow Jones' : 'S&P 500',
                            price: parseFloat(quote['05. price']),
                            change: parseFloat(quote['09. change']),
                            changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
                        };
                    }
                } catch (error) {
                    console.error(`Error fetching ${symbol}:`, error);
                }
                
                // Fallback with simulated data if API fails
                return {
                    symbol: symbol,
                    name: symbol === 'DJI' ? 'Dow Jones' : 'S&P 500',
                    price: symbol === 'DJI' ? 34000 + Math.random() * 1000 : 4200 + Math.random() * 200,
                    change: (Math.random() - 0.5) * 100,
                    changePercent: (Math.random() - 0.5) * 3
                };
            });

            const results = await Promise.all(promises);
            setTickerData(results.filter(Boolean));
        } catch (error) {
            console.error('Error fetching ticker data:', error);
            // Use simulated data as fallback
            setTickerData([
                {
                    symbol: 'DJI',
                    name: 'Dow Jones',
                    price: 34000 + Math.random() * 1000,
                    change: (Math.random() - 0.5) * 100,
                    changePercent: (Math.random() - 0.5) * 3
                },
                {
                    symbol: 'SPX',
                    name: 'S&P 500',
                    price: 4200 + Math.random() * 200,
                    change: (Math.random() - 0.5) * 50,
                    changePercent: (Math.random() - 0.5) * 2
                }
            ]);
        }
    };

    useEffect(() => {
        // Fetch initial data
        fetchRealTimeData();
        
        // Update every 30 seconds
        const interval = setInterval(fetchRealTimeData, 2000);
        
        return () => clearInterval(interval);
    }, []);

    const formatPrice = (price) => {
        return price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const formatChange = (change) => {
        const sign = change >= 0 ? '+' : '';
        return `${sign}${change.toFixed(2)}`;
    };

    const formatChangePercent = (changePercent) => {
        const sign = changePercent >= 0 ? '+' : '';
        return `${sign}${changePercent.toFixed(2)}%`;
    };

    return (
        <div className="ticker-tape">
            <div className="ticker-header">
                <span className="ticker-title">📈 Live Markets</span>
            </div>
            <div className="ticker-content">
                {tickerData.map((item, index) => (
                    <div key={index} className="ticker-item">
                        <div className="ticker-symbol">{item.symbol}</div>
                        <div className="ticker-name">{item.name}</div>
                        <div className="ticker-price">${formatPrice(item.price)}</div>
                        <div className={`ticker-change ${item.change >= 0 ? 'positive' : 'negative'}`}>
                            <span className="change-value">{formatChange(item.change)}</span>
                            <span className="change-percent">({formatChangePercent(item.changePercent)})</span>
                        </div>
                        <div className="ticker-time">
                            {new Date().toLocaleTimeString()}
                        </div>
                    </div>
                ))}
            </div>
            <div className="ticker-footer">
                <span className="update-text">Updates every 2s</span>
            </div>
        </div>
    );
};

export default TickerTape;

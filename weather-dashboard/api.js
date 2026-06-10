/* ==================== WEATHER API MODULE ==================== */
const WeatherAPI = (() => {
    const apiKey = CONFIG.API_KEY;
    const endpoints = CONFIG.API_ENDPOINTS;
    
    const getCurrentWeather = async (city, tempUnit = 'metric') => {
        try {
            const response = await fetch(
                `${endpoints.current}?q=${city}&appid=${apiKey}&units=${tempUnit}`
            );
            if (!response.ok) throw new Error(`API error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching current weather:', error);
            throw error;
        }
    };
    
    const getForecast = async (city, tempUnit = 'metric') => {
        try {
            const response = await fetch(
                `${endpoints.forecast}?q=${city}&appid=${apiKey}&units=${tempUnit}`
            );
            if (!response.ok) throw new Error(`API error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching forecast:', error);
            throw error;
        }
    };
    
    const searchCities = async (query, limit = 5) => {\n        try {
            const response = await fetch(
                `${endpoints.geocoding}?q=${query}&limit=${limit}&appid=${apiKey}`
            );
            if (!response.ok) throw new Error(`API error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error searching cities:', error);
            throw error;
        }
    };
    
    const getUserLocation = () => {
        return new Promise((resolve, reject) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        });
                    },
                    (error) => reject(error)
                );
            } else {
                reject(new Error('Geolocation not supported'));
            }
        });
    };
    
    const getWeatherIconUrl = (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    };
    
    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };
    
    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };
    
    return {
        getCurrentWeather,
        getForecast,
        searchCities,
        getUserLocation,
        getWeatherIconUrl,
        formatTime,
        formatDate
    };
})();
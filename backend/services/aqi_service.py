import requests
import os

def get_live_aqi(lat, lon):
    api_key = os.getenv('OPENWEATHER_API_KEY')
    url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={api_key}"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        # OpenWeatherMap returns AQI on a scale of 1-5
        aqi_index = data['list'][0]['main']['aqi']
        components = data['list'][0]['components'] # pm2_5, pm10, etc.
        
        # Map 1-5 to meaningful status
        status_map = {1: "Good", 2: "Fair", 3: "Moderate", 4: "Poor", 5: "Very Poor"}
        
        return {
            "aqi": aqi_index,
            "status": status_map.get(aqi_index, "Unknown"),
            "details": components
        }
    except Exception as e:
        print(f"Error fetching AQI: {e}")
        return None
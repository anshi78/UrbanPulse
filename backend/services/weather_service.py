import requests
import os

def get_live_weather(lat, lon):
    api_key = os.getenv('OPENWEATHER_API_KEY')
    # Use the 'weather' endpoint instead of 'air_pollution'
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={api_key}"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        return {
            "temp": round(data['main']['temp'], 1),
            "humidity": data['main']['humidity'],
            "condition": data['weather'][0]['main'], # Rain, Clouds, Clear
            "description": data['weather'][0]['description'].title(),
            "icon": data['weather'][0]['icon'] # e.g., '10d'
        }
    except Exception as e:
        print(f"Error fetching weather: {e}")
        return None
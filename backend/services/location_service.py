import requests
import os

def get_location_name(lat, lon):
    api_key = os.getenv('OPENWEATHER_API_KEY')
    # OpenWeatherMap Geocoding API
    url = f"http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit=1&appid={api_key}"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        if data and len(data) > 0:
            city = data[0].get('name', 'Unknown City')
            country = data[0].get('country', '')
            state = data[0].get('state', '')
            
            # Return a formatted string or object
            return {
                "city": city,
                "country": country,
                "state": state,
                "display_name": f"{city}, {country}"
            }
        return {"display_name": "Unknown Location"}
        
    except Exception as e:
        print(f"Error fetching location name: {e}")
        return {"display_name": "Unknown Location"}
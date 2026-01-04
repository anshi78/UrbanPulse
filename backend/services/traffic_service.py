import requests
import os

def get_live_traffic(lat, lon):
    api_key = os.getenv('TOMTOM_API_KEY')
    # TomTom Flow API requires a specific zoom level, usually 10-12 for city view
    url = f"https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key={api_key}&point={lat},{lon}"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        flow_data = data.get('flowSegmentData', {})
        current_speed = flow_data.get('currentSpeed', 0) # in km/h
        free_flow_speed = flow_data.get('freeFlowSpeed', 0)
        confidence = flow_data.get('confidence', 0)
        
        # Calculate congestion percentage
        congestion_level = 0
        if free_flow_speed > 0:
            congestion_level = round((1 - (current_speed / free_flow_speed)) * 100, 2)
        
        return {
            "current_speed": current_speed,
            "free_flow_speed": free_flow_speed,
            "congestion_level": max(0, congestion_level), # Ensure no negative
            "status": "High Congestion" if congestion_level > 50 else "Moderate" if congestion_level > 20 else "Clear"
        }
    except Exception as e:
        print(f"Error fetching Traffic: {e}")
        return None
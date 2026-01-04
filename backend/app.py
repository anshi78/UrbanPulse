from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

# Import Services
from services.aqi_service import get_live_aqi
from services.traffic_service import get_live_traffic
from services.location_service import get_location_name
from services.weather_service import get_live_weather

load_dotenv()

app = Flask(__name__)
CORS(app)

# --- CONFIGURATION ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db' # Creates a file named users.db
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret-key-change-this' # Change for production

# --- INIT EXTENSIONS ---
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# --- DATABASE MODEL ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

# Create DB tables (Run this once automatically)
with app.app_context():
    db.create_all()

# --- AUTH ROUTES ---

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        token = create_access_token(identity=email)
        return jsonify({"token": token, "email": email}), 200
    
    return jsonify({"message": "Invalid credentials"}), 401

# --- DATA ROUTES ---

@app.route('/api/urban-data', methods=['POST'])
@jwt_required() # <--- PROTECTED ROUTE (Requires Login)
def get_urban_data():
    data = request.json
    lat = data.get('lat', 28.6139)
    lon = data.get('lon', 77.2090)
    
    try:
        aqi = get_live_aqi(lat, lon)
        traffic = get_live_traffic(lat, lon)
        loc = get_location_name(lat, lon)
        weather = get_live_weather(lat, lon)

        return jsonify({
            'status': 'success',
            'location': {'lat': lat, 'lon': lon, 'name': loc.get('display_name'), 'details': loc},
            'aqi': aqi,
            'traffic': traffic,
            'weather': weather
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
## Languages
- [English](README.md)
- [日本語](README-ja.md)
- [中文](README-zh.md)

# Smart Home Inventory Management System

A modern web application for home inventory management, supporting multiple languages and intelligent features.

## 🌟 Features

### Core Features
- **Inventory Management**: Add, edit, delete, and view household items.
- **Category Management**: Support categories such as food, medicine, cleaning supplies, personal care, household items, and electronics.
- **Search Function**: Quickly search for item names and descriptions.
- **Expiry Date Management**: Set and track item expiry dates.

### Intelligent Features
- **Intelligent Reminders**:
  - Reminders for expired items.
  - Warnings for items about to expire (within 3 days).
  - Reminders for low inventory.
- **Intelligent Recommendations**:
  - Purchase suggestions based on inventory status.
  - Recommendations based on usage frequency analysis.

### Multi-language Support
- Simplified Chinese
- English
- Japanese

### Technical Features
- **Responsive Design**: Support for desktop and mobile devices.
- **Modern Interface**: Uses Tailwind CSS and Font Awesome icons.
- **Real-time Data**: Frontend-backend separation architecture with real-time data synchronization.
- **Data Persistence**: SQLite database storage.

## 🛠️ Technology Stack

### Frontend
- **Vue.js 3**: Progressive JavaScript framework.
- **Vue I18n**: Internationalization support.
- **Tailwind CSS**: Modern CSS framework.
- **Font Awesome**: Icon library.
- **Native JavaScript**: Core logic implementation.

### Backend
- **Python Flask**: Lightweight web framework.
- **SQLAlchemy**: ORM database operations.
- **Flask-CORS**: Cross-origin request support.
- **SQLite**: Lightweight database.

## 📁 Project Structure

```
smart-inventory-manager/
├── frontend/                 # Frontend source code
│   ├── index.html           # Main page
│   └── app.js              # Vue.js application logic
├── backend/                 # Backend source code
│   └── inventory-api/       # Flask API service
│       ├── src/
│       │   ├── main.py     # Flask application entry point
│       │   ├── models/     # Data models
│       │   │   ├── user.py
│       │   │   └── inventory.py
│       │   ├── routes/     # API routes
│       │   │   ├── user.py
│       │   │   └── inventory.py
│       │   └── static/     # Static files (frontend deployment)
│       ├── venv/           # Python virtual environment
│       └── requirements.txt # Python dependencies
├── README.md               # Project description
└── todo.md                # Development task list
```

## 🔧 Local Development

### Environment Requirements
- Python 3.11+
- Modern browser (supporting ES6+)

### Installation Steps

1. **Clone the project**
```bash
git clone https://github.com/chronie-shizutoki/smart-inventory-manager.git
cd smart-inventory-manager
```

2. **Set up the backend environment**
```bash
cd backend/inventory-api
# Create a virtual environment
python -m venv venv
# Activate the virtual environment
source venv/bin/activate  # Linux/Mac
# or venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

3. **Start the backend service**
```bash
python src/main.py
```

4. **Access the Application**
- Local Access: Open your browser and visit http://localhost:5000
- LAN Access: On other devices within the same network, use the IP address of the computer running the server, for example, http://192.168.1.100:5000

  > Tip: You can find your local IP address using the following methods:
  > - Windows: Enter `ipconfig` in the Command Prompt to find the IPv4 address
  > - Linux/Mac: Enter `ifconfig` or `ip addr` in the terminal to find the IPv4 address

## 📊 Database Design

### Main Data Tables

#### inventory_items (Inventory Items Table)
- `id`: Primary key
- `name`: Item name
- `category`: Category
- `quantity`: Quantity
- `unit`: Unit
- `min_quantity`: Minimum stock
- `expiry_date`: Expiration date
- `description`: Description
- `created_at`: Creation time
- `updated_at`: Update time

## 🌐 API Interfaces

### Inventory Management Interfaces
- `GET /api/inventory/items` - Get the list of items
- `POST /api/inventory/items` - Create a new item
- `PUT /api/inventory/items/{id}` - Update an item
- `DELETE /api/inventory/items/{id}` - Delete an item
- `GET /api/inventory/stats` - Get statistical data
- `GET /api/inventory/alerts` - Get intelligent reminders
- `GET /api/inventory/recommendations` - Get intelligent recommendations

## 🎨 Interface Preview

### Main Pages
1. **Inventory List Page**: Displays all items and supports search and filtering
2. **Add Item Page**: Add new items to the inventory
3. **Intelligent Analysis Page**: Displays intelligent reminders and recommendations

### Main Features
- Multi-language switching
- Responsive layout
- Real-time data update
- Intelligent status prompts

## 🔮 Future Plans

- [ ] Mobile APP development
- [ ] Barcode scanning function
- [ ] Data import/export
- [ ] User permission management
- [ ] Data visualization charts
- [ ] Purchase list generation

## 👥 Contribution

Welcome to submit Issues and Pull Requests to improve this project!

## 📄 License

unknown License

## 🙏 Acknowledgments

- Vue.js
- Flask
- Tailwind CSS

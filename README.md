# Explore Holidays - Premium Travel Booking Platform

A full-stack travel booking platform built with Node.js, React, and MariaDB. Features include flight booking, holiday packages, visa services, and more.

## 🚀 Features

- **Premium UI/UX** - Ultra-modern design with smooth animations
- **Multi-language** - English and Bangla support
- **Dark/Light Mode** - Theme toggle for user preference
- **SEO Optimized** - Meta tags and structured data
- **Admin Panel** - Complete management dashboard
- **Responsive** - Mobile-first design

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React 18, Tailwind CSS, Framer Motion
- **Database**: MariaDB
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 🛠️ Installation

### Prerequisites
- Node.js v24.11.1 or higher
- MariaDB 10.x or higher
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/thehassans/travel-explore.git
cd travel-explore
```

2. **Install dependencies**
```bash
# Install all dependencies
npm run install-all

# Or manually
npm install
cd client && npm install
```

3. **Configure environment**
```bash
# Copy example env file
cp .env.example .env

# Edit with your settings
nano .env
```

4. **Environment Variables**
```env
NODE_ENV=production
PORT=3001
APP_URL=https://your-domain.com

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=explore_holidays

# SEO
SITE_NAME=Explore Holidays
SITE_DESCRIPTION=Premium Travel Booking Platform
```

5. **Build and Run**
```bash
# Development
npm run dev

# Production
npm run production
```

## 🌐 Plesk Deployment Guide

### Node.js Configuration in Plesk

1. **Access Plesk Panel**
   - Login to your Plesk hosting panel
   - Navigate to "Websites & Domains"

2. **Enable Node.js**
   - Click on "Node.js" for your domain
   - Enable Node.js support

3. **Configure Node.js Settings**
   ```
   Node.js Version: 24.11.1
   Application Mode: production
   Application Root: /httpdocs (or your web root)
   Application Startup File: server/index.js
   ```

4. **Set Environment Variables**
   In Plesk Node.js settings, add these environment variables:
   ```
   NODE_ENV=production
   PORT=3001
   APP_URL=https://your-domain.com
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=explore_holidays
   SITE_NAME=Explore Holidays
   ```

5. **Install Dependencies**
   - Click "NPM install" in Plesk
   - Or SSH and run:
   ```bash
   cd /var/www/vhosts/your-domain.com/httpdocs
   npm run install-all
   npm run build
   ```

6. **Database Setup**
   - Create a MariaDB database in Plesk
   - Note the database name, user, and password
   - Update your .env file

7. **Start Application**
   - Click "Restart App" in Plesk Node.js panel

### File Structure for Plesk
```
/httpdocs/
├── client/
│   ├── build/          # Built React app (after npm run build)
│   ├── public/
│   └── src/
├── server/
│   ├── config/
│   ├── routes/
│   └── index.js
├── package.json
├── .env
└── README.md
```

### Nginx Configuration (Optional)
If using Nginx as reverse proxy:
```nginx
location / {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

## 👤 Admin Panel

Access the admin panel at `/admin`

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

### Admin Features:
- **Dashboard** - Overview statistics
- **Queries** - Customer inquiries management
- **Bookings** - Booking management
- **Pricing** - Update package prices
- **Settings** - Site configuration (favicon, title, contact info)

## 📄 API Endpoints

### Public APIs
- `GET /api/packages` - List packages
- `GET /api/flights` - List flights
- `GET /api/services` - List services
- `GET /api/seo/:page` - SEO metadata
- `GET /api/content/page/:slug` - Page content

### Admin APIs
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/queries` - List queries
- `GET /api/admin/bookings` - List bookings
- `GET/PUT /api/admin/settings` - Site settings

## 🎨 Customization

### Theme Colors
Edit `client/tailwind.config.js`:
```javascript
colors: {
  primary: { ... },
  secondary: { ... },
  accent: { ... }
}
```

### Translations
Edit `client/src/i18n.js` for language strings.

## 📱 Pages

- `/` - Homepage
- `/flights` - Flight booking
- `/holidays` - Holiday packages
- `/visas` - Visa services
- `/support` - Customer support
- `/about` - About us
- `/contact` - Contact us
- `/terms` - Terms of service
- `/land-packages` - Domestic packages
- `/group-tours` - Group tours
- `/services` - All services
- `/partners` - Our partners
- `/admin` - Admin panel

## 🔒 Security

- Helmet.js for HTTP headers
- Rate limiting on API
- CORS configured
- Input validation

## 📞 Support

For issues or questions, contact: support@exploreholidays.com

## 📄 License

ISC License

---

Made with ❤️ in Bangladesh

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { errorMiddleware } = require('./middleware/error-middleware');

const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes');
const courseRoutes = require('./routes/course-routes');
const contentRoutes = require('./routes/content-routes');
const publicRoutes = require('./routes/public-routes');
const editorRoutes = require('./routes/editor-routes');
const pastorRoutes = require('./routes/pastor-routes');
const activityRoutes = require('./routes/activity-routes');
const teacherRoutes = require('./routes/teacher-routes');
const promotionRoutes = require('./routes/promotion-routes');

const app = express();

app.set('trust proxy', 1);

// ============================================
// CORS CONFIGURATION
// ============================================
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

const envOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

const allAllowedOrigins = [...allowedOrigins, ...envOrigins];

console.log('✅ Allowed CORS origins:', allAllowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    if (allAllowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    console.warn(`❌ CORS blocked origin: ${origin}`);
    console.warn(`✅ Allowed origins: ${allAllowedOrigins.join(', ')}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 204
}));

// ============================================
// MIDDLEWARE
// ============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

// ============================================
// ✅ ADDED: ROOT ROUTE (Fixes the 404)
// ============================================
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'K-School API is running 🚀',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      test: '/test',
      api: '/api/v1/',
      public: '/api/v1/public/',
      youtube: '/api/v1/public/youtube-archive',
      promotions: '/api/v1/promotions/homepage',
      devotionals: '/api/v1/public/devotionals'
    }
  });
});

app.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Test endpoint is working!',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// EXISTING ROUTES
// ============================================
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'K-School API is running 🚀'
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/content', contentRoutes);
app.use('/api/v1/public', publicRoutes);
app.use('/api/v1/editor', editorRoutes);
app.use('/api/v1/pastor', pastorRoutes);
app.use('/api/v1/activity', activityRoutes);
app.use('/api/v1/teacher', teacherRoutes);
app.use('/api/v1/promotions', promotionRoutes);

// ============================================
// 404 HANDLER
// ============================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

app.use(errorMiddleware);

module.exports = app;
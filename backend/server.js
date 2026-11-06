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
// FIXED CORS CONFIGURATION
// ============================================
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

// Also check environment variable if set
const envOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

// Combine both sources
const allAllowedOrigins = [...allowedOrigins, ...envOrigins];

console.log('✅ Allowed CORS origins:', allAllowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, postman, etc)
    if (!origin) {
      return callback(null, true);
    }

    // Check if origin is allowed
    if (allAllowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    // Development clients may run on a local or device network address.
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    console.warn(`❌ CORS blocked origin: ${origin}`);
    console.warn(`✅ Allowed origins: ${allAllowedOrigins.join(', ')}`);
    
    // For debugging - you can temporarily allow all
    // return callback(null, true);
    
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 204
}));

// ============================================
// END OF CORS CONFIGURATION
// ============================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

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

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use(errorMiddleware);

const port = Number(process.env.PORT) || 5000;

if (require.main === module) {
  const { testConnection } = require('./config/db');

  testConnection().then(() => {
    app.listen(port, () => {
      console.log(`✅ K-School API listening on port ${port}`);
    });
  });
}

module.exports = app;
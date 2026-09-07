const express = require('express');
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getAllPodcasts,
  createPodcast,
  getYoutubeArchives,
  createYoutubeArchive,
  updateYoutubeArchive,
  deleteYoutubeArchive,
  getAllContent,
  getReviewQueue,
  getContentById,
  updateContentByType,
  reviewContent,
  deleteContentByType,
} = require('../controllers/content-controller');
const { authenticate } = require('../middleware/auth-middleware');
const { requireRole } = require('../middleware/role-middleware');

const router = express.Router();

// Posts
router.get('/posts', authenticate, getAllPosts);
router.post('/posts', authenticate, requireRole('editor', 'admin'), createPost);
router.put('/posts/:id', authenticate, requireRole('editor', 'admin'), updatePost);
router.delete('/posts/:id', authenticate, requireRole('editor', 'admin'), deletePost);

// Podcasts
router.get('/podcasts', authenticate, getAllPodcasts);
router.post('/podcasts', authenticate, requireRole('editor', 'admin'), createPodcast);

// YouTube archive management
router.get('/youtube-archive', authenticate, requireRole('admin', 'editor'), getYoutubeArchives);
router.post('/youtube-archive', authenticate, requireRole('admin', 'editor'), createYoutubeArchive);
router.put('/youtube-archive/:id', authenticate, requireRole('admin', 'editor'), updateYoutubeArchive);
router.delete('/youtube-archive/:id', authenticate, requireRole('admin', 'editor'), deleteYoutubeArchive);

// Admin review workflow
router.get('/all', authenticate, requireRole('admin', 'editor', 'teacher', 'pastor', 'developer'), getAllContent);
router.get('/review-queue', authenticate, requireRole('admin', 'editor', 'teacher', 'pastor', 'developer'), getReviewQueue);
router.get('/type/:type/:id', authenticate, requireRole('admin', 'editor', 'teacher', 'pastor', 'developer'), getContentById);
router.put('/type/:type/:id', authenticate, requireRole('admin', 'editor', 'teacher', 'pastor', 'developer'), updateContentByType);
router.post('/type/:type/:id/review', authenticate, requireRole('admin'), reviewContent);
router.delete('/type/:type/:id', authenticate, requireRole('admin', 'editor', 'teacher', 'pastor', 'developer'), deleteContentByType);

module.exports = router;

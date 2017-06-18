import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import * as validate from '../controllers/userService';
const router = new Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

// step one, validateAccessCode
// working. ("/api" before the route when used in postman);
router.route('/validate').post(validate.validateAccessCode);


export default router;

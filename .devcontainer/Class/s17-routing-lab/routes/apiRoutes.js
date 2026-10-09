import express from 'express';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';
import { AppError } from '../utils/appError.js';

const router = express.Router();

// Simulated In-Memory Database
let initiatives = [
    { id: 1, title: 'Solar Canopy Expansion', priority: 'High', status: 'Active' },
    { id: 2, title: 'Campus Composting Loop', priority: 'Medium', status: 'In Review' }
];

// TODO: Use router.route('/') with METHOD CHAINING
// Chain .get() -> protected, returns all initiatives
// Chain .post() -> protected, validates body title & priority, creates & returns new initiative (201)
router.route('/')
    .get(protect, (req, res) =>{
        res.json({
            status: 'success',
            data: initiatives
        });
    })
    .post(protect, (req, res, next) =>{
        const {title, priority} = req.body;
        if(!title || !priority){
            return next(new AppError('Title and priority are required', 400));
        }
        const newInitiative = {
            id: initiatives.length + 1,
            title,
            priority,
            status: 'Active'
        };
        initiatives.push(newInitiative);

        res.status(201).json({
            status: 'success',
            data: newInitiative
        });
    });

// TODO: Use router.route('/:id') with METHOD CHAINING
// Chain .get() -> protected, returns single initiative or 404
// Chain .delete() -> protected + requireAdmin, deletes initiative by ID or 404
router.route('/:id')
    .get(protect, (req, res, next) =>{
        const id = parseInt(req.params.id);
        const item = initiatives.find(i=> i.id === id);

        if (!item) {
            return next(new AppError('Initiative not found', 404));
        }

        res.json({
            status: 'success',
            data: item
        });
    })
    .delete(protect, requireAdmin, (req, res, next) => {
        const id = parseInt(req.params.id);
        const index = initiatives.findIndex(i => i.id === id);

        if (index === -1) {
            return next(new AppError('Initiative not found', 404));
        }

        initiatives.splice(index, 1);

        res.json({
            status: 'success',
            message: `Initiative with ID ${id} deleted successfully.`
        });
    });

export default router;

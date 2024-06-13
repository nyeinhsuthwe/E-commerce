const express = require ('express');
const router = express.Router();
const adminController = require('../../controllers/admin.controller');
const upload = require('../../helpers/upload');

//to find for all items
router.get('/products', adminController.index);

//to find single item
router.get('/products/:id', adminController.show);

// create item
router.post('/products',[
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('price').notEmpty(),
    ], adminController.create);

//for delete items
router.delete('/products/:id', adminController.destory);

//update or items
router.patch('/products/:id', adminController.update);

// for item's photo upload
router.post('/products/:id/upload',[
    upload.single('photo'),
    body('photo').custom((value,{req})=>{
        if(!req.file){
            throw new Error('photo is required')
        }
        if(!req.file.mimetype.startsWith('image')){
            throw new Error('Photo must be image')
        }
        return true;
    })
    ],adminController.upload);

module.exports= router;
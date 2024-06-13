const removeFile = require("../helpers/removeFile");
const Item = require("../models/user.model");
const mongoose = require('mongoose');

const adminController = {
    index : async (req,res) => {
        let limit = 6;
        let page = req.query.page || 1;
        console.log(page);
        let items = await Item
        .find()
        .skip((page - 1) * limit) // 12
        .limit(limit)
        .sort({createdAt : -1 });

        let totalItemsCount =await Items.countDocuments();
        
        let totalPagesCount =  Math.ceil(totalItemsCount/limit);

        let links = {
            nextPage: totalPagesCount == page ? false : true,
            previousPage: page == 1 ? false : true,
            currentPage: page,
            loopableLinks: []
        };

        //generate loopableLink array
        for (let index = 0; index < totalPagesCount; index++) {
            let number = index+1;
            links.loopableLinks.push({ number })
        }

        let response = {
            links,
            data : items
        };
        return res.json(response);
    },
    create : async (req,res) => {
        const {title,description,price} = req.body;
        const item = await Item.create({
            title,
            description,
            price
        });
        return res.json(item);
    },
    show : async (req,res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'not a valid id'});
            }
            let item = await Item.findById(id);
            if(!item) {
                return res.status(404).json({ msg : 'Product not found'});
            }
            return res.json(item);
        }catch(e) {
            return res.status(500).json({ msg : 'internet server error'});
        }
    },
    destroy :async (req,res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'not a valid id'});
            }
            let item = await Item.findByIdAndDelete(id);
            removefile(__dirname+ "/../public" + item.photo)


            if(!item) {
                return res.status(404).json({ msg : 'item not found'});
            }
            return res.json(item);
        }catch(e) {
            return res.status(500).json({ msg : 'internet server error'});
        }
    },
    update : async (req,res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'not a valid id'});
            }
            let item = await Item.findByIdAndUpdate(id, {
                ...req.body // title : "updated title value"
            });
            if(!item) {
                return res.status(404).json({ msg : 'product not found'});
            }
            return res.json(item);
        }catch(e) {
            return res.status(500).json({ msg : 'internet server error'});
        }
    },
    upload: async(req,res)=>{
        try{
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'not a valid id'});
            }
            let item = await Item.findByIdAndUpdate(id, {
                photo : '/'+req.file.filename
            });

            await removefile(__dirname+ "/../public" + item.photo)

            if(!item) {
                return res.status(404).json({ msg : 'item not found'});
            }
            return res.json(item);
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ msg : 'internet server error'});
        }
    }
};

module.exports = adminController;
const express = require('express');
const router = express.Router();
// add the models 
const ResourcesModel = require('../Models/Resources')

// get all resources form database
router.get("/", async (req, res) => {
  await ResourcesModel.find({}).then((resource) => {
    if (resource.length > 0) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ message: "no resource found" });
    }
  });
});

// get single resource from database 
router.get('/:id', (req, res) => {
  ResourcesModel.findOne({ _id: req.params.id })
    .then(resource => {
      res.status(200).json(resource);
    })
    .catch(() =>{
      res.json({ message:"Resource not found"})
    });
})


// add new resource to database 
router.post('/', (req, res) => {
  const newResource = ResourcesModel({
    class: req.body.class,
    board: req.body.board,
    subject: req.body.subject,
    title: req.body.title,
    description: req.body.description,
  });

  newResource
    .save()
    .then(() => {
      res.status(200).json({ message: "successfully addedd" });
    })
    .catch(() => {
      res.status(500).json({ message: "something went wrong" });
    });
});

//make changes to selected resource database

router.put('/:id', (req, res) => {
  ResourcesModel.findOneAndUpdate({ _id: req.params.id }, {
    //  ! To update only selected fields, $set operator needs to be used
    $set: {
      class: req.body.class,
      board: req.body.board,
      subject: req.body.subject,
      title: req.body.title,
      description: req.body.description,
    },
  }
  ).then(resource => {
    res.status(200).json({ resource });
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err })
    });
});

router.delete('/:id', async (req, res) => {
  ResourcesModel.deleteOne({ _id: req.params.id })
  .then(()=> {
      res.json({message: "Resource Successfully deleted"});
    })
    .catch(err =>{
      res.json({message:"Resource delete failed"})
    });
});



module.exports = router;
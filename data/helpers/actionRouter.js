const express = require("express");

const router = express.Router();

const actions = require("./actionModel");

router.get("/", (req, res, next) => {
  console.log("req.query", req.query);
  actions
    .get()
    .then(actions => {
      console.log(actions);
      res.status(200).json(actions);
    })
    .catch(error => {
      next(error);
    });
});

router.get("/:id", validateActionId(), (req, res) => {
  res.status(200).json(req.action);
});

router.put("/:id", validateAction(), validateActionId(), (req, res, next) => {
  actions
    .update(req.params.id, req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      next(error);
    });
});

router.delete("/:id", validateActionId(), (req, res, next) => {
  actions
    .remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: "The action has been deleted" });
    })
    .catch(error => {
      next(error);
    });
});

function validateAction(req, res, next) {
  return (req, res, next) => {
    if (!req.body.description) {
      return res
        .status(400)
        .json({ message: "missing action description data" });
    } else if (!req.body.notes) {
      return res
        .status(400)
        .json({ message: "missing required actions notes field" });
    }
    next();
  };
}

function validateActionId(req, res, next) {
  return (req, res, next) => {
    actions
      .get(req.params.id)
      .then(action => {
        if (action) {
          req.action = action;
          next();
        } else {
          res.status(404).json({ message: "invalid action id" });
        }
      })
      .catch(error => {
        next(error);
      });
  };
}

module.exports = router;

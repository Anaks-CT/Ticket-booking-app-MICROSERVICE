import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  req.session = null;

  res.send({
    message: "You have been signed out",
  });
});

export { router as signoutRouter };

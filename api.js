const router = require('express').Router();

const { authRouter } = require("./routes/auth");
// const { votesRouter } = require("./routes/user");
// const { projectRouter } = require("./routes/project");
// const { teamRouter } = require("./routes/team");
// const { galleryRouter } = require("./routes/gallery");
// const { uploadRouter } = require("./routes/upload");
// const { judgesRouter } = require("./routes/judges");
// // Routes
router.use("/auth", authRouter);
// router.use("/votes", votesRouter);
// router.use("/project", projectRouter);
// router.use("/team", teamRouter);
// router.use("/gallery", galleryRouter);
// router.use("/upload", uploadRouter);
// router.use("/judges", judgesRouter);



module.exports.apiRouter = router;
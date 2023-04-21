const { User } = require('../model/user.schema');
const Project = require('../model/project');
const { ensureAuthenticated } = require('../utils/auth');

const voteRouter = require('express').Router();

voteRouter.post('/', ensureAuthenticated, async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: req.user.email });
  const project = await Project.findById(body.projectId);
  const category = project.category;

  if(!user)
    return res.json({ success: false, message: 'User not found' });

  if (category === 'software') {
    user.softwareVote = body.projectId;
    await user.save();
  } else if (category === 'hardware') {
    user.hardwareVote = body.projectId;
    await user.save();
  } else if (category === 'business') {
    user.businessVote = body.projectId;
    await user.save();
  }

  res.json({ success: true, user });
});

voteRouter.delete('/', ensureAuthenticated, async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: req.user.email });
  const category = body.category;

  if(!user)
    return res.json({ success: false, message: 'User not found' });

  if (category === 'software') {
    user.softwareVote = null;
    await user.save();
  } else if (category === 'hardware') {
    user.hardwareVote = null;
    await user.save();
  } else if (category === 'business') {
    user.businessVote = null;
    await user.save();
  }

  res.json({ success: true, user });
});

module.exports.voteRouter = voteRouter;
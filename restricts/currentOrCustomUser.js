module.exports = (req, res) => {
	if (res.locals.customUser && res.locals.customUser !== req.user.username) {
		return res.status(403).json({
			message: `You don't have permission to change data for ${res.locals.customUser}`
		});
	}
};

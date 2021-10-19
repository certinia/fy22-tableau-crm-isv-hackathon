const common = require("./webpack.config.js");
const webpack = require("webpack");

module.exports = {
	...common,
	mode: "development",
	plugins: [
		new webpack.DefinePlugin({
			WEBPACK_DEV_MODE: true
		})
	]
};

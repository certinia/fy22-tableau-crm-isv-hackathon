const path = require("path");
const webpack = require("webpack");

module.exports = {
	context: path.resolve(__dirname, "src"),
	devtool: "hidden-source-map",
	entry: {
		tcrmCore: "./index.ts"
	},
	mode: "production",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				options: {
					configFile: "tsconfig-build.json"
				}
			}
		]
	},
	output: {
		filename: "[name].js",
		path: path.join(__dirname, "../force-app/main/default/staticresources"),
		libraryTarget: "window",
		library: "[name]"
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	plugins: [
		new webpack.DefinePlugin({
			WEBPACK_DEV_MODE: false
		})
	]
};

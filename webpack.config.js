const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const JSON5 = require('json5')


module.exports = (env, argv) => {
    return {
        mode: argv.mode || 'development',
        devtool: argv.mode == "production" ? false : 'source-map',
        devServer: {
            static: path.resolve(__dirname, 'dist'),
            hot: false
        },
        entry: {
            app: './src/application.ts',
        },
        plugins: [
            // TODO: Create a webpack function/plugin that finds all top-level twig templates and adds them automatically instead
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/index.twig',
                minify: argv.mode == "production" ,
            }),
            new HtmlWebpackPlugin({
                filename: 'bio.html',
                template: 'src/bio/bio.twig',
                minify: argv.mode == "production" ,
            }),
            new HtmlWebpackPlugin({
                filename: 'contact.html',
                template: 'src/contact/contact.twig',
                minify: argv.mode == "production" ,
            }),
            new HtmlWebpackPlugin({
                filename: 'resume.html',
                template: 'src/resume/resume.twig',
                minify: argv.mode == "production" ,
            }),
            new MiniCssExtractPlugin({
                filename: `[name].bundle.[fullhash]${argv.mode == "production" ? `.min` : ``}.css`,
            }),
            new webpack.DefinePlugin({
                PRODUCTION: JSON.stringify(argv.mode == "production"),
            })
        ],
        module: {
            rules: [
                {
                    test: /\.twig$/,
                    use: [
                        { 
                            loader: 'html-loader',
                            options: {
                                sources: {
                                    list: [
                                    "...",
                                    {
                                        tag: "a",
                                        attribute: "href",
                                        type: "src",
                                    }
                                    ],
                                    urlFilter: (attribute, value, resourcePath) => {
                                        if (!value.includes("_assets/")) {
                                            return false;
                                        }
                            
                                        return true;
                                    }
                                }
                            }
                        },
                        {
                            loader: 'twig-html-loader',
                            options: {
                                data: (context) => {
                                    const data = path.join(__dirname, 'src', 'data.json5');
                                    context.addDependency(data); // Force webpack to watch file
                                    var template_data = JSON5.parse(context.fs.readFileSync(data, 'utf8')) || {};

                                    // inject a basic 'page_url' variable to use in the twig templates
                                    template_data.page_url = context.resourcePath.split('/').at(-1).replace(".twig", ".html");

                                    return template_data;
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.tsx?$/,
                    use: ['ts-loader'],
                    exclude: /node_modules/,
                },
                {
                    test: /\.s?css$/i,
                    use: [
                        MiniCssExtractPlugin.loader, 
                        'css-loader', 
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: {
                                        'postcss-import': {}, 
                                        'tailwindcss/nesting': 'postcss-nesting', 
                                        'tailwindcss': {}, 
                                        'autoprefixer': {}
                                    },
                                }
                            }
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|mp4|pdf)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.m?js/, resolve: {
                        fullySpecified: false
                    }
                },
            ],
        },
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        keep_classnames: /Element$/
                    },
                }),
            ],
        },
        performance: { 
            hints: false 
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        output: {
            filename: `[name].bundle.[fullhash]${argv.mode == "production" ? `.min` : ``}.js`,
            assetModuleFilename: 'assets/[name].[hash][ext][query]',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
    }
};
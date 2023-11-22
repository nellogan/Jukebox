cd ./frontend
npm init -y
npm i webpack webpack-cli --save-dev
npm i react react-dom --save-dev
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
npm i react-router-dom
npm i mui
echo update packages
npm audit fix
cd ..
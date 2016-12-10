echo 'Cleaning extension build directory...'
rm -rf npm-dist
echo 'Removing old library bundle...'
rm lib-bundle.js
mkdir npm-dist
echo 'Building extension...'
npm run build:production:extension
echo 'Copying extension...'
mkdir npm-dist/extension
mkdir npm-dist/extension/dist
mkdir npm-dist/extension/popup
mkdir npm-dist/extension/background
mkdir npm-dist/extension/content

cp seeduxChrome/dist/index.html npm-dist/extension/dist
cp seeduxChrome/dist/bundle.js npm-dist/extension/dist
cp seeduxChrome/popup/*.* npm-dist/extension/popup
cp seeduxChrome/content/*.* npm-dist/extension/content
cp seeduxChrome/background/*.* npm-dist/extension/background


cp seeduxChrome/*.* npm-dist/extension

echo 'Building library...'
npm run build:production:library
echo 'Copying library...'
cp lib-bundle.js npm-dist/index.js
echo 'Copying package.json and README.md...'
cp npm/package.json npm-dist
cp README.md npm-dist
echo "Done-Zo! cd npm-dist and npm publish, if you're ready."

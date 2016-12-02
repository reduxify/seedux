/*
npm run build-css – this uses the Stylus CLI to compile the index.styl stylesheet to css, and place it in the static/css directory
npm run watch-css – continues running until manually stopped, compiling the stylesheet any time the source files are change.

npm run clean – this removes any built files (currently only css, but it might later include browserify-ed JS) and creates any required directories.

npm run build – this does everything required for the server to run correctly, which is just to run the clean and build-css commands

npm run watch – watches the entire project for changes and recompile assets or restart the server accordingly.

npm run start – starts server

 */


CROSS ORIGIN TAGS:
/*Subresource Integrity defines a mechanism by which user agents may verify that a fetched resource has been delivered without unexpected manipulation Reference

Integrity attribute is to allow the browser to check the file source to ensure that the code is never loaded if the source has been manipulated.

Crossorigin attribute is present when a request is loaded using 'CORS' which is now a requirement of SRI checking when not loaded from the 'same-origin'. More info on crossorigin

*/
// why a Chrome extension:
/*
A chrome extension is justa  small program that uses HTML, JS, CSS
 */


//https://github.com/tshaddix/react-chrome-redux/wiki/Introduction#react-chrome-redux
/////https://www.npmjs.com/package/react-chrome-redux

/*BACKGROUND section
<!-- controls the behavior of the extension, even when all the windows are closed, this background page still runs  SHOULD INCLUDE THE MAIN LOGIC-->
*/

/*CONTENT SCRIPTS
--allows you to change the output on the PAGE
-- will only be useful in the page it is in
*/


/*MANIFEST JSON
	- where chrome needs to look for files
//permissions: (e.g. read and write on goole sites)

// chrome url override: lets you override the new tab

// popup.js holds the logic of the popup content



/*PERMISSIONS array:
  - storage: just like localStorage but user's extension settings persist, user data can be stored as an object
 */

/*ENVIRONMENTS of the Chrome Extension
  1. Background (isolated) Environment - w/ access to all of the Chrome API's.

  2. Extension environment (the popup area)

  3. User-based environment (scripts are executed w/in the context of the webpage)
  matches: -- will run on every page w/ http protocol
*/

/* BUILDING A CHROME APP in REACT/REDUX
- essentially the same thing BUT each time you open a new tab, you create a NEW instance of that (popup or page), so it will not persist over time

- the only page that maintains itself over time is the BACKGROUND PAGE (in memory)

-- so, there's something called MESSAGING between the google chrome components:
			- a) ONE-TIME REQUEST: allows you to send things from either your CONTENT or POPUP page to your BACKGROUND PAGE ((LIKE AN HTTP REQUEST))
			// chrome.runtime.sendMessage({greeting: "hello"}, response => {
				console.log(response.farewell);
			})
			//chrome.runtime.onMessage.addListener(req, sender, sendResponse) => {
				if(request.greeting === "hello"){
					sendResponse({farewell: "goodbye"})
				}
			});

			b) LONG - LIVED CONNECTION:
				don't allow you get status on msg, but you can post msgs back and forth
				//create 'port'
				const port = chrome.runtime.connect({name: "knockknock"});
				// post msg to PORT
				port.postMessage({joke: " KNOCK KNCOK"});
				//listen for msgs:
				port.onMessage.addListner(msg => {
					if (msg.question == "Who's There"){
						port.postMessage({answer: "Madame"})
					}
				})



w/ the messaging, the content script & popup (instances) in the google chrome dev tool - start looking like UI / REACTcomponents & the BACKGROUND IS STORE/redux store. There's a react-chrome-redux library that handles the "quirks" of the chrome.

	a) your redux store is on the background page(s)
	b) the library sets up a 'PROXY STORE' on our popup page(s). it fakes that its a redux store.
			-the proxy store transmits all actions using a single ONE-TIME-REQUEST to the redux store held on the background page

			- the proxy store transmits all state updates to the store using a LONG-LIVED-CONNECTIONs.

			- you are left with a store that looks like a redux store on the content (or popup) when in reality it is proxying all of the requests to the redux store handled in the BACKGROUND page.

 */
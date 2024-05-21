UI/UX Decisions:
I used the react-bootstrap library to construct the login and register pages, which display errors nicely, and have a clean format

Navbar on the dashboard - clean and easy way to show users where they can go from the dashboard. In the initial state, 
they can either create a new presentation or logout. 

Navbar buttons 
- New presentation button turns green when hovered to indicate that users should click on it
- Logout button turns red when hovered to indicate to users not to click on it if they dont want to get logged out

Navbar Logo and website name:
- Cute logo at the top left of the navbar gives the website a more professional look
- Title next to the logo helps create the brand

Favicon and browser tab name:
- Favicon is the brand logo
- Browser tab name is the brand name
- This is done to make the website feel more professional

Presentation cards:
- When a presentation on the dashboard is hovered over, it grows slightly in size. This is to indicate to the user that this presentation is a clickable item, 
and to encourage said user to click on it. It also looks very crisp.

Sidebar:
- In the edit presentation page, a sidebar is used to display all the options which we can click on. 
- The back button is at the top because users intuitevely look for a back button near the top left of their screen
- Hovering over a button will make the white text slightly darker, indicating that it is clickable. This also shows users exactly which button they are
clicking on, so that they do not misclick.
- Preview and Delete presentation are actions which are distinctly different to the others, due to them being related to the whole presentation rather than a specific slide. Hence, these buttons are at the bottom of the navbar and are seperate to the other buttons. This makes intuitive sense as users will look elsewhere for action which relate to the presentation as a whole. Seperating the delete button also ensures the entire presentation isn't accidentally deleted. 

Modals:
- Bootstrap modals are used on the website for almost every form of input. They have a nice animation when clicked and display errors very clearly and intuitively
- Each modal in the edit presentation page is specifically tailored to the input. For example, images can be uploaded via link OR by choosing a file from your PC, decimal font weights can be incremented by a factor of 0.1, when you add code to the slide, you get a live preview of what it will look like, including the syntax highlighting. 

Preview:
- Slide goes to fullscreen after clicking preview presentation enabling users to preview their slides and use keyboard controls for transitioning.
- Additionally hidden close button is added at top right which appears when mouse is hovered over the body.

Prompts:
- For any deletion or an error a proper message is shown to user via prompts and alerts which enables them to take proper action based on it.

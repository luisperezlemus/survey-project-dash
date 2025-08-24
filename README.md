# Survey Projects Dashboard
A Next.js + TypeScript + Tailwind application for managing Survey Series and Survey Projects in the Survey Projects page. 
This includes a navbar, header, sidebar with search, and a projects table, where you can interact the page by creating
Survey Series and Survey Projects within them. You can also edit them, with respect to their status limitation.

## Setup
Clone the repo
```
git clone git clone https://github.com/luisperezlemus/survey-project-dash
```
```
cd survey-project-dashboard
```
```
npm install
```
```
npm run dev
```
Open in your browser: http://localhost:3000

## Assumptions/trade-offs
- Working with static data. Survey data is loaded from a JSON file in /data. As a result, this simplified the setup but nothing is being written to the file so any time the page refreshes, the progress is gone. Ideally I would have done more to make this work if I had more time. For future plans, I would connect a database and use API endpoints for GET/POST requests to manipulate the data.
- Focused on UI first. I was focused on building out the UI with Tailwind and making resusable components like Dropdown.tsx, Kebab.tsx, NavButton.tsx, and Modal.tsx, with Modal being the most customizable. As a trade-off, I did not get to implement the global loading spinner and did not work with async functions.
- Tailwind. Allows for building components from scratch, including SVG icons. The trade-off was with time; if I included some component libraries maybe I could finished the UI more swiftly.
## Type Safety
I ensured type safety for my props in most of my components in the UI folder and some in the layout folder. This ensured for no misuse of any of the models, including the data
models used for the Survey Series and Survey groups. 

I added the most props to Modal.tsx because I created it to be used when creating a survey series and survey project. But I also use that same modal to edit and delete the survey series. I use that same modal to edit the survey projects too, while also passing in logic to follow the status restrictions described in the project description.

## Enchancements
- Sidebar: has a functional search bar and a clear icon
- Modal: used for passing in inputs but also for deleting elements
- All functions that work with the JSON data are complete and work as expected

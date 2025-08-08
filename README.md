# Catogram

A React/TypeScript SPA that shows what the internet really wants...random cat pictures 🐈

## Requirements

- Node v22+

## Run the app locally

_NOTE: Add a `.env` with `VITE_CAT_API_KEY` before running, or images will load without breed information & be limited to 10_

`npm install`

`npm run dev`

The app will then be available at http://localhost:5173

### Tl:dr;

- This project uses [The Cat API](https://www.thecatapi.com)
- Cat icons from [SVG Repo](https://www.svgrepo.com)
- CSS designed in browser (no framework/UI kit used)
- Tests using Vitest & React Testing Library

### Potential Enhancements

- The Cat API doesn't offer descriptive names for the images (e.g. "fluffy gray cat laying on kitchen floor") which will make it difficult for voiceover users to discern what each picture is - there is potential for using an AI layer to describe each image
- Filtering images by characteristic (breed, attribute)
- Offering a search bar with type-ahead suggestions for images of a specific breed
- Infinite scroll or pagination to load more images

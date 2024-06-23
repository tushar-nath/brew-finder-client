# Coffee Shop Finder

Coffee Shop Finder is a React-based web application that helps users discover and explore coffee shops in their area. The app provides a user-friendly interface to browse featured coffee shops, view detailed information about each shop, and explore their menu items.

## Features

- Browse featured coffee shops with images and ratings

- View detailed information about each coffee shop

- Filter menu items by category (All, Drinks, Food)

- Responsive design for mobile and desktop use

- Search functionality (UI implemented, backend integration required)

## Technologies Used

- React

- React Router

- TypeScript

- Tailwind CSS

- Vite (as the build tool)

## Project Structure

- `App.tsx`: Main application component with routing setup

- `HomePage.tsx`: Landing page component displaying featured coffee shops

- `CoffeeShopPage.tsx`: Detailed view of a single coffee shop with menu items

- `FeaturedCoffeeShops.tsx`: Component for displaying featured coffee shops

- `Header.tsx`: Header component with app title and user profile

- `SearchBar.tsx`: Search input component

- `BottomNavigation.tsx`: Navigation bar component

- `api.ts`: API functions for fetching coffee shop data

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add the following: `VITE_NODE_BASE_URL=your_api_base_url_here`
4. Start the development server: `npm run dev`

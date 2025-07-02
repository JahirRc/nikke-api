# Nikke web API Documentation

This project provides anfan-made API related to Nikke characters. It allows users to explore various API endpoints, understand their functionality, and even try them out directly within the browser.

## Features

* **Comprehensive Character List**: Retrieve a full list of all Nikke characters in the database.
* **Detailed Character Information**: Get specific details for any character using their unique ID.
* **Search Functionality**:
    * Search characters by name.
    * Filter characters by rarity (R, SR, SSR).
    * Find characters by weapon type.
    * Discover characters belonging to specific squads.
    * Sort characters by Burst Skill stage (I, II, III, IV).
    * Filter characters by elemental code (Fire, Water, Electric, Iron, Wind).
    * Group characters by manufacturer (Elysion, Missilis Industry, Tetra Line, Pilgrim, Other).
    * Categorize characters by combat role (Attackers, Defenders, Supporters).

## How to Use

### Accessing the API

The API is hosted at: `https://nikke-api-eta.vercel.app`

## API Endpoints

Below is a summary of the API endpoints available:

### Get All Characters
* **Endpoint**: `GET /api/characters`
* **Description**: Retrieves a full list of all characters in the database.
* **Example**: `https://nikke-api-eta.vercel.app/api/characters`

### Get Character by ID
* **Endpoint**: `GET /api/characters/:id`
* **Description**: Fetches detailed information for a specific character using their unique identifier.
* **Parameter**: `:id` (string) - e.g., `rapi`, `anis`, `alice`
* **Example**: `https://nikke-api-eta.vercel.app/api/characters/rapi`

### Search Characters by Name
* **Endpoint**: `GET /api/search/characters?name=your_query`
* **Description**: Searches for characters whose names match your query (case-insensitive).
* **Parameter**: `name` (query parameter, string) - The character's name or part of it.
* **Example**: `https://nikke-api-eta.vercel.app/api/search/characters?name=Anis`

### Search Characters by Rarity
* **Endpoint**: `GET /api/search/rarity/:rarityType`
* **Description**: Filters characters by their rarity level.
* **Parameter**: `:rarityType` (string) - Options: `r`, `sr`, `ssr`
* **Example**: `https://nikke-api-eta.vercel.app/api/search/rarity/ssr`

### Search Characters by Weapon Type
* **Endpoint**: `GET /api/search/weapon/:weaponType`
* **Description**: Finds characters who use a specific weapon type.
* **Parameter**: `:weaponType` (string) - Types: `shotgun`, `submachine_gun`, `assault_rifle`, `sniper_rifle`, `rocket_launcher`, `minigun`, `sword`
* **Example**: `https://nikke-api-eta.vercel.app/api/search/weapon/shotgun`

### Search Characters by Squad
* **Endpoint**: `GET /api/search/squad/:squadName`
* **Description**: Retrieves characters belonging to a certain squad.
* **Parameter**: `:squadName` (string) - The full squad name: `Counters`, `Absolute`, `Inherit`, etc.
* **Example**: `https://nikke-api-eta.vercel.app/api/search/squad/Counters`

### Search Characters by Burst Skill Type
* **Endpoint**: `GET /api/search/burst/:burstType`
* **Description**: Filters characters by their Burst Skill stage.
* **Parameter**: `:burstType` (string) - Valid stages: `I`, `II`, `III`, `IV`
* **Example**: `https://nikke-api-eta.vercel.app/api/search/burst/III`

### Search Characters by Elemental Code
* **Endpoint**: `GET /api/search/code/:codeType`
* **Description**: Gets characters based on their elemental code.
* **Parameter**: `:codeType` (string) - Types: `fire`, `water`, `electric`, `iron`, `wind`
* **Example**: `https://nikke-api-eta.vercel.app/api/search/code/electric`

### Search Characters by Manufacturer
* **Endpoint**: `GET /api/search/manufacturer/:manufacturerName`
* **Description**: Finds characters produced by a specific manufacturer.
* **Parameter**: `:manufacturerName` (string) - Manufacturers: `elysion`, `missilis_industry`, `tetra_line`, `pilgrim`, `other`
* **Example**: `https://nikke-api-eta.vercel.app/api/search/manufacturer/tetra_line`

### Search Characters by Class
* **Endpoint**: `GET /api/search/class/:classType`
* **Description**: Filters characters by their combat role.
* **Parameter**: `:classType` (string) - Roles: `attackers`, `defenders`, `supporters`
* **Example**: `https://nikke-api-eta.vercel.app/api/search/class/attackers`

## Technologies Used

* **JavaScript**: For interactive elements and making API calls.

## License

This project is open-source and available under the [MIT License](LICENSE.md) (or specify your chosen license).

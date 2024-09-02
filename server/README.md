**Photo Albums API**\
This project is a Photo Albums API built using NestJS and TypeScript. The API allows users to create and manage photo albums and their associated images. The backend is designed with modular architecture, using separate modules for users, albums, and items (photos).

**Features**\
User Management: Create, read, update, and delete users. Each user can have multiple photo albums.\
Album Management: Create, read, update, and delete albums. Each album can have multiple items (photos).\
Item Management: Create, read, update, and delete items within an album.\
Cover Image Management: The first photo in an album is automatically set as the cover image. If the first photo is deleted, the next one is set as the cover. If no photos remain, the cover image is set to `null`.\
Placeholder Images: The API automatically generates placeholder URLs for images using <https://picsum.photos> based on the provided photo ID.

**Project Structure**\
Users Module: Manages users and their associated albums.\
Albums Module: Manages albums and their associated items (photos).\
Items Module: Manages items (photos) within albums.

**API Endpoints**

**Users**

*Get All Users*\
**Endpoint:** GET /users\
**Description:** Returns a list of all users with their names and album counts.\
**Response:**

json

Copy code

`[
{
"id": "userId1",
"name": "User 1",
"albumCount": 5
},
{
"id": "userId2",
"name": "User 2",
"albumCount": 3
}
]`

*Get User by ID*\
**Endpoint:** GET /users/\
**Description:** Returns information about a specific user by their ID.\
**Response:**

json

Copy code

`{
"id": "userId1",
"name": "User 1",
"email": "user1@example.com",
"albumCount": 5
}`

*Create a New User*\
**Endpoint:** POST /users\
**Description:** Creates a new user.\
**Request Body:**

json

Copy code

`{
"name": "New User",
"email": "newuser@example.com"
}`

*Update a User*\
**Endpoint:** PUT /users/\
**Description:** Updates information about a user by their ID.\
**Request Body:**

json

Copy code

`{
"name": "Updated User",
"email": "updateduser@example.com"
}`

*Delete a User*\
**Endpoint:** DELETE /users/\
**Description:** Deletes a user by their ID.

**Albums**

*Get All Albums for a User*\
**Endpoint:** GET /users/

/albums\
**Description:** Returns a list of all albums associated with a specific user.\
**Response:**

json

Copy code

`[
{
"id": "albumId1",
"title": "Album 1",
"coverImage": "https://picsum.photos/id/1/600/800",
"imageCount": 5
},
{
"id": "albumId2",
"title": "Album 2",
"coverImage": "https://picsum.photos/id/2/600/800",
"imageCount": 3
}
]`

*Get Album by ID*\
**Endpoint:** GET /albums/\
**Description:** Returns information about a specific album by its ID.\
**Response:**

json

Copy code

`{
"id": "albumId1",
"userId": "userId1",
"title": "Album 1",
"coverImage": "https://picsum.photos/id/1/600/800",
"imageCount": 5
}`

*Create a New Album*\
**Endpoint:** POST /users/

/albums\
**Description:** Creates a new album for a specific user.\
**Request Body:**

json

Copy code

`{
"title": "New Album"
}`

*Update an Album*\
**Endpoint:** PUT /albums/\
**Description:** Updates information about an album by its ID.\
**Request Body:**

json

Copy code

`{
"title": "Updated Album"
}`

*Delete an Album*\
**Endpoint:** DELETE /albums/\
**Description:** Deletes an album by its ID.

**Items (Photos)**

*Get All Items for an Album*\
**Endpoint:** GET /albums/

/items\
**Description:** Returns a list of all items (photos) associated with a specific album.\
**Response:**

json

Copy code

`[
{
"id": "itemId1",
"albumId": "albumId1",
"url": "https://picsum.photos/id/1/600/800",
"title": "Photo 1"
},
{
"id": "itemId2",
"albumId": "albumId1",
"url": "https://picsum.photos/id/2/600/800",
"title": "Photo 2"
}
]`

*Get Item by ID*\
**Endpoint:** GET /items/\
**Description:** Returns information about a specific item (photo) by its ID.\
**Response:**

json

Copy code

`{
"id": "itemId1",
"albumId": "albumId1",
"url": "https://picsum.photos/id/1/600/800",
"title": "Photo 1"
}`

*Create a New Item*\
**Endpoint:** POST /albums/

/items\
**Description:** Creates a new item (photo) within a specific album.\
**Request Body:**

json

Copy code

`{
"imageId": "3",
"title": "New Photo"
}`

*Update an Item*\
**Endpoint:** PUT /items/\
**Description:** Updates information about an item (photo) by its ID.\
**Request Body:**

json

Copy code

`{
"title": "Updated Photo"
}`

*Delete an Item*\
**Endpoint:** DELETE /items/\
**Description:** Deletes an item (photo) by its ID.

**Getting Started**

**Prerequisites**\
Node.js\
npm or yarn

**Installation**

Clone the repository:

bash

Copy code

`git clone https://your-private-repo-url.git`

Install dependencies:

bash

Copy code

`npm install
# or
yarn install`

Start the development server:

bash

Copy code

`npm run start:dev
# or
yarn start:dev`

**Testing**

To run the tests:

bash

Copy code

`npm run test
# or
yarn test`

**TODO**\
- Add cache for requests
- Add versioning

**Additional Notes**\
The project is built using a modular architecture, making it easy to extend and maintain.\
Placeholder images are generated using the Picsum.photos service.\
The data is stored locally as JSON files, and the API provides full CRUD operations for users, albums, and items.
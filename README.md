# JeConn API Documentation



## Endpoints Backend

### GET /

Endpoint to check if the server is running properly.

- URL: `/`
- Method: `GET`


### GET /publicData

Endpoint to retrieve public data.

- URL: `/publicData`
- Method: `GET`


### GET /messageRooms

Endpoint to retrieve the list of message rooms.

- URL: `/messageRooms`
- Method: `GET`


### GET /publicData/:username

Endpoint to retrieve public data based on username.

- URL: `/publicData/:username`
- Method: `GET`
- URL Parameters:
  - `username`: [string] - User username.


### GET /messageRooms/:messageRoomId

Endpoint to retrieve message room data based on the message room ID.

- URL: `/messageRooms/:messageRoomId`
- Method: `GET`
- URL Parameters:
  - `messageRoomId`: [string] - Message room ID.


### POST /publicData/:username/jobInformation/imagesUrl

Endpoint for uploading images to the user's public job information.

- URL: `/publicData/:username/jobInformation/imagesUrl`
- Method: `POST`
- URL Parameters:
  - `username`: [string] - User username.
- Body Request:
  - Type: `form-data`
  - `image`: [file] - Images to be uploaded.


### POST /messageRooms/:roomId/messages/:username

Endpoint for uploading images to messages in a message space.

- URL: `/messageRooms/:roomId/messages/:username`
- Method: `POST`
- URL Parameters:
  - `roomId`: [string] - Message room ID.
  - `username`: [string] - Username of message sender.
- Body Request:
  - Type: `form-data`
  - `image`: [file] - Images to be uploaded.


### PUT /publicData/updateProfileUser/:username

Endpoint to change the user's profile picture.

- URL: `/publicData/updateProfileUser/:username`
- Method: `PUT`
- URL Parameters:
  - `username`: [string] - User username.
- Body Request:
  - Type: `form-data`
  - `profile_image`: [file] - New profile picture.



---

## Endpoints Machine Learning

### GET /

Endpoint to check if the predict is running properly.

- URL: `/`
- Method: `GET`


### POST /predict

Endpoint for predict images NSFW.

- URL: `/predict`
- Method: `POST`
- Body Request:
  - Type: `form-data`
  - `image`: [file] - Images to be uploaded.

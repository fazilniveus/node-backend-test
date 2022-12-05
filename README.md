
## Available Scripts

In the project directory, you can run:

### `cd node-backend-common`
### `npm install`

### `cd node-backend-admin`
### `npm install`
Install all the project dependencies

### `npm start`

Runs the server in the development mode.\
Open [http://localhost:5001](http://localhost:5001) to view it in the browser.

The page will reload if you make edits.\




## Build Docker image 
Run below command

### `sudo docker build . -t mahindra-admin:latest`

## Run Docker image 
Run below command

### `sudo docker run -dp 5001:5001  mahindra-admin:latest`

## Run Application for Local development through docker 
Run below command

### `cd ../node-backend-common/docker`

### `sudo docker-compose up dev-admin-backend-mahindra`


// Controller methods for connectors management. All this methods should be accessed only by administrators
// At first no connectors will be used until a DB change method is defined


get_connector     = (req, res) => {
  // This method returns a connector identifying it using its ID

}

get_connectors    = (req, res) => {
  // This method returns all the connectors stored in the DB
}

create_connector  = (req, res) => {
  // Method for uploading new connectors
}

put_connector     = (req, res) => {
  // Method to update if the connector exists or creates it if it does not exist
}

remove_connector  = (req, res) => {
  // Removes a connector from the DB

}


module.exports = {
  get_connector,
  get_connectors,
  create_connector,
  put_connector,
  remove_connector
}

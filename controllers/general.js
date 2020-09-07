
root_request  = (req, res) => {
  return res.status(200).send({ message: 'This is the hook microservice for getting and storing data!'})
}

get_status    = (req, res) => {}

not_found     = (req, res) => {
  return res.status(404).send({ message: 'The route does not exist!' })
}

module.exports = {root_request, get_status, not_found}

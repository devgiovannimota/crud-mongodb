const router = require("express").Router();
const Person = require("../models/Person");
router.post("/", async (request, response) => {
  const { name, salary, approved } = request.body;

  if (!name) {
    response.status(422).send({ message: "O nome é obrigatório" });
  }

  const person = {
    name,
    salary,
    approved,
  };
  try {
    await Person.create(person);

    response.status(200).send({ message: "Created!" });
  } catch (error) {
    response.status(500).send({ error: error });
  }
});

module.exports = router;

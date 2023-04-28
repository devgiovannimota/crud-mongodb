const router = require("express").Router();
const Person = require("../models/Person");

router.post("/", async (request, response) => {
  const { name, salary, approved } = request.body;

  if (!name) {
    response.status(422).send({ message: "O nome é obrigatório" });
    return;
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

router.get("/", async (request, response) => {
  try {
    const people = await Person.find();
    console.log(people);

    response.status(200).send(people);
  } catch (error) {
    response.status(500).send({ error: error });
  }
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const person = await Person.findOne({ _id: id }).exec();

    if (!person) {
      response.status(422).send({ error: "ID não existente" });
      return;
    }

    response.status(200).send(person);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

router.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { name, salary, approved } = request.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatedPerson = await Person.updateMany({ _id: id }, person);

    if (!updatedPerson) {
      response.status(422).send({ Message: "Usuário não encontrado" });
      return;
    }

    response.status(200).send(person);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

router.delete("/:id", (request, response) => {
  const id = request.params;

  const person = Person.deleteOne({ _id: id }).exec();

  response.status(200).send({ message: "Deleted" });
});

module.exports = router;

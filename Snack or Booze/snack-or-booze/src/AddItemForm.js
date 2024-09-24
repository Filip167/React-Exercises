import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import SnackOrBoozeApi from "./Api";

function AddItemForm({ type }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    recipe: "",
    serve: ""
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    if (type === "snacks") {
      await SnackOrBoozeApi.addSnack(formData);
    } else {
      await SnackOrBoozeApi.addDrink(formData);
    }
    history.push(`/${type}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="recipe">Recipe</Label>
        <Input
          id="recipe"
          name="recipe"
          value={formData.recipe}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="serve">Serve</Label>
        <Input
          id="serve"
          name="serve"
          value={formData.serve}
          onChange={handleChange}
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default AddItemForm;

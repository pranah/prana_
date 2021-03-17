import React from "react";
import "./formstyles.css";

import { Form, Field } from "@leveluptuts/fresh";
import styled, { css } from 'styled-components';



const onSubmit = (data) => console.log(data);

export function Publish() {
  return (
    // <Container>
    <Form formId="book-publish" onSubmit={onSubmit}>
      <Field required >Title</Field>
      <Field required type="number">ISBN</Field>
      <Field required type="number">Price</Field>
      <Field required type="number">Creator's cut</Field>
      <label>Book cover</label><input type="file" />
      
      <label>Book content</label><input type="file" />
    </Form>
    // </Container>
  );
}

// const Container = styled.div`
// box-sizing: border-box;
// background-color: lightblue;
// padding: 50px;
// `
// const fresh-fo
//   font-family: Arial;
//   width: 400px;
//   margin: 0 auto;
//   background-color: white;
//   padding: 2rem;
//   box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.25);
//   border-top: 5px solid steelblue;
// }

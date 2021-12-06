  
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useField, useResource} from "../src/hooks/index";
import Notes from '../src/component/Note';
import Persons from '../src/component/Person';
import AddNote from '../src/component/AddNote';
import AddPerson from '../src/component/AddPerson';


const App = () => {
  const content = useField('text');
  const name = useField('text');
  const number = useField('text');

  const baseUrl = 'http://localhost:3005';

  const [notes, noteService] = useResource(`${baseUrl}/notes`);
  const [persons, personService] = useResource(`${baseUrl}/persons`);

  useEffect(() => {
    noteService.getAll()
    personService.getAll()
  }, []);

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }
  // const handlePersonSubmit = (event) => {
  //   event.preventDefault()
  //   personService.create({
  //     'name': name.value,
  //     'number': number.value
  //   })
  // }
  return (
    <div>
      <div>
        <h2>notes</h2>
        <AddNote handleSubmit={handleNoteSubmit} content={content} />
        <Notes notes={notes} />
      </div>
      <div>
        <h2>persons</h2>
        <AddPerson handleSubmit={handlePersonSubmit} name={name} number={number} />
        <Persons persons={persons} />
      </div>
    </div>
  )
  }

export default App;
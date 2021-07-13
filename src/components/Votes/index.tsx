import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'
import * as yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faPlusCircle, faChevronUp, faVoteYea } from '@fortawesome/free-solid-svg-icons';

import { TrackItem } from "types";
import './Votes.scss'

type FormValues = {
  [key: string]: string | string[]
  first: string
  second: string
  third: string
  heard: string[]
}
  
const Selector: React.FC<{
  place: 'first' | 'second' | 'third'
  songs: TrackItem[]
  values: FormValues
  setFieldValue: (field: string, value: string) => void

}> = ({ place, songs, values, setFieldValue,  }) => {
    useEffect(() => console.log('change'), [JSON.stringify(values)])

  const noMultipleScores = (name: string) => {
    const voteFields = Object.keys(values)
    voteFields.forEach((field: string) => {
      if (field !== place && values[field] === name) setFieldValue(field, '')
    })
  }
    
  return (
    <div key={`${place}=select`} className="vote-selector">
      <FontAwesomeIcon
        icon={faAward}
        color={place === 'first' ? '#78a3ad' : place === 'second' ? '#bc4b51' : '#d6ba73'}
        className="ribbon-icon"
      />
      <select
        placeholder={`${place} place`}
        name={place}
        onChange={(event) => noMultipleScores(event.target.value)}
      >
        <option value="" label={`${place} place`} />
        {songs.map(({ name }, i) => (
          <option value={name} label={name} key={`${place}-${name}-${i}`} />
        ))}
      </select>
    </div>
  )
}

const Votes: React.FC<{songs: TrackItem[]}> = ({ songs }) => {
  const [closed, setClosed] = useState<boolean>(false)
  return (
    <Formik
      initialValues={{ first: '', second: '', third: '', heard: [] }}
      onSubmit={() => console.log('submit')}
    >
      {({ values, setFieldValue }) => (
        <Form className='Votes'>
          <Selector place={'first'} songs={songs} values={values} setFieldValue={setFieldValue} />
          <Selector place={'second'} songs={songs} values={values} setFieldValue={setFieldValue} />
          <Selector place={'third'} songs={songs} values={values} setFieldValue={setFieldValue} />
          <div className="vote-right-buttons">
            <button className="vote-button" type="button">
              <FontAwesomeIcon icon={faPlusCircle} />
            </button>
            <button className="vote-button" type="submit">
              <FontAwesomeIcon icon={faVoteYea} />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Votes
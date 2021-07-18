import React from 'react'
import { Formik, Form, FieldArray, FieldArrayRenderProps } from 'formik'
import * as yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAward,
  faPlusCircle,
  faVoteYea,
  faAssistiveListeningSystems,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'

import { useCalendar, useUser } from 'hooks'
import { submitVotes } from 'scripts'
import { TrackItem } from "types";
import './Votes.scss'

export type VoteValues = {
  [key: string]: string | string[]
  first: string
  second: string
  third: string
  heard: string[]
}
  
const Selector: React.FC<{
  place: 'first' | 'second' | 'third' | 'heard'
  songs: TrackItem[]
  setFieldValue: (field: string, value: string) => void
  index?: number 
  value: string
}> = ({ place, songs, setFieldValue, index, value }) => {

  return (
    <div key={`${place}-select-${index}`} className="vote-selector">
      {(place !== 'heard' || index === 0) && (
        <FontAwesomeIcon
          icon={place === 'heard' ? faAssistiveListeningSystems : faAward}
          color={
            place === 'first'
              ? '#78a3ad'
              : place === 'second'
              ? '#bc4b51'
              : place === 'third'
              ? '#d6ba73'
              : '#aaa'
          }
          className="ribbon-icon"
        />
      )}
      <select
        name={place}
        onChange={(event) => {
          setFieldValue(place !== 'heard' ? place : `heard[${index}]`, event.target.value)
        }}
        value={value}
      >
        <option
          value=""
          label={place === 'heard' ? `songs you've heard before` : `${place} place`}
        />
        {songs.map(({ name }, i) => (
          <option value={name} label={name} key={`${place}-${name}-${i}`} />
        ))}
      </select>
    </div>
  )
}

const Votes: React.FC<{songs: TrackItem[]}> = ({ songs }) => {
  const { id } = useUser()
  const { today } = useCalendar()

  const doNotMatch = (field: 'first' | 'second' | 'third' | 'heard') => ({
    is: (val: string) => val && val !== '',
    then: yup.string().notOneOf([yup.ref(field)], `You can't vote for the same song twice`),
  })

  const voteRules = yup.object().shape({
    first: yup.string().when('second', doNotMatch('second')).when('third', doNotMatch('third')),
    second: yup.string().when('third', doNotMatch('third')),
    third: yup.string(),
    heard: yup.array().of(
      yup.string()).test('not-voting', "You can't vote for songs you've heard", (value, context) => {
        const { first, second, third } = context.parent
        return (
          !value?.includes(first) && !value?.includes(second) && !value?.includes(third)
        )
      })
  })

  const printErrors = (errors: any) => {
    const e: string[] = Object.values(errors)
    return e.length > 1 ? e[0] : e
  }

  const renderHeardFields = (
    heard: string[],
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
    arrayHelpers: FieldArrayRenderProps
  ) =>
    heard.map((song, i) => (
      <div className="heard-selector" key={i}>
        <Selector place="heard" songs={songs} value={song} setFieldValue={setFieldValue} index={i} />
        {i === heard.length - 1 ? (
          <div className="vote-right-buttons">
            <button
              className="vote-button close"
              type="button"
              onClick={() => arrayHelpers.push('')}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </button>
            <button className="vote-button add" type="submit">
              <FontAwesomeIcon icon={faVoteYea}/>
            </button>
          </div>
        ) : (
          <button
            className="vote-button submit"
            type="button"
            onClick={() => arrayHelpers.remove(heard.indexOf(song))}
          >
            <FontAwesomeIcon icon={faTimesCircle} color="#707070" />
          </button>
        )}
      </div>
    ))

  return (
    <Formik
      initialValues={{ first: '', second: '', third: '', heard: [''] }}
      onSubmit={(values) => {
        submitVotes(id, values, today)
      }}
      validationSchema={voteRules}
    >
      {({ values, setFieldValue, errors }) => (
        <Form className="Votes">
          <Selector
            place={'first'}
            songs={songs}
            setFieldValue={setFieldValue}
            value={values.first}
          />
          <Selector
            place={'second'}
            songs={songs}
            setFieldValue={setFieldValue}
            value={values.second}
          />
          <Selector
            place={'third'}
            songs={songs}
            setFieldValue={setFieldValue}
            value={values.third}
          />
          <FieldArray
            name="heard"
            render={(arrayHelpers) => (
              <>{renderHeardFields(values.heard, setFieldValue, arrayHelpers)}</>
            )}
          />
          {Object.values(errors).length > 0 && <div>{printErrors(errors)}</div>}
        </Form>
      )}
    </Formik>
  )
}

export default Votes
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { SearchResultsDefinition, TrackItem } from 'types'
import { search } from 'scripts'
import SearchResults from './SearchResults'

const SearchSpotify:React.FC = () => {
const [searchResults, setSearchResults] = useState<SearchResultsDefinition | undefined>(
    undefined
  )
const [selection, setSelection] = useState<TrackItem | undefined>(undefined)

  const onSearch = (values: { query: string }) => {
    setIsFocused(true)
    const { query } = values
    search(query)
      .then((results: SearchResultsDefinition) => {
        setSearchResults(results)
        console.log({ results })
      })
      .catch((error: any) => {
        toast.dark(`Something went wrong!`, { toastId: 'Spotify Search Error' })
        console.error(error)
      })
    }

  const [isFocused, setIsFocused] = useState<boolean>(false)
  return (
    <>
      <div className="search-wrapper" onFocus={() => setIsFocused(true)}>
        <Formik
          initialValues={{ query: '' }}
          validationSchema={Yup.object().shape({ query: Yup.string().required('Required') })}
          onSubmit={onSearch}
          className="search-form"
        >
          <div className="search-form-container">
            <Form>
              <div className="search-bar">
                <Field name="query" type="text" autoComplete="off" />
                <button className="cta-1" type="submit">
                  Search
                </button>
              </div>
            </Form>
          </div>
        </Formik>
        {searchResults && isFocused && (
          <SearchResults results={searchResults} setSelection={setSelection} />
        )}
        {/* {selection && (
          <SelectSong
            selection={selection}
            setSelection={(value) => {
              setIsFocused(false)
              setSelection(value)
            }}
          /> */}
        {/* )} */}
      </div>
      {isFocused && <div className="anti-search-focus" onClick={() => setIsFocused(false)} />}
    </>
  )
}

export default SearchSpotify

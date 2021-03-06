import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { SearchResultsDefinition } from 'types'
import { search } from 'scripts'
import SearchResults from './SearchResults'
import EmptySearchBin from './EmptySearchBin'
import './SearchSpotify.scss'

const SearchSpotify:React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResultsDefinition | undefined>(
    undefined
  )

  const onSearch = (values: { query: string }) => {
    const { query } = values
    search(query)
      .then((results: SearchResultsDefinition) => {
        if (results?.tracks?.items?.length > 0) {
          setSearchResults(results)
        } else {
          toast.dark(`We couldn't find anything to do with ${query} 😬`, { toastId: 'bad-search' })
        }

      })
      .catch((error: any) => {
        toast.dark(`Something went wrong!`, { toastId: 'Spotify Search Error' })
        console.error(error)
      })
    }

  return (
    <>
      <div className="search-wrapper">
        <Formik
          initialValues={{ query: '' }}
          validationSchema={Yup.object().shape({ query: Yup.string().required('Required') })}
          onSubmit={onSearch}
          className="search-form"
        >
          <div className="search-form-container">
            <Form>
              <div className="search-bar">
                <Field name="query" type="text" autoComplete="off" placeholder="songs, artists, albums, etc."/>
                <button className="cta-1" type="submit">
                  Search
                </button>
              </div>
            </Form>
          </div>
        </Formik>
        {searchResults && <SearchResults results={searchResults} />}
      </div>
      {!searchResults && <EmptySearchBin />}
    </>
  )
}

export default SearchSpotify

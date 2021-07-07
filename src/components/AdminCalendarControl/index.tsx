import React from "react"
import { toast } from 'react-toastify'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { format } from 'date-fns'

import { useCalendar } from 'hooks'
import './AdminCalendarControl.scss'

type Props = {
  setDateOverride: (date: Date | null) => void
  isDateOverride: boolean
}

const AdminCalendarControl:React.FC<Props> = ({ setDateOverride, isDateOverride }) => {
  const { today } = useCalendar()

  const getDateFromString = (date: string) => {
    const dates = date.split('-').map((value) => parseInt(value, 10))
    return new Date(dates[0], dates[1] - 1, dates[2])
  }

  return (
    <div className="AdminCalendarControl">
      <div className="date-override">{format(today, 'MM-dd-yyyy')}</div>
      <Formik
        validationSchema={yup.object().shape({
          overrideDate: yup
            .string()
            .required()
            .test('notLaterDate', 'Date can only be today or earlier', (value) => {
              const notLaterDate = getDateFromString(value || '') <= today
              if (!notLaterDate)
                toast.dark('You cannot use a future date', { toastId: 'Admin date error' })
              return notLaterDate
            }),
        })}
        initialValues={{ overrideDate: '' }}
        onSubmit={({ overrideDate }, { resetForm }) => {
          setDateOverride(getDateFromString(overrideDate))
          resetForm()
        }}
      >
        {({ values, resetForm }) => (
          <Form className="override-controls">
            <Field name="overrideDate" type="date" className="override-picker" />
            <div className="override-buttons">
              <button
                disabled={!isDateOverride && !values.overrideDate}
                className="cta-3"
                type="button"
                onClick={() => {
                  if (values.overrideDate) resetForm()
                  if (isDateOverride) setDateOverride(null)
                }}
              >
                Clear Date
              </button>
              <button
                disabled={!values.overrideDate || getDateFromString(values.overrideDate) >= today}
                type="submit"
                className="cta-2"
              >
                Set Date
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )  
}

export default AdminCalendarControl

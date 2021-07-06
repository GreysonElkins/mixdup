import React from 'react'
import { Day } from 'types'
import { ruleOfTheDay } from 'scripts'
import { useLeague } from 'hooks'

import './CalendarGraphic.scss'

const weekdays = () => {
  const week = []
  for (let day in Day) {
    isNaN(Number(day)) && week.push(<th key={`${day}-header`}>{day}</th>)
  }
  return <tr>{week}</tr>
}

type ActionColumn = { span: number, action: 'vote' | 'submit' | ''}

const CalendarGraphic: React.FC = () => {
  const { rules } = useLeague()

  const determineActionPerDayOfWeek = () => {
    const columns: ActionColumn[] = []
    for (let num in Day) {
      const day = Number(num)
      const action = !isNaN(day) ? ruleOfTheDay({ day, actions: rules }) : ''
      if (columns.length === 0 && !isNaN(day)) {
        columns.push({ span: 1, action })
      } else if (!isNaN(day) && columns[columns.length - 1].action !== action) {
        columns.push({ span: 1, action })
      } else if (!isNaN(day)) {
        columns[columns.length - 1].span += 1
      }
    }
    return columns
  }

  const printColumnsWithRulePerDay = () => {
    return determineActionPerDayOfWeek().map(({ span, action }, i) => (
      <td key={`rule-column-${i}`} colSpan={span}>
        {action === 'submit' ? 'Add Songs!' : 'Vote!'}
      </td>
    ))
  }

  return (
    <table className='CalendarGraphic'>
      <tbody>
      {weekdays()}
      <tr>
        {printColumnsWithRulePerDay()}
          {/* <td className='vote' colSpan={submissionsStart}>vote!</td>
          <td className='submit' colSpan={7 - submissionsStart}>submit songs!</td> */}
      </tr>
      </tbody>
    </table>
  ) 
}

export default CalendarGraphic

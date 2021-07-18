import React, { useState, useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import {
  getVotesFromFirebase,
  chartLastWeeksVotes,
  parseSubmissionData,
  getLastWeeksVotes,
  findSubmittersName,
} from 'scripts'
import { useCalendar, useUser } from 'hooks'
import { Vote, ChartDataObject } from 'types'

import './StatChartLoader.scss'

const StatChartLoader: React.FC<{ whichChart?: 'last-week' | 'me', title?: string }> = ({ whichChart, title }) => {
  const [votes, setVotes] = useState<Vote[]>([])
  const [chart, setChart] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  const { today } = useCalendar()
  const { id } = useUser()
  const chartContainer = useRef<HTMLCanvasElement | null>(null)

  const parseHeardBeforeVotes = (votes: Vote[]) => votes.reduce(
    (parsedVotes: Vote[], { score, trackName, ...vote }) => {
      if (Array.isArray(trackName) && score === 0) {
        trackName.forEach(track => parsedVotes.push({ trackName: track, score, ...vote}))
      } else {
        parsedVotes.push({ trackName, score, ...vote })
      }
      return parsedVotes
    }, []
  )

  useEffect(() => {
    Chart.register(...registerables)
    getVotesFromFirebase()
      .then(async votes => {
        const lastWeeksVotes = getLastWeeksVotes(Object.values(votes), today)
        const parsedVotes = parseHeardBeforeVotes(lastWeeksVotes)
        const allVotes = await findSubmitters(parsedVotes)
        setVotes(allVotes)
      })
      .catch(error => console.error(error))
  }, [])

  const findSubmitters = async (votes: Vote[]) => {
    return Promise.all(votes.map(async ({ trackName, ...vote }) => ({
      ...vote,
      trackName,
      submitter: trackName ? await findSubmittersName(trackName) : ''
    }))).then(withSubmitters => withSubmitters)
  }

  const updateChart = (config: ChartDataObject) => {
    if (!chartContainer || !chartContainer.current) return
    const chartUpdate = new Chart(chartContainer.current, {
      type: whichChart === 'last-week' ? 'bar' : 'line',
      data: config,
      options: {
        indexAxis: 'y',
        scales: { 
          xAxes: { ticks: { color: '#e6eeef' } }, 
          yAxes: { ticks: { color: '#e6eeef' } } 
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: function(context) {
                let label = context[0].label
                if (label.length > 13) {
                  const vote = votes.find(({ trackName }) => trackName.includes(label.substring(0, label.length - 3)))
                  return vote?.trackName || label
                }
                return label
              },
              afterTitle: function(context) {
                let label = context[0].label
                let result = ''
                const vote = votes.find(({ trackName }) =>
                  trackName.includes(label.substring(0, label.length - 3))
                )
                return vote?.submitter ? vote.submitter : result
              }
            }
          },
          legend: {
            position: 'bottom',
            labels: {
              color: '#fff',
            },
          },
        },
      },
    })
    setLoading(false)
    setChart(chartUpdate)
  }

  useEffect(() => {
    if (votes.length === 0 || !chartContainer || !chartContainer.current) return
    chart?.destroy()
    if (whichChart === 'last-week') {
      if (votes.length === 0) return
      const config = chartLastWeeksVotes(votes)
      updateChart(config)
    }
    if (whichChart === 'me') {
      parseSubmissionData(id, votes).then((data) => {
        const config = data
        updateChart(config)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whichChart, votes, today, id, loading])

  if (votes.length === 0) return <></>
  
  return (
    <>
      <h2 className="chart-title">{title}</h2>
      <div className={`StatChartLoader ${votes.length !== 0 ? '' : 'hidden-chart'}`}>
        <canvas ref={chartContainer} width="10" height="7" />{' '}
      </div>
    </>
  )
}

export default StatChartLoader

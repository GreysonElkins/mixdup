import React, { useState, useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { getVotesFromFirebase, lastWeeksChartData, parseSubmissionData } from 'scripts'
import { useCalendar, useUser } from 'hooks'
import { Vote, ChartDataObject } from 'types'

// import './StatChartLoader.scss'

const StatChartLoader: React.FC<{ whichChart?: 'last-week' | 'me' }> = ({ whichChart }) => {
  const [votes, setVotes] = useState<Vote[]>([])
  const [chart, setChart] = useState<Chart>()
  const [loading, setLoading] = useState<boolean>(true)
  const { today } = useCalendar()
  const { id } = useUser()
  const chartContainer = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    Chart.register(...registerables)
    getVotesFromFirebase()
      .then((votes) => setVotes(Object.values(votes)))
      .catch((error) => console.error(error))
  }, [])

  const updateChart = (config: ChartDataObject) => {
    if (!chartContainer || !chartContainer.current) return
    const chartUpdate = new Chart(chartContainer.current, {
      type: whichChart === 'last-week' ? 'bar' : 'line',
      data: config,
    })
    setLoading(false)
    setChart(chartUpdate)
  }

  useEffect(() => {
    if (votes.length === 0 || !chartContainer || !chartContainer.current) return
    chart?.destroy()
    if (whichChart === 'last-week') {
      const config = lastWeeksChartData(votes, today)
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

  return (
    <div className={`league-stat-chart ${whichChart ? '' : 'hidden-chart'}`}>
      <canvas ref={chartContainer} width="400" height="400" />{' '}
    </div>
  )
}

export default StatChartLoader

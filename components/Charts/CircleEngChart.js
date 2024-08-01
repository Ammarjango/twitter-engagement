// HorizontalBarChart.js
import dynamic from 'next/dynamic'
import React from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const HorizontalBarChart = () => {
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff'],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff'],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
    },
  }

  const series = [
    {
      name: 'Series 1',
      data: [44, 55, 41, 67, 22],
    },
  ]

  return (
    <div>
      <Chart options={options} series={series} type='bar' height={350} />
    </div>
  )
}

export default HorizontalBarChart

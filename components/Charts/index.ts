import dynamic from 'next/dynamic'
// import CircleEngagementChart from './CircleEngagementChart'
import UserEngagementChart from './UserEngagementChart'

const CircleEngagementChart = dynamic(() => import('./CircleEchart'), { ssr: false })
export { CircleEngagementChart, UserEngagementChart }

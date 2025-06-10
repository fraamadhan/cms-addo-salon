'use client'

import { Line } from 'react-chartjs-2'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip

} from 'chart.js'
import type { TooltipItem } from 'chart.js'
import { rupiahFormatter } from '@/lib/general'
import { QuarterlyData } from '@/types/general'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
)

export const RevenueQuarterlyChart = ({ data }: { data: QuarterlyData[] }) => {
    const labels = data?.map((item) => `Q${item._id.quarter} ${item._id.year}`);
    const revenueData = data?.map((item) => item.totalRevenue);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Pendapatan',
                data: revenueData,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
            },
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const
            },
            tooltip: {
                callbacks: {
                    label: function (context: TooltipItem<'line'>) {
                        const value = context.raw as number;

                        if (context.dataset.label === 'Pendapatan') {
                            return `Revenue: ${rupiahFormatter(value)}`;
                        }
                    },
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    }

    return <Line data={chartData} options={options} />
}

export const ItemsQuarterlyChart = ({ data }: { data: QuarterlyData[] }) => {
    const labels = data?.map((item) => `Q${item._id.quarter} ${item._id.year}`);
    const itemData = data?.map((item) => item.totalItems);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Items',
                data: itemData,
                fill: false,
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                tension: 0.3,
            },
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const
            },
            tooltip: {
                callbacks: {
                    label: function (context: TooltipItem<'line'>) {
                        const value = context.raw as number;
                        return `${context.dataset.label}: ${value}`;
                    },
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    }

    return <Line data={chartData} options={options} />
}
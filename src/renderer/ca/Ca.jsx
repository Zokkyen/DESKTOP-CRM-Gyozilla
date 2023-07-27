/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable promise/always-return */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { UserContext } from '../utils/context/UserContext';
import { getAllOrdersByFranchise } from '../utils/api-call/getAllOrdersByFranchise';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export default function Ca() {
  const [period, setPeriod] = useState('month');
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  // let data

  useEffect(() => {
    getAllOrdersByFranchise(user.franchise)
      .then((res) => {
        if (res) {
          const newData = {
            labels: res.data.data.map((item) => item.date_order),
            datasets: [
              {
                fill: true,
                label: `Revenue (${period})`,
                data: res.data.data.map((item) => item.total_price),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          };
          setData(newData);
        } else {
          console.log('res is not in expected format: ', res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [period]);

  return (
    <Box sx={{ width: '800px' }}>
      <select value={period} onChange={(e) => setPeriod(e.target.value)}>
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>
      <Line options={options} data={data} />
    </Box>
  );
}

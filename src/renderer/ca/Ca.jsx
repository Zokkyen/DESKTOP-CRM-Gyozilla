/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-case-declarations */
// ESLint disable rules (if necessary)
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable promise/always-return */
/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import React, { useContext, useEffect, useRef, useState } from 'react';

import { Box, Button, MenuItem, Select, Typography } from '@mui/material';

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  subMonths,
  addMonths,
  subYears,
  addYears,
} from 'date-fns';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Filler,
  BarElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { UserContext } from '../utils/context/UserContext';
import { getAllOrdersByFranchise } from '../utils/api-call/getAllOrdersByFranchise';
import { getAllExpenses } from '../utils/api-call/expenses';
import './Ca.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Filler,
  BarElement
);

// Code pour le graphique total des ventes et nombre de commandes par mois ou année

const getOptions = (period, selectedDate) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text:
        period === 'annee'
          ? `Chiffre d'affaire (${format(selectedDate, 'yyyy')})`
          : `Chiffre d'affaire (${format(selectedDate, 'MMMM yyyy')})`,
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const { label } = context;
          const value = context.parsed.y;
          return `${label}: ${value}€`;
        },
        afterLabel: (context) => {
          const index = context.dataIndex;
          const { datasets } = context.chart.data;

          const revenue = datasets[0]?.data[index];
          const count = datasets[1]?.data[index];

          return [
            `Nombre de commandes: ${count}`,
            `Chiffre d'affaires: ${revenue}€`,
          ];
        },
      },
    },
  },
  scales: {
    yRevenues: {
      type: 'linear',
      position: 'left',
      beginAtZero: true,
    },
    yCount: {
      type: 'linear',
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
      beginAtZero: true,
    },
  },
});

function generateAllDatesInPeriod(period, selectedDate) {
  switch (period) {
    case 'mois':
      const startDate = startOfMonth(selectedDate);
      const endDate = endOfMonth(selectedDate);
      return eachDayOfInterval({ start: startDate, end: endDate }).map((date) =>
        format(date, 'dd/MM/yyyy')
      );
    case 'annee':
      const startOfYearDate = startOfYear(selectedDate);
      const endOfYearDate = endOfYear(selectedDate);
      return eachMonthOfInterval({
        start: startOfYearDate,
        end: endOfYearDate,
      }).map((date) => format(date, 'MM/yyyy'));
    default:
      throw new Error(`Unknown period: ${period}`);
  }
}

function groupByPeriod(period, data, selectedDate) {
  const allDatesInPeriod = generateAllDatesInPeriod(period, selectedDate);
  const groupedData = Object.fromEntries(
    allDatesInPeriod.map((date) => [date, { total: 0, count: 0 }])
  );

  for (const item of data) {
    const itemDate = new Date(item.date_order);

    let key;
    switch (period) {
      case 'mois':
        key = format(itemDate, 'dd/MM/yyyy');
        break;
      case 'annee':
        key = format(itemDate, 'MM/yyyy');
        break;
    }

    if (groupedData[key] !== undefined) {
      groupedData[key].total += item.total_price;
      groupedData[key].count += 1;
    }
  }

  const labels = Object.keys(groupedData).sort();
  console.log(labels);

  const datasetRevenue = {
    yAxisID: 'yRevenues',
    fill: true,
    label: 'Profits générés',
    data: labels.map((label) => groupedData[label].total),
    borderColor: '#4c6e65',
    backgroundColor: '#ffffff',
  };

  const datasetCount = {
    yAxisID: 'yCount',
    fill: false,
    label: 'Nombre de commandes',
    data: labels.map((label) => groupedData[label].count),
    borderColor: '#f6a400',
    backgroundColor: '#ffffff',
  };

  return { labels, datasets: [datasetRevenue, datasetCount] };
}

// Code pour afficher les dépenses

function groupExpensesByType(expenses) {
  const groupedExpenses = {};

  for (const expense of expenses) {
    const type = expense.expense_types.name;
    if (!groupedExpenses[type]) {
      groupedExpenses[type] = 0;
    }
    groupedExpenses[type] += expense.amount;
  }

  return groupedExpenses;
}

export const optionsBar = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          const { label } = context;
          const value = context.parsed.y;
          return `${label}: ${value}€`;
        },
        afterLabel: (context) => {
          const index = context.dataIndex;
          const expenseInfo = 'Liste des noms et leurs montants...';
          return expenseInfo;
        },
      },
    },
  },
};

const labelsBar = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
];

export default function Ca() {
  const [period, setPeriod] = useState('mois');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allOrders, setAllOrders] = useState(null);
  const [allExpenses, setAllExpenses] = useState(null);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const handlePrevClick = () => {
    switch (period) {
      case 'mois':
        setSelectedDate((date) => subMonths(date, 1));
        break;
      case 'annee':
        setSelectedDate((date) => subYears(date, 1));
        break;
    }
  };

  const handleNextClick = () => {
    switch (period) {
      case 'mois':
        setSelectedDate((date) => addMonths(date, 1));
        break;
      case 'annee':
        setSelectedDate((date) => addYears(date, 1));
        break;
    }
  };

  const handleApiResult = (res, setData) => {
    if (res) {
      setData(res.data.data);
      setIsLoading(false);
    } else {
      console.log('res is not in expected format: ', res);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getAllOrdersByFranchise(user.franchise), getAllExpenses()])
      .then((responses) => {
        const [ordersResponse, expensesResponse] = responses;
        const { labels, datasets } = groupByPeriod(
          period,
          ordersResponse.data.data,
          selectedDate
        );
        setAllOrders({ labels, datasets });
        const groupedExpenses = groupExpensesByType(expensesResponse.data);
        setAllExpenses(groupedExpenses);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [period, selectedDate, user.franchise]);

  const expenseLabels = allExpenses ? Object.keys(allExpenses) : [];
  const expenseData = allExpenses ? Object.values(allExpenses) : [];

  const dataBar = {
    labels: expenseLabels,
    datasets: [
      {
        label: 'Dépenses par type',
        data: expenseData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '80vw',
      }}
    >
      <Typography
        variant="h6g"
        sx={{
          marginBottom: '50px',
          textAlign: 'center',
        }}
      >
        Chiffre d'affaire du restaurant
      </Typography>

      <Box
        sx={{
          display: 'flex',
          marginBottom: '100px',
        }}
      >
        <Box
          sx={{
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            marginRight: '20px',
          }}
        >
          <Button onClick={handlePrevClick}>Précédent</Button>
          <Button onClick={handleNextClick}>Suivant</Button>
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            sx={{ width: '140px', height: '40px' }}
          >
            <MenuItem value="mois">Tri par mois</MenuItem>
            <MenuItem value="annee">Tri par année</MenuItem>
          </Select>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Line options={getOptions(period, selectedDate)} data={allOrders} />
        </Box>
      </Box>
      {allExpenses && <Bar options={optionsBar} data={dataBar} />}
    </Box>
  );
}

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
// import PropTypes from 'prop-types';

import {
  // alpha,
  Box,
  Button,
  // Checkbox,
  // IconButton,
  MenuItem,
  // Paper,
  Select,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TablePagination,
  // TableRow,
  // TableSortLabel,
  // Toolbar,
  Typography,
} from '@mui/material';
// import { visuallyHidden } from '@mui/utils';
// import FilterListIcon from '@mui/icons-material/FilterList';

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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// import { Tooltip } from 'primereact/tooltip';
import { UserContext } from '../utils/context/UserContext';
// import { TabContext } from '../drawer/HomeDrawer';
import './Ca.css';
import { getAllOrdersByFranchise } from '../utils/api-call/getAllOrdersByFranchise';
import { getAllExpenses } from '../utils/api-call/expenses';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Filler
);

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
        afterLabel: (context) => {
          const index = context.dataIndex;
          const { dataset } = context;
          if (dataset.yAxisID === 'yCount') {
            if (context.chart?.data?.datasets?.length > 1) {
              const countDataset = context.chart.data.datasets[1];
              if (countDataset) {
                const count = countDataset.data[index];
                return `Nombre de commandes: ${count}`;
              }
            }
          }
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

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   {
//     id: 'date_order',
//     numeric: false,
//     disablePadding: true,
//     label: 'Date de la commande',
//   },
//   {
//     id: 'total_price',
//     numeric: true,
//     disablePadding: false,
//     label: 'Prix total',
//   },
//   {
//     id: 'status',
//     numeric: true,
//     disablePadding: false,
//     label: 'Status',
//   },
//   {
//     id: 'order_type',
//     numeric: true,
//     disablePadding: false,
//     label: 'Type',
//   },
// ];

// function EnhancedTableHead(props) {
//   const { order, orderBy, onRequestSort } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="none" />
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   onRequestSort: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity
//             ),
//         }),
//       }}
//     >
//       <Typography
//         sx={{ flex: '1 1 100%' }}
//         variant="hboxb"
//         id="tableTitle"
//         component="div"
//       >
//         Historique des commandes
//       </Typography>

//       <Tooltip title="Filter list">
//         <IconButton>
//           <FilterListIcon />
//         </IconButton>
//       </Tooltip>
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default function Ca() {
  const [period, setPeriod] = useState('mois');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allOrders, setAllOrders] = useState(null);
  const [allExpenses, setAllExpenses] = useState(null);
  const { user } = useContext(UserContext);
  // const [order, setOrder] = useState('asc');
  // const [orderBy, setOrderBy] = useState('date_order');
  // const [selected, setSelected] = useState([]);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [rows, setRows] = useState([]);
  // const selectedTab = useContext(TabContext);
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

  useEffect(() => {
    getAllOrdersByFranchise(user.franchise)
      .then((res) => {
        if (res) {
          const { labels, datasets } = groupByPeriod(
            period,
            res.data.data,
            selectedDate
          );
          setAllOrders({ labels, datasets });
          setIsLoading(false);
        } else {
          console.log('res is not in expected format: ', res);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [period, selectedDate, user.franchise]);

  useEffect(() => {
    getAllExpenses()
      .then((res) => {
        if (res) {
          setAllExpenses(res.data.data);
          setIsLoading(false);
        } else {
          console.log('res is not in expected format: ', res);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [allExpenses]);

  // useEffect(() => {
  //   getAllOrdersByFranchise(user.franchise)
  //     .then((res) => {
  //       if (res) {
  //         const newRows = res.data.data.map((item) => {
  //           return {
  //             date_order: item.date_order,
  //             total_price: item.total_price,
  //             status: item.order_status.name,
  //             order_type: item.order_type.name,
  //           };
  //         });
  //         setRows(newRows);
  //         setIsLoading(false);
  //       } else {
  //         console.log('res is not in expected format: ', res);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsLoading(false);
  //     });
  // }, [selectedTab, user.franchises]);

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelected = rows.map((n) => n.name);
  //     setSelected(newSelected);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // const sortedRows = stableSort(rows, getComparator(order, orderBy));
  // const visibleRows = sortedRows.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );*

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
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

      {/* <Box
        sx={{
          width: '70vw',
          boxShadow: 'rgba(0, 0, 0, 0.30) 0px 3px 8px',
        }}
      >
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table aria-labelledby="tableTitle" size="medium">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {new Date(row.date_order).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell align="right">{row.total_price}€</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">{row.order_type}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box> */}
    </Box>
  );
}

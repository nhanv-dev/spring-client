import * as React from 'react';
import PropTypes from 'prop-types';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {visuallyHidden} from '@mui/utils';
import {Uil0Plus, UilTrash} from "@iconscout/react-unicons";

function createData(id, shopName, name, email, phoneNumber, warehouse) {
    return {id, shopName, name, email, phoneNumber, warehouse};
}

const rows = [
    createData(1, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(2, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(3, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(4, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
     createData(1, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(2, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(3, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(4, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
     createData(1, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(2, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(3, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(4, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
    createData(5, 'Pigeon Official', "Trần Thanh Nhân", "tthanhnhan@gmail.com", "0946286372", "TP.Hồ Chí Minh"),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {id: 'shopName', disablePadding: false, label: 'Tên cửa hàng'},
    {id: 'name', disablePadding: false, label: 'Tên người dùng'},
    {id: 'email', disablePadding: false, label: 'Email'},
    {id: 'phoneNumber', disablePadding: false, label: 'Số điện thoại'},
    {id: 'warehouse', disablePadding: false, label: 'Khu vực'}
];

function EnhancedTableHead(props) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary" size={"small"}
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id} align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const {numSelected} = props;

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} đã chọn
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Đơn đăng ký bán hàng
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <UilTrash/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <Uil0Plus/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        alert(newPage)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <EnhancedTableToolbar numSelected={selected.length}/>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750, borderRadius: "10px"}}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}

                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox color="primary" checked={isItemSelected} size={"small"}
                                                          inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </TableCell>
                                            <TableCell component="th">{row.shopName}</TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.phoneNumber}</TableCell>
                                            <TableCell align="left">{row.warehouse}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense}/>}
                label="Dense padding"
            />
        </Box>
    );
}
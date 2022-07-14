console.log([2, 3, 7, 15, 1, 56, 2].reduce((preValue, newValue, index, table) => preValue + (newValue / table.length), 0));

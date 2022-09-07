import {
    Chart,
    registerables
} from 'chart.js';
Chart.register(...registerables);

const grafico = () => {

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


    //define some sample data
    var tabledata = [{
            id: 1,
            name: "Oli Bob",
            age: "12",
            col: "red",
            dob: ""
        },
        {
            id: 2,
            name: "Mary May",
            age: "1",
            col: "blue",
            dob: "14/05/1982"
        },
        {
            id: 3,
            name: "Christine Lobowski",
            age: "42",
            col: "green",
            dob: "22/05/1982"
        },
        {
            id: 4,
            name: "Brendon Philips",
            age: "125",
            col: "orange",
            dob: "01/08/1980"
        },
        {
            id: 5,
            name: "Margret Marmajuke",
            age: "16",
            col: "yellow",
            dob: "31/01/1999"
        },
    ];

    //create Tabulator on DOM element with id "table-sites"
    var table = new Tabulator("#table-sites", {
        data: tabledata, //assign data to table
        layout: "fitColumns", //fit columns to width of table (optional)
        columns: [ //Define Table Columns
            {
                title: "Name",
                field: "name",
                width: 150
            },
            {
                title: "Age",
                field: "age",
                hozAlign: "left",
                formatter: "progress"
            },
            {
                title: "Favourite Color",
                field: "col"
            },
            {
                title: "Date Of Birth",
                field: "dob",
                sorter: "date",
                hozAlign: "center"
            },
        ],
        rowClick: function (e, row) { //trigger an alert message when the row is clicked
            alert("Row " + row.getData().id + " Clicked!!!!");
        },
    });
}

grafico()
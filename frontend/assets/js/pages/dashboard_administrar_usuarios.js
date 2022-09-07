//Defines the use of sweetalert
const Swal = require('sweetalert2')

//Override the alert function
function alert(title, message, icon) {
  Swal.fire(title, message, icon)
}


import {
  Chart,
  registerables
} from 'chart.js';
Chart.register(...registerables);

//Create a blank chart
var ctx = document.getElementById('usersChart').getContext('2d');
var users_chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Administrators', 'Developers'],
    datasets: [{
      label: 'Administrators and Developers',
      data: [0, 0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Users by type',
      },
    },
  }
});

$('#btn_save_user').on('click', function () {
  const data = getData()
  save(data)
});

$('#btn_remove_user').on('click', function () {
  const user = getData()
  let token = document.getElementById('_csrf').getAttribute('value')
  removeUser(user, token)
});

$('#btn_add_user').on('click', function () {
  clearForm()
  $('#modalAddUser').modal('show')
});

 
//Get form data
function getData() {
  const data = {}
  const _id = $('#_id').val()
  data.name = $('#firstName').val()
  data.last_name = $('#lastName').val()
  data.username = $('#username').val()
  data.email = $('#email').val()
  data.password = $('#password').val()
  data.isAdministrator = $('#isAdminCheck').is(':checked')

  return {
    user_id: _id,
    user_data: data
  }
}

//List all users
async function listUsers() {
  try {
    let users = await fetch('/users/all_users').then(response => response.json())
    var table = new Tabulator("#table-users", {
      data: users, //assign data to table
      layout: "fitColumns",
      responsiveLayout: "hide",
      pagination: "local",
      tooltips: true, //show tool tips on cells

      paginationSize: 11,
      paginationSizeSelector: [10, 20, 30, 40, 50, 100],
      movableColumns: true,
      columns: [{
          title: "User ID",
          field: "_id"
        },
        {
          title: "Name",
          field: "name"
        },
        {
          title: "Last name",
          field: "last_name"
        },
        {
          title: "Username",
          field: "username"
        },
        {
          title: "E-mail",
          field: "email"
        },
        {
          title: "Is an administrator ?",
          field: "isAdministrator"
        },
      ],
      rowDblClick: function (e, row) {

        $('#modalAddUser').modal('show')
        let data = row.getData()
        $('#_id').val(data._id)
        $('#firstName').val(data.name)
        $('#lastName').val(data.last_name)
        $('#username').val(data.username)
        $('#email').val(data.email)
        $('#password').val(data.password)

        if (data.isAdministrator == true) {
          $('#isAdminCheck').attr('checked', true);
        } else {
          $('#isAdminCheck').attr('checked', false);
        }

      },

    });

    //Count administrator
    let admins = 0
    admins = await users.reduce((acumulador, usuario, indice, original) => {
      if (usuario.isAdministrator === true) {
        acumulador += 1
      }
      return acumulador
    }, 0)

    //Count developers
    let devs = 0
    devs = await users.reduce((acumulador, usuario, indice, original) => {
      if (usuario.isAdministrator === false) {
        acumulador += 1
      }
      return acumulador
    }, 0)


    removeData(users_chart)
    addData(users_chart, 'Administrators', admins);
    addData(users_chart, 'Developers', devs);

    function addData(chart, label, data) {
      chart.data.labels.push(label);
      chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
      });
      chart.update();
    }

    function removeData(chart) {
      chart.data.labels = []
      chart.data.datasets.forEach((dataset) => {
        dataset.data = [];
      });
      chart.update();
    }

  } catch (e) {
    console.error(e)
    alert('Error', 'Unable to list registered users', 'error')
  }
}
listUsers()

//Send user data to the backend
async function save(data) {
  'use strict'
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
        form.classList.add('was-validated')
    })

  let token = document.getElementById('_csrf').getAttribute('value')

  if (data.user_id == '') {
    createUser(data, token)
  } else {
    updateUser(data, token)
  }
}

async function createUser(data, token) {
  console.log('Criando usuario')
  await fetch('/users/registry', {
      method: 'POST',
      body: JSON.stringify(data.user_data),
      headers: {
        'CSRF-Token': token,
        'Content-Type': 'application/json' // <-- is the csrf token as a header
      },
    })
    .then(response => {
      response.json().then(data => {
        if (data.status == 200) {
          alert('Success...', 'Operation completed successfully', 'success')
          clearForm()
          listUsers()
        } else {
          alert('Oops...', 'The operation could not be completed !', 'error')
          console.log(data.errors)
        }
      })
    })
}

async function updateUser(data, token) {
  console.log('Atualizando usuario')
  await fetch('/users/registry', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'CSRF-Token': token,
        'Content-Type': 'application/json' // <-- is the csrf token as a header
      }, 
    })
    .then(response => {
      response.json().then(data => {
        if (data.status == 200) {
          alert('Success...', 'Operation completed successfully', 'success')

        } else {
          alert('Oops...', 'The operation could not be completed !', 'error')
          console.log(data.errors)
        }
      })
    })
  listUsers()
  clearForm()
  $('#modalAddUser').modal('hide')
  $('#_id').val('')
}

async function removeUser(data, token) {
 
  await fetch('/users/registry', {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'CSRF-Token': token,
        'Content-Type': 'application/json' // <-- is the csrf token as a header
      }, 
    })
    .then(response => {
      response.json().then(data => {
        if (data.status == 200) {
          alert('Success...', 'Operation completed successfully', 'success')

        } else {
          alert('Oops...', 'The operation could not be completed !', 'error')
          console.log(data.errors)
        }
      })
    })
  listUsers()
  clearForm()
  $('#modalAddUser').modal('hide')

}


//Clear form after registering a new user
function clearForm() {
  $("#form_add_user")[0].reset();
  let form = document.getElementsByClassName('needs-validation');
  let validation = Array.prototype.filter.call(form, function (form) {
    form.classList.remove('was-validated');
  });
}
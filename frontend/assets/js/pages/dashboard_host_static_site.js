import moment from 'moment';
const debounce = require('lodash.debounce');

//Reescreve a função alert do javascript
function alert(title, message, icon) {
    Swal.fire(title, message, icon)
}


//Bootstrap form validation
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

//O que acontece quando o usuario clica no card de registrar dominio
$('#card_registrar_dominio').click(function (e) {
    $(this).addClass('border-primary active')
    $('#card_dominio_existente').removeClass('border-primary active')
    $('.domainRegister').show()
});

//O que acontece quando o usuario clica no card utilizar dominio existente
$('#card_dominio_existente').click(function (e) {
    $(this).addClass('border-primary active')
    $('#card_registrar_dominio').removeClass('border-primary active')
    $('.domainRegister').hide()
});

//Chama a função validar dominio quando o usuario para de digitar
$('#DomainName').on('input', (debounce(function () {
    $('#DomainName').removeClass('is-invalid')
    $('#DomainName').removeClass('is-valid')

    if ($('#DomainName').val() === '') {
        return
    } else {
        $('#sugestoes_dominio').empty()
        validaDominio()
    }
}, 900)))

//Verifica se o usuario vai registrar um dominio, se sim valida se ele esta disponivel para registro
async function validaDominio() {

    //Verifica se o card de registro de dominio foi marcado
    if ($('#card_registrar_dominio').hasClass('active') == true) {
        // Valida se o dominio digitado esta disponivel
        let url = new URL('http://localhost:3000/checkdomain')
        url.search = new URLSearchParams({
            "DomainName": $('#DomainName').val()
        })
        try {
            let init = {
                method: 'GET',
                mode: 'no-cors',
            };

            let domainAvailability = await fetch(url, init).then(response => response.json())
            //Se o dominio nao estiver disponivel, faz a sugestão de outros nomes
            if (domainAvailability.Availability == 'UNAVAILABLE') {

                $("#DomainName").addClass('is-invalid');
                $('#dominio_indisponivel').show();

                url = new URL('http://localhost:3000/sugerir')
                url.search = new URLSearchParams({
                    "DomainName": $('#DomainName').val()
                })

                //solicita a lista de sugestoes de nomes de dominio
                let domainSuggestions = await fetch(url).then(response => response.json())
                domainSuggestions = domainSuggestions.SuggestionsList
                let content = ''
                domainSuggestions.forEach(function (sugestao) {
                    let content = `<div class="list-group-item list-group-item-action suggestion">${sugestao.DomainName}</div>`
                    $('#sugestoes_dominio').append(content);
                })
                $('.suggestion').click(function () {
                    let valor = $(this).text();
                    console.log(valor)
                    $("#DomainName").val(valor);
                })

            } else {
                $("#DomainName").removeClass('is-invalid');
                $("#DomainName").addClass('is-valid');
                $('#dominio_indisponivel').hide();
                $('#sugestoes_dominio').empty()
            }
        } catch (err) {
            console.log(err)
        }
    } else {
        return
    }
}

//Defines the use of sweetalert
const Swal = require('sweetalert2')

let DATA = null;

//Coleta os dados do formulario quando ele é enviado
const form = document.querySelector('#form_add_user')
form.addEventListener('submit', function (event) {
    event.preventDefault()
    $('#btn_publicar').hide();
    $('#btn_publicar_loading').attr('hidden', false);

    DATA = getData()
    console.log(DATA)
    let token = document.getElementById('_csrf').getAttribute('value')

    processar(DATA, token)

    //hospedarSite(DATA.region, DATA.DomainName, token)
})

//Obtem os dados do formulario
function getData() {
    const data = {
        DomainName: $('#DomainName').val(),
        /* required */
        DurationInYears: 1,
        /* required */

        AutoRenew: $('#AutoRenew').is(':checked'),
        IdnLangCode: null,
        PrivacyProtectAdminContact: $('#PrivacyProtectAdminContact').is(':checked'),
        PrivacyProtectRegistrantContact: $('#PrivacyProtectRegistrantContact').is(':checked'),
        PrivacyProtectTechContact: $('#PrivacyProtectTechContact').is(':checked'),

        AdminContact: {
            /* required */
            AddressLine1: $('#adminAddressLine1').val(),
            AddressLine2: $('#adminAddressLine2').val(),
            City: $('#adminCity').val(),
            ContactType: $('#adminContactType :selected').text(),
            CountryCode: $('#adminCountryCode :selected').text(),
            Email: $('#adminEmail').val(),
            Fax: $('#adminFax').val(),
            FirstName: $('#adminFirstName').val(),
            LastName: $('#adminLastName').val(),
            OrganizationName: $('#adminOrganizationName').val(),
            PhoneNumber: $('#adminPhoneNumber').val(),
            State: $('#adminState').val(),
            ZipCode: $('#adminZipCode').val()
        },

        RegistrantContact: {
            /* required */
            AddressLine1: $('#registrantAddressLine1').val(),
            AddressLine2: $('#registrantAddressLine2').val(),
            City: $('#registrantCity').val(),
            ContactType: $('#registrantContactType :selected').text(),
            CountryCode: $('#registrantCountryCode :selected').text(),
            Email: $('#registrantEmail').val(),
            Fax: $('#registrantFax').val(),
            FirstName: $('#registrantFirstName').val(),
            LastName: $('#registrantLastName').val(),
            OrganizationName: $('#registrantOrganizationName').val(),
            PhoneNumber: $('#registrantPhoneNumber').val(),
            State: $('#registrantState').val(),
            ZipCode: $('#registrantZipCode').val()
        },

        TechContact: {
            /* required */
            AddressLine1: $('#techAddressLine1').val(),
            AddressLine2: $('#techAddressLine2').val(),
            City: $('#techCity').val(),
            ContactType: $('#techContactType :selected').text(),
            CountryCode: $('#techCountryCode :selected').text(),
            Email: $('#techEmail').val(),
            Fax: $('#techFax').val(),
            FirstName: $('#techFirstName').val(),
            LastName: $('#techLastName').val(),
            OrganizationName: $('#techOrganizationName').val(),
            PhoneNumber: $('#techPhoneNumber').val(),
            State: $('#techState').val(),
            ZipCode: $('#techZipCode').val()
        },

        project: $('#project').val(),
        responsavel: $('#responsavel').val(),
        region: $('#region option:selected').val()
    }

    return data
}



/*
    Envio de arquivos com FIlepond para um bucket do S3
    -Define um cliente de conexão com o S3
    -Faz a autenticação com o cognito
    -Envia os arquivos
*/

const {
    S3Client,
    PutObjectCommand
} = require("@aws-sdk/client-s3");

const {
    CognitoIdentityClient
} = require("@aws-sdk/client-cognito-identity");

const {
    fromCognitoIdentityPool
} = require("@aws-sdk/credential-provider-cognito-identity");

const REGION = 'us-east-1'

const s3Client = new S3Client({
    region: REGION,
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({
            region: REGION
        }),
        identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
    })
});

import * as FilePond from 'filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond/dist/filepond.css';
import {
    data
} from 'jquery';


// Obtem uma referência ao elemento de entrada do arquivo
const inputElement = document.querySelector('input[type="file"]');

// Cria uma instancia do FilePond
const pond = FilePond.create(inputElement);

//Define as configurações do FilePond
pond.instantUpload = false
pond.dropOnPage = true;
pond.allowProcess = false;
pond.allowImagePreview = true

// Define o método de processamento de arquivo FilePond customizado 
FilePond.setOptions({
    server: {
        process: async function (fieldName, file, metadata, load, error, progress, abort) {

            const uploadParams = {
                Bucket: DATA.DomainName,
                Key: file._relativePath.slice(file._relativePath.indexOf('/') + 1),
                Body: file,
                ContentType: file.type,
                ACL: 'public-read'
            }
            try {
                //Tenta enviar os arquivos para um bucket do S3
                const data = await s3Client.send(new PutObjectCommand(uploadParams))
                load(data.Key);
            } catch (err) {
                return
            }

        }
    },
    onprocessfiles: () => {
        let url = `http     ://${$('#DomainName').val()}.s3-website-us-east-1.amazonaws.com`
        Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Todos os arquivos foram enviados!',
            footer: `<a href= "${url}">Clique aqui para acessar o endpoint de seu site</a>`
        })
    }
})


//Chama as funçoes necessarias para hospedar o site
async function processar(dados, token) {
    $('#progress').css('width', '0%');
    $('#progress').removeClass('bg-danger');

    let response
    try {

        //Cria o bucket no S3
        $('#progress').css('width', '1%');
        $('#status_text').text('Criando bucket...');
        response = await fetch('/createS3bucket', {
            method: 'POST',
            body: JSON.stringify({
                region: dados.region,
                bucket: dados.DomainName
            }),
            headers: {
                'CSRF-Token': token,
                'Content-Type': 'application/json' // <-- is the csrf token as a header
            },
        })
        if (response.status == 400) throw new Error
        $('#progress').css('width', '10%');

        //Libera politicas de acesso publico no bucket
        $('#progress').css('width', '11%');
        $('#status_text').text('Liberando políticas de acesso público...');
        response = await fetch('/enablePublicAccess', {
            method: 'PUT',
            body: JSON.stringify({
                region: dados.region,
                bucket: dados.DomainName
            }),
            headers: {
                'CSRF-Token': token,
                'Content-Type': 'application/json' // <-- is the csrf token as a header
            },
        })
        if (response.status == 400) throw new Error
        $('#progress').css('width', '20%');


        //ATRIBUI as politicas de acesso publico
        $('#progress').css('width', '21%');
        $('#status_text').text('Atribuindo regras de ACL...');
        response = await fetch('/putbucektPolicy', {
            method: 'PUT',
            body: JSON.stringify({
                region: dados.region,
                bucket: dados.DomainName
            }),
            headers: {
                'CSRF-Token': token,
                'Content-Type': 'application/json' // <-- is the csrf token as a header
            },
        })
        if (response.status == 400) throw new Error
        $('#progress').css('width', '30%');

        //Atribui as políticas de CORS necessárias
        $('#progress').css('width', '31%');
        $('#status_text').text('Definindo políticas de Cross-Origin Resource Sharing (CORS)...');
        response = await fetch('/setCors', {
            method: 'PUT',
            body: JSON.stringify({
                region: dados.region,
                bucket: dados.DomainName
            }),
            headers: {
                'CSRF-Token': token,
                'Content-Type': 'application/json' // <-- is the csrf token as a header
            },
        })
        if (response.status == 400) throw new Error
        $('#progress').css('width', '40%');


        //Ativa o armazenamento de site estatico no bucket
        $('#progress').css('width', '41%');
        $('#status_text').text('Ativando o armazenamento de site estático...');
        response = await fetch('/enableWebSiteHosting', {
            method: 'PUT',
            body: JSON.stringify({
                region: dados.region,
                bucket: dados.DomainName
            }),
            headers: {
                'CSRF-Token': token,
                'Content-Type': 'application/json'
            },
        })
        if (response.status == 400) throw new Error
        $('#progress').css('width', '50%');


        //Envia os arquivos do site estático
        $('#status_text').text('Enviando arquivos...');
        $('#progress').css('width', '80%');
        let upload = await pond.processFiles().then((files) => {})
        if (response.status == 400) throw new Error
        $('#progress').css('width', '100%');
        $('#status_text').text('Concluido !');
        $('#progress').removeClass('progress-bar-animated')
        $('#progress').addClass('bg-success')
        $('#btn_publicar_loading').attr('hidden', true);


    } catch (error) {
        falha()
    }

    function falha() {
        alert('Ops !', 'Não foi possível completar a operação', 'error')
        $('#btn_publicar').show();
        $('#btn_publicar_loading').attr('hidden', true);
        $('#progress').addClass('bg-danger')
        $('#progress').removeClass('progress-bar-animated')
    }

}




// async function hospedarSite(region, bucket, token) {


//     $('#progress').css('width', '10%');
//     $('#status_text').text('Criando bucket...');

//     try {
//         let statusSite = await fetch('/createSite', {
//             method: 'POST',
//             body: JSON.stringify({
//                 region: region,
//                 bucket: bucket
//             }),
//             headers: {
//                 'CSRF-Token': token,
//                 'Content-Type': 'application/json' // <-- is the csrf token as a header
//             },
//         })
//         console.log(statusSite)




//         if (statusSite.status == 200) {
//             $('#progress').css('width', '50%');
//             $('#status_text').text('Enviando arquivos...');
//             let upload = await pond.processFiles().then((files) => {})

//             $('#progress').css('width', '100%');
//             $('#status_text').text('Concluido !');
//             $('#progress').removeClass('progress-bar-animated')
//             $('#progress').addClass('bg-success')
//         } else {
//             throw new Error
//         }

//         // $('#btn_publicar').show();
//         $('#btn_publicar_loading').attr('hidden', true);

//     } catch (err) {
//         alert('Ops !', 'Não foi possível completar a operação', 'error')
//         $('#btn_publicar').show();
//         $('#btn_publicar_loading').attr('hidden', true);
//         console.log(err)
//     }

// }
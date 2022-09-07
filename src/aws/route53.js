const chalk = require('chalk');

const { Route53DomainsClient, CheckDomainAvailabilityCommand, GetDomainSuggestionsCommand } = require("@aws-sdk/client-route-53-domains");
// const { data } = require('jquery');

const client = new Route53DomainsClient({ region: 'us-east-1'})


//Verifica se um dominio esta ou não disponivel
exports.checkdomain = async function(req, res){
    
    const params = {
        DomainName: req.query.DomainName
    }
    const command = new CheckDomainAvailabilityCommand(params)

    try{
        let data = await client.send(command)
        data = {
            Availability : data.Availability,
        }
        console.log(data)
        res.send(data)
        
    }catch(e){
        res.send(e)
    }
}

exports.sugerirDominios = async function(req, res){
    const params = {
        DomainName: req.query.DomainName,
        OnlyAvailable : true,
        SuggestionCount : 7
    }
    
    const command = new GetDomainSuggestionsCommand(params)
    
    try{
        let data = await client.send(command)
        
        data = {
            SuggestionsList : data.SuggestionsList,
        }

        res.send(data)
    }catch(e){
        res.send(e)
    }
}


const AmazonS3WebsiteEndpoints = [
    {
        name: 'us-east-2',
        description: 'Leste dos EUA (Ohio)',
        endpoint: 's3-website.us-east-2.amazonaws.com',
        route53zoneID: 'Z2O1EMRO9K5GLX'
    },
    {
        name: 'us-east-1',
        description: 'Leste dos EUA (Norte da Virgínia)',
        endpoint: 's3-website-us-east-1.amazonaws.com',
        route53zoneID: 'Z3AQBSTGFYJSTF '
    },
    {
        name: 'us-west-1',
        description: 'Oeste dos EUA (Norte da Califórnia)',
        endpoint: 's3-website-us-west-1.amazonaws.com',
        route53zoneID: 'Z2F56UZL2M1ACD'
    },
    {
        name: 'us-west-2',
        description: 'Oeste dos EUA (Oregon)',
        endpoint: 's3-website-us-west-2.amazonaws.com',
        route53zoneID: 'Z3BJ6K6RIION7M'
    },
    {
        name: 'af-south-1',
        description: 'África (Cidade do Cabo)',
        endpoint: 's3-website.af-south-1.amazonaws.com',
        route53zoneID: 'Z11KHD8FBVPUYU'
    },
    {
        name: 'ap-east-1',
        description: 'Ásia-Pacífico (Hong Kong)',
        endpoint: 's3-website.ap-east-1.amazonaws.com',
        route53zoneID: 'ZNB98KWMFR0R6'
    },
    {
        name: 'ap-south-1',
        description: 'Ásia Pacífico (Mumbai)',
        endpoint: 's3-website.ap-south-1.amazonaws.com',
        route53zoneID: 'Z11RGJOFQNVJUP'
    },
    {
        name: 'ap-northeast-3',
        description: 'Ásia-Pacífico (Osaka)',
        endpoint: 's3-website.ap-northeast-3.amazonaws.com',
        route53zoneID: 'Z2YQB5RD63NC85'
    },
    {
        name: 'ap-northeast-2',
        description: 'Ásia-Pacífico (Seul)',
        endpoint: 's3-website.ap-northeast-2.amazonaws.com',
        route53zoneID: 'Z3W03O7B5YMIYP'
    },
    {
        name: 'ap-southeast-1',
        description: 'Ásia-Pacífico (Cingapura)',
        endpoint: 's3-website-ap-southeast-1.amazonaws.com',
        route53zoneID: 'Z3O0J2DXBE1FTB'
    },
    {
        name: 'ap-southeast-2',
        description: 'Ásia-Pacífico (Sydney)',
        endpoint: 's3-website-ap-southeast-2.amazonaws.com',
        route53zoneID: 'Z1WCIGYICN2BYD'
    },
    {
        name: 'ap-northeast-1',
        description: 'Ásia-Pacífico (Tóquio)',
        endpoint: 's3-website-ap-northeast-1.amazonaws.com',
        route53zoneID: 'Z2M4EHUR26P7ZW'
    },
    {
        name: 'ca-central-1',
        description: 'Canadá (Central)',
        endpoint: 's3-website.ca-central-1.amazonaws.com',
        route53zoneID: 'Z1QDHH18159H29'
    },
    {
        name: 'cn-northwest-1',
        description: 'China (Ningxia)',
        endpoint: 's3-website.cn-northwest-1.amazonaws.com.cn',
        route53zoneID: 'n/a'
    },
    {
        name: 'eu-central-1',
        description: 'Europa (Frankfurt)',
        endpoint: 's3-website.eu-central-1.amazonaws.com',
        route53zoneID: 'Z21DNDUVLTQW6Q'
    },
    {
        name: 'eu-west-1',
        description: 'Europa (Irlanda)',
        endpoint: 's3-website-eu-west-1.amazonaws.com',
        route53zoneID: 'Z1BKCTXD74EZPE'
    },
    {
        name: 'eu-west-2',
        description: 'Europa (Londres)',
        endpoint: 's3-website.eu-west-2.amazonaws.com',
        route53zoneID: 'Z3GKZC51ZF0DB4'
    },
    {
        name: 'eu-south-1',
        description: 'Europa (Milão)',
        endpoint: 's3-website.eu-south-1.amazonaws.com',
        route53zoneID: 'n/a'
    },
    {
        name: 'eu-west-3',
        description: 'Europa (Paris)',
        endpoint: 's3-website.eu-west-3.amazonaws.com',
        route53zoneID: 'Z3R1K369G5AVDG'
    },
    {
        name: 'eu-north-1',
        description: 'Europa (Estocolmo)',
        endpoint: 's3-website.eu-north-1.amazonaws.com',
        route53zoneID: 'Z3BAZG2TWCNX0D'
    },
    {
        name: 'me-south-1',
        description: 'Oriente Médio (Bahrein)',
        endpoint: 's3-website.me-south-1.amazonaws.com',
        route53zoneID: 'n/a'
    },
    {
        name: 'sa-east-1',
        description: 'América do Sul (São Paulo)',
        endpoint: 's3-website-sa-east-1.amazonaws.com',
        route53zoneID: 'Z7KQH4QJS55SO'
    },
    {
        name: 'us-gov-east-1',
        description: 'AWS GovCloud (Leste dos EUA)',
        endpoint: 's3-website.us-gov-east-1.amazonaws.com',
        route53zoneID: 'Z2NIFVYYW2VKV1'
    },
    {
        name: 'us-gov-west-1',
        description: 'AWS GovCloud (US) (AWS (US))',
        endpoint: 's3-website-us-gov-west-1.amazonaws.com',
        route53zoneID: 'Z31GFT0UA1I2HV'
    }
    
]

exports.listS3WebSiteEndpoints = function (){
    return(AmazonS3WebsiteEndpoints)
}


exports.returnEndpointsInJSON = function (){
    return(JSON.stringify(AmazonS3WebsiteEndpoints))
}

exports.teste = 10


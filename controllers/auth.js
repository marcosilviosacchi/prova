const ActiveDirectory = require('activedirectory');

const config = {
    url: 'ldaps://ao.hsacomo.org:636',
    baseDN: 'dc=ao,dc=hsacomo,dc=org',
    username: 'service.ldap@ao.hsacomo.org',
    password: '12345678',
    tlsOptions: {
        'rejectUnauthorized': false
    }
}

let autho = function(groups){    
    let autorizzato = 0;
    groups.forEach(element => {
        if(element.dn.includes('UO Sistemi Informativi Aziendali')){
            autorizzato = 1;
            return autorizzato;
        }
    });
    return autorizzato;
}

const ad = new ActiveDirectory(config);

exports.login = (req,res,next) => {
    
    let user = req.body.fields.user.value;
    let pwd = req.body.fields.pwd.value;
    let gruppi;
    ad.authenticate(user + '@ao.hsacomo.org',pwd,function(err,auth){
        if(auth){
            ad.getGroupMembershipForUser(user + '@ao.hsacomo.org',function(error,groups){      //Recupero i gruppi dell'utente
                if(error){
                    gruppi = 'ERRORE ricerca gruppi';
                }
                if(groups){
                    let autorizzato = autho(groups)
                    req.session.true = true;
                    req.session.user = user;
                    req.session.auth = true;
                    req.session.autorizzazione = autorizzato;
                    res.status(200).json({                        
                        messaggio: `sei loggato come '${user}'`,
                        user: user,
                        autenticato: 1,
                        autorizzato: autorizzato
                    });
                }
            });
        }
        else{
            res.status(401).json({
                messaggio: 'login fallito',
                user: user,
                autenticato: 0,
                autorizzato: false
            })
        }
    })
}

exports.logout = (req,res,next) => {
    req.session.destroy();
    res.send("logout avvenuto!");
}

exports.ver = (req,res,next) => {
    if(req.session.true){
        res.send(true);
    }else{
        res.send(false);
    }
}
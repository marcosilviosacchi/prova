const validator = require('validator');

module.exports = (req,res,next) => {

    let fields = req.body.fields;
    let error = false;
    let keys = Object.keys(fields);
    let valid = {
        result: 1
    };
    keys.forEach(element => {
        if (fields[element].editable == true) {
            switch(fields[element].typeVal){
                case "MAIL":
                    if(validator.isEmail(req.body.fields[element].value,{ ignore_whitespace:true }) === false){
                        error = true;
                        fields[element].error = true;
                        fields[element].errorMessage = "Mail non valida"
                    }
                    break;
                case "INTEGER":
                    if(validator.isInt(req.body.fields[element].value + "",{ ignore_whitespace:true }) === false){
                        error = true;
                        fields[element].error = true;
                        fields[element].errorMessage = "Inserire un numero"
                    }
                    break;
                case "STRING":
                    if (fields[element].required == true){
                        if(validator.isEmpty(req.body.fields[element].value,{ ignore_whitespace:true }) === true){
                            error = true;
                            fields[element].error = true;
                            fields[element].errorMessage = "Campo obbligatorio"
                        }
                    }
                    break;

                default:
            }
        }

    });
    if (error === true){
        return res.status(422).json( fields )
    }else{
        next();
    }
}
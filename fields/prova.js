/* exports.fields = {
    id: { typeVal: 'INTEGER', label: 'id', dbField: 'id', typeDbField: 'INTEGER', primaryKey: true, required: true, error: false, errorMessage: '', value: '', visible: false },
    nome: { typeVal: 'STRING', label: 'nome', dbField: 'nome', typeDbField: 'STRING', primaryKey: false, required: true, error: false, errorMessage: '', value: '', visible: true },
    cognome: { typeVal: 'STRING', label: 'cognome', dbField: 'cognome', typeDbField: 'STRING', primaryKey: false, required: true, error: false, errorMessage: '', value: '', visible: true },
    deleted: { typeVal: 'INTEGER', label: 'Cancellato', dbField: 'deleted', typeDbField: 'INTEGER', primaryKey: false, required: true, error: false, errorMessage: '', value: '', visible: true }
} */
exports.fields = {
    id: {
      typeVal: 'INTEGER',
      label: 'id',
      dbField: 'id',
      typeDbField: 'INTEGER',
      primaryKey: true,
      required: true,
      error: false,
      errorMessage: '',
      value: '',
      visible: false,
      editable: false
    },
    nome: {
      typeVal: 'STRING',
      label: 'nome',
      dbField: 'nome',
      typeDbField: 'STRING',
      primaryKey: false,
      required: true,
      error: false,
      errorMessage: '',
      value: '',
      visible: true,
      editable: true
    },
    cognome: {
      typeVal: 'STRING',
      label: 'cognome',
      dbField: 'cognome',
      typeDbField: 'STRING',
      primaryKey: false,
      required: true,
      error: false,
      errorMessage: '',
      value: '',
      visible: true,
      editable: true
    },
    deleted: {
      typeVal: 'INTEGER',
      label: 'deleted',
      dbField: 'deleted',
      typeDbField: 'INTEGER',
      primaryKey: false,
      required: true,
      error: false,
      errorMessage: '',
      value: '',
      visible: false,
      editable: false
    }
  }
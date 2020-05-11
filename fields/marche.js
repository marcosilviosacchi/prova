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
      visible: true,
      editable: false
    },
    descrizione: {
      typeVal: 'STRING',
      label: 'descrizione',
      dbField: 'descrizione',
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
      visible: true,
      editable: false
    }
  }
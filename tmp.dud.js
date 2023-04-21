const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Import the Sequelize instance

const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hasOutstandingBalance: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Define one-to-many relationship between Account and Invoice models
Account.hasMany(require('./invoice'), { foreignKey: 'accountId', as: 'invoices' });

module.exports = Account;

// ================================================================================
// models/invoice.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Import the Sequelize instance

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  uniqueReference: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('LIBRARY_FINE', 'TUITION_FEES'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('OUTSTANDING', 'PAID', 'TYPE'),
    allowNull: false,
  },
});




const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Import the Sequelize instance

const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hasOutstandingBalance: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Define one-to-many relationship between Account and Invoice models
Account.hasMany(require('./invoice.model'), { foreignKey: 'accountId', as: 'invoices' });

module.exports = Account;


// models/invoice.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Import the Sequelize instance

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  uniqueReference: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('LIBRARY_FINE', 'TUITION_FEES'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('OUTSTANDING', 'PAID', 'TYPE'),
    allowNull: false,
  },
});

// Define many-to-one relationship between Invoice and Account models
Invoice.belongsTo(require('./account.model'), { foreignKey: 'accountId', as: 'account' });

module.exports = Invoice;


// Define many-to-one relationship between Invoice and Account models
Invoice.belongsTo(require('./account'), { foreignKey: 'accountId', as: 'account' });

module.exports = Invoice;

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.hasMany(models.Invoice, {foreignKey: 'accountId'});
    }
  }
  Account.init({
    studentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hasOutstandingBalance: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};



'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsTo(models.Account, { foreignKey: 'accountId' });
    }
  }
  Invoice.init({
    reference: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('LIBRARY_FINE', 'TUITION_FEES'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('OUTSTANDING', 'PAID', 'TYPE'),
      allowNull: false,
    },
    accountId: {
      type: DataTypes.BIGINT
    }
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};



private @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;
    @Column(unique = true)
    @NotBlank(message = "{reference.required}")
    @Size(min = 8, max = 8, message = "{reference.size}")
    @Pattern(regexp = "[A-Z0-9]*", message = "{reference.format}")
    private String reference;
    private Double amount;
    private LocalDate dueDate;
    private Type type;
    private Status status;
    @ManyToOne
    @JoinColumn(name="account_fk",referencedColumnName="id")
    @ToString.Exclude
    private Account account;





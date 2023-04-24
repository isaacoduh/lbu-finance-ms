'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Accounts", deps: []
 * createTable "Invoices", deps: [Accounts]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2023-04-24T13:54:58.489Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Accounts",
            {
                "id": {
                    "type": Sequelize.BIGINT,
                    "field": "id",
                    "primaryKey": true,
                    "unique": true,
                    "autoIncrement": true
                },
                "studentId": {
                    "type": Sequelize.STRING,
                    "field": "studentId",
                    "allowNull": false
                },
                "hasOutstandingBalance": {
                    "type": Sequelize.BOOLEAN,
                    "field": "hasOutstandingBalance",
                    "defaultValue": false,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Invoices",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "reference": {
                    "type": Sequelize.STRING,
                    "field": "reference"
                },
                "amount": {
                    "type": Sequelize.FLOAT,
                    "field": "amount",
                    "allowNull": false
                },
                "dueDate": {
                    "type": Sequelize.DATE,
                    "field": "dueDate",
                    "allowNull": false
                },
                "type": {
                    "type": Sequelize.ENUM('LIBRARY_FINE', 'TUITION_FEE'),
                    "field": "type",
                    "allowNull": false
                },
                "status": {
                    "type": Sequelize.ENUM('OUTSTANDING', 'PAID', 'CANCELLED'),
                    "field": "status",
                    "allowNull": false
                },
                "account_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Accounts",
                        "key": "id"
                    },
                    "field": "account_id",
                    "allowNull": false,
                    "required": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "deletedAt": {
                    "type": Sequelize.DATE,
                    "field": "deletedAt"
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};

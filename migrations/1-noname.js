'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Accounts", deps: []
 * createTable "Invoices", deps: [Accounts, Accounts]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2023-04-19T14:26:30.114Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Accounts",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "studentId": {
                    "type": Sequelize.STRING,
                    "field": "studentId"
                },
                "hasOutstandingBalance": {
                    "type": Sequelize.BOOLEAN,
                    "field": "hasOutstandingBalance"
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
                    "type": Sequelize.ENUM('LIBRARY_FINE', 'TUITION_FEES'),
                    "field": "type",
                    "allowNull": false
                },
                "status": {
                    "type": Sequelize.ENUM('OUTSTANDING', 'PAID', 'TYPE'),
                    "field": "status",
                    "allowNull": false
                },
                "accountId": {
                    "type": Sequelize.BIGINT,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Accounts",
                        "key": "id"
                    },
                    "allowNull": true,
                    "field": "accountId"
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
                "studentId": {
                    "type": Sequelize.INTEGER,
                    "field": "studentId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Accounts",
                        "key": "id"
                    },
                    "allowNull": true
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

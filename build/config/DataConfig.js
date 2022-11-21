"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data = {
    "bd": {
        "mongo": {
            "NAME": "carloscertificacionprueba",
            "PASSWORD": "Vb1m4iiR5P7Rfd8t",
            "DATA_BASE": "certifique-moongosse"
        },
        "mysql": {
            "tipeOption": "pool",
            "single": {
                "host": "localhost",
                "port": 3306,
                "user": "root",
                "password": "",
                "database": "bdnoticias"
            },
            "pool": {
                "multipleStatements": true,
                "connectionLimit": 10,
                "host": "localhost",
                "user": "root",
                "password": "",
                "database": "bdnoticias"
            }
        }
    },
    "apires": {
        "hostFtp": "http://localhost:5000",
        "portpru": 5000,
        "hosturl": "localhost",
        "control_access": {
            "origin": ["http://localhost:8000"],
            "methods": ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        }
    },
    "apidatkey": {
        "id": 969280255,
        "nombre": "bradcar",
        "email": "ucv2021@email.com"
    }
};
exports.default = data;

const conn = require("../config/db");
// import axios from 'axios';
const axios = require('axios');
var csvjson = require('csvjson');

class FlowdetailController {

    createflowdetail(req, res) {

        const { statusType, departmentType, stateflow, active, flowlevel, flowdsubId } = req.body;

        var dataall = `INSERT INTO flowdetails(statusType, departmentType, stateflow, active, flowlevel,flowdsubId) 
        VALUES ('${statusType}','${departmentType}','${stateflow}','${active}','${flowlevel}',${flowdsubId})`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowdetails" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update flowdetails successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update flowdetails fialed' })
                }
            }

        });

    }

    updateflowdetail(req, res) {

        const { id } = req.params

        const { statusType, departmentType, stateflow, active, flowlevel } = req.body;

        var dataall = `UPDATE flowdetails SET statusType='${statusType}',departmentType='${departmentType}',
        stateflow='${stateflow}',active='${active}',flowlevel='${flowlevel}' WHERE flowdetailId=${id}`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowdetails" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update flowdetails successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update flowdetails fialed' })
                }
            }
        });

    }

      updateflowdetailById(req, res) {

        const { id } = req.params

        const { statusType, departmentType} = req.body;

        var dataall = `UPDATE flowdetails SET statusType='${statusType}',departmentType='${departmentType}' WHERE flowdetailId=${id}`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowdetails" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update flowdetails successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update flowdetails fialed' })
                }
            }
        });

    }


    flowdetailall(req, res) {
        var dataall = `SELECT * FROM flowdetails`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowdetails " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    flowdetailById(req, res) {
        const { id } = req.params

        var dataall = `SELECT * FROM flowdetails WHERE flowdetailId=${id}`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowdetails " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }

    flowdetailBysubId(req, res) {
        const { id } = req.params

        var dataall = `SELECT  
        ROW_NUMBER() OVER (ORDER BY flowdetailId) AS num,flowdetailId,statusType,
    (SELECT typestatus.typename from typestatus WHERE typestatus.typecode=statusType) as typename,
    departmentType,
    (SELECT departments.departmentname FROM departments WHERE departments.departmentcode=departmentType)as departmentname,
    stateflow,active,flowlevel,flowdsubId 
FROM flowdetails WHERE flowdsubId=${id}`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowdetails " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }

    ListflowBysubId(req, res) { // แสดงรายการผู้อนุมัติ ตาย ลำดับ
        const { id } = req.params

        var dataall = `SELECT 
            flowdetails.flowdetailId,
            flowdetails.statusType,
            (SELECT typestatus.typename FROM typestatus 
            WHERE typestatus.typecode=flowdetails.statusType) as typeName,
            flowdetails.departmentType,
            (SELECT departments.departmentname FROM departments 
            WHERE departments.departmentcode=flowdetails.departmentType) as department,
            flowdetails.stateflow,
            flowdetails.active, 
            flowdetails.flowlevel,
            flowdetails.flowdsubId,
            flowdetailsub.approveBydId,
            (SELECT userall.name FROM userall WHERE userall.userId=flowdetailsub.approveBydId) as userName
            FROM flowdetails INNER JOIN flowdetailsub ON flowdetailsub.flowdetailId=flowdetails.flowdetailId
            WHERE flowdetails.flowdsubId=${id} ORDER BY flowdetails.stateflow ASC`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowdetails " });

            }
            if (results.length > 0) {
                //   getflile()
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

        /// excel ofs  to json ------->
        function getflile() {

            // var session_url = `https://swan.ofsxpress.com/OFSSWAN052/server/export/product?start=2025-05-02%14:23:00&groupBy=job`;
            var session_url=`https://swan.ofsxpress.com/OFSSWAN003/server/export/product?start=2025-05-05%00:00:00&groupBy=job`;
            axios.get(session_url, {
                auth: {
                    username: 'console',
                    password: '123456'
                }
            }).then(function (response) {
                var options = {
                    delimiter : ',', // optional
                    quote     : '"' // optional
                  };

           let datalist= csvjson.toObject(response.data, options);
           console.log(datalist);

                // console.log(response.data)
                //    console.log(toJSON(response.data))
                // let dt = toJSON(response.data);
                // console.log(dt[0])
                //    toJSON(response.data)

            }).catch(function (error) {
                console.log('Error on Authentication');
            });
        }

        var jsonArray = [];
        function toJSON(csvString) {
            var dataArray = csvString.split("\n");
            //This line helps us to obtain the keys for various values in the file.
            var fieldsArray = dataArray[0].split(",");

            //The following loop creates an object for every line and then pushes it into the array.
            for (var i = 1; i < dataArray.length; i++) {
                var temp = {};
                //contains values which are separated by a comma in a line.
                var valuesArray = dataArray[i].split(",");
                for (var k = 0; k < valuesArray.length; k++) {
                    temp[fieldsArray[k]] = valuesArray[k]
                    // console.log(valuesArray[k].replaceAll('"', ''))
                }

                //pushes the object into the array.
                jsonArray.push(temp);
            }
            return jsonArray;
        };

    }

    deleteById(req, res) {

        const { id } = req.params

        var dataall = `DELETE FROM flowdetails WHERE flowdetailId=${id}`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowdetails" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'DELETE flowdetails successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'DELETE flowdetails fialed' })
                }
            }

        });

    }
}

module.exports = new FlowdetailController()
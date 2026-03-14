const conn = require("../config/db");

class NoteJournalGroupController {

    createNotejournalgroupbatch(req, res) {
        const { TypeBatch, batchName1, batchName2, batchDetail1, batchDetail2, batchExample1,
            batchExample2, numbers, typenote, journalgroupId } = req.body

        var datalist = `INSERT INTO noterevisegroupbatch(TypeBatch,
        batchName1,batchName2,batchDetail1,batchDetail2,batchExample1,
        batchExample2,numbers,typenote,journalgroupId) VALUES 
('${TypeBatch}','${batchName1}','${batchName2}','${batchDetail1}','${batchDetail2}',
'${batchExample1}','${batchExample2}','${numbers}','${typenote}','${journalgroupId}')`;

        conn.query(datalist, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add noterevisegroupbatch" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'create noterevisegroupbatch successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'create noterevisegroupbatch fialed' })
                }
            }

        });
    }


    updateNoteBatchById(req, res) {
        const { id } = req.params
        const { batchId, TypeBatch, batchName1, batchName2, batchDetail1,
            batchDetail2, batchExample1, batchExample2, numbers, typenote, journalgroupId } = req.body;

        var datalist = `UPDATE noterevisegroupbatch SET TypeBatch='${TypeBatch}',batchName1='${batchName1}',batchName2='${batchName2}',
        batchDetail1='${batchDetail1}',batchDetail2='${batchDetail2}',batchExample1='${batchExample1}',batchExample2='${batchExample2}',
        numbers='${numbers}',typenote='${typenote}',journalgroupId='${journalgroupId}' WHERE  batchId='${id}'`;

        conn.query(datalist, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add noterevisegroupbatch" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update noterevisegroupbatch successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update noterevisegroupbatch fialed' })
                }
            }

        });

    }

    getnotebatch(req, res) {
        const { id } = req.params
        var datalist = `SELECT batchId, TypeBatch, batchName1, batchName2, batchDetail1,
         batchDetail2, batchExample1, batchExample2, numbers, typenote, journalgroupId 
         FROM noterevisegroupbatch WHERE  journalgroupId='${id}' order BY typenote,TypeBatch ASC`;

        conn.query(datalist, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get journalgroupId " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }


    // แบบ item

    createNotejournalgroupItemId(req, res) {

        const { typeProduct, itemId, itemName, typenote, journalgroupId } = req.body
        var datalist = `INSERT INTO noterevisegroupitem( typeProduct,itemId,itemName,typenote,journalgroupId) 
VALUES ('${typeProduct}','${itemId}','${itemName}','${typenote}','${journalgroupId}')`;
        conn.query(datalist, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add noterevisegroupitem" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'create noterevisegroupitem successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'create noterevisegroupitem fialed' })
                }
            }

        });
    }

    getnoteItem(req, res) {
        const { id } = req.params
        var datalist = `SELECT nodeId,typeProduct, itemId, itemName, typenote, journalgroupId 
        FROM noterevisegroupitem WHERE journalgroupId='${id}' order BY typenote ASC `;

        conn.query(datalist, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get journalgroupId " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    updateItemlist(req, res) {
        const { id } = req.params;
        const { nodeId, typeProduct, itemId, itemName, typenote, journalgroupId } = req.body;

        var datalist = `UPDATE noterevisegroupitem SET typeProduct='${typeProduct}',itemId='${itemId}',
        itemName='${itemName}',typenote='${typenote}',journalgroupId='${journalgroupId}' WHERE nodeId=${id}`;
        conn.query(datalist, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add noterevisegroupitem" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update noterevisegroupitem successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update noterevisegroupitem fialed' })
                }
            }

        });

    }

}

module.exports = new NoteJournalGroupController();
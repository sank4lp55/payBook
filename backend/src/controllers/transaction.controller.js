const {
    addTransaction,
    getAllTransactions,
    getTransactionInfoByID,
    updateTransaction,
    deleteTransaction
} = require('../services/transaction.service');

/**
 * @description Get All Transactions
 * @type GET
 * @path /api/v1/transactions
 * @param {*} req
 * @param {*} res
 * @access Private
 * @returns JSON
    */
const getAllTransactionsData = async (req, res, next) => {
    try {
        const resp = await getAllTransactions()
        return res.status(200).json({
            success: true,
            data: resp
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error
        });
    }

}

/**
 * @description Get Transaction info by ID
 * @type GET
 * @path /api/v1/transactions/:id
 * @param {*} req
 * @param {*} res
 * @access Private
 * @returns JSON
    */
const getTransactionByID = async (req, res, next) => {
    let id = req.params.id;
    let current_user_id = req.userInfo.id
    try {
        const resp = await getTransactionInfoByID(id)

        if (resp.type == "send" && resp.transaction_sender == current_user_id) {
            return res.status(200).json({
                success: true,
                data: resp
            })
        } else if (resp.type == "recieve" && resp.transaction_receiver == current_user_id) {
            return res.status(200).json({
                success: true,
                data: resp
            })
        } else {
            return res.status(200).json({
                success: false,
                data: "Transaction Not Found"
            })
        }
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error
        });
    }
}

/**
 * @description Add Transaction
 * @type POST
 * @path /api/v1/transactions
 * @param {*} req
 * @param {*} res
 * @access Private
 * @returns JSON
 * @body {Object} transaction
    */
const save = async (req, res, next) => {
    let transaction = req.body;
    transaction.transaction_sender = req.userInfo.id
    try {
        console.log("transaction add")
        const resp = await addTransaction(transaction)
        console.log(resp, "resp")
        return res.status(200).json({
            success: true,
            data: resp
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error
        });
    }
}

/**
 * @description Update Transaction
 * @type PUT
 * @path /api/v1/transactions/:id
 * @param {*} req
 * @param {*} res
 * @access Private
 * @returns JSON
*/
const updateTransactionData = async (req, res, next) => {
    let id = req.params.id;
    let transaction = req.body;
    try {
        const resp = await updateTransaction(id, transaction)
        return res.status(200).json({
            success: true,
            data: resp
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error
        });
    }
}

/**
 * @description Delete Transaction
 * @type DELETE
 * @path /api/v1/transactions/:id
 * @param {*} req
 * @param {*} res
 * @access Private
 * @returns JSON
 */
const deleteTransactionData = async (req, res, next) => {
    let id = req.params.id;
    try {
        const resp = await deleteTransaction(id)
        return res.status(200).json({
            success: true,
            data: resp
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error
        });
    }
}

module.exports = {
    getAllTransactionsData,
    getTransactionByID,
    save,
    updateTransactionData,
    deleteTransactionData
}
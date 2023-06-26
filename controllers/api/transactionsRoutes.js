const router = require('express').Router();
const { Transaction } = require('../../Models');
const withAuth = require('../../utils/auth');


// POST ROUTE - mandatory to have the id in the url
router.post('/:id', withAuth, async (req, res) => {
    try {
        console.log(req.body);
        const transactionData = await Transaction.create(
            {
                ...req.body,
                user_id: req.session.user_id,
                objective_id: req.params.id,
            }
        );

        if (!transactionData) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transactionData);
    } catch (err) {
        res.status(400).json({ message: 'Failed', error: err.message });
    }
});

// PUT ROUTE
router.put('/:id',withAuth, async (req, res) => {
    try {
        const transactionData = await Transaction.update(

            req.body, { where: { id: req.params.id, user_id: req.session.user_id } }

        );
        if (!transactionData) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transactionData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE ROUTE
router.delete('/:id',withAuth, async (req, res) => {
    try {
        const transactionData = await Transaction.destroy(
            {
                where: { id: req.params.id, user_id: req.session.user_id }
            }
        );
        if (!transactionData) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transactionData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
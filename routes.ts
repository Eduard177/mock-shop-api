const express = require('express');
const router = express.Router();
const {login, register} = require('./src/modules/user/controller/user.controller');
const {
    getAllProduct,
    getOrderById,
    createOrUpdate,
    getAllOrderByUserId,
    updateOrder,
    getProductById,
    getAllActiveOrder,
    changeAllActiveOrdersToCompleted
} = require('./src/modules/order/controller/order.controller');
// User Registration
router.post('/register', async (req: any, res: any) => {
    try {
        const response = await register(req.body)
        res.status(response.statusCode).json({message: response.message})
    } catch (e: any) {
        console.log(e)
        res.status(e.statusCode).json({message: e.message})
    }
});

// User Login
router.post('/login', async (req: any, res: any) => {
    try {
        const response = await login(req.body)
        res.status(response.statusCode).json({...response})

    } catch (e: any) {
        console.log(e)
        res.status(e.statusCode).json({message: e.message})
    }
});

router.get('/product/all', async (req: any, res: any) => {
    try {
        const response = await getAllProduct();
        res.status(response.statusCode).json({data: response.data})
    } catch (e: any) {
        console.log(e)
        res.status(e.statusCode).json({message: e.message})
    }
})

router.get('/product/:productId', async (req: any, res: any) => {
    try {
        const response = await getProductById(req.params.productId);
        res.status(response.statusCode).json({data: response.data})
    } catch (e: any) {
        console.log(e)
        res.status(e.statusCode).json({message: e.message})
    }
})


// TODO: add JWT authentication for orders
router.post('/order', async (req: any, res: any) => {
    try {
        const response = await createOrUpdate(req.body)
        res.status(response.statusCode).json({message: response.message})
    } catch (e: any) {
        console.log(e)
        res.status(e.statusCode).json({message: e.message})
    }
});

router.patch('/order/complete/:userId', async (req: any, res: any) => {
    try {
        const response = await changeAllActiveOrdersToCompleted(req.params.userId)
        res.status(response.statusCode).json({message: response.message})
    } catch (e: any) {
        console.log(e)
        res.status(e.statusCode).json({message: e.message})
    }
});

router.get('/order/:orderId', async (req: any, res: any) => {
    try {
        const response = await getOrderById(req.params.orderId);
        res.status(response.statusCode).json({data: response.data})
    } catch (e: any) {
        console.log(e)
        res.status(e.statusCode).json({message: e.message})
    }
})

router.get('/order/all/user/:userId', async (req: any, res: any) => {
    try {
        const response = await getAllOrderByUserId(req.params.userId);
        res.status(response.statusCode).json({data: response.data})
    } catch (e: any) {
        console.log(e)
        res.status(e.statusCode).json({message: e.message})
    }
})

router.get('/order/user/:userId', async (req: any, res: any) => {
    try {
        const response = await getAllActiveOrder(req.params.userId);
        res.status(response.statusCode).json({data: response.data})
    } catch (e: any) {
        console.log(e)
        res.status(e.statusCode).json({message: e.message})
    }
})


module.exports = router;

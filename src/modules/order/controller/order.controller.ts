import {UpdateOrderDto} from "../dto/update_order.dto";
import {CreateOrderDto} from "../dto/create_order.dto";
const axios = require("axios");
const BadRequestError = require('../Errors/bad_request.error')
const NotFoundError = require('../Errors/not_found.error')
const Order = require('../model/order.model')
const User = require('../../user/model/user.model');
const DatabaseError = require("../../user/Errors/database.error");
const {OrderStatus} = require("../utils/enum/order_status.enum");
const CallApiError = require("../Errors/call_api.error")



async function getAllProduct(): Promise<any> {
    try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const data = response.data
        return {data: data, statusCode: 200};
    } catch (error) {
        console.error(error)
        return new CallApiError(error);
    }
}

async function getProductById(id: number): Promise<any> {
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        const data = response.data
        return {data: data, statusCode: 200};
    } catch (error) {
        console.error(error)
        return new CallApiError(error);
    }
}

async function createOrder(createOrderDto: CreateOrderDto): Promise<any> {
    try {
        const {productList, date, status, user} = createOrderDto;

        const foundedUser = await User.findById(user);
        if (!foundedUser) {
            return new NotFoundError('Invalid username or password')
        }

        let subTotal: number = 0;
        if (!productList) {
            return new BadRequestError('productList cannot be null');
        }
        for (const productListElement of productList) {
            let product = await getProductById(productListElement.id);
            if (!(product instanceof CallApiError)) {
                subTotal += product.data.price;
            }
        }
        let interest: number = subTotal * 0.15;
        let totalValue: number = subTotal + interest;

        const order = new Order({productList, subTotal, interest, totalValue, date, status, user});
        await order.save()

        return {message: 'Order added', statusCode: 201}
    } catch (error) {
        console.error(error);
        return new DatabaseError('Internal Server Error');
    }
}

async function getAllOrderByUserId(user: string): Promise<any> {
    try {
        const orders = await Order.find({user})
        return {data: orders[0], statusCode: 200}

    } catch (error) {
        console.error(error);
        return new DatabaseError('Internal Server Error');
    }
}

async function getAllActiveOrder(user: string): Promise<any> {
    try {
        const orders = await Order.find({user, status: OrderStatus.ACTIVE})
        return {data: orders[0], statusCode: 200}

    } catch (error) {
        console.error(error);
        return new DatabaseError('Internal Server Error');
    }
}



async function getOrderById(orderId: string): Promise<any> {
    try {
        const order = await Order.findById(orderId);
        return {data: order, statusCode: 200}
    } catch (error) {
        console.error(error);
        return new DatabaseError('Internal Server Error');
    }
}

async function changeAllActiveOrdersToCompleted(user) {
    try {
        // Find all active orders by the user
        const activeOrders = await Order.find({ user, status: OrderStatus.ACTIVE });

        // Update each active order to completed
        const updatePromises = activeOrders.map(async (order) => {
            order.status = OrderStatus.COMPLETED;
            return order.save();
        });

        // Wait for all the updates to complete
        await Promise.all(updatePromises);

        return { message: 'All active orders changed to completed', statusCode: 200 };
    } catch (error) {
        console.error(error);
        return { message: 'Internal Server Error', statusCode: 500 };
    }
}


async function updateOrder(updateOrderDto: UpdateOrderDto): Promise<any> {
    try {
        const {productList, orderId} = updateOrderDto;
        // if (status === OrderStatus.COMPLETED) {
        //     return {message: 'This Order is Completed, cannot updated', statusCode: 403}
        // }

        const order = await Order.findById(orderId);

        if (!order) {
            return new NotFoundError('order not found')
        }
        let subTotal: number = order.subTotal;
        productList.push(order.productList);

        for (const productListElement of productList) {
            let product = await getProductById(productListElement.id);
            subTotal += product.data.price;
        }
        let interest: number = subTotal * 0.15;
        let totalValue: number = subTotal + interest;

        const updateOrder = new Order({productList, subTotal, interest, totalValue});
        await order.updateOne({_id: orderId}, {updateOrder});

        return {message: 'Order updated', statusCode: 200}
    } catch (error) {
        console.error(error);
        return new DatabaseError('Internal Server Error');
    }
}


// async function updateOrder(updateOrderDto: UpdateOrderDto): Promise<any> {
//     try {
//         const {productList, orderId} = updateOrderDto;
//         // if (status === OrderStatus.COMPLETED) {
//         //     return {message: 'This Order is Completed, cannot updated', statusCode: 403}
//         // }
//
//         const order = await Order.findById(orderId);
//
//         if (!order) {
//             return new NotFoundError('order not found')
//         }
//         let subTotal: number = order.subTotal;
//
//         for (const productListElement of productList) {
//             let product = await getProductById(productListElement.id);
//
//             order.productList.push(product);
//             subTotal += product.data.price;
//         }
//         let interest: number = subTotal * 0.15;
//         let totalValue: number = subTotal + interest;
//
//         order.subTotal = subTotal;
//         order.interest = interest;
//         order.totalValue = totalValue;
//
//         await order.save();
//         return {message: 'Order updated', statusCode: 200}
//     } catch (error) {
//         console.error(error);
//         return new DatabaseError('Internal Server Error');
//     }
// }

async function createOrUpdate(createOrderDto: CreateOrderDto | UpdateOrderDto): Promise<any>  {
    const order = await getAllActiveOrder(createOrderDto.user);

    if (!order?.data) {
        return await createOrder(createOrderDto);
    }

    return await updateOrder(<UpdateOrderDto>createOrderDto);
}

module.exports = {
    getAllProduct,
    getOrderById,
    getAllActiveOrder,
    getAllOrderByUserId,
    updateOrder,
    getProductById,
    createOrUpdate,
    changeAllActiveOrdersToCompleted
}

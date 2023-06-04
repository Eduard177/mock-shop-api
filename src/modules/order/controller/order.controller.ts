import {UpdateOrderDto} from "../dto/update_order.dto";
import {CreateOrderDto} from "../dto/create_order.dto";

const axios = require("axios");
const BadRequestError = require('../Errors/bad_request.error')
const Order = require('../model/order.model')
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
        return {data: orders, statusCode: 200}

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

async function updateOrder(updateOrderDto: UpdateOrderDto): Promise<any> {
    try {
        const {productList, date, status, user, orderId} = updateOrderDto;
        if (status === OrderStatus.COMPLETED) {
            return {message: 'This Order is Completed, cannot updated', statusCode: 403}
        }
        let subTotal: number = 0;

        for (const productListElement of productList) {
            let product = await getProductById(productListElement.id);
            subTotal += product.data.price;
        }
        let interest: number = subTotal * 0.15;
        let totalValue: number = subTotal + interest;

        const order = await getOrderById(orderId);
        const updateOrder = new Order({productList, subTotal, interest, totalValue, date, status, user});
        await order.data.updateOne({_id: orderId}, {updateOrder});

        return {message: 'Order updated', statusCode: 200}
    } catch (error) {
        console.error(error);
        return new DatabaseError('Internal Server Error');
    }
}

module.exports = {
    getAllProduct,
    getOrderById,
    createOrder,
    getAllOrderByUserId,
    updateOrder,
    getProductById
}
const { Order, User, Product } = require('../models/');

const orderResolvers = {
    Order: {
        id: (order) => order._id.toString(),
        user: async (order) => {
            const user = await User.findById(order.user);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        },
        products: async (order) => {
            const productsWithDetails = await Promise.all(
                order.products.map(async (p) => {
                    const product = await Product.findById(p.product);
                    if (!product) {
                        throw new Error('Product not found');
                    }
                    return { ...product._doc, quantity: p.quantity };
                })
            );
            return productsWithDetails;
        },
        status: (order) => order.status,
    },
    Query: {
        async orders(_, __, { userId }) {
            // Verify that the user is authenticated
            if (!userId) {
                throw new Error('You must be logged in to view orders');
            }

            // Look up the user's orders
            const orders = await Order.find({ user: userId })
                .populate('user')
                .populate('products.product');

            return orders;
        },
    },
    Mutation: {
        async createOrder(_, { products }, { userId }) {
            // Verify that the user is authenticated
            if (!userId) {
                throw new Error('You must be logged in to create an order');
            }

            // Look up the user who placed the order
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('Invalid user ID');
            }

            // Verify that all products are valid
            const productIds = products.map(({ productId }) => productId);
            const validProducts = await Product.find({
                _id: { $in: productIds },
            });
            if (validProducts.length !== productIds.length) {
                throw new Error('Invalid product ID');
            }

            // Calculate the total cost of the order
            const total = validProducts.reduce(
                (acc, { price }, i) => acc + price * products[i].quantity,
                0
            );

            // Create the new order document
            const order = new Order({
                user: userId,
                products: products.map(({ productId, quantity }) => ({
                    product: productId,
                    quantity,
                })),
                total,
            });

            // Save the order and return it
            await order.save();
            return order;
        },
        updateOrderStatus: async (_, { orderId, status }, { user }) => {
            if (!user) {
                throw new AuthenticationError(
                    'You must be logged in to update the status of an order'
                );
            }
            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error('Order not found');
            }
            order.status = status;
            await order.save();
            return order;
        },
    },
};

module.exports = { orderResolvers };

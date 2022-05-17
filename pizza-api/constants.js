const URL_SITE = 'https://dnof5pb875.execute-api.us-east-1.amazonaws.com/latest';

const ROUTES = {
    index: "/",
    pizzas: "/pizzas",
    orders: "/orders",
    orderById: "/orders/{id}",
    delivery: "/delivery"
};

module.exports = {URL_SITE, ROUTES};
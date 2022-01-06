const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

    constructor() {
        this.products = [];
        this.generate();
    }

    generate() {
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
                block: faker.datatype.boolean()
            });
        }
    }

    create(data) {
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        };
        this.products.push(newProduct);
        return newProduct;
    };

    find() {
        return new Promise((resolve) =>{
            setTimeout(() => {
                resolve(this.products);
            }, 3000);
        })
    };

    findOne(id) {
        const product = this.products.find(item => item.id === id);
        if(!product){
            throw boom.notFound("Product Not Found");
        }
        if(product.block){
            throw boom.conflict("Product is Blocked");
        }
        return product;
    };

    update(id, changes) {
        const index = this.products.findIndex(item => item.id === id);
        if(index === -1){
            throw boom.notFound('Product Not Found');
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        }
        return this.products[index];
    };

    delete(id) {
        const index = this.products.findIndex(item => item.id === id);
        if(index === -1){
            throw boom.notFound('Product Not Found');
        }
        this.products.splice(index, 1);
        return ({message: true, id:id})
    };
}

module.exports = ProductsService;
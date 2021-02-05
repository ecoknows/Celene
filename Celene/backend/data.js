import bcrypt from 'bcryptjs';


const data = {
    users: [
        {
          name: 'mabuX',
          email: 'admin@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: true,
        },
        {
           //customer
          name: 'John',
          email: 'user@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: false,
        },
      ],
    products: [
        {
            name: 'Puff-Sleeve Round-Neck Blouse',
            category:['Shirts','Top','New'],
            countInStock: 0,
            brand:'Zara',
            rating:4.5,
            numReview:15,
            description: 'high quality product',
            img: '/Images/products/woman/product_1.png',
            price: 1300,
        },
        {
            name: 'Drawstring Frilled Lace Blouse',
            category:['Shirts','Top','New'],
            countInStock: 10,
            brand:'Zara',
            rating:4.5,
            numReview:15,
            description: 'high quality product',
            img: '/Images/products/woman/product_2.png',
            price: 1830,
        },
        {
            name: 'Frilled Layered-Collar Blouse',
            category:['Shirts','Top','New'],
            countInStock: 10,
            brand:'Zara',
            rating:4.5,
            numReview:15,
            description: 'high quality product',
            img: '/Images/products/woman/product_3.png',
            price: 3200,
        },
        {
            name: 'Colored Loose-Fit Knit Top',
            category:['Shirts','Top','New'],
            countInStock: 10,
            brand:'Zara',
            rating:4.5,
            numReview:15,
            description: 'high quality product',
            img: '/Images/products/woman/product_4.png',
            price: 1854.67,
        },
        {
            name: 'Brushed Fleece Lined T-Shirt',
            category:['Shirts','Top','New'],
            countInStock: 10,
            brand:'Zara',
            rating:4.5,
            numReview:15,
            description: 'high quality product',
            img: '/Images/products/woman/product_5.png',
            price: 1854.67,
        },
        {
            name: 'Ruffle Trim Long-Sleeve Blouse',
            category:['Shirts','Top','New'],
            countInStock: 10,
            brand:'Zara',
            rating:4.5,
            numReview:15,
            description: 'high quality product',
            img: '/Images/products/woman/product_6.png',
            price: 1050.59,
        },
        {
            name: 'Contrast Black Trim Long-Sleeve T-Shirt',
            category:['Shirts','Top','New'],
            countInStock: 10,
            brand:'Zara',
            rating:4.5,
            numReview:15,
            description: 'high quality product',
            img: '/Images/products/woman/product_7.png',
            price: 1050.59,
        },
    ]
}

export default data;
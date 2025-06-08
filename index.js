// index.js
import fetch from 'node-fetch';

const BASE_URL = 'https://fakestoreapi.com';

const [, , method, resource, ...params] = process.argv;

const run = async () => {
    try {
        if (method === 'GET') {
            if (resource === 'products' && params.length === 0) {
                // Obtener todos los productos
                const res = await fetch(`${BASE_URL}/products`);
                const data = await res.json();
                console.log(data);
            } else if (resource.startsWith('products/')) {
                const productId = resource.split('/')[1];
                const url = resource.split('/')[0];

                // Obtener un producto específico
                const res = await fetch(`${BASE_URL}/${url}/${productId}`);
                if (res.status == 200) {
                    const data = await res.json();
                    console.log(data);
                } 
            }
        }

        else if (method === 'POST' && resource === 'products') {
            const [title, price, category] = params;
            const res = await fetch(`${BASE_URL}/products`, {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    price: parseFloat(price),
                    category,
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            console.log(data);
        }

        else if (method === 'DELETE' && resource.startsWith('products/')) {
            const productId = resource.split('/')[1];
            const res = await fetch(`${BASE_URL}/products/${productId}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            console.log(data);
        }

        else {
            console.log('Comando no reconocido. Usa:');
            console.log('GET products');
            console.log('GET products/<id>');
            console.log('POST products <title> <price> <category>');
            console.log('DELETE products/<id>');
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
};

run();

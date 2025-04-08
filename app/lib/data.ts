const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAllProducts = async () => {
    try {
        const res = await fetch(`${API_URL}/products`);  

        if(!res.ok) throw new Error(`Failed to fetch products, ${res.status}`);

        const data = await res.json();
        return data.products;

    } catch (error) {
        console.error("Error fetching all products:", error);
        throw error;
    }
}

export const fetchProductById = async (id: number) => {
    try {
        const res = await fetch(`${API_URL}/products/${id}`);  

        if(!res.ok) throw new Error(`Failed to fetch product, ${res.status}`);

        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
}

export const fetchCart = async () => {
    try {
        const res = await fetch(`${API_URL}/carts?limit=1`);

        if(!res.ok) throw new Error(`Failed to fetch carts, ${res.status}`); 

        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Error fetching carts:", error);
        throw error;
    }
}



const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAllProducts = async (limit: number) => {
    try {
        const res = await fetch(`${API_URL}/products?limit=${limit}`);  
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

export const fetchProductByCategory = async (category: string) => {
    try {
        const res = await fetch(`${API_URL}/products/category/${category}`);
        if(!res.ok) throw new Error(`Failed to fetch product by category, ${res.status}`);
        const data = await res.json();
        return data.products;
    } catch (error) {
        console.error("Error fetching product by category:", error);
        throw error;
    }
}

export const fetchCategoryList = async () => {
    try {
        const res = await fetch(`${API_URL}/products/category-list`);
        if(!res.ok) throw new Error(`Failed to fetch category list, ${res.status}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching category list:", error);
        throw error;
    }
}

export const fetchProductsBySearch = async (search: string) => {
    try {
        const res = await fetch(`${API_URL}/products/search?q=${search}`);  
        if(!res.ok) throw new Error(`Failed to fetch category list, ${res.status}`);
        const data = await res.json();
        return data.products;
    } catch (error) {
        console.error("Error fetching product by search:", error);
        throw error;
    }
}

export const fetchUsersBySearch = async (search: string) => {
    try {
        const res = await fetch(`${API_URL}/users/search?q=${search}`);
        if(!res.ok) throw new Error(`Failed to fetch users by search, ${res.status}`);
        const data = await res.json();
        return data.users;
    } catch (error) {
        console.error("Error fetching users by search:", error);
        throw error;
    }
}

export const fetchUserById= async (id: number) => {
    try {
        const res = await fetch(`${API_URL}/users/${id}`);
        if(!res.ok) throw new Error(`Failed to fetch user, ${res.status}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

export const fetchUserCart = async (id: number) => {
    try {
        const res = await fetch(`${API_URL}/users/${id}/carts`);
        if(!res.ok) throw new Error(`Failed to fetch user carts, ${res.status}`);
        const data = await res.json();
        return data.carts;
    } catch (error) {
        console.error("Error fetching user cart:", error);
        throw error;
    }
}
const LIMIT = 9;

export const fetchProducts = async (start = 0) => {
  try {
    const res = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${start}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const fetchMultipleProductsByIds = async (ids = []) => {
  try {
    const productPromises = ids.map((id) =>
      fetch(`https://dummyjson.com/products/${id}`).then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch product with ID ${id}`);
        return res.json();
      })
    );

    return await Promise.all(productPromises);
  } catch (error) {
    console.error("Error fetching multiple products:", error);
    throw error;
  }
};
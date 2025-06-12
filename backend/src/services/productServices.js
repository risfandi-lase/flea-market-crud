import { query } from "../db.js";

export const getProducts = async () => {
  const { rows } = await query("SELECT * FROM products_table ORDER BY id DESC");
  return rows;
};

export const createProduct = async (productData) => {
  const { title, condition, price, image } = productData;
  const { rows } = await query(
    `INSERT INTO products_table (title, condition, price, image) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, condition, price, image]
  );

  return rows[0];
};
export const updateProduct = async (productId, productData) => {
  const { title, condition, price, image } = productData;
  const { rows } = await query(
    `UPDATE products_table SET title = $1, condition = $2, price = $3, image = $4 WHERE id = $5 RETURNING *`,
    [title, condition, price, image, productId]
  );

  return rows[0];
};

export const deleteProduct = async (productId) => {
  const { rowCount } = await query("DELETE FROM products_table WHERE id = $1", [
    productId,
  ]);

  return rowCount > 0;
};

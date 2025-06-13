import { sql } from "../db.js";

export const getProducts = async () => {
  const rows = await sql`SELECT * FROM products_table ORDER BY id DESC`;
  return rows;
};

export const createProduct = async (productData) => {
  const { title, condition, price, image } = productData;

  const rows = await sql`
    INSERT INTO products_table (title, condition, price, image)
    VALUES (${title}, ${condition}, ${price}, ${image})
    RETURNING *;
  `;

  return rows[0];
};
export const updateProduct = async (productId, productData) => {
  const { title, condition, price, image } = productData;

  const rows = await sql`
    UPDATE products_table
    SET
      title     = ${title},
      condition = ${condition},
      price     = ${price},
      image     = ${image}
    WHERE id = ${productId}
    RETURNING *;
  `;

  return rows[0];
};

export const deleteProduct = async (productId) => {
  const rows = await sql`
    DELETE FROM products_table
    WHERE id = ${productId}
    RETURNING *;
  `;

  return rows[0] ?? null;
};

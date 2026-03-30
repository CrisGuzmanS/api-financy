/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('holdings', (table) => {
        table.increments('id').primary();
        table.string('ticker');
        table.decimal('quantity');
        table.decimal('price_average');
        table.decimal('price_total');
        table.decimal('vix');
        table.decimal('sp500');
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  
};

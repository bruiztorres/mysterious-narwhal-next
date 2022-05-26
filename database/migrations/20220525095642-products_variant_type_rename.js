export async function up(db) {
  await db
    .collection('products')
    .find({ 'options.variants.type': { $exists: 1 } })
    .forEach((product) => {
      product.options.forEach((option) => {
        option.variants.forEach((variant) => {
          variant.kind = variant.type;
          delete variant.type;
        });
      });

      db.collection('products').replaceOne({ _id: product._id }, product);
    });
}

export async function down(db) {
  await db
    .collection('products')
    .find({ 'options.variants.kind': { $exists: 1 } })
    .forEach((product) => {
      product.options.forEach((option) => {
        option.variants.forEach((variant) => {
          variant.type = variant.kind;
          delete variant.kind;
        });
      });

      db.collection('products').replaceOne({ _id: product._id }, product);
    });
}

exports.seed = function(knex, Promise) {
  return knex('payment').del()
    .then(function () {
      return Promise.all([
        knex('payment').insert({user_id: 1, class_id: 1, price: 10.50}),
        knex('payment').insert({user_id: 2, class_id: 1, price: 10.50})
      ]);
    });
};

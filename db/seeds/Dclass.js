exports.seed = function(knex, Promise) {
  return knex('class').del()
    .then(function () {
      return Promise.all([
        knex('class').insert({teacher_id: 1,
                                 class_name: 'Moksha Flow 60',
                                 class_description: "Hot yoga at a fast pace",
                                 link: "www.link.com",
                                 start_time: "2017-02-25 20:20",
                                 end_time: "2017-02-25 21:20",
                                 price: 10.50,
                                 max_number_students: 5,
                                registered_number_students: 3
                                })
      ]);
    });
};

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id');
      table.string('first_name');
      table.string('last_name');
      table.string('username');
      table.string('email');
      table.string('password');
    }),
    knex.schema.createTable('teachers', function (table) {
      table.increments('id');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.string('avatar');
    }),
    knex.schema.createTable('resources', function (table) {
      table.increments('id');
      table.integer('teacher_id');
      table.foreign('teacher_id').references('teachers.id');
    }),
    knex.schema.createTable('class', function (table) {
      table.increments('id');
      table.integer('teacher_id');
      table.foreign('teacher_id').references('teachers.id');
      table.string('class_name');
      table.string('class_description');
      table.time('start_time');
      table.time('end_time');
      table.float('price', [2]);
      table.integer('max_number_students');
      table.integer('registered_number_students');
    }),
    knex.schema.createTable('payment', function (table) {
      table.increments('id');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.integer('teacher_id');
      table.foreign('teacher_id').references('teachers.id');
      table.float('amount', [2]);
      table.timestamps();
    }),
    knex.schema.createTable('class_user', function (table) {
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.integer('teacher_id');
      table.foreign('teacher_id').references('teachers.id');
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all ([
    knex.schema.dropTable('payment'),
    knex.schema.dropTable('class_user'),
    knex.schema.dropTable('resources'),
    knex.schema.dropTable('class'),
    knex.schema.dropTable('teachers'),
    knex.schema.dropTable('users')
  ])
};

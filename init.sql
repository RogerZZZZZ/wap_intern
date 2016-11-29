drop table IF EXISTS inventory;
drop table IF EXISTS stockhistory;
drop table IF EXISTS staff;
drop table IF EXISTS supplier;
drop table IF EXISTS billdetail;
drop table IF EXISTS bill;
drop table IF EXISTS command;
drop table IF EXISTS commandtype;
drop table IF EXISTS shelfstatus;
drop table IF EXISTS product;
drop table IF EXISTS supermarket;
drop table IF EXISTS producttype;

  CREATE TABLE IF NOT EXISTS supermarket (
      id              SERIAL PRIMARY KEY,
      address         TEXT
  );

  CREATE TABLE IF NOT EXISTS staff (
    id              SERIAL PRIMARY KEY,
    username        TEXT,
    password        TEXT,
    position_type   integer,
    supermarket_id  integer REFERENCES supermarket(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS producttype (
      id              SERIAL PRIMARY KEY,
      type_name       TEXT,
      position_id     integer
  );

  CREATE TABLE IF NOT EXISTS product (
      id                 SERIAL PRIMARY KEY,
      product_name       TEXT,
      sale_price         NUMERIC,
      cost_price         NUMERIC,
      type_id           integer REFERENCES producttype(id) ON DELETE CASCADE,
      supermarket_id    integer REFERENCES supermarket(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS shelfstatus (
      id              SERIAL PRIMARY KEY,
      position_id     integer,
      product_id      integer REFERENCES product(id) ON DELETE CASCADE,
      amount          integer,
      threshold       integer
  );

  CREATE TABLE IF NOT EXISTS supplier (
      id                 SERIAL PRIMARY KEY,
      supplier_name      TEXT,
      address            TEXT,
      phone              TEXT,
      email              TEXT
  );

  CREATE TABLE IF NOT EXISTS stockhistory (
      id                 SERIAL PRIMARY KEY,
      supplier_id      integer REFERENCES supplier(id) ON DELETE CASCADE,
      product_id         integer REFERENCES product(id) ON DELETE CASCADE,
      amount             integer
  );

  CREATE TABLE IF NOT EXISTS bill (
      id                 SERIAL PRIMARY KEY,
      supermarket_id     integer REFERENCES supermarket(id) ON DELETE CASCADE,
      create_date        TIMESTAMP default current_timestamp
    );

CREATE TABLE IF NOT EXISTS inventory (
  id                 SERIAL PRIMARY KEY,
  product_id         integer REFERENCES product(id) ON DELETE CASCADE,
  supplier_id        integer REFERENCES supplier(id) ON DELETE CASCADE,
  inventory_sum      integer,
  auto_stock         integer,
  threshold          integer,
  expired_date       DATE,
  type_id            integer REFERENCES producttype(id) ON DELETE CASCADE,
  supermarket_id     integer REFERENCES supermarket(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS billdetail (
    id                 SERIAL PRIMARY KEY,
    product_id         integer REFERENCES product(id) ON DELETE CASCADE,
    bill_id            integer REFERENCES bill(id) ON DELETE CASCADE,
    bill_amount        NUMERIC,
    cost_amount        NUMERIC,
    supermarket_id     integer REFERENCES supermarket(id) ON DELETE CASCADE,
    type_id            integer REFERENCES producttype(id) ON DELETE CASCADE,
    create_date        Date
);

CREATE TABLE IF NOT EXISTS commandtype (
    id       SERIAL PRIMARY KEY,
    name     TEXT
);

CREATE TABLE IF NOT EXISTS command (
    id                  SERIAL PRIMARY KEY,
    from_id             integer,
    to_id               integer,
    content             TEXT,
    type_id             integer REFERENCES commandtype(id) ON DELETE CASCADE,
    status              integer,
    product_id          integer REFERENCES product(id) ON DELETE CASCADE,
    create_date         TIMESTAMP default current_timestamp
);


INSERT INTO supermarket (address) VALUES
('HKUST'),
('bupt');

INSERT INTO producttype (type_name, position_id) VALUES
('Sea Products', 1),
('Drinks', 2),
('Instant Foods', 3),
('Electrics', 4),
('Clothes', 5),
('Commodity', 6),
('Bread', 7),
('Fruits', 8),
('Fresh Food', 9);

INSERT INTO commandtype (name) VALUES
('replace the ice'),
('not enough on the shelf'),
('do stock');



INSERT INTO bill (supermarket_id) VALUES
(2),
(2),
(2),
(2),
(2),
(2),
(2),
(2),
(2),
(2),
(2);

INSERT INTO product (product_name, sale_price, cost_price, supermarket_id, type_id) VALUES
('coke 2L', 10, 8, 2, 2),
('coke 300ml', 3, 2.5, 2, 2),
('iPhone', 5000, 4500, 2, 4),
('Mac air', 6000, 5000, 2, 4),
('Mac pro', 10000, 9250, 2, 4),
('iMac', 5999, 5499, 2, 4),
('samsung Note7', 5899, 5699, 2, 4),
('cafe', 24, 22.5, 2, 2),
('bread', 5, 4.3, 2, 7),
('pen', 2, 1.1, 2, 6),
('bottle', 15, 10.2, 2, 6),
('bag', 199, 178.9, 2, 5),
('paper', 18, 16.3, 2, 6),
('pants', 199, 132, 2, 5),
('jaket', 179, 130, 2, 5),
('apple', 5, 4, 2, 8),
('peach', 8, 6, 2, 8),
('earphone', 299, 278, 2, 4),
('toast', 10, 6, 2, 7),
('mouse', 149, 130.7, 2, 4),
('lobster', 20, 13, 2, 9),
('shrimp', 40, 33, 2, 9),
('fish', 14, 10, 2, 9);

INSERT INTO billdetail (product_id, bill_id, bill_amount, cost_amount, supermarket_id, type_id, create_date) VALUES
(1, 1, 10, 8, 2, 2, '2016-11-28'),
(3, 1, 5000, 4500, 2, 4, '2016-11-28'),
(5, 1, 10000, 9250, 2, 4, '2016-11-28'),
(7, 1, 5899, 5699, 2, 4, '2016-11-28'),
(9, 1, 5, 4.3, 2, 7, '2016-11-28'),
(11, 1, 15, 10.2, 2, 6, '2016-11-28'),
(13, 1, 18, 16.3, 2, 6, '2016-11-28'),
(15, 1, 179, 130, 2, 5, '2016-11-28'),
(17, 1, 8, 6, 2, 8, '2016-11-28'),
(19, 1, 10, 6, 2, 7, '2016-11-28'),

(1, 2, 10, 8, 2, 2, '2016-11-28'),
(2, 2, 3, 2.5, 2, 2, '2016-11-28'),
(5, 2, 10000, 9250, 2, 4, '2016-11-28'),
(6, 2, 5999, 5499, 2, 4, '2016-11-28'),
(7, 2, 5899, 5699, 2, 4, '2016-11-28'),
(12, 2, 199, 178.9, 2, 5, '2016-11-28'),
(13, 2, 18, 16.3, 2, 6, '2016-11-28'),
(14, 2, 199, 132, 2, 5, '2016-11-28'),
(19, 2, 10, 6, 2, 7, '2016-11-28'),
(20, 2, 149, 130.7, 2, 4, '2016-11-28'),

(5, 3, 10000, 9250, 2, 4, '2016-11-28'),
(7, 3, 5899, 5699, 2, 4, '2016-11-28'),
(8, 3, 24, 22.5, 2, 2, '2016-11-28'),
(9, 3, 5, 4.3, 2, 7, '2016-11-28'),
(14, 3, 199, 132, 2, 5, '2016-11-28'),
(16, 3, 5, 4, 2, 8, '2016-11-28'),
(18, 3, 299, 278, 2, 4, '2016-11-28'),
(20, 3, 149, 130.7, 2, 4, '2016-11-28'),

(1, 4, 10, 8, 2, 2, '2016-11-26'),
(2, 4, 3, 2.5, 2, 2, '2016-11-26'),
(8, 4, 24, 22.5, 2, 2, '2016-11-26'),
(9, 4, 5, 4.3, 2, 7, '2016-11-26'),
(10, 4, 2, 1.1, 2, 6, '2016-11-26'),
(16, 4, 5, 4, 2, 8, '2016-11-26'),
(17, 4, 8, 6, 2, 8, '2016-11-26'),
(18, 4, 299, 278, 2, 4, '2016-11-26'),
(20, 4, 149, 130.7, 2, 4, '2016-11-26'),

(1, 5, 10, 8, 2, 2, '2016-11-26'),
(7, 5, 5899, 5699, 2, 4, '2016-11-26'),
(10, 5, 2, 1.1, 2, 6, '2016-11-26'),
(12, 5, 199, 178.9, 2, 5, '2016-11-26'),
(14, 5, 199, 132, 2, 5, '2016-11-26'),
(15, 5, 179, 130, 2, 5, '2016-11-26'),
(19, 5, 10, 6, 2, 7, '2016-11-26'),
(20, 5, 149, 130.7, 2, 4, '2016-11-26'),

(3, 6, 5000, 4500, 2, 4, '2016-11-22'),
(5, 6, 10000, 9250, 2, 4, '2016-11-22'),
(6, 6, 5999, 5499, 2, 4, '2016-11-22'),
(8, 6, 24, 22.5, 2, 2, '2016-11-22'),
(9, 6, 5, 4.3, 2, 7, '2016-11-22'),
(10, 6, 2, 1.1, 2, 6, '2016-11-22'),
(19, 6, 10, 6, 2, 7, '2016-11-22'),

(1, 7, 10, 8, 2, 2, '2016-11-22'),
(5, 7, 10000, 9250, 2, 4, '2016-11-22'),
(8, 7, 24, 22.5, 2, 2, '2016-11-22'),
(10, 7, 2, 1.1, 2, 6, '2016-11-22'),
(11, 7, 15, 10.2, 2, 6, '2016-11-22'),
(14, 7, 199, 132, 2, 5, '2016-11-22'),
(16, 7, 5, 4, 2, 8, '2016-11-22'),
(18, 7, 299, 278, 2, 4, '2016-11-22'),

(1, 8, 10, 8, 2, 2, '2016-11-22'),
(5, 8, 10000, 9250, 2, 4, '2016-11-22'),
(7, 8, 5899, 5699, 2, 4, '2016-11-22'),
(10, 8, 2, 1.1, 2, 6, '2016-11-22'),
(15, 8, 179, 130, 2, 5, '2016-11-22'),
(17, 8, 8, 6, 2, 8, '2016-11-22'),
(20, 8, 149, 130.7, 2, 4, '2016-11-22'),

(1, 9, 10, 8, 2, 2, '2016-11-20'),
(2, 9, 3, 2.5, 2, 2, '2016-11-20'),
(4, 9, 6000, 5000, 2, 4, '2016-11-20'),
(6, 9, 5999, 5499, 2, 4, '2016-11-20'),
(8, 9, 24, 22.5, 2, 2, '2016-11-20'),
(10, 9, 2, 1.1, 2, 6, '2016-11-20'),
(13, 9, 18, 16.3, 2, 6, '2016-11-20'),
(15, 9, 179, 130, 2, 5, '2016-11-20'),
(17, 9, 8, 6, 2, 8, '2016-11-20'),
(18, 9, 299, 278, 2, 4, '2016-11-20'),
(20, 9, 149, 130.7, 2, 4, '2016-11-20'),

(1, 10, 10, 8, 2, 2, '2016-11-20'),
(2, 10, 3, 2.5, 2, 2, '2016-11-20'),
(8, 10, 24, 22.5, 2, 2, '2016-11-20'),
(9, 10, 5, 4.3, 2, 7, '2016-11-20'),
(10, 10, 2, 1.1, 2, 6, '2016-11-20'),
(11, 10, 15, 10.2, 2, 6, '2016-11-20'),
(13, 10, 18, 16.3, 2, 6, '2016-11-20'),

(2, 11, 3, 2.5, 2, 2, '2016-11-20'),
(10, 11, 2, 1.1, 2, 6, '2016-11-20'),
(11, 11, 15, 10.2, 2, 6, '2016-11-20'),
(16, 11, 5, 4, 2, 8, '2016-11-20'),
(17, 11, 8, 6, 2, 8, '2016-11-20'),
(19, 11, 10, 6, 2, 7, '2016-11-20');


INSERT INTO supplier (supplier_name, address, phone, email) VALUES
('walmart', 'Beijing Road', '123123123', 'roger199447@163.com'),
('super supplier', 'ShangHai Road', '234-996', 'roger199447@163.com'),
('apple supplier', 'XiAn Road', '475-658', 'roger199447@163.com');

INSERT INTO inventory (product_id, supplier_id, inventory_sum, supermarket_id, type_id, auto_stock, expired_date, threshold) VALUES
(1, 1, 25, 2, 2, 1, '2017-10-3', 10),
(2, 1, 25, 2, 2, 0, '2017-10-3', 10),
(3, 2, 123, 2, 4, 0, '2017-10-3', 10),
(4, 3, 87, 2, 4, 0, '2017-10-3', 10),
(5, 3, 876, 2, 4, 0, '2017-10-3', 10),
(6, 1, 67, 2, 4, 0, '2017-10-3', 10),
(7, 2, 10, 2, 4, 0, '2017-10-3', 10),
(8, 1, 13, 2, 2, 0, '2017-10-3', 20),
(9, 1, 200, 2, 7, 0, '2017-10-3', 10),
(10, 2, 343, 2, 6, 0, '2017-10-3', 10),
(11, 2, 65, 2, 6, 0, '2017-10-3', 10),
(12, 3, 123, 2, 5, 0, '2017-10-3', 10),
(13, 1, 43, 2, 6, 0, '2017-10-3', 10),
(14, 3, 654, 2, 5, 0, '2017-10-3', 10),
(15, 2, 343, 2, 5, 0, '2017-10-3', 10),
(16, 2, 65, 2, 8, 0, '2017-10-3', 10),
(17, 3, 123, 2, 8, 0, '2017-10-3', 10),
(18, 1, 43, 2, 4, 0, '2017-10-3', 10),
(19, 3, 654, 2, 7, 0, '2017-10-3', 10),
(20, 2, 98, 2, 4, 0, '2017-10-3', 10),
(21, 2, 20, 2, 4, 1, '2016-11-29', 10),
(22, 2, 40, 2, 4, 0, '2016-11-29', 50),
(23, 2, 35, 2, 4, 1, '2016-11-29', 10);

CREATE TABLE IF NOT EXISTS shelfstatus (
    id              SERIAL PRIMARY KEY,
    position_id     integer,
    product_id      integer REFERENCES product(id) ON DELETE CASCADE,
    amount          integer,
    threshold       integer
);

INSERT INTO shelfstatus (position_id, product_id, amount, threshold) VALUES
(2, 1, 10, 5),
(2, 2, 8, 4),
(4, 3, 12, 10),
(4, 4, 10, 5),
(4, 5, 8, 4),
(4, 6, 10, 5),
(4, 7, 8, 4),
(2, 8, 11, 10),
(7, 9, 10, 5),
(6, 10, 8, 4),
(6, 11, 10, 5),
(5, 12, 8, 4),
(6, 13, 8, 10),
(5, 14, 10, 5),
(5, 15, 8, 4),
(8, 16, 10, 5),
(8, 17, 8, 4),
(4, 18, 8, 4),
(7, 19, 10, 5),
(4, 20, 8, 4),
(9, 21, 10, 5),
(9, 22, 8, 4),
(9, 23, 8, 10);

INSERT INTO staff (username, password, position_type, supermarket_id) VALUES
('manager', '123456', 1, 2),
('salesman', '123456', 2, 2),
('stockman', '123456', 3, 2);

-- INSERT INTO command (from_id, to_id, content, type_id, status, product_id) VALUES
-- (1, 3, 'Replace the product', 3, 1, 21),
-- (0, 3, 'Expired date is comming', 3, 1, 22);
-- (0, 3, 'Product is not enough on the shelf', 1, 1, 23);

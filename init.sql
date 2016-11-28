drop table IF EXISTS enrollment;
drop table IF EXISTS course;
drop table IF EXISTS student;
drop table IF EXISTS teacher;
drop table IF EXISTS period;
drop table IF EXISTS inventory;
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


CREATE TABLE IF NOT EXISTS student (
    id              SERIAL PRIMARY KEY,
    first_name      TEXT,
    last_name       TEXT,
    address         TEXT,
    city            TEXT,
    state           TEXT,
    zip             TEXT,
    dob             DATE,
    phone           TEXT,
    mobile_phone    TEXT,
    email           TEXT,
    pic             TEXT,
    registration    TIMESTAMP default current_timestamp,
    last_update     TIMESTAMP default current_timestamp
  );

CREATE TABLE IF NOT EXISTS teacher (
    id              SERIAL PRIMARY KEY,
    first_name      TEXT,
    last_name       TEXT,
    address         TEXT,
    city            TEXT,
    state           TEXT,
    zip             TEXT,
    title           TEXT,
    phone           TEXT,
    mobile_phone    TEXT,
    email           TEXT,
    pic             TEXT
  );

CREATE TABLE IF NOT EXISTS period (
    id              SERIAL PRIMARY KEY,
    name            TEXT
  );

CREATE TABLE IF NOT EXISTS course (
    id              SERIAL PRIMARY KEY,
    code            TEXT,
    name            TEXT,
    credits         integer,
    period_id       integer REFERENCES period(id) ON DELETE CASCADE,
    teacher_id      integer REFERENCES teacher(id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS enrollment (
    id              SERIAL PRIMARY KEY,
    course_id       integer REFERENCES course(id) ON DELETE CASCADE,
    student_id      integer REFERENCES student(id) ON DELETE CASCADE
  );

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
    create_date        TIMESTAMP default current_timestamp
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

CREATE UNIQUE INDEX idx_enrollment ON enrollment (course_id, student_id);

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

INSERT INTO billdetail (product_id, bill_id, bill_amount, cost_amount, supermarket_id, type_id) VALUES
(1, 1, 10, 8, 2, 2),
(3, 1, 5000, 4500, 2, 4),
(5, 1, 10000, 9250, 2, 4),
(7, 1, 5899, 5699, 2, 4),
(9, 1, 5, 4.3, 2, 7),
(11, 1, 15, 10.2, 2, 6),
(13, 1, 18, 16.3, 2, 6),
(15, 1, 179, 130, 2, 5),
(17, 1, 8, 6, 2, 8),
(19, 1, 10, 6, 2, 7),

(1, 2, 10, 8, 2, 2),
(2, 2, 3, 2.5, 2, 2),
(5, 2, 10000, 9250, 2, 4),
(6, 2, 5999, 5499, 2, 4),
(7, 2, 5899, 5699, 2, 4),
(12, 2, 199, 178.9, 2, 5),
(13, 2, 18, 16.3, 2, 6),
(14, 2, 199, 132, 2, 5),
(19, 2, 10, 6, 2, 7),
(20, 2, 149, 130.7, 2, 4),

(5, 3, 10000, 9250, 2, 4),
(7, 3, 5899, 5699, 2, 4),
(8, 3, 24, 22.5, 2, 2),
(9, 3, 5, 4.3, 2, 7),
(14, 3, 199, 132, 2, 5),
(16, 3, 5, 4, 2, 8),
(18, 3, 299, 278, 2, 4),
(20, 3, 149, 130.7, 2, 4),

(1, 4, 10, 8, 2, 2),
(2, 4, 3, 2.5, 2, 2),
(8, 4, 24, 22.5, 2, 2),
(9, 4, 5, 4.3, 2, 7),
(10, 4, 2, 1.1, 2, 6),
(16, 4, 5, 4, 2, 8),
(17, 4, 8, 6, 2, 8),
(18, 4, 299, 278, 2, 4),
(20, 4, 149, 130.7, 2, 4),

(1, 5, 10, 8, 2, 2),
(7, 5, 5899, 5699, 2, 4),
(10, 5, 2, 1.1, 2, 6),
(12, 5, 199, 178.9, 2, 5),
(14, 5, 199, 132, 2, 5),
(15, 5, 179, 130, 2, 5),
(19, 5, 10, 6, 2, 7),
(20, 5, 149, 130.7, 2, 4),

(3, 6, 5000, 4500, 2, 4),
(5, 6, 10000, 9250, 2, 4),
(6, 6, 5999, 5499, 2, 4),
(8, 6, 24, 22.5, 2, 2),
(9, 6, 5, 4.3, 2, 7),
(10, 6, 2, 1.1, 2, 6),
(19, 6, 10, 6, 2, 7),

(1, 7, 10, 8, 2, 2),
(5, 7, 10000, 9250, 2, 4),
(8, 7, 24, 22.5, 2, 2),
(10, 7, 2, 1.1, 2, 6),
(11, 7, 15, 10.2, 2, 6),
(14, 7, 199, 132, 2, 5),
(16, 7, 5, 4, 2, 8),
(18, 7, 299, 278, 2, 4),

(1, 8, 10, 8, 2, 2),
(5, 8, 10000, 9250, 2, 4),
(7, 8, 5899, 5699, 2, 4),
(10, 8, 2, 1.1, 2, 6),
(15, 8, 179, 130, 2, 5),
(17, 8, 8, 6, 2, 8),
(20, 8, 149, 130.7, 2, 4),

(1, 9, 10, 8, 2, 2),
(2, 9, 3, 2.5, 2, 2),
(4, 9, 6000, 5000, 2, 4),
(6, 9, 5999, 5499, 2, 4),
(8, 9, 24, 22.5, 2, 2),
(10, 9, 2, 1.1, 2, 6),
(13, 9, 18, 16.3, 2, 6),
(15, 9, 179, 130, 2, 5),
(17, 9, 8, 6, 2, 8),
(18, 9, 299, 278, 2, 4),
(20, 9, 149, 130.7, 2, 4),

(1, 10, 10, 8, 2, 2),
(2, 10, 3, 2.5, 2, 2),
(8, 10, 24, 22.5, 2, 2),
(9, 10, 5, 4.3, 2, 7),
(10, 10, 2, 1.1, 2, 6),
(11, 10, 15, 10.2, 2, 6),
(13, 10, 18, 16.3, 2, 6),

(2, 11, 3, 2.5, 2, 2),
(10, 11, 2, 1.1, 2, 6),
(11, 11, 15, 10.2, 2, 6),
(16, 11, 5, 4, 2, 8),
(17, 11, 8, 6, 2, 8),
(19, 11, 10, 6, 2, 7);


INSERT INTO supplier (supplier_name, address, phone, email) VALUES
('walmart', 'Beijing Road', '123123123', '123@gmail.com'),
('super supplier', 'ShangHai Road', '234-996', '234@gmail.com'),
('apple supplier', 'XiAn Road', '475-658', '367@gmail.com');

INSERT INTO inventory (product_id, supplier_id, inventory_sum, supermarket_id, type_id, auto_stock, expired_date) VALUES
(1, 1, 538, 2, 2, 0, '2017-10-3'),
(2, 1, 99, 2, 2, 0, '2017-10-3'),
(3, 2, 123, 2, 4, 0, '2017-10-3'),
(4, 3, 87, 2, 4, 0, '2017-10-3'),
(5, 3, 876, 2, 4, 0, '2017-10-3'),
(6, 1, 67, 2, 4, 0, '2017-10-3'),
(7, 2, 10, 2, 4, 0, '2017-10-3'),
(8, 1, 13, 2, 2, 0, '2017-10-3'),
(9, 1, 200, 2, 7, 0, '2017-10-3'),
(10, 2, 343, 2, 6, 0, '2017-10-3'),
(11, 2, 65, 2, 6, 0, '2017-10-3'),
(12, 3, 123, 2, 5, 0, '2017-10-3'),
(13, 1, 43, 2, 6, 0, '2017-10-3'),
(14, 3, 654, 2, 5, 0, '2017-10-3'),
(15, 2, 343, 2, 5, 0, '2017-10-3'),
(16, 2, 65, 2, 8, 0, '2017-10-3'),
(17, 3, 123, 2, 8, 0, '2017-10-3'),
(18, 1, 43, 2, 4, 0, '2017-10-3'),
(19, 3, 654, 2, 7, 0, '2017-10-3'),
(20, 2, 98, 2, 4, 0, '2017-10-3'),
(21, 2, 20, 2, 4, 1, '2016-11-27'),
(22, 2, 40, 2, 4, 0, '2016-11-27'),
(23, 2, 35, 2, 4, 1, '2016-11-27');

CREATE TABLE IF NOT EXISTS shelfstatus (
    id              SERIAL PRIMARY KEY,
    position_id     integer,
    product_id      integer REFERENCES product(id) ON DELETE CASCADE,
    amount          integer,
    threshold       integer
);

INSERT INTO shelfstatus (position_id, product_id, amount, threshold) VALUES
(9, 21, 10, 5),
(9, 22, 8, 4),
(9, 23, 8, 10);

INSERT INTO staff (username, password, position_type, supermarket_id) VALUES
('manager', '123456', 1, 2),
('salesman', '123456', 2, 2),
('stockman', '123456', 3, 2);

INSERT INTO period (name) VALUES
('Fall 2014'),
('Spring 2015'),
('Fall 2015'),
('Spring 2016');

INSERT INTO command (from_id, to_id, content, type_id, status, product_id) VALUES
(1, 3, 'Replace the product', 3, 1, 21),
(0, 3, 'Expired date is comming', 2, 1, 22),
(0, 3, 'Product is not enough on the shelf', 1, 1, 23);

INSERT INTO student (first_name, last_name, address, city, state, zip, dob, phone, mobile_phone, email, pic, registration) VALUES
('Camila', 'Martinez', '18 Henry st', 'Cambridge', 'MA', '01742', '1995/09/07', '617-985-6955', '617-666-5555', 'cmartinez@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/camila_martinez.jpg', '2012/07/14'),
('Cassandra', 'Bowman', '56 Broad st', 'San Francisco', 'CA', '01742', '1994/12/08', '781-458-8541', '617-987-6543', 'cbowman@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/cassandra_bowman.jpg', '2012/07/14'),
('Catherine', 'Hansen', '52 Elm st', 'Boston', 'MA', '01742', '1993/01/02', '404-986-356', '857-584-654', 'chansen@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/catherine_hansen.jpg', '2012/07/14'),
('Cindy', 'Curtis', '101 Massachusetts Avenue', 'Seattle', 'WA', '01742', '1995/02/27', '212-854-6354', '212-963-8521', 'ccurtis@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/cindy_curtis.jpg', '2012/07/14'),
('Claire', 'Chapman', '3 Oak st', 'Chicago', 'IL', '01742', '1996/03/24', '508-987-6541', '508-852-3222', 'cchapman@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/claire_chapman.jpg', '2012/07/14'),
('Claudia', 'Leonard', '56 Chestnut st', 'Burlington', 'VT', '01742', '1992/04/18', '415-985-9632', '415-987-6655', 'cleonard@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/claudia_leonard.jpg', '2012/07/14'),
('Diego', 'Costa', '24 Belmont st', 'Houston', 'TX', '01742', '1993/05/20', '521-988-2255', '521-886-6688', 'dcosta@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/diego_costa.jpg', '2012/07/14'),
('Elsa', 'Olson', '85 Boylston st', 'Fort Lauderdale', 'FL', '01742', '1995/06/01', '234-996-7412', '234-852-9632', 'eolson@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/elsa_olson.jpg', '2012/07/14'),
('Finn', 'Cunningham', '47 Main st', 'Tampa', 'FL', '01742', '1996/07/24', '643-258-8521', '643-965-6322', 'fcunningham@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/finn_cunningham.jpg', '2012/07/14'),
('Greg', 'Matthews', '18 Nevada st', 'Denver', 'CO', '01742', '1995/08/11', '412-985-2241', '412-963-8547', 'gmatthews@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/greg_matthews.jpg', '2012/07/14'),
('Hector', 'Reyes', '147 California st', 'Providence', 'RI', '01742', '1994/09/29', '507-854-9632', '507-525-6363', 'hreyes@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/hector_reyes.jpg', '2012/07/14'),
('James', 'Alexander', '28 Trapelo Road st', 'Hartford', 'CT', '01742', '1993/10/21', '593-968-7468', '593-691-3791', 'jalexander@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/james_alexander.jpg', '2012/07/14'),
('Jens', 'Henderson', '123 Washington st', 'Los Angeles', 'CA', '01742', '1992/11/03', '603-873-9562', '603-253-6548', 'jhenderson@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/jens_henderson.jpg', '2012/07/14'),
('John', 'Bailey', '85 Concord Ave', 'San Diego', 'CA', '01742', '1993/12/31', '752-961-1212', '752-623-6741', 'jbailey@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/john_bailey.jpg', '2012/07/14'),
('Jonathan', 'Rogers', '85 Boylston st', 'Detroit', 'MI', '01742', '1992/01/02', '803-256-9617', '803-625-5544', 'jrogers@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/jonathan_rogers.jpg', '2012/07/14'),
('Justin', 'Scott', '458 Federal st', 'Columbus', 'OH', '01742', '1993/02/04', '241-854-3591', '241-632-8246', 'jscott@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/justin_scott.jpg', '2012/07/14'),
('Linda', 'Lewis', '145 Gloucester st', 'Endicott', 'NY', '01742', '1994/03/15', '331-658-3254', '331-586-9637', 'llewis@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/linda_lewis.jpg', '2012/07/14'),
('Lori', 'Anderson', '523 Arlington st', 'Atlanta', 'GA', '01742', '1995/04/22', '498-683-1754', '498-685-6322', 'landerson@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/lori_anderson.jpg', '2012/07/14'),
('Luisa', 'Vasquez', '28 Clarendon st', 'New Orleans', 'LA', '01742', '1996/05/14', '578-963-5214', '578-641-8799', 'lvasquez@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/luisa_vasquez.jpg', '2012/07/14'),
('Lynn', 'Martin', '78 Exeter st', 'Madison', 'WI', '01742', '1992/06/20', '603-963-8855', '603-256-8741', 'lmartin@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/lynn_martin.jpg', '2012/07/14'),
('Mark', 'Davis', '54 Fairfield st', 'Boston', 'MA', '01742', '1993/07/18', '752-634-8799', '752-967-2511', 'mdavis@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/mark_davis.jpg', '2012/07/14'),
('Peter', 'Jacobson', '47 Market st', 'Des Moines', 'IA', '01742', '1994/08/23', '821-635-4411', '821-635-5741', 'pjacobson@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/peter_jacobson.jpg', '2012/07/14'),
('Phil', 'Harris', '125 Davis st', 'Boston', 'MA', '01742', '1995/09/01', '285-325-6431', '285-635-5877', 'pharris@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/phil_harris.jpg', '2012/07/14'),
('Rebecca', 'Gutierrez', '85 Walnut st', 'Portland', 'OR', '01742', '1996/10/10', '352-658-9741', '352-981-8462', 'rgutierrez@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/rebecca_gutierrez.jpg', '2012/07/14'),
('Robert', 'Wilson', '145 Lexington st', 'Newark', 'NJ', '01742', '1992/11/24', '475-658-9988', '475-958-6714', 'rwilson@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/robert_wilson.jpg', '2012/07/14'),
('Sophie', 'Miller', '21 Webster st', 'Las Vegas', 'NV', '01742', '1993/12/08', '518-983-5473', '518-472-3255', 'smiller@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/sophie_miller.jpg', '2012/07/14'),
('Tammy', 'Robinson', '56 Summer st', 'Boston', 'MA', '01742', '1994/01/16', '678-256-3796', '678-354-2282', 'ogreen@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/tammy_robinson.jpg', '2012/07/14'),
('Valerie', 'Johnston', '24 Powels st', 'Cambridge', 'MA', '01742', '1995/02/19', '708-654-3214', '708-685-3522', 'vjohnston@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/valerie_johnston.jpg', '2012/07/14');

INSERT INTO teacher (first_name, last_name, address, city, state, zip, title, phone, mobile_phone, email, pic) VALUES
('Tanya', 'Sharma', '18 Henry st', 'Cambridge', 'MA', '01742', 'PHD', '617-985-6955', '617-666-5555', 'tsharma@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/tanya_sharma.jpg'),
('Miriam', 'Aupont', '56 Broad st', 'Cambridge', 'MA', '01742', 'PHD', '617-123-4567', '617-987-6543', 'maupont@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/miriam_aupont.jpg'),
('Jonathan', 'Bradley', '52 Elm st', 'Boston', 'MA', '01742', 'PHD', '617-123-4567', '617-987-6543', 'jbradley@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/jonathan_bradley.jpg'),
('Anup', 'Gupta', '101 Massachusetts Avenue', 'Boston', 'MA', '01742', 'PHD', '617-123-4567', '617-987-6543', 'agupta@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/anup_gupta.jpg'),
('Kenneth', 'Sato', '3 Oak st', 'Boston', 'MA', '01742', 'PHD', '617-123-4567', '617-987-6543', 'ksato@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/kenneth_sato.jpg'),
('James', 'Kennedy', '56 Chestnut st', 'Boston', 'MA', '01742', 'PHD', '617-123-4567', '617-987-6543', 'jkennedy@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/james_kennedy.jpg'),
('Amy', 'Taylor', '24 Belmont st', 'Boston', 'MA', '01742', 'PHD', '617-123-4567', '617-987-6543', 'ataylor@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/amy_taylor.jpg'),
('Olivia', 'Green', '85 Boylston st', 'Boston', 'MA', '01742', 'PHD', '617-123-4567', '617-987-6543', 'ogreen@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/olivia_green.jpg'),
('Michael', 'Jones', '184 Gloucester st', 'Cambridge', 'MA', '01742', 'PHD', '617-985-6955', '617-666-5555', 'mjones@fakemail.com', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/michael_jones.jpg');

INSERT INTO course (code, name, teacher_id, period_id, credits) VALUES
('CS101', 'Introduction to Computing', 1, 1, 4),
('CS101', 'Introduction to Computing', 1, 2, 4),
('CS101', 'Introduction to Computing', 2, 3, 4),
('CS101', 'Introduction to Computing', 2, 4, 4),
('CS103', 'Introduction to Internet Technologies and Web Programming', 3, 3, 4),
('CS103', 'Introduction to Internet Technologies and Web Programming', 3, 4, 4),
('CS105', 'Introduction to Databases and Data Mining', 4, 1, 4),
('CS105', 'Introduction to Databases and Data Mining', 4, 2, 4),
('CS118', 'Introduction to React', 6, 1, 4),
('CS118', 'Introduction to React', 6, 2, 4),
('CS118', 'Introduction to React', 6, 3, 4),
('CS118', 'Introduction to React', 6, 4, 4),
('CS119', 'Introduction to Lightning Design System', 7, 1, 4),
('CS119', 'Introduction to Lightning Design System', 7, 2, 4),
('CS119', 'Introduction to Lightning Design System', 7, 3, 4),
('CS119', 'Introduction to Lightning Design System', 7, 4, 4),
('CS125', 'Introduction to Flux', 8, 3, 4),
('CS125', 'Introduction to Flux', 8, 4, 4),
('CS120', 'Introduction to Cloud Computing', 9, 1, 4),
('CS120', 'Introduction to Cloud Computing', 9, 2, 4),
('CS120', 'Introduction to Cloud Computing', 9, 3, 4),
('CS120', 'Introduction to Cloud Computing', 9, 4, 4),
('CS121', 'Introduction to Salesforce', 1, 1, 4),
('CS121', 'Introduction to Salesforce', 1, 2, 4);

INSERT INTO enrollment (student_id, course_id) VALUES
(1,1),
(1,5),
(1,9),
(1,13),
(1,17),
(1,21),
(2,2),
(2,6),
(2,10),
(2,14),
(2,18),
(2,22),
(3,3),
(3,7),
(3,11),
(3,15),
(3,19),
(3,23),
(4,4),
(4,8),
(4,12),
(4,16),
(4,20),
(5,24),
(5,1),
(5,5),
(5,9),
(5,13),
(5,17),
(5,21),
(6,2),
(6,6),
(6,10),
(6,14),
(6,18),
(6,22),
(7,3),
(7,7),
(7,11),
(7,15),
(7,19),
(7,23),
(8,4),
(8,8),
(8,12),
(8,16),
(8,20),
(8,24),
(9,24),
(9,1),
(9,5),
(9,9),
(9,13),
(9,17),
(9,21),
(10,2),
(10,6),
(10,10),
(10,14),
(10,18),
(10,22),
(11,3),
(11,7),
(11,11),
(11,15),
(11,19),
(11,23),
(12,4),
(12,8),
(12,12),
(12,16),
(12,20),
(12,24),
(13,1),
(13,5),
(13,9),
(13,13),
(13,17),
(13,21),
(14,2),
(14,6),
(14,10),
(14,14),
(14,18),
(14,22),
(15,3),
(15,7),
(15,11),
(15,15),
(15,19),
(15,23),
(16,4),
(16,8),
(16,12),
(16,16),
(17,20),
(17,24),
(17,1),
(17,5),
(17,9),
(17,13),
(17,17),
(17,21),
(18,2),
(18,6),
(18,10),
(18,14),
(18,18),
(18,22),
(19,3),
(19,7),
(19,11),
(19,15),
(19,19),
(19,23),
(20,4),
(20,8),
(20,12),
(20,16),
(20,20),
(20,24),
(21,24),
(21,1),
(21,5),
(21,9),
(21,13),
(21,17),
(21,21),
(22,2),
(22,6),
(22,10),
(22,14),
(22,18),
(22,22),
(23,3),
(23,7),
(23,11),
(23,15),
(23,19),
(23,23),
(24,4),
(24,8),
(24,12),
(24,16),
(24,20),
(24,24);

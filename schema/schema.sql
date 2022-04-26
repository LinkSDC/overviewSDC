DROP DATABASE products;
CREATE DATABASE products;
\c products;

/* PRODUCT */
CREATE TABLE IF NOT EXISTS product (
 id            SERIAL PRIMARY KEY UNIQUE NOT NULL,
 product_id    int UNIQUE NOT NULL,
 name          varchar(50) NOT NULL,
 slogan        text NOT NULL,
 description   text NOT NULL,
 category      varchar(50) NOT NULL,
 default_price int NOT NULL
);

COPY product(product_id, name, slogan, description, category, default_price)
FROM '/Users/andreworodenker/desktop/repos/SDC/csv/product.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX idx_prod_product_id_hash ON product (product_id);

/* RELATED */
CREATE TABLE IF NOT EXISTS related (
 id          SERIAL PRIMARY KEY UNIQUE NOT NULL,
 product_id  int NOT NULL,
 related_id  int NOT NULL,
 FOREIGN KEY ( product_id ) REFERENCES product ( product_id )
);

COPY related(id, product_id, related_id)
FROM '/Users/andreworodenker/desktop/repos/SDC/csv/related.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX idx_product_id_hash ON related (product_id);

/* STYLES */
CREATE TABLE IF NOT EXISTS styles (
 id             SERIAL PRIMARY KEY UNIQUE NOT NULL,
 product_id     int NOT NULL,
 style_name     varchar(50) NOT NULL,
 sale_price     varchar(20),
 original_price int NOT NULL,
 default_style  int NOT NULL,
 FOREIGN KEY ( product_id ) REFERENCES product ( product_id )
);

COPY styles(id, product_id, style_name, sale_price, original_price, default_style)
FROM '/Users/andreworodenker/desktop/repos/SDC/csv/styles.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX idx_styles_product_id_hash ON styles (product_id);

/* FEATURES */
CREATE TABLE IF NOT EXISTS features (
 id         SERIAL PRIMARY KEY UNIQUE NOT NULL,
 product_id int NOT NULL,
 feature    varchar(50) NOT NULL,
 value      varchar(50),
 FOREIGN KEY ( product_id ) REFERENCES product ( product_id )
);

COPY features(id, product_id, feature, feat_val)
FROM '/Users/andreworodenker/desktop/repos/SDC/csv/features.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX idx_features_product_id_hash ON features (product_id);

/* PHOTOS */
CREATE TABLE IF NOT EXISTS photos (
 id             SERIAL PRIMARY KEY UNIQUE NOT NULL,
 style_id       int NOT NULL,
 url            text NOT NULL,
 thumbnail_url  text NOT NULL,
 FOREIGN KEY ( style_id ) REFERENCES styles ( id )
);

COPY photos(id, style_id, url, thumbnail_url)
FROM '/Users/andreworodenker/desktop/repos/SDC/csv/photos.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX idx_photos_product_id_hash ON photos (style_id);

/* INVENTORY */
CREATE TABLE IF NOT EXISTS inventory (
 id         SERIAL PRIMARY KEY UNIQUE NOT NULL,
 style_id   int NOT NULL,
 inv_size   varchar(15) NOT NULL,
 quantity   varchar(50) NOT NULL,
 FOREIGN KEY ( style_id ) REFERENCES styles ( id )
);

COPY inventory(id, style_id, inv_size, quantity)
FROM '/Users/andreworodenker/desktop/repos/SDC/csv/skus.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX idx_inventory_product_id_hash ON inventory (style_id);
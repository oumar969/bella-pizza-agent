-- Ryd eksisterende data
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS menu_items;

-- Menu items tabel
CREATE TABLE menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  number INTEGER,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(8, 2) NOT NULL,
  price_large NUMERIC(8, 2),
  category TEXT NOT NULL,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Orders tabel
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  total NUMERIC(8, 2) NOT NULL,
  status TEXT DEFAULT 'afventer',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================
-- PIZZA
-- ==============================
INSERT INTO menu_items (number, name, description, price, price_large, category) VALUES
(1,  'Margherita',        'Tomatsauce, ost',                                                           65, 75,  'pizza'),
(3,  'Quattro',           'Tomatsauce, ost, cheddar',                                                  75, 85,  'pizza'),
(6,  'Picante',           'Tomatsauce, ost, skinke, bacon, oksekød, løg',                              80, 95,  'pizza'),
(7,  'Pepperoni',         'Tomatsauce, ost, pepperoni, løg, kebabsauce',                               80, 95,  'pizza'),
(8,  'Parma',             'Tomatsauce, ost, parmaskinke, ruccola, parmesan',                           85, 100, 'pizza'),
(9,  'Hawaii',            'Tomatsauce, ost, skinke, ananas',                                           75, 85,  'pizza'),
(10, 'Capricciosa',       'Tomatsauce, ost, skinke, champignon, ananas',                               75, 85,  'pizza'),
(11, 'Kylling',           'Tomatsauce, ost, kylling, champignon',                                      80, 95,  'pizza'),
(12, 'Diavola',           'Tomatsauce, ost, stærk pølse, chili',                                       80, 95,  'pizza'),
(13, 'Rustica',           'Tomatsauce, ost, kebab, løg, peberfrugter',                                 80, 95,  'pizza'),
(14, 'Tonno',             'Tomatsauce, ost, tun, løg, kappers',                                        80, 95,  'pizza'),
(15, 'Bøf Pizza',         'Tomatsauce, ost, kebab, løg, bacon, rød peber',                             85, 100, 'pizza'),
(16, 'Italiana',          'Tomatsauce, ost, kebab, champignon, løg, artiskok',                         85, 100, 'pizza'),
(17, 'La Pelle',          'Tomatsauce, ost, kebab, pepperoni, gorgonzola, artiskok, løg',              90, 110, 'pizza'),
(18, 'Raggiani',          'Tomatsauce, ost, skinke, bacon, champignon, log',                           85, 100, 'pizza'),
(19, 'Savøy',             'Tomatsauce, ost, champignon, løg, peber, flødesauce',                       80, 95,  'pizza'),
(20, 'Vegetariana',       'Tomatsauce, ost, champignon, peberfrugter, artiskok, oliven, løg',          80, 95,  'pizza');

-- ==============================
-- SPICY PIZZA
-- ==============================
INSERT INTO menu_items (number, name, description, price, price_large, category) VALUES
(31, 'Spicy 1',           'Tomatsauce, ost, kebab, pepperoni, frisk chili, peber, jalapeños',          75, 90, 'spicy_pizza'),
(32, 'Spicy 2',           'Chili i tomatsauce, ost, kylling, peberfrugter',                            75, 90, 'spicy_pizza'),
(33, 'Spicy 3',           'Tomatsauce, ost, stærk kebab, jalapeños, løg, chili',                       80, 95, 'spicy_pizza');

-- ==============================
-- BØRNE PIZZA
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(21, 'Børne Ost',         'Tomatsauce, ost',                                                           45, 'børne_pizza'),
(24, 'Børne Kylling',     'Tomatsauce, ost, kylling',                                                  50, 'børne_pizza'),
(26, 'Børne Kebab',       'Tomatsauce, ost, kebab, champignon',                                        50, 'børne_pizza');

-- ==============================
-- DEEP PAN
-- ==============================
INSERT INTO menu_items (number, name, description, price, price_large, category) VALUES
(34, 'Deep Pan Capricciosa', 'Tomatsauce, ost, skinke, champignon, ananas',                            85, 100, 'deep_pan'),
(35, 'Deep Pan Kylling',     'Tomatsauce, ost, kylling, champignon, peber',                            85, 100, 'deep_pan'),
(36, 'Deep Pan Kebab',       'Tomatsauce, ost, kebab, pepperoni, løg',                                 90, 110, 'deep_pan'),
(37, 'Deep Pan Bøf',         'Tomatsauce, ost, oksekød, peber, bearnaisesauce, bacon',                 95, 115, 'deep_pan');

-- ==============================
-- PASTA
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(40, 'Spaghetti Bolognese',   'Spaghetti med klassisk kødsauce',                                       85, 'pasta'),
(41, 'Spaghetti Skinke',      'Spaghetti med skinke og flødesauce',                                    85, 'pasta'),
(42, 'Fettuccine al Pollo',   'Fettuccine med kylling, broccoli og karrysauce',                        90, 'pasta'),
(43, 'Penne della Casa',      'Penne med oliven, bacon og flødesauce',                                 90, 'pasta'),
(44, 'Penne Arrabbiata',      'Penne med tomatsauce og frisk chili',                                   85, 'pasta'),
(45, 'Spaghetti Carbonara',   'Spaghetti med bacon og flødesauce',                                     90, 'pasta'),
(46, 'Spaghetti alle Italiane','Bolognese med oksekød, pesto, frisk peber',                            90, 'pasta'),
(47, 'Penne alla Romana',     'Penne pasta med bacon og flødesauce',                                   90, 'pasta'),
(48, 'Penne Gorgonzola',      'Penne pasta med skinke og gorgonzolasauce',                             90, 'pasta'),
(49, 'Penne Rigati',          'Pasta med champignon, chili, tomat og flødesauce',                      90, 'pasta'),
(50, 'Lasagne',               'Bolognese med oksekød, bechamel og tomatsauce',                         90, 'pasta');

-- ==============================
-- INDBAGT / CALZONE
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(51, 'Calzone 1',         'Tomatsauce, ost, skinke, champignon, ananas',                               80, 'indbagt'),
(52, 'Calzone 2',         'Tomatsauce, ost, skinke, champignon, peber, bearnaisesauce',                85, 'indbagt'),
(53, 'Calzone 3',         'Tomatsauce, ost, kylling, champignon, peber, flødesauce',                   85, 'indbagt'),
(54, 'Calzone 4',         'Tomatsauce, ost, kebab, pepperoni, løg, jalapeños',                         90, 'indbagt');

-- ==============================
-- UFO
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(55, 'UFO 1',             'Tomatsauce, ost, kebab, pepperoni, bacon, løg',                             90, 'ufo'),
(56, 'UFO 2',             'Tomatsauce, ost, kylling, champignon, peber',                               90, 'ufo'),
(57, 'UFO 3',             'Tomatsauce, ost, oksekød, løg, champignon, ananas',                         90, 'ufo'),
(58, 'UFO 4',             'Tomatsauce, ost, kebab, løg, champignon, ananas',                           90, 'ufo');

-- ==============================
-- PIZZA SANDWICH
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(59, 'Kebab Sandwich',    'Ost, kebab, løg, salat, dressing',                                          70, 'pizza_sandwich'),
(60, 'Kylling Sandwich',  'Ost, kylling, champignon, salat, dressing',                                 70, 'pizza_sandwich'),
(61, 'Skinkesandwich',    'Ost, skinke, champignon, salat, dressing',                                  70, 'pizza_sandwich'),
(62, 'Mix Sandwich',      'Ost, kebab, kylling, løg, salat, dressing',                                 75, 'pizza_sandwich');

-- ==============================
-- TILBEHØR
-- ==============================
INSERT INTO menu_items (name, description, price, category) VALUES
('Hvidløgsbrød',          'Ristet brød med hvidløgssmør og persille',                                  39, 'tilbehør'),
('Cæsarsalat',            'Romaine, croutoner, parmesan, cæsardressing',                               65, 'tilbehør'),
('Pommes Frites',         'Sprøde pommes frites med dip',                                              35, 'tilbehør'),
('Coleslaw',              'Hjemmelavet coleslaw',                                                      25, 'tilbehør');

-- ==============================
-- DRIKKEVARER
-- ==============================
INSERT INTO menu_items (name, description, price, category) VALUES
('Cola 33cl',             'Coca-Cola dåse',                                                            29, 'drikkevare'),
('Fanta 33cl',            'Fanta appelsin dåse',                                                       29, 'drikkevare'),
('Sprite 33cl',           'Sprite dåse',                                                               29, 'drikkevare'),
('Vand 50cl',             'Kildevand på flaske',                                                       19, 'drikkevare'),
('Juice',                 'Appelsin- eller æblejuice',                                                 25, 'drikkevare');

-- RLS politikker
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Menu items er offentlige" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Alle kan oprette ordre" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Alle kan se ordrer" ON orders FOR SELECT USING (true);

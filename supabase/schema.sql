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
(1,  'Margherita',     'Tomatsauce, ost',                                                                      70,  140, 'pizza'),
(2,  'Mozzarella',     'Tomatsauce, ost, pepperoni, champignon, artiskok, mozzarella',                         85,  170, 'pizza'),
(3,  'Quattro',        'Tomatsauce, ost, cheddar, gorgonzola, feta, mozzarella, soltørrede tomater',           90,  180, 'pizza'),
(4,  'Hawaii',         'Tomatsauce, ost, skinke, ananas',                                                      75,  150, 'pizza'),
(5,  'Pepperoni',      'Tomatsauce, ost, fyldt pepperoni',                                                     75,  150, 'pizza'),
(6,  'Mafiosa',        'Tomatsauce, ost, skinke, bacon, champignon',                                           75,  150, 'pizza'),
(7,  'Piccante',       'Tomatsauce, ost, skinke, bacon, oksekød, løg',                                        80,  160, 'pizza'),
(8,  'Spaghetti',      'Tomatsauce, ost, pepperoni, løg, kødsauce, spaghetti',                                80,  160, 'pizza'),
(9,  'Frutti di Mare', 'Tomatsauce, ost, tun, majs',                                                          75,  150, 'pizza'),
(10, 'Sia',            'Tomatsauce, ost, rejer, muslinger, peberfrugt',                                        80,  160, 'pizza'),
(11, 'Kebab',          'Tomatsauce, ost, kebab, løg, salat, dressing',                                        80,  160, 'pizza'),
(12, 'Kylling',        'Tomatsauce, ost, kylling, champignon, salat, dressing',                               80,  160, 'pizza'),
(13, 'Darios',         'Tomatsauce, ost, skinke, pepperoni, bacon, pølse, rød peber',                         80,  160, 'pizza'),
(14, 'Danese',         'Tomatsauce, ost, oksekød, bacon, løg, pølse',                                         80,  160, 'pizza'),
(15, 'Esotica',        'Tomatsauce, ost, kebab, løg, bacon, pølse, rød peber',                                80,  160, 'pizza'),
(16, 'Italia',         'Tomatsauce, ost, oksefilet, gorgonzola, løg',                                         85,  170, 'pizza'),
(17, 'Pollo',          'Tomatsauce, ost, kylling, champignon, peberfrugt, artiskok',                          80,  160, 'pizza'),
(18, 'Stagioni',       'Tomatsauce, ost, skinke, bacon, champignon, løg',                                     80,  160, 'pizza'),
(19, 'Zanobia',        'Tomatsauce, ost, kylling, champignon, majs, frisk tomat',                             80,  160, 'pizza'),
(20, 'Alita',          'Tomatsauce, ost, kebab, kylling, løg, pommes frites, dressing',                       80,  160, 'pizza'),
(22, '4 Seasons',      'Tomatsauce, ost, ¼ kebab/løg/pølser, ¼ skinke/rejer/ananas, ¼ pepperoni/bacon/peberfrugt, ¼ kylling/champignon/artiskok', 90, 180, 'pizza'),
(23, 'Vegetariana',    'Tomatsauce, ost, champignon, peberfrugt, løg, asparges, artiskok, frisk tomat',       80,  160, 'pizza'),
(24, 'Din egen pizza', 'Vælg op til 5 ingredienser udover tomatsauce og ost',                                 85,  170, 'pizza');

-- ==============================
-- SPICY PIZZA
-- ==============================
INSERT INTO menu_items (number, name, description, price, price_large, category) VALUES
(25, 'Spicy 1', 'Tomatsauce, ost, oksefilet, løg, oliven, jalapeños',                                        75,  150, 'spicy_pizza'),
(26, 'Spicy 2', 'Tomatsauce, ost, kebab, pepperoni, frisk chilipeber, pølse',                                75,  150, 'spicy_pizza'),
(27, 'Spicy 3', 'Chili i tomatsauce, ost, kylling, champignon, caroline peber, bacon',                       75,  150, 'spicy_pizza');

-- ==============================
-- BØRNE PIZZA
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(28, 'Batman', 'Tomatsauce, ost, skinke, ananas',        60, 'børne_pizza'),
(29, 'Elsa',   'Tomatsauce, ost, fyldt pepperoni',       60, 'børne_pizza'),
(30, 'Mario',  'Tomatsauce, ost, kylling, majs',         60, 'børne_pizza'),
(31, 'Hulk',   'Tomatsauce, ost, kebab, champignon',     60, 'børne_pizza');

-- ==============================
-- DEEP PAN
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(32, 'Capricciosa', 'Tomatsauce, ost, skinke, champignon, ananas',              80, 'deep_pan'),
(33, 'Paplo',       'Tomatsauce, ost, kylling, champignon, bacon, pølse',       85, 'deep_pan'),
(34, 'Pirata',      'Tomatsauce, ost, pepperoni, rød peber',                    80, 'deep_pan'),
(35, 'Veneziana',   'Tomatsauce, ost, oksekød, pølse, løg, bacon',             85, 'deep_pan'),
(36, 'Milano',      'Tomatsauce, ost, oksefilet, gorgonzola, jalapeños',        85, 'deep_pan'),
(37, '4x4',         'Tomatsauce, ost, kebab, pepperoni, løg, oksekød',         85, 'deep_pan');

-- ==============================
-- INDBAGT / CALZONE
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(49, 'Calzone 1', 'Tomatsauce, ost, spaghetti, kødsauce',                       75, 'indbagt'),
(50, 'Calzone 2', 'Tomatsauce, ost, skinke, champignon, ananas',                80, 'indbagt'),
(51, 'Calzone 3', 'Tomatsauce, ost, kylling, champignon, peber, bearnaisesauce',80, 'indbagt'),
(52, 'Calzone 4', 'Tomatsauce, ost, kebab, pepperoni, løg, jalapeños',         80, 'indbagt');

-- ==============================
-- UFO
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(53, 'UFO 1', 'Tomatsauce, ost, kebab, pepperoni, bacon, løg',      85, 'ufo'),
(54, 'UFO 2', 'Tomatsauce, ost, kylling, champignon, pølser',       85, 'ufo'),
(55, 'UFO 3', 'Tomatsauce, ost, skinke, oksekød, champignon',       85, 'ufo');

-- ==============================
-- PIZZA SANDWICH
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(56, 'Kebab sandwich',    'Ost, kebab, løg, salat, dressing',          70, 'pizza_sandwich'),
(57, 'Kyllinge sandwich', 'Ost, kylling, champignon, salat, dressing', 70, 'pizza_sandwich'),
(58, 'Skinke sandwich',   'Ost, skinke, bacon, salat, dressing',       70, 'pizza_sandwich'),
(59, 'Mix sandwich',      'Ost, kebab, kylling, løg, salat, dressing', 70, 'pizza_sandwich');

-- ==============================
-- PITA
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(60, 'Kebab pita',   'Kebab, salat, dressing',        60, 'pita'),
(61, 'Kyllinge pita','Kylling, salat, dressing',       60, 'pita'),
(62, 'Skinke pita',  'Skinke, salat, dressing',        60, 'pita'),
(63, 'Tun pita',     'Tun, majs, salat, dressing',     60, 'pita'),
(65, 'Falafel pita', 'Falafel, salat, dressing',       60, 'pita');

-- ==============================
-- PASTA
-- ==============================
INSERT INTO menu_items (name, description, price, category) VALUES
('Spaghetti Bolognese',    'Spaghetti med kødsauce',                                               75, 'pasta'),
('Spaghetti Picacante',    'Spaghetti med skinke, bacon, løg og champignon i tomat-flødesauce',   80, 'pasta'),
('Fettuccine con Pollo',   'Båndpasta med kylling, broccoli og karrysauce',                        80, 'pasta'),
('Sia Pasta',              'Båndspaghetti, rejer, muslinger i tomat og flødesauce',                80, 'pasta'),
('Penne della Casa',       'Penne-pasta med oksefilet, bacon i tomat og flødesauce',              80, 'pasta'),
('Spaghetti Carbonara',    'Spaghetti, bacon og flødesauce',                                       80, 'pasta'),
('Tagliatelle Italiana',   'Båndpasta med oksekød, løg og frisk peber i tomat og flødesauce',    80, 'pasta'),
('Penne alla Romana',      'Penne-pasta med bacon, skinke, løg og pesto i tomat og flødesauce',  80, 'pasta'),
('Penne al Gorgonzola',    'Penne-pasta med oksefilet i gorgonzolasauce',                         80, 'pasta'),
('Spaghetti Diavola',      'Spaghetti med fløde og kødsauce krydret med chili',                   80, 'pasta'),
('Luksus Pasta',           'Båndpasta med kylling, broccoli, champignon og chili i tomat- og flødesauce', 80, 'pasta');

-- ==============================
-- RULLE
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(66, 'Kebab rulle',   'Kebab, salat, dressing',          65, 'rulle'),
(67, 'Kyllinge rulle','Kylling, salat, dressing',         65, 'rulle'),
(68, 'Mix rulle',     'Kebab, kylling, salat, dressing',  65, 'rulle'),
(69, 'Falafel rulle', 'Falafel, salat, dressing',         65, 'rulle');

-- ==============================
-- BRØD
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(70, 'Hvidløgsbrød',          'Hjemmebagt hvidløgsbrød',          50, 'tilbehør'),
(71, 'Hvidløgsbrød med ost',  'Hjemmebagt hvidløgsbrød med ost',  55, 'tilbehør');

-- ==============================
-- GRILL
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(72, 'Kebab mix',          'Kebab, kartoffelskiver, salat, tzatziki, dressing',          75, 'grill'),
(73, 'Kyllinge mix',       'Kylling, kartoffelskiver, salat, tzatziki, dressing',        75, 'grill'),
(74, 'Kylling & kebab mix','Kebab, kylling, kartoffelskiver, salat, tzatziki, dressing', 80, 'grill'),
(75, 'Pølse mix',          'Pølser, kartoffelskiver, salat, ketchup, remoulade',         75, 'grill');

-- ==============================
-- NACHOS
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(77, 'Nachos kebab',   'Cheddar, salsa, guacamole, jalapeños, kebab',   70, 'nachos'),
(78, 'Nachos kylling', 'Cheddar, salsa, guacamole, jalapeños, kylling', 70, 'nachos'),
(79, 'Nachos oksekød', 'Cheddar, salsa, guacamole, jalapeños, oksekød', 70, 'nachos');

-- ==============================
-- BURGER
-- ==============================
INSERT INTO menu_items (number, name, description, price, price_large, category) VALUES
(80, 'Cheese burger',  'Ost, syltet agurk, løg, ketchup — 200g bøf',              55, 90,  'burger'),
(81, 'Crispy burger',  'Salat, tomat, hvidløgsmayonnaise, burgerdressing',          55, 90,  'burger'),
(82, 'Smokey burger',  'Ost, bacon, syltet agurk, løg, tomat, BBQsauce — 200g bøf',65, 100, 'burger'),
(83, 'Jambo burger',   'Ost, bacon, salat, løg, tomat, burgerdressing — 200g bøf', 65, 100, 'burger'),
(84, 'Nacho burger',   'Ost, chips, salat, jalapeños, salsa, burgerdressing — 200g bøf', 65, 100, 'burger');

-- ==============================
-- SNACKS
-- ==============================
INSERT INTO menu_items (number, name, description, price, category) VALUES
(86, 'Chili cheese tops (4 stk.)',  'Sprøde chili cheese tops',                                         25,  'snacks'),
(87, 'Mozzarella sticks (4 stk.)', 'Sprøde mozzarella sticks',                                          25,  'snacks'),
(88, 'Løgringe (4 stk.)',          'Sprøde løgringe',                                                   25,  'snacks'),
(89, 'Kyllingenuggets (4 stk.)',   'Sprøde kyllingenuggets',                                             25,  'snacks'),
(90, 'Spicy kurv 1',               '5 stk. chili cheese tops, 5 stk. kyllingenuggets, pommes frites',   70,  'snacks'),
(91, 'Spicy kurv 2',               '5 stk. mozzarella sticks, 5 stk. løgringe, pommes frites',          70,  'snacks'),
(92, 'Spicy family kurv',          '5 stk. mozzarella sticks, løgringe, kyllingenuggets, chili cheese tops, stor pommes frites', 100, 'snacks'),
(93, 'Spicy box',                  'Pommes frites, ost, jalapeños, chilisauce',                          50,  'snacks'),
(94, 'Pommes frites (lille)',       'Sprøde pommes frites',                                              30,  'snacks'),
(94, 'Pommes frites (stor)',        'Sprøde pommes frites',                                              40,  'snacks'),
(95, 'Tzatziki',                   'Hjemmelavet tzatziki',                                               35,  'snacks'),
(96, 'Hummus',                     'Hjemmelavet hummus',                                                 35,  'snacks'),
(97, 'Special spicy sauce',        'Husets stærke sauce',                                                10,  'snacks');

-- ==============================
-- DRIKKEVARER
-- ==============================
INSERT INTO menu_items (name, description, price, category) VALUES
('Coca-Cola 33cl',      'Coca-Cola dåse',           15, 'drikkevare'),
('Fanta 33cl',          'Fanta appelsin dåse',       15, 'drikkevare'),
('Faxi Kondi 33cl',     'Faxi Kondi dåse',           15, 'drikkevare'),
('Coca-Cola Zero 33cl', 'Coca-Cola Zero dåse',       15, 'drikkevare'),
('Ayran',               'Tyrkisk yoghurtdrik',       15, 'drikkevare'),
('Carlsberg øl 33cl',   'Carlsberg øl dåse',         15, 'drikkevare'),
('Coca-Cola 1,5L',      'Coca-Cola flaske',          35, 'drikkevare'),
('Fanta 1,5L',          'Fanta appelsin flaske',     35, 'drikkevare'),
('Faxi Kondi 1,5L',     'Faxi Kondi flaske',         35, 'drikkevare'),
('Coca-Cola Zero 1,5L', 'Coca-Cola Zero flaske',     35, 'drikkevare');

-- RLS politikker
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Menu items er offentlige" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Alle kan oprette ordre" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Alle kan se ordrer" ON orders FOR SELECT USING (true);

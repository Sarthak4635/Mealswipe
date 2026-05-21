import { Meal } from './types';

// Let's map high-quality authentic Indian food images from Unsplash to make the cards look beautiful.
const IMAGE_MAPPING: { [key: string]: string } = {
  'Masala Omelette': 'https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?w=600&auto=format&fit=crop&q=80',
  'Dal Tadka': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
  'Paneer Bhurji': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80',
  'Chana Chaat': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Samosa': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Aloo Tikki': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
  'Bhel Puri': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Pani Puri': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80',
  'Vada Pav': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80',
  'Dhokla': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Kachori': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Poha Chivda': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Bread Pakoda': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Onion Pakoda': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Masala Peanuts': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
  'Sev Puri': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Dahi Puri': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Corn Chaat': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Chakli': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Murukku': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Medu Vada': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
  'Rava Cutlet': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
  'Makhana Chaat': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
  'Aloo Chaat': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
  'Raj Kachori': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Namak Para': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Papdi Chaat': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Moong Dal Chilla': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Paneer Tikka': 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=80',
  'Crispy Corn': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
  'Masala Papad': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Kande Pohe': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Bhakarwadi': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Dahi Vada': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
  'Aloo Paratha': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80',
  'Rajma Chawal': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
  'Poha': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Palak Paneer': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Upma': 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
  'Vegetable Biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
  'Dosa': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80',
  'Aloo Gobi': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
  'Khichdi': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
  'Paneer Kofta': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80'
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80';

// Raw list provided by the user
const RAW_INDIAN_DATA = [
  {
    name: "Masala Omelette",
    type: "breakfast",
    time: 10,
    diet: ["vegetarian"],
    ingredients: ["eggs", "onion", "tomato", "chilli", "coriander", "cumin"],
    steps: [
      "Beat 2 eggs with salt, chilli, and cumin.",
      "Chop onion, tomato, and coriander finely.",
      "Cook onion in oil for 2 min, then add tomato.",
      "Pour eggs over, fold when set. Serve hot."
    ]
  },
  {
    name: "Dal Tadka",
    type: "lunch",
    time: 30,
    diet: ["vegan", "vegetarian"],
    ingredients: ["toor dal", "onion", "tomato", "garlic", "cumin", "turmeric"],
    steps: [
      "Boil 1 cup toor dal with turmeric until soft.",
      "Fry onion, garlic, and tomato in oil.",
      "Add cumin, chilli powder, and garam masala.",
      "Mix dal in, simmer 5 min. Squeeze lemon juice."
    ]
  },
  {
    name: "Paneer Bhurji",
    type: "dinner",
    time: 20,
    diet: ["vegetarian"],
    ingredients: ["paneer", "onion", "tomato", "cumin", "coriander", "capsicum"],
    steps: [
      "Crumble paneer into small pieces.",
      "Fry onion and tomato with cumin and spices.",
      "Add paneer, stir well and cook for 5 min.",
      "Garnish with coriander. Serve with roti."
    ]
  },
  {
    name: "Chana Chaat",
    type: "snack",
    time: 10,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["chickpeas", "onion", "tomato", "cucumber", "lemon", "chaat masala"],
    steps: [
      "Drain and rinse canned chickpeas.",
      "Add chopped onion, tomato, and cucumber.",
      "Season with chaat masala, lemon juice, and salt.",
      "Garnish with coriander."
    ]
  },
  {
    name: "Samosa",
    type: "snack",
    time: 40,
    diet: ["vegan", "vegetarian"],
    ingredients: ["potato", "peas", "wheat flour", "cumin", "coriander", "oil"],
    steps: [
      "Make a stiff dough with flour, oil, and water. Rest 20 min.",
      "Boil and mash potatoes with peas, cumin, coriander, and chilli.",
      "Roll dough into circles, cut in half, shape into cones and fill.",
      "Deep fry on medium heat until golden and crispy. Serve with chutney."
    ]
  },
  {
    name: "Aloo Tikki",
    type: "snack",
    time: 30,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["potato", "breadcrumbs", "cumin", "coriander", "chilli", "oil"],
    steps: [
      "Boil and mash potatoes until completely smooth.",
      "Mix in cumin, coriander, chilli, salt, and breadcrumbs.",
      "Shape into flat round patties with your hands.",
      "Shallow fry on medium heat until golden and crispy on both sides."
    ]
  },
  {
    name: "Bhel Puri",
    type: "snack",
    time: 10,
    diet: ["vegan", "vegetarian"],
    ingredients: ["puffed rice", "sev", "onion", "tomato", "tamarind chutney", "green chutney"],
    steps: [
      "Mix puffed rice and sev together in a large bowl.",
      "Add finely chopped onion, tomato, and boiled potato.",
      "Drizzle tamarind chutney and green chutney generously.",
      "Toss everything quickly and serve immediately before it gets soggy."
    ]
  },
  {
    name: "Pani Puri",
    type: "snack",
    time: 20,
    diet: ["vegan", "vegetarian"],
    ingredients: ["puri shells", "potato", "chickpeas", "tamarind", "mint", "cumin"],
    steps: [
      "Make spiced water with mint, cumin, tamarind, and chilli.",
      "Mash boiled potato with chickpeas, salt, and chaat masala.",
      "Make a small hole in each puri and fill with potato mixture.",
      "Dip filled puri into spiced water and eat in one bite."
    ]
  },
  {
    name: "Vada Pav",
    type: "snack",
    time: 30,
    diet: ["vegan", "vegetarian"],
    ingredients: ["potato", "pav buns", "mustard seeds", "curry leaves", "garlic", "green chutney"],
    steps: [
      "Mash boiled potatoes with mustard seeds, curry leaves, and turmeric.",
      "Shape into round balls, dip in gram flour batter, deep fry until golden.",
      "Slice pav buns, spread green chutney and dry garlic chutney inside.",
      "Place hot vada inside pav and serve with fried green chilli."
    ]
  },
  {
    name: "Dhokla",
    type: "snack",
    time: 30,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["besan", "yogurt", "ginger", "green chilli", "mustard seeds", "curry leaves"],
    steps: [
      "Mix besan with yogurt, ginger, chilli, salt, and water into smooth batter.",
      "Add Eno fruit salt and mix gently — batter will become fluffy.",
      "Pour into greased tin and steam for 15-18 min until firm.",
      "Temper mustard seeds and curry leaves in oil, pour over dhokla. Cut and serve."
    ]
  },
  {
    name: "Kachori",
    type: "snack",
    time: 40,
    diet: ["vegan", "vegetarian"],
    ingredients: ["wheat flour", "moong dal", "fennel seeds", "cumin", "chilli", "oil"],
    steps: [
      "Soak and grind moong dal coarsely. Fry with fennel, cumin, and chilli.",
      "Make a soft dough with wheat flour, oil, and water.",
      "Stuff each ball with dal filling and seal tightly.",
      "Deep fry on low heat slowly until golden and crispy throughout."
    ]
  },
  {
    name: "Poha Chivda",
    type: "snack",
    time: 20,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["flattened rice", "peanuts", "curry leaves", "mustard seeds", "turmeric", "sugar"],
    steps: [
      "Dry roast flattened rice in a pan until crispy. Set aside.",
      "Fry peanuts until golden, add mustard seeds, curry leaves, and chilli.",
      "Add turmeric, roasted poha, sugar, and salt. Mix well.",
      "Cool completely before storing or serving as a crunchy snack."
    ]
  },
  {
    name: "Bread Pakoda",
    type: "snack",
    time: 20,
    diet: ["vegetarian"],
    ingredients: ["bread", "potato", "besan", "chilli", "cumin", "coriander"],
    steps: [
      "Mix mashed potato with cumin, chilli, coriander, and salt for filling.",
      "Spread filling between two bread slices and press firmly.",
      "Dip sandwich into thick besan batter seasoned with chilli and turmeric.",
      "Deep fry until golden and crispy. Cut diagonally and serve with chutney."
    ]
  },
  {
    name: "Onion Pakoda",
    type: "snack",
    time: 20,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["onion", "besan", "chilli", "cumin", "curry leaves", "oil"],
    steps: [
      "Slice onions thinly and separate the rings.",
      "Mix besan with chilli, cumin, ajwain, salt, and just enough water.",
      "Add onion slices to batter and coat well.",
      "Drop small clusters into hot oil and fry until golden and crispy."
    ]
  },
  {
    name: "Masala Peanuts",
    type: "snack",
    time: 15,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["peanuts", "besan", "chilli", "turmeric", "chaat masala", "oil"],
    steps: [
      "Mix besan with chilli, turmeric, chaat masala, salt, and water.",
      "Add peanuts and coat them evenly in the batter.",
      "Deep fry in hot oil until coating is crispy and golden.",
      "Drain on paper towel, sprinkle extra chaat masala. Cool before serving."
    ]
  },
  {
    name: "Sev Puri",
    type: "snack",
    time: 15,
    diet: ["vegan", "vegetarian"],
    ingredients: ["puri crackers", "potato", "sev", "onion", "tamarind chutney", "coriander"],
    steps: [
      "Arrange small flat puri crackers on a plate.",
      "Top each with mashed spiced potato and diced onion.",
      "Drizzle tamarind chutney and green chutney over each puri.",
      "Top generously with sev and fresh coriander. Serve immediately."
    ]
  },
  {
    name: "Dahi Puri",
    type: "snack",
    time: 15,
    diet: ["vegetarian", "glutenfree"],
    ingredients: ["puri shells", "yogurt", "potato", "sev", "tamarind chutney", "chaat masala"],
    steps: [
      "Make holes in puri shells and fill with spiced mashed potato.",
      "Pour chilled whisked yogurt generously over filled puris.",
      "Add tamarind chutney and green chutney on top.",
      "Finish with sev, chaat masala, and pomegranate seeds."
    ]
  },
  {
    name: "Corn Chaat",
    type: "snack",
    time: 15,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["sweet corn", "onion", "tomato", "lemon", "chaat masala", "coriander"],
    steps: [
      "Boil or microwave sweet corn kernels until tender.",
      "Add finely chopped onion, tomato, and green chilli.",
      "Season generously with chaat masala, cumin powder, and lemon juice.",
      "Garnish with fresh coriander and serve warm or at room temperature."
    ]
  },
  {
    name: "Chakli",
    type: "snack",
    time: 40,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["rice flour", "besan", "sesame seeds", "cumin", "chilli", "butter"],
    steps: [
      "Mix rice flour, besan, sesame seeds, cumin, chilli, and salt.",
      "Add warm water gradually to form a soft but firm dough.",
      "Press dough through a chakli mould into spiral shapes on a plate.",
      "Deep fry on medium heat until golden and completely crispy."
    ]
  },
  {
    name: "Murukku",
    type: "snack",
    time: 40,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["rice flour", "urad dal", "sesame seeds", "cumin", "butter", "oil"],
    steps: [
      "Soak and grind urad dal into smooth paste.",
      "Mix with rice flour, sesame seeds, cumin, butter, and salt.",
      "Add water to form a soft dough and fill into a murukku press.",
      "Squeeze into hot oil in circular motions, fry until golden and crispy."
    ]
  },
  {
    name: "Medu Vada",
    type: "snack",
    time: 30,
    diet: ["vegan", "vegetarian"],
    ingredients: ["urad dal", "onion", "curry leaves", "ginger", "green chilli", "oil"],
    steps: [
      "Soak urad dal for 4 hours, grind into thick fluffy batter.",
      "Mix in chopped onion, curry leaves, ginger, and green chilli.",
      "Wet your hand, shape into ring donuts, slide carefully into hot oil.",
      "Fry until deep golden and crispy. Serve hot with sambar and chutney."
    ]
  },
  {
    name: "Rava Cutlet",
    type: "snack",
    time: 25,
    diet: ["vegetarian"],
    ingredients: ["semolina", "potato", "carrot", "onion", "coriander", "cheese"],
    steps: [
      "Mix boiled mashed potato with grated carrot, onion, coriander, and cheese.",
      "Shape into flat round cutlets with your hands.",
      "Coat generously in semolina on all sides.",
      "Shallow fry on medium heat until golden and crispy on both sides."
    ]
  },
  {
    name: "Makhana Chaat",
    type: "snack",
    time: 15,
    diet: ["vegetarian", "glutenfree"],
    ingredients: ["makhana", "yogurt", "tamarind chutney", "chaat masala", "coriander", "onion"],
    steps: [
      "Dry roast makhana in a pan with ghee until crispy and puffed.",
      "Arrange in a bowl and top with chilled whisked yogurt.",
      "Add finely chopped onion, tomato, and green chilli.",
      "Drizzle tamarind and green chutney, sprinkle chaat masala generously."
    ]
  },
  {
    name: "Aloo Chaat",
    type: "snack",
    time: 20,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["potato", "onion", "chaat masala", "tamarind chutney", "green chutney", "coriander"],
    steps: [
      "Boil potatoes, peel and cut into small cubes.",
      "Deep fry or air fry potato cubes until golden and slightly crispy.",
      "Toss with chopped onion, chaat masala, cumin powder, and lemon juice.",
      "Top with tamarind chutney, green chutney, and fresh coriander."
    ]
  },
  {
    name: "Raj Kachori",
    type: "snack",
    time: 45,
    diet: ["vegetarian"],
    ingredients: ["kachori shell", "yogurt", "chickpeas", "potato", "sev", "tamarind chutney"],
    steps: [
      "Make a large puffed kachori shell and let it cool completely.",
      "Fill with boiled chickpeas, mashed potato, and sprouts.",
      "Pour chilled whisked yogurt generously inside.",
      "Top with both chutneys, sev, pomegranate, and chaat masala."
    ]
  },
  {
    name: "Namak Para",
    type: "snack",
    time: 30,
    diet: ["vegan", "vegetarian"],
    ingredients: ["wheat flour", "ajwain", "cumin", "oil", "salt", "water"],
    steps: [
      "Mix flour with ajwain, cumin, oil, and salt into a firm dough.",
      "Roll out into thin sheet and cut into diamond shapes.",
      "Deep fry on medium-low heat until light golden and very crispy.",
      "Cool completely before storing — stays crunchy for up to 2 weeks."
    ]
  },
  {
    name: "Papdi Chaat",
    type: "snack",
    time: 20,
    diet: ["vegetarian"],
    ingredients: ["papdi crackers", "potato", "chickpeas", "yogurt", "tamarind chutney", "sev"],
    steps: [
      "Arrange papdi crackers flat on a large plate.",
      "Top with boiled chickpeas and diced spiced potato.",
      "Spoon chilled whisked yogurt over everything generously.",
      "Add both chutneys, sev, and chaat masala. Serve immediately."
    ]
  },
  {
    name: "Moong Dal Chilla",
    type: "snack",
    time: 25,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["moong dal", "ginger", "green chilli", "onion", "coriander", "oil"],
    steps: [
      "Soak moong dal for 2 hours and grind into smooth batter.",
      "Mix in grated ginger, green chilli, onion, and coriander.",
      "Pour ladleful onto hot greased pan and spread into thin circle.",
      "Cook on medium heat, flip when golden. Serve with green chutney."
    ]
  },
  {
    name: "Paneer Tikka",
    type: "snack",
    time: 30,
    diet: ["vegetarian", "glutenfree"],
    ingredients: ["paneer", "yogurt", "tandoori masala", "capsicum", "onion", "lemon"],
    steps: [
      "Cube paneer and marinate with yogurt, tandoori masala, and lemon for 20 min.",
      "Thread onto skewers alternating with capsicum and onion.",
      "Grill in oven at 220C or on a tawa until charred on edges.",
      "Serve hot with green chutney, sliced onion, and lemon wedges."
    ]
  },
  {
    name: "Crispy Corn",
    type: "snack",
    time: 20,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["sweet corn", "cornflour", "chilli", "garlic", "lemon", "chaat masala"],
    steps: [
      "Boil corn kernels until tender, drain and dry completely.",
      "Toss with cornflour, chilli powder, garlic powder, and salt.",
      "Deep fry in hot oil until crispy and golden. Drain well.",
      "Immediately toss with chaat masala and lemon juice. Serve hot."
    ]
  },
  {
    name: "Masala Papad",
    type: "snack",
    time: 10,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["papad", "onion", "tomato", "coriander", "lemon", "chaat masala"],
    steps: [
      "Roast or fry papad until crispy and puffed with no bubbles.",
      "Finely chop onion, tomato, and coriander together.",
      "Mix with lemon juice, chilli, and chaat masala.",
      "Top each papad generously with the onion tomato mixture. Serve immediately."
    ]
  },
  {
    name: "Kande Pohe",
    type: "snack",
    time: 15,
    diet: ["vegan", "vegetarian"],
    ingredients: ["flattened rice", "onion", "mustard seeds", "curry leaves", "peanuts", "turmeric"],
    steps: [
      "Rinse flattened rice and drain well, set aside for 5 min.",
      "Fry peanuts until golden, add mustard seeds, curry leaves, and chilli.",
      "Add onion and cook until soft, mix in turmeric and green chilli.",
      "Add softened poha, salt, and sugar. Mix gently and serve warm."
    ]
  },
  {
    name: "Bhakarwadi",
    type: "snack",
    time: 50,
    diet: ["vegan", "vegetarian"],
    ingredients: ["wheat flour", "besan", "sesame seeds", "coconut", "tamarind", "spices"],
    steps: [
      "Make a firm dough with wheat flour, besan, and oil.",
      "Make filling with roasted coconut, sesame, tamarind, and spices.",
      "Roll dough thin, spread filling, roll tightly like a log.",
      "Slice into rounds and deep fry until golden. Cool before eating."
    ]
  },
  {
    name: "Dahi Vada",
    type: "snack",
    time: 40,
    diet: ["vegetarian", "glutenfree"],
    ingredients: ["urad dal", "yogurt", "tamarind chutney", "cumin powder", "coriander", "sev"],
    steps: [
      "Soak urad dal, grind into fluffy batter with ginger and green chilli.",
      "Deep fry vadas until golden, then soak in warm water for 10 min.",
      "Squeeze out water gently, arrange in serving dish.",
      "Pour chilled whisked yogurt, top with chutneys, cumin powder, and sev."
    ]
  },
  {
    name: "Aloo Paratha",
    type: "breakfast",
    time: 30,
    diet: ["vegetarian"],
    ingredients: ["potato", "wheat flour", "butter", "chilli", "coriander", "cumin"],
    steps: [
      "Boil and mash potatoes with spices and coriander.",
      "Make a soft wheat dough and divide into balls.",
      "Stuff each ball with potato filling and roll flat.",
      "Cook on a hot tawa with butter until golden."
    ]
  },
  {
    name: "Rajma Chawal",
    type: "lunch",
    time: 40,
    diet: ["vegan", "vegetarian"],
    ingredients: ["rajma", "rice", "onion", "tomato", "garlic", "ginger"],
    steps: [
      "Soak rajma overnight, pressure cook until soft.",
      "Fry onion, garlic, ginger, and tomato puree.",
      "Add spices and rajma with water. Simmer 15 min.",
      "Serve over steamed rice with onion on the side."
    ]
  },
  {
    name: "Poha",
    type: "breakfast",
    time: 15,
    diet: ["vegan", "vegetarian"],
    ingredients: ["flattened rice", "onion", "mustard seeds", "curry leaves", "turmeric", "lemon"],
    steps: [
      "Rinse flattened rice under water and let it soften.",
      "Fry mustard seeds, curry leaves, onion, and green chilli.",
      "Add turmeric, then softened poha. Mix gently.",
      "Add lemon juice, salt, and coriander. Serve warm."
    ]
  },
  {
    name: "Palak Paneer",
    type: "dinner",
    time: 30,
    diet: ["vegetarian", "glutenfree"],
    ingredients: ["spinach", "paneer", "onion", "garlic", "tomato", "cream"],
    steps: [
      "Blanch spinach and blend into smooth puree.",
      "Fry onion, garlic, tomato, and spices in oil.",
      "Add spinach puree and cubed paneer. Simmer 10 min.",
      "Finish with cream. Serve with naan or rice."
    ]
  },
  {
    name: "Upma",
    type: "breakfast",
    time: 20,
    diet: ["vegan", "vegetarian"],
    ingredients: ["semolina", "onion", "mustard seeds", "curry leaves", "carrot", "peas"],
    steps: [
      "Dry roast semolina until light golden. Set aside.",
      "Fry mustard seeds, curry leaves, onion, and vegetables.",
      "Add 2 cups water and bring to boil.",
      "Stir in semolina gradually until thick. Serve hot."
    ]
  },
  {
    name: "Vegetable Biryani",
    type: "dinner",
    time: 60,
    diet: ["vegetarian"],
    ingredients: ["basmati rice", "onion", "carrot", "peas", "saffron", "yogurt"],
    steps: [
      "Parboil basmati rice with whole spices until 70% done.",
      "Fry onions golden, add marinated vegetables.",
      "Layer rice over filling in a heavy pot.",
      "Seal and dum cook on low heat for 20 min."
    ]
  },
  {
    name: "Dosa",
    type: "breakfast",
    time: 20,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["dosa batter", "potato", "onion", "mustard seeds", "turmeric", "oil"],
    steps: [
      "Spread dosa batter thinly on a hot non-stick pan.",
      "Drizzle oil around the edges, cook on medium heat.",
      "Add potato masala filling in the centre if desired.",
      "Fold and serve with sambar and coconut chutney."
    ]
  },
  {
    name: "Aloo Gobi",
    type: "lunch",
    time: 25,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["potato", "cauliflower", "onion", "tomato", "turmeric", "cumin"],
    steps: [
      "Heat oil, add cumin seeds until they splutter.",
      "Add onion and cook until golden brown.",
      "Add potato and cauliflower with turmeric and spices.",
      "Cover and cook 15 min until vegetables are tender."
    ]
  },
  {
    name: "Khichdi",
    type: "lunch",
    time: 25,
    diet: ["vegan", "vegetarian", "glutenfree"],
    ingredients: ["rice", "moong dal", "turmeric", "cumin", "ghee", "ginger"],
    steps: [
      "Wash rice and moong dal together.",
      "Pressure cook with turmeric, salt, and water until soft.",
      "Heat ghee, add cumin and ginger, pour over khichdi.",
      "Mix well and serve hot with yogurt or pickle."
    ]
  }
];

export function getIndianCuisineMeals(): Meal[] {
  return RAW_INDIAN_DATA.map((item, idx) => {
    const id = `indian-${idx + 1}`;
    const name = item.name;
    const image = IMAGE_MAPPING[name] || DEFAULT_IMAGE;
    
    // Create elegant tags
    const tags = [
      'INDIAN',
      item.type.toUpperCase(),
      ...(item.diet.map(d => d.toUpperCase()))
    ].slice(0, 3);

    // Beautiful descriptive text derived from ingredients and instructions
    const ingredientsSentence = item.ingredients.slice(0, 4).join(', ');
    const description = `Indulge in a classic Indian ${item.type} masterpiece, intricately prepared with ${ingredientsSentence}, and cooked to flawless aromatic perfection.`;

    // Map categories logically based on flavors and dietary elements
    let category = 'Comfort Food'; // Default
    let spiceLevel = 40;
    let savoryLevel = 60;
    let sweetLevel = 10;
    let umamiLevel = 45;

    const lowercaseName = name.toLowerCase();

    // Spicy selection categorization
    const spicyIndicators = ['chilli', 'spicy', 'tikka', 'pakoda', 'samosa', 'curry', 'masala'];
    const isSpicy = spicyIndicators.some(ind => lowercaseName.includes(ind) || item.ingredients.some(ing => ing.includes(ind)));
    
    if (isSpicy) {
      category = 'Spicy Selection';
      spiceLevel = 70 + (idx % 25); // 70 to 95
      savoryLevel = 75 + (idx % 15);
      umamiLevel = 65 + (idx % 20);
    } else if (item.type === 'snack') {
      category = 'Late Night';
      savoryLevel = 65 + (idx % 20);
      sweetLevel = 15 + (idx % 25);
      umamiLevel = 60 + (idx % 15);
    } else if (item.diet.includes('vegan') || item.diet.includes('glutenfree')) {
      category = 'Healthy Eats';
      savoryLevel = 50 + (idx % 15);
      umamiLevel = 55 + (idx % 15);
      spiceLevel = 30 + (idx % 15);
    } else {
      category = 'Comfort Food';
      savoryLevel = 80 + (idx % 15);
      umamiLevel = 75 + (idx % 15);
      spiceLevel = 35 + (idx % 15);
    }

    return {
      id,
      name,
      image,
      tags,
      time: `${item.time} min`,
      rating: parseFloat((4.5 + ((idx % 5) / 10)).toFixed(1)),
      reviews: `${80 + (idx * 16)}`,
      description,
      category,
      ingredients: item.ingredients.map(ing => ing.charAt(0).toUpperCase() + ing.slice(1)),
      spiceLevel,
      savoryLevel,
      sweetLevel,
      umamiLevel
    };
  });
}

// 2. Муха (Flyweight) — це патерн програмування, основна ідея якого полягає в тому, щоб спільно використовувати об'єкт-одиночка
// замість створення окремих унікальних об'єктів для кожного випадку використання

// Клас Group. Він використовує шаблон "Одиночка" та відповідає за створення груп товарів.

class Group {
  static #groups = {};

  constructor(name) {
    this.name = name;
  }

  static create(name) {
    if (!(name in this.#groups)) {
      this.#groups[name] = new Group(name);
    }
    return this.#groups[name];
  }
}

class Product {
  constructor(name, group) {
    this.name = name;
    this.group = group;
  }

  display() {
    console.log(`Продукт: ${this.name}, Група: ${this.group.name}`);
  }
}

console.log("Завдання 2 ====================================");

// Створення груп та продуктів
const electronics = Group.create("Електроніка");
const books = Group.create("Книги");
const product1 = new Product("Ноутбук", electronics);
const product2 = new Product("Навушники", electronics);
const product3 = new Product("Воно", books);
const product4 = new Product("Смартфон", Group.create("Електроніка"));

// Виведення продуктів в консоль.
product1.display();
product2.display();
product3.display();
product4.display();

// Перевірка, чи належать два продукти до однієї групи.
console.log(product1.group === product4.group); // true

// Фільтрація продуктів за групою.
const list = [product1, product2, product3, product4].filter(
  (product) => product.group === Group.create("Електроніка")
);

console.log(list); // виводиться список продуктів, що належать до групи "Електроніка"

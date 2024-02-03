// 1. Композит (Composite) — це патерн програмування, який дозволяє створювати структуру об'єктів у вигляді дерева, де кожен об'єкт може бути окремим елементом або групою об'єктів.
// Ця структура називається "деревоподібною" через ієрархію "один-багато".

// Клас ContentContainer використовується для управління списком вкладених елементів контенту

class ContentContainer {
  constructor() {
    this.elements = [];
  }

  addElement(element) {
    this.elements.push(element);
  }

  removeElement(element) {
    const index = this.elements.indexOf(element);
    if (index !== -1) {
      this.elements.splice(index, 1);
    }
  }
}

class Message extends ContentContainer {
  constructor(content) {
    super();
    this.content = content;
  }

  display() {
    console.log(this.content);
    for (const element of this.elements) {
      element.display();
    }
  }
}

class Article extends ContentContainer {
  constructor(title) {
    super();
    this.title = title;
  }

  display() {
    console.log(`Стаття: ${this.title}`);
    for (const element of this.elements) {
      element.display();
    }
  }
}
console.log("Завдання 1 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо об'єкт Article з назвою "Навчальна стаття"
const article = new Article("Навчальна стаття");

// Додаємо повідомлення до статті
article.addElement(new Message("Дуже корисна стаття"));
article.addElement(new Message("Дякую за чудовий матеріал!"));

// Додаємо вкладене повідомлення до першого повідомлення в статті
article.elements[0].addElement(new Message("Відповідь: Згоден!"));

// Виводимо інформацію про статтю та всі її вкладені елементи
article.display();

// Виводимо масив вкладених елементів статті
console.log(article.elements);

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

// 3. Шаблонний метод (Template Method) — це патерн програмування, який визначає загальну структуру алгоритму, залишаючи певні кроки реалізації підкласам.
// Клас-шаблон визначає основну логіку алгоритму, а підкласи можуть змінювати або розширювати окремі кроки.

// Клас TeaMaker відповідає за загальні дії, необхідні для приготування чаю.

class TeaMaker {
  makeTea() {
    this.boilWater();
    this.addTeaLeaves();
    this.steepTea();
    this.pourIntoCup();
    this.addCondiments();
    this.serveTea();
  }

  boilWater() {
    console.log("Кип'ятимо воду...");
  }

  addTeaLeaves() {
    console.log("Додаємо чайні листки...");
  }

  steepTea() {
    console.log("Заварюємо чай...");
  }

  pourIntoCup() {
    console.log("Переливаємо чай в чашку...");
  }

  addCondiments() {
    // Пустий метод, який можна перевизначити у підкласах.
  }

  serveTea() {
    console.log("Чай подається!");
  }
}

// Клас GreenTeaMaker є підкласом класу TeaMaker та додає інгредієнти для зеленого чаю.
class GreenTeaMaker extends TeaMaker {
  addCondiments() {
    console.log("Додаємо мед, щоб приготувати зелений чай...");
  }
}

// Клас BlackTeaMaker є підкласом класу TeaMaker та додає інгредієнти для чорного чаю.
class BlackTeaMaker extends TeaMaker {
  addCondiments() {
    console.log("Додаємо мед, щоб приготувати чорний чай...");
  }
}

console.log("Завдання 3 ====================================");

// Створюємо екземпляри класів GreenTeaMaker та BlackTeaMaker.
const greenTeaMaker = new GreenTeaMaker();
greenTeaMaker.makeTea();

const blackTeaMaker = new BlackTeaMaker();
blackTeaMaker.makeTea();

// 4. Відвідувач (Visitor) — це патерн програмування, який дозволяє додавати нові операції до групи об'єктів, не змінюючи самі об'єкти.
// Відвідувач розділяє алгоритм від представлення об'єктів, що дозволяє додавати нові операції, не змінюючи класи цих об'єктів.

// Клас Letter представляє об'єкт листа з назвою і текстом.

class Letter {
  constructor(title, text) {
    this.title = title;
    this.text = text;
  }
}

class Picture {
  constructor(title, size) {
    this.title = title;
    this.size = size;
  }
}

class Movie {
  constructor(title, duration) {
    this.title = title;
    this.duration = duration;
  }
}

class Portfolio {
  constructor() {
    this.elements = [];
  }

  addElement(element) {
    this.elements.push(element);
  }

  readLetter(letter) {
    console.log(
      `Лист: ${letter.title}, Розмір: ${letter.text.length} символів`
    );
  }

  readPicture(picture) {
    console.log(`Картина: ${picture.title}, Розмір: ${picture.size} KB`);
  }

  readMovie(movie) {
    console.log(`Фільм: ${movie.title}, Тривалість: ${movie.duration} хвилин`);
  }

  readElements() {
    for (let element of this.elements) {
      if (element instanceof Letter) {
        this.readLetter(element);
      } else if (element instanceof Picture) {
        this.readPicture(element);
      } else if (element instanceof Movie) {
        this.readMovie(element);
      }
    }
  }
}

console.log("Завдання 4 ====================================");

// Створюємо екземпляр класу Portfolio
const myPortfolio = new Portfolio();

// Створюємо різні об'єкти
const letter = new Letter("My Letter", "Hello, this is a letter.");
const picture = new Picture("My Picture", 2048);
const movie = new Movie("My Movie", 120);

// Додаємо об'єкти до портфоліо
myPortfolio.addElement(letter);
myPortfolio.addElement(picture);
myPortfolio.addElement(movie);

// Виводимо всі об'єкти в портфоліо
console.log(myPortfolio.elements);

// Читаємо інформацію про всі об'єкти в портфоліо
myPortfolio.readElements();

// 5. Адаптер (Adapter) — це патерн програмування, який дозволяє об'єктам з інтерфейсом несумісним з іншими об'єктами працювати разом,
// перетворюючи інтерфейс одного об'єкта на інтерфейс, очікуваний іншим об'єктом.

// Клас BankTransfer представляє собою систему для здійснення банківських переказів

class BankTransfer {
  initiateTransfer(amount) {
    const calculatedAmount = this.calculateFee(amount);
    console.log(`Ініціюємо банківський переказ: $${calculatedAmount}`);
    return calculatedAmount;
  }

  calculateFee(amount) {
    return amount * 1.02;
  }
}

class WalletTransfer {
  processTransfer(amount) {
    console.log(`Здійснюємо переказ з гаманця: $${amount}`);
  }
}

class TransferAdapter {
  constructor(transferSystem) {
    this.transferSystem = transferSystem;
  }

  initiateTransfer(amount) {
    const calculatedAmount = this.calculateFee(amount);
    this.transferSystem.processTransfer(calculatedAmount);
    return calculatedAmount;
  }

  calculateFee(amount) {
    return amount * 1.02;
  }
}
// У вищенаведеному вихдному коді немає експліцитного (пряме звернення або використання об'єкту чи його методів безпосередньо в коді) використання об'єкту WalletTransfer в класі TransferAdapter, але об'єкт WalletTransfer фактично використовується як "transferSystem" через інтерфейс методу "processTransfer".

// Коли ми створюємо екземпляр класу TransferAdapter і передаємо йому об'єкт типу WalletTransfer у конструктор, його посилання зберігається властивості transferSystem. Потім метод initiateTransfer класу TransferAdapter викликає метод processTransfer об'єкту transferSystem, який фактично представляє WalletTransfer.

// Таким чином, хоча немає прямого звернення до WalletTransfer, принцип "адаптера" виконується через використання методів processTransfer об'єкта transferSystem, який є типом WalletTransfer.
console.log("Завдання 5 ====================================");

// Створимо екземпляри BankTransfer
const bankTransfer = new BankTransfer();
const purchase1 = bankTransfer.initiateTransfer(1000); // Ініціюємо банківський переказ: $1020

const purchase2 = bankTransfer.initiateTransfer(10); // Ініціюємо банківський переказ: $10.2

// 6. Стратегія (Strategy) — це патерн програмування, який дозволяє визначати різні алгоритми та забезпечує можливість обміну їх під час виконання програми.

// Клас Basket представляє кошик для покупок з певною стратегією знижки

class Basket {
  constructor(discountPlan) {
    this.discountPlan = discountPlan;
    this.goods = [];
  }

  addGood(good) {
    this.goods.push(good);
  }

  calculateTotalPrice() {
    const totalPrice = this.goods.reduce((acc, good) => acc + good.price, 0);
    return this.discountPlan.applyDiscount(totalPrice);
  }
}

class DiscountPlan {
  applyDiscount(price) {
    // Повертає ціну без знижки за замовчуванням
    return price;
  }
}

class RegularDiscountPlan extends Basket {
  applyDiscount(price) {
    return price * 0.9; // Знижка 10% для постійних клієнтів
  }
}

class VIPDiscountPlan extends Basket {
  applyDiscount(price) {
    return price * 0.8; // Знижка 20% для VIP клієнтів
  }
}

class NewClientDiscountPlan extends Basket {
  applyDiscount(price) {
    return price * 0.95; // Знижка 5% для нових клієнтів
  }
}

console.log("Завдання 6 ====================================");

// Створення нового екземпляру кошика зі стратегією знижки для нових клієнтів
const basket1 = new Basket(new NewClientDiscountPlan());

// Додавання товарів до кошика
basket1.addGood({ name: "Product 1", price: 100 });
basket1.addGood({ name: "Product 2", price: 50 });

// Розрахунок і виведення загальної вартості товарів з урахуванням знижки
console.log(basket1.calculateTotalPrice());

// 7. Ітератор (Iterator) — це патерн програмування, який надає спосіб послідовного доступу до елементів колекції без розкриття його внутрішньої структури.

// Клас Employee відповідає за створення об'єктів працівників. Кожен працівник має своє ім'я, посаду та зарплату.

class Employee {
  constructor(name, position, salary) {
    this.name = name;
    this.position = position;
    this.salary = salary;
  }
}

class EmployeeGroup {
  constructor() {
    this.employees = [];
  }

  addEmployee(employee) {
    this.employees.push(employee);
  }
}

class EmployeeIterator {
  #employees;
  #currentIndex;

  constructor(employeeGroup) {
    this.#employees = employeeGroup.employees;
    this.#currentIndex = 0;
  }

  #hasNext() {
    return this.#currentIndex < this.#employees.length;
  }

  next() {
    if (this.#hasNext()) {
      const employee = this.#employees[this.#currentIndex];
      this.#currentIndex++;
      return employee;
    }
    return null;
  }

  list() {
    return this.#employees.map(
      (employee) =>
        employee.name +
        " - " +
        employee.position +
        ", salary - $" +
        employee.salary
    );
  }
}

console.log("Завдання 7 ====================================");

// Створюємо нову групу працівників.
const employeeGroup = new EmployeeGroup();

// Додаємо нових працівників до групи, використовуючи метод addEmployee.
employeeGroup.addEmployee(new Employee("John Doe", "Manager", 5000));
employeeGroup.addEmployee(new Employee("Jane Smith", "Developer", 4000));

// Створюємо новий ітератор для групи працівників.
const employeeIterator = new EmployeeIterator(employeeGroup);

// Виводимо імена всіх працівників в групі, використовуючи метод list.
console.log(employeeIterator.list());

// 8. Медіатор (Mediator) — це патерн програмування, який визначає об'єкт, який інкапсулює взаємодію між групою об'єктів. Медіатор сприяє слабкій залежності між цими об'єктами,
// дозволяючи спілкуватися з ними через централізовану точку.

// Клас User відповідає за користувача, який може відправляти повідомлення.

// class User {
//   constructor(name, messenger) {
//     this.name = name;
//     this.messenger = messenger;
//   }

//   sendMessage(message) {
//     console.log(`${this.name} відправив повідомлення: ${message}`);
//     this.messenger.sendMessage(this, message);
//   }

//   receiveMessage(user, message) {
//     console.log(
//       `${this.name} отримав повідомлення від ${user.name}: ${message}`
//     );
//     this.messenger.sendMessage(this, message);
//   }
// }

// class SMSMessenger {
//   static sendMessage(user, message) {
//     console.log(`Відправлено SMS від ${user.name}: ${message}`);
//   }
// }

// class EmailMessenger {
//   static sendMessage(user, message) {
//     console.log(`Відправлено Email від ${user.name}: ${message}`);
//   }
// }

// console.log("Завдання 7 =====================");

// const john = new User("John", SMSMessenger);
// const jane = new User("Jane", EmailMessenger);

// john.sendMessage("Привіт!");
// jane.sendMessage("Як справи?");

//==================================================================

// Доопрацьований варіант з виводом хто від кого отримав повдомлення

class User {
  constructor(name, messenger) {
    this.name = name;
    // Властивість messenger повинна посилатися на клас, який використовується для відправки повідомлень.
    this.messenger = messenger;
  }

  sendMessage(message, receiver) {
    console.log(`${this.name} відправив повідомлення: ${message}`);
    // Оновлено метод sendMessage, щоб передавати отримувача до месенджера.
    this.messenger.sendMessage(this, message, receiver);
  }

  receiveMessage(sender, message) {
    console.log(
      `${this.name} отримав повідомлення від ${sender.name}: ${message}`
    );
  }
}

class SMSMessenger {
  static sendMessage(sender, message, receiver) {
    console.log(`Відправлено SMS від ${sender.name}: ${message}`);
    // Тут припустимо, що отримувач також використовує SMS як засіб комунікації.
    receiver.receiveMessage(sender, message);
  }
}

class EmailMessenger {
  static sendMessage(sender, message, receiver) {
    console.log(`Відправлено email від ${sender.name}: ${message}`);
    // Аналогічно, припустимо, що отримувач використовує email.
    receiver.receiveMessage(sender, message);
  }
}

console.log("Завдання 8 =====================");

const john = new User("John", SMSMessenger);
const jane = new User("Jane", EmailMessenger);

john.sendMessage("Привіт!", jane); // John відправляє SMS до Jane
jane.sendMessage("Як справи?", john); // Jane відправляє Email до John

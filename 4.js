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

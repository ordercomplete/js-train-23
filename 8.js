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

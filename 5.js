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

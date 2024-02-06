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

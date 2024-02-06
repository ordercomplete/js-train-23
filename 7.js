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

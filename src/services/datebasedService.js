import axios from "axios";
import { URL } from "../../environment";
import moment from "moment";

export default class DateBasedService {
  // GET YEARS FROM USER'S EXPENDITURES
  async getYearsByUserExpenses(email) {
    const years = [];
    await axios.get(`${URL}/api/controller/get/expense`).then((result) => {
      result.data.map((data) => {
        if (data.user.email === email) {
          if (!years.includes(moment(data.date).year()))
            years.push(moment(data.date).year());
        }
      });
    });
    return years;
  }

  // GET TOTAL EXPENSES AMOUNT BY YEAR
  async getTotalExpensesAmountByYear(email, year) {
    let total = 0;
    const subtract = moment().year() - moment(year).year();
    const startOf = moment()
      .subtract(subtract, "year")
      .startOf("year")
      .format();
    const endOf = moment().subtract(subtract, "year").endOf("year").format();
    await axios.get(`${URL}/api/controller/get/expense`).then((result) =>
      result.data.map((data) => {
        if (data.user.email === email) {
          if (data.date >= startOf && data.date <= endOf) {
            total = total + parseFloat(data.amount);
          }
        }
      })
    );
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  async getTotalExpensesAmountOfMonthByYear(email, year) {
    const expensesByMonth = {};
    const subtract = moment().year() - moment(year).year();
    const startOf = moment()
      .subtract(subtract, "year")
      .startOf("year")
      .format();
    const endOf = moment().subtract(subtract, "year").endOf("year").format();
    await axios.get(`${URL}/api/controller/get/expense`).then((result) =>
      result.data.map((data) => {
        if (data.user.email === email) {
          if (data.date >= startOf && data.date <= endOf) {
            const month = moment(data.date).format("MMM");
            const amount = parseFloat(data.amount);

            if (expensesByMonth[month]) {
              expensesByMonth[month] += amount;
            } else {
              expensesByMonth[month] = amount;
            }
          }
        }
      })
    );
    const result = [];
    for (const month in expensesByMonth) {
      const totalAmount = expensesByMonth[month];
      result.push({ month, totalAmount });
    }

    return result;
  }
}

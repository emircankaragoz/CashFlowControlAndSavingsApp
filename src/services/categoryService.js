import axios from "axios";
import { URL } from "../../environment";
import moment from "moment";

export default class CategoryService {
  // GET CATEGORİES FROM USER'S EXPENDITURES
  async getCategoriesByUserExpenses(email) {
    const categories = [];
    let isExisting = false;
    await axios.get(`${URL}/api/controller/get/expense`).then((result) => {
      result.data.map((data) => {
        if (data.user.email === email) {
          if (typeof categories !== "undefined" && categories.length > 0) {
            for (let i = 0; i < categories.length; i++) {
              if (categories[i].slug === data.category.slug) {
                isExisting = true;
                break;
              }
            }
            if (!isExisting) categories.push(data.category);
            isExisting = false;
          } else categories.push(data.category);
        }
      });
    });
    return categories
  }

  // GET TOTAL EXPENSES AMOUNT BY CATEGORY
  async getTotalExpensesAmountByCategory(email, category) {
    let total = 0;
    await axios.get(`${URL}/api/controller/get/expense`).then((result) =>
      result.data.map((data) => {
        if (data.user.email === email) {
          if (data.category.slug === category) {
            total = total + parseFloat(data.amount);
          }
        }
      })
    );
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  // GET LAST 1 YEAR EXPENSES AMOUNT BY CATEGORY
  async getLastOneYearExpensesAmountByCategory(email, category) {
    let total = 0;
    let oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 1);
    await axios.get(`${URL}/api/controller/get/expense`).then((result) =>
      result.data.map((data) => {
        if (data.user.email === email) {
          if (data.category.slug === category) {
            if (data.date >= oneYearFromNow.toISOString()) {
              total = total + parseFloat(data.amount);
            }
          }
        }
      })
    );
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  // GET LAST 1 MONTH EXPENSES AMOUNT BY CATEGORY
  async getLastOneMonthExpensesAmountByCategory(email, category) {
    let total = 0;
    let oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() - 1);
    await axios.get(`${URL}/api/controller/get/expense`).then((result) =>
      result.data.map((data) => {
        if (data.user.email === email) {
          if (data.category.slug === category) {
            if (data.date >= oneMonthFromNow.toISOString()) {
              total = total + parseFloat(data.amount);
            }
          }
        }
      })
    );
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  // GET YESTERDAY EXPENSES AMOUNT BY CATEGORY
  async getYesterdayExpensesAmountByCategory(email, category) {
    let total = 0;
    const startOf = moment().subtract(1, "days").startOf("day").format();
    const endOf = moment().subtract(1, "days").endOf("day").format();
    await axios.get(`${URL}/api/controller/get/expense`).then((result) =>
      result.data.map((data) => {
        if (data.user.email === email) {
          if (data.category.slug === category) {
            if (data.date >= startOf && data.date <= endOf) {
              total = total + parseFloat(data.amount);
            }
          }
        }
      })
    );
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  // GET TODAY EXPENSES AMOUNT BY CATEGORY
  async getTodayExpensesAmountByCategory(email, category) {
    let total = 0;
    const startOf = moment().startOf("day").format();
    const endOf = moment().endOf("day").format();
    await axios.get(`${URL}/api/controller/get/expense`).then((result) =>
      result.data.map((data) => {
        if (data.user.email === email) {
          if (data.category.slug === category) {
            if (data.date >= startOf && data.date <= endOf) {
              total = total + parseFloat(data.amount);
            }
          }
        }
      })
    );
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }
}

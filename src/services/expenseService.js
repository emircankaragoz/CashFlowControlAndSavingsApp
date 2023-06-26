import axios from "axios";
import { URL } from "../../environment";
import moment from "moment";

export default class ExpenseService {

  // GET ALL EXPENSES TO SESSION USER WITH EMAIL
  async getExpensesByUserEmail(email) {
    let expenses = [];
    await axios.get(`${URL}/api/controller/get/expense`).then((result) =>
      result.data.map((data) => {
        if (data.user.email === email) {
          expenses.push(data);
        }
      })
    );
    return expenses;
  }

  // GET TOTAL EXPENSES AMOUNT TO SESSION USER
  async getTotalExpensesAmountByEmail(email) {
    let total = 0;
    await axios.get(`${URL}/api/controller/get/expense`).then((result) =>
      result.data.map((data) => {
        if (data.user.email === email) {
          total = total + parseFloat(data.amount)
        }
      })
    );
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }


  // GET LAST 1 YEAR EXPENSES AMOUNT TO SESSION USER
  async getLastOneYearExpensesAmountByEmail(email) {
    let total = 0;
    let oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 1);
    await axios.get(`${URL}/api/controller/get/expense`).then((result) =>
      result.data.map((data) => {
        if (data.user.email === email) {
          if(data.date >= oneYearFromNow.toISOString()){
            total = total + parseFloat(data.amount)
          }
        }
      })
    );
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }


  // GET LAST 1 MONTH EXPENSES AMOUNT TO SESSION USER
  async getLastOneMonthExpensesAmountByEmail(email) {
    let total = 0;
    let oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() - 1);
    await axios.get(`${URL}/api/controller/get/expense`).then((result) =>
      result.data.map((data) => {
        if (data.user.email === email) {
          if(data.date >= oneMonthFromNow.toISOString()){
            total = total + parseFloat(data.amount)
          }
        }
      })
    );
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
  }

  // GET YESTERDAY EXPENSES AMOUNT TO SESSION USER
  async getYesterdayExpensesAmountByEmail(email) {
    let total = 0;
    const startOf = moment().subtract(1, 'days').startOf('day').format();
    const endOf = moment().subtract(1, 'days').endOf('day').format()
    await axios.get(`${URL}/api/controller/get/expense`).then((result) =>
      result.data.map((data) => {
        if (data.user.email === email) {
          if(data.date >= startOf && data.date <= endOf){
            total = total + parseFloat(data.amount)
          }
        }
      })
    );
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
  }


  // GET TODAY EXPENSES AMOUNT TO SESSION USER
  async getTodayExpensesAmountByEmail(email) {
    let total = 0;
    const startOf = moment().startOf('day').format();
    const endOf = moment().endOf('day').format()
    await axios.get(`${URL}/api/controller/get/expense`).then((result) =>
      result.data.map((data) => {
        if (data.user.email === email) {
          if(data.date >= startOf && data.date <= endOf){
            total = total + parseFloat(data.amount)
          }
        }
      })
    );
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
  }



}

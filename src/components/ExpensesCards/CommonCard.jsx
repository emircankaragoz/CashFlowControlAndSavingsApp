import { useState, useEffect } from "react";
import { ExpenseService } from "../../services";

export default function CommonCard({ session }) {
  const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);
  const [lastOneYearExpensesAmount, setLastOneYearExpensesAmount] = useState(0);
  const [lastOneMonthExpensesAmount, setLastOneMonthExpensesAmount] =
    useState(0);
  const [yesterdayExpensesAmount, setYesterdayExpensesAmount] = useState(0);
  const [todayExpensesAmount, setTodayExpensesAmount] = useState(0);

  // create a instance for get expenses datas
  const expenseService = new ExpenseService();

  // create session email variable
  const userEmail = session.user.email;

  // GET TOTAL ESPENSES BY USER EMAIL
  async function getTotalExpensesAmountByEmailHandler() {
    if (session) {
      await expenseService
        .getTotalExpensesAmountByEmail(userEmail)
        .then((result) => setTotalExpensesAmount(result));
    }
  }

  // GET LAST ONE YEAR EXPENSES BY USER EMAIL
  async function getLastOneYearExpensesAmountByEmailHandler() {
    if (session) {
      await expenseService
        .getLastOneYearExpensesAmountByEmail(userEmail)
        .then((result) => setLastOneYearExpensesAmount(result));
    }
  }

  // GET LAST ONE MONTH EXPENSES BY USER EMAIL
  async function getLastOneMonthExpensesAmountByEmailHandler() {
    if (session) {
      await expenseService
        .getLastOneMonthExpensesAmountByEmail(userEmail)
        .then((result) => setLastOneMonthExpensesAmount(result));
    }
  }

  // GET YESTERDAY EXPENSES BY USER EMAIL
  async function getYesterdayExpensesAmountByEmailHandler() {
    if (session) {
      await expenseService
        .getYesterdayExpensesAmountByEmail(userEmail)
        .then((result) => setYesterdayExpensesAmount(result));
    }
  }

  // GET TODAY EXPENSES BY USER EMAIL
  async function getTodayExpensesAmountByEmailHandler() {
    if (session) {
      await expenseService
        .getTodayExpensesAmountByEmail(userEmail)
        .then((result) => setTodayExpensesAmount(result));
    }
  }

  useEffect(() => {
    getTotalExpensesAmountByEmailHandler();
    getLastOneYearExpensesAmountByEmailHandler();
    getLastOneMonthExpensesAmountByEmailHandler();
    getYesterdayExpensesAmountByEmailHandler();
    getTodayExpensesAmountByEmailHandler();
  }, []);

  return (
    <div className={`${`border rounded bg-white p-2 mb-2 tcolor-brand`}`}>
      <div className="container">
        <p className="fs-3 fw-semibold text-center mb-4">Genel</p>
        <div>
          <div className="row gap-1">
            <div className="col-sm border rounded py-2">
              <p className="fs-5 fw-semibold">Şu Ana Kadar</p>
              <span className="me-1 fw-semibold text-muted">₺</span>
              <span className="fw-semibold fs-3 text-danger">
                {totalExpensesAmount}
              </span>
            </div>
            <div className="col-sm border rounded py-2">
              <p className="fs-5 fw-semibold">Son 1 Yıl</p>
              <span className="me-1 fw-semibold text-muted">₺</span>
              <span className="fw-semibold text-danger fs-3">
                {lastOneYearExpensesAmount}
              </span>
            </div>
            <div className="col-sm border rounded py-2">
              <p className="fs-5 fw-semibold">Son 1 Ay</p>
              <span className="me-1 fw-semibold text-muted">₺</span>
              <span className="fw-semibold text-danger fs-3">
                {lastOneMonthExpensesAmount}
              </span>
            </div>
            <div className="col-sm border rounded py-2">
              <p className="fs-5 fw-semibold">Dün</p>
              <span className="me-1 fw-semibold text-muted">₺</span>
              <span className="fw-semibold text-danger fs-3">
                {yesterdayExpensesAmount}
              </span>
            </div>
            <div className="col-sm border rounded py-2">
              <p className="fs-5 fw-semibold">Bugün</p>
              <span className="me-1 fw-semibold text-muted">₺</span>
              <span className="fw-semibold text-danger fs-3">
                {todayExpensesAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .tcolor-brand {
          color: #3f3d56;
        }
      `}</style>
    </div>
  );
}

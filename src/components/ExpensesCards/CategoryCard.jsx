import { CategoryService } from "@/services";
import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function CategoryCard({ session }) {
  const [key, setKey] = useState("market");
  const [categoriesByUserExpenses, setCategoriesByUserExpenses] = useState([]);
  const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);
  const [lastOneYearExpensesAmount, setLastOneYearExpensesAmount] = useState(0);
  const [lastOneMonthExpensesAmount, setLastOneMonthExpensesAmount] =
    useState(0);
  const [yesterdayExpensesAmount, setYesterdayExpensesAmount] = useState(0);
  const [todayExpensesAmount, setTodayExpensesAmount] = useState(0);

  // create a instance for get expenses datas
  const categoryService = new CategoryService();

  // create session email variable
  const userEmail = session.user.email;

  // GET CATEGORIES
  async function getCategoriesByUserExpensesHandler() {
    if (session) {
      await categoryService
        .getCategoriesByUserExpenses(userEmail)
        .then((result) => setCategoriesByUserExpenses(result));
    }
  }


  // GET TOTAL ESPENSES BY CATEGORY
  async function getTotalExpensesAmountByCategoryHandler() {
    if (session) {
      await categoryService
        .getTotalExpensesAmountByCategory(userEmail, key)
        .then((result) => setTotalExpensesAmount(result));
    }
  }

  // GET LAST ONE YEAR EXPENSES BY CATEGORY
  async function getLastOneYearExpensesAmountByCategoryHandler() {
    if (session) {
      await categoryService
        .getLastOneYearExpensesAmountByCategory(userEmail, key)
        .then((result) => setLastOneYearExpensesAmount(result));
    }
  }

  // GET LAST ONE MONTH EXPENSES BY CATEGORY
  async function getLastOneMonthExpensesAmountByCategoryHandler() {
    if (session) {
      await categoryService
        .getLastOneMonthExpensesAmountByCategory(userEmail, key)
        .then((result) => setLastOneMonthExpensesAmount(result));
    }
  }

  async function getYesterdayExpensesAmountByCategoryHandler() {
    if (session) {
      await categoryService
        .getYesterdayExpensesAmountByCategory(userEmail, key)
        .then((result) => setYesterdayExpensesAmount(result));
    }
  }

  async function getTodayExpensesAmountByCategory() {
    if (session) {
      await categoryService
        .getTodayExpensesAmountByCategory(userEmail, key)
        .then((result) => setTodayExpensesAmount(result));
    }
  }

  useEffect(() => {
    getTotalExpensesAmountByCategoryHandler();
    getLastOneYearExpensesAmountByCategoryHandler();
    getLastOneMonthExpensesAmountByCategoryHandler();
    getYesterdayExpensesAmountByCategoryHandler();
    getTodayExpensesAmountByCategory();
    getCategoriesByUserExpensesHandler();
  }, [key]);

  return (
    <div className="border rounded bg-white p-2 mb-2 tcolor-brand" style={{backgroundColor: '#3f3d56;'}}>
      <div className="container">
        <p className="fs-3 fw-semibold text-center mb-4">Kategoriler</p>
        <div>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 justify-content-center"
          >
            {categoriesByUserExpenses.map((category) => (
              <Tab
                key={category.slug}
                eventKey={category.slug}
                title={category.name}
              >
                <div className="mx-3">
                  <div>
                    <div className="row gap-1">
                      <div className="col-sm border rounded py-2">
                        <p className="fs-5 fw-semibold">Şu Ana Kadar</p>
                        <span className="me-1 fw-semibold text-muted">₺</span>
                        <span className="fw-semibold text-warning fs-3">
                          {totalExpensesAmount}
                        </span>
                      </div>
                      <div className="col-sm border rounded py-2">
                        <p className="fs-5 fw-semibold">Son 1 Yıl</p>
                        <span className="me-1 fw-semibold text-muted">₺</span>
                        <span className="fw-semibold text-warning fs-3">
                          {lastOneYearExpensesAmount}
                        </span>
                      </div>
                      <div className="col-sm border rounded py-2">
                        <p className="fs-5 fw-semibold">Son 1 Ay</p>
                        <span className="me-1 fw-semibold text-muted">₺</span>
                        <span className="fw-semibold text-warning fs-3">
                          {lastOneMonthExpensesAmount}
                        </span>
                      </div>
                      <div className="col-sm border rounded py-2">
                        <p className="fs-5 fw-semibold">Dün</p>
                        <span className="me-1 fw-semibold text-muted">₺</span>
                        <span className="fw-semibold text-warning fs-3">
                          {yesterdayExpensesAmount}
                        </span>
                      </div>
                      <div className="col-sm border rounded py-2">
                        <p className="fs-5 fw-semibold">Bugün</p>
                        <span className="me-1 fw-semibold text-muted">₺</span>
                        <span className="fw-semibold text-warning fs-3">
                          {todayExpensesAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            ))}
          </Tabs>
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

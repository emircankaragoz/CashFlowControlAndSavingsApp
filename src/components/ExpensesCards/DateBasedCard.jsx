import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { DateBasedService } from "@/services";
import moment from 'moment';
moment.locale('tr')

export default function YearBasedCard({ session }) {
  const [yearsByUserExpenses, setYearsByUserExpenses] = useState([]);
  const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);
  const [totalExpensesAmountOfMonths, setTotalExpensesAmountOfMonths] =
    useState([]);
  const [key, setKey] = useState();

  // create a instance for get expenses datas
  const datebasedService = new DateBasedService();

  // create session email variable
  const userEmail = session.user.email;

  // GET YEARS FROM USER'S EXPENDITURES
  async function getYearsByUserExpensesHandler() {
    if (session) {
      await datebasedService
        .getYearsByUserExpenses(userEmail)
        .then((result) => setYearsByUserExpenses(result));
    }
  }

  // GET TOTAL EXPENSES AMOUNT BY YEAR
  async function getTotalExpensesAmountByYearHandler() {
    if (session) {
      await datebasedService
        .getTotalExpensesAmountByYear(userEmail, key)
        .then((result) => setTotalExpensesAmount(result));
    }
  }

  async function getTotalExpensesAmountOfMonthByYearHandler() {
    if (session) {
      await datebasedService
        .getTotalExpensesAmountOfMonthByYear(userEmail, key)
        .then((result) => setTotalExpensesAmountOfMonths(result));
    }
  }

  useEffect(() => {
    getYearsByUserExpensesHandler();
    getTotalExpensesAmountByYearHandler();
    getTotalExpensesAmountOfMonthByYearHandler();
  }, [key]);

  return (
    <div className="border rounded bg-white p-2 mb-4 mt-4 tcolor-brand">
      <div className="container">
        <div>
          <p className="fs-3 fw-semibold text-center mb-4 ">Gün/Ay/Yıl</p>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 justify-content-center"
          >
            {yearsByUserExpenses.sort().map((year, index) => (
              <Tab key={index} eventKey={year} title={year}>
                <div>
                  <div>
                    <span className="fs-6 fw-semibold">Toplam</span> <br />
                    <span className="me-1 fw-semibold text-muted">₺</span>
                    <span className="fw-semibold text-warning fs-4">
                      {totalExpensesAmount}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="row gap-1">
                    {totalExpensesAmountOfMonths.map((expense) => (
                      <div className="col-sm border rounded py-2">
                        <p className="fs-5 fw-semibold">{expense.month}</p>
                        <span className="me-1 fw-semibold text-muted">₺</span>
                        <span className="fw-semibold text-warning fs-3">
                          {expense.totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                        </span>
                      </div>
                    ))}
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

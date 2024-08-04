import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/index";
import { fetchDashboard } from "../store/dashboardSlice";
import LineChart from './LineChart';
import BarChart from './BarChart';
import RightPart from "./RightPart";
import { DashboardExpense,DashboardCategory,DashboardIncome } from "../store/dashboardSlice";
const DashBoardRightPart: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.dashboard);
  const expense = state.expense
  const income = state.income
  const category = state.category
  
  const expenseDate: string[] = [];
  const expenseAmount: number[] = [];
  expense.forEach((e:DashboardExpense) => {
    expenseDate.push(e.month);
    expenseAmount.push(e.amount);
  });
  const incomeDate: string[] = [];
  const incomeAmount: number[] = [];
  income.forEach((e:DashboardIncome) => {
    incomeDate.push(e.month);
    incomeAmount.push(e.amount);
  });
  const categoryAmount: number[] = [];
  const categoryLabel: string[] = [];
  category.forEach((e:DashboardCategory) => {
    categoryAmount.push(e.amount);
    categoryLabel.push(e.category);
  });

  useEffect(() => {
    dispatch(fetchDashboard());
    console.log(expenseDate);
  }, [dispatch]);

  return (
    <RightPart>
      <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ">
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6 col-span-1 sm:col-span-1 lg:col-span-2">
            <LineChart label = {incomeDate} expensedatavalues={expenseAmount} incomedatavalue={incomeAmount}/>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6 col-span-1 sm:col-span-1 lg:col-span-2">
            <BarChart label={categoryLabel} datavalues={categoryAmount}/>
          </div>
            
        </div>
        
    </RightPart>

  );
};

export default DashBoardRightPart;

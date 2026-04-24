import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import PageHeader from "../components/PageHeader";
import {
 FaShoppingCart,
 FaTruck,
 FaBan,
 FaDollarSign
} from "react-icons/fa";

import {
 ResponsiveContainer,
 AreaChart,
 Area,
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid
} from "recharts";

function Card({ icon, value, label, bg }) {
 return (
   <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
     <div className="flex items-center gap-4">
       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl ${bg}`}>
         {icon}
       </div>

       <div>
         <p className="text-3xl font-bold text-gray-800">
           {value}
         </p>
         <p className="text-sm text-gray-400">
           {label}
         </p>
       </div>
     </div>
   </div>
 );
}

export default function Dashboard(){

 const chartData = [
   {month:"Jan", orders:30, revenue:120},
   {month:"Feb", orders:45, revenue:180},
   {month:"Mar", orders:38, revenue:150},
   {month:"Apr", orders:60, revenue:260},
   {month:"May", orders:72, revenue:320},
   {month:"Jun", orders:90, revenue:400},
 ];

 return(
  <div className="flex bg-gray-50 min-h-screen">
   <Sidebar/>

   <div className="flex-1">
    <Header/>

    <div className="px-6 py-5">
      <PageHeader/>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-5">

        <Card
         icon={<FaShoppingCart/>}
         value="75"
         label="Total Orders"
         bg="bg-green-500"
        />

        <Card
         icon={<FaTruck/>}
         value="175"
         label="Delivered"
         bg="bg-blue-500"
        />

        <Card
         icon={<FaBan/>}
         value="40"
         label="Canceled"
         bg="bg-red-500"
        />

        <Card
         icon={<FaDollarSign/>}
         value="Rp 128 Jt"
         label="Revenue"
         bg="bg-yellow-500"
        />

      </div>


      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

        {/* ORDERS CHART */}
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">

          <div className="flex justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Orders Analytics
              </h2>

              <p className="text-sm text-gray-400">
                Tren pertumbuhan pesanan
              </p>
            </div>

            <div className="text-right">
              <p className="text-green-600 font-bold">
                +18.4%
              </p>

              <span className="text-xs text-gray-400">
                vs last month
              </span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={330}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid
               strokeDasharray="3 3"
               vertical={false}
               stroke="#ececec"
              />

              <XAxis
               dataKey="month"
               axisLine={false}
               tickLine={false}
              />

              <YAxis
               axisLine={false}
               tickLine={false}
              />

              <Tooltip
               contentStyle={{
                borderRadius:"16px",
                border:"none",
                boxShadow:"0 10px 25px rgba(0,0,0,.08)"
               }}
              />

              <Area
               type="monotone"
               dataKey="orders"
               stroke="#22c55e"
               strokeWidth={4}
               fill="url(#orderGradient)"
              />

            </AreaChart>
          </ResponsiveContainer>

        </div>


        {/* REVENUE CHART */}
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">

          <div className="flex justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Revenue Overview
              </h2>

              <p className="text-sm text-gray-400">
                Pendapatan bulanan
              </p>
            </div>

            <div className="text-right">
              <p className="text-blue-600 font-bold">
                +27.1%
              </p>

              <span className="text-xs text-gray-400">
                revenue growth
              </span>
            </div>
          </div>


          <ResponsiveContainer width="100%" height={330}>
            <BarChart data={chartData} barSize={36}>

              <CartesianGrid
               strokeDasharray="3 3"
               vertical={false}
               stroke="#ececec"
              />

              <XAxis
               dataKey="month"
               axisLine={false}
               tickLine={false}
              />

              <YAxis
               axisLine={false}
               tickLine={false}
              />

              <Tooltip
               contentStyle={{
                borderRadius:"16px",
                border:"none",
                boxShadow:"0 10px 25px rgba(0,0,0,.08)"
               }}
              />

              <Bar
               dataKey="revenue"
               fill="#3b82f6"
               radius={[12,12,0,0]}
              />

            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
   </div>
  </div>
 )
}
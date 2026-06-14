import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer
} from "recharts";

const data = [
 {name:"Jan",value:20},
 {name:"Feb",value:40},
 {name:"Mar",value:70},
 {name:"Apr",value:55},
];

export default function Analytics(){

 return(

 <div className="p-8">

 <h1 className="text-4xl font-bold mb-8">
 Analytics
 </h1>

 <div className="h-[400px] bg-slate-900 rounded-2xl p-4">

 <ResponsiveContainer>

 <BarChart data={data}>
 <XAxis dataKey="name"/>
 <YAxis/>
 <Tooltip/>
 <Bar dataKey="value"/>
 </BarChart>

 </ResponsiveContainer>

 </div>

 </div>
 )
}
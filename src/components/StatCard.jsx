import { motion } from "framer-motion";

export default function StatCard({
 title,
 value
}){

 return(
  <motion.div
   whileHover={{scale:1.03}}
   className="
   bg-slate-900
   p-6
   rounded-2xl
   border
   border-slate-700
  "
  >
   <h3 className="text-gray-400">
    {title}
   </h3>

   <p className="text-4xl font-bold text-cyan-400 mt-3">
    {value}
   </p>
  </motion.div>
 )
}
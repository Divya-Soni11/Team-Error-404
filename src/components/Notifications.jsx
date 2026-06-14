import { useState } from "react";

const initialNotifications = [
  {
    id: 1,
    type: "alert",
    title: "Critical Maintenance Alert",
    message: "VoltRide S3 battery health is critically low. Immediate service recommended.",
    time: "10 mins ago",
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "Product Published",
    message: "AeroBreeze Smart AC has been successfully registered to the catalog.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "AI Manual Processing Complete",
    message: "The maintenance schedule for AquaPure H2O Purifier has been extracted.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 4,
    type: "system",
    title: "System Update",
    message: "Dashboard analytics will be offline for 15 minutes tonight for scheduled upgrades.",
    time: "1 day ago",
    read: true,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case "alert":
        return "⚠️";
      case "success":
        return "✅";
      case "info":
        return "🤖";
      default:
        return "⚙️";
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-8 font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-white">Notifications</h1>
          <p className="text-slate-400 mt-2">Manage your alerts and system updates.</p>
        </div>
        
        <button 
          onClick={markAllAsRead}
          className="text-cyan-400 hover:text-cyan-300 font-semibold bg-cyan-900/20 px-4 py-2 rounded-lg transition-colors"
        >
          Mark all as read
        </button>
      </div>

      {/* Notification List */}
      <div className="max-w-4xl space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`flex items-start gap-5 p-6 rounded-2xl border transition-colors ${
              notification.read 
                ? "bg-[#151D2C] border-slate-800 opacity-70" 
                : "bg-slate-800 border-slate-700 shadow-lg"
            }`}
          >
            {/* Icon */}
            <div className="text-3xl mt-1">
              {getIcon(notification.type)}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className={`text-lg font-bold ${notification.read ? "text-slate-300" : "text-white"}`}>
                  {notification.title}
                </h3>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap ml-4">
                  {notification.time}
                </span>
              </div>
              <p className={`mt-1 ${notification.read ? "text-slate-400" : "text-slate-300"}`}>
                {notification.message}
              </p>
            </div>

            {/* Unread Dot Indicator */}
            {!notification.read && (
              <div className="w-3 h-3 rounded-full bg-cyan-400 mt-2 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
            )}
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl font-semibold">No notifications right now.</p>
          </div>
        )}
      </div>

    </div>
  );
}
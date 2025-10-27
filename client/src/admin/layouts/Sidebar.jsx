import {
  BarChart2,
  DollarSign,
  Menu,
  MessageSquare,
  Settings,
  NotebookPen,
  BookOpenCheck,
  ArrowLeftRight,
  TrendingUp,
  Users,
  User,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", icon: BarChart2, color: "#6366f1", href: "/admin" },
  { name: "Add Packages", icon: Users, color: "#8B5CF6", href: "/addpackages" },
  { name: "View Packages", icon: NotebookPen, color: "#EC4899", href: "/viewpackages" },
  { name: "Add Blogs", icon: ArrowLeftRight, color: "#10B981", href: "/addblogs" },
  { name: "View Blogs", icon: BookOpenCheck, color: "#F59E0B", href: "/viewblogs" },
  { name: "Add Variation", icon: ArrowLeftRight, color: "#10B981", href: "/addvariation" },
  { name: "View Variations", icon: BookOpenCheck, color: "#F59E0B", href: "/viewvariations" },
  { name: "Add Testimonial", icon: ArrowLeftRight, color: "#10B981", href: "/addtestimonial" },
  { name: "View Testimonial", icon: BookOpenCheck, color: "#F59E0B", href: "/viewtestimonials" },
  { name: "Add Programs", icon: ArrowLeftRight, color: "#10B981", href: "/addprograms" },
  { name: "View Programs", icon: BookOpenCheck, color: "#F59E0B", href: "/viewprograms" },
  { name: "Update Programs", icon: BookOpenCheck, color: "#F59E0B", href: "/updateprogram/:id" },
  { name: "Your Orders", icon: MessageSquare, color: "#6EE7B7", href: "/patients" },
  { name: "Complain's", icon: TrendingUp, color: "#3B82F6", href: "/" },
  { name: "Feedbacks", icon: MessageSquare, color: "#6EE7B7", href: "/" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-100 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      {/* ✅ Scrollable Sidebar Container */}
      <div className="h-screen bg-gray-800 bg-opacity-50 backdrop-blur-md border-r border-gray-700 flex flex-col">
        {/* Top Button */}
        <div className="p-4 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
          >
            <Menu size={24} />
          </motion.button>
        </div>

        {/* ✅ Scrollable Nav Section */}
        <nav
          className="flex-grow overflow-y-auto px-2 pb-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          style={{ scrollbarWidth: "thin" }}
        >
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-3 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-1">
                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap text-gray-200"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;

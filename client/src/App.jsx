import Packagepage from "./components/Packagepage"
import About from "./components/About"
import Contact from "./components/Contact"
import { Route,Routes,Navigate } from "react-router-dom"
import Home from "./components/Home"
import Policy from "./components/Policy"
import Blogs from "./components/Blogs"
import Login from "./auth/Login/Login"
import Register from "./auth/Register/Register"
import { useAuth } from './contexts/AuthContext';
import AdminDashboard from "./admin/pages/AdminDashboard"
import AddBlogs from "./admin/pages/AddBlogs"
import ViewBlogs from "./admin/pages/ViewBlogs"
import UpdateBlogs from "./admin/pages/UpdateBlogs"
import CompleteBlog from "./components/CompleteBlog"
import AddVariation from "./admin/pages/AddVariation"
import ViewVariation from "./admin/pages/ViewVariation"
import UpdateVariation from "./admin/pages/UpdateVariation"
import AddPackages from "./admin/pages/AddPackages"
import ViewPackages from "./admin/pages/ViewPackages"
import UpdatePackages from "./admin/pages/UpdatePackages"
import PackageShow from "./components/PackageShow"
import UpdateOrder from "./admin/pages/UpdateOrder"
import Checkout from "./components/Checkout"
import CheckData from "./components/CheckData"
import Consult from "./components/Consult"
import CustomerDetails from "./admin/pages/Patient"
import UpdateCustomer from "./admin/pages/UpdateCustomer" 
import PayNow from "./components/PayNow"
import Terms from "./components/Terms"
function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/packages" element={<Packagepage/>}/>
    <Route path="/packageshow/:id" element={<PackageShow/>}/>
    <Route path="/checkout/:id" element={<Checkout/>}/>
    <Route path="/policy" element={<Policy/>}/>
    <Route path="/blogs" element={<Blogs/>}/>
    <Route path="/blog/:id" element={<CompleteBlog />} />
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/login" element={!isAuthenticated ? <Login/> : <Navigate to="/admin"/>}/>
    <Route path="/register" element={!isAuthenticated ? <Register/> : <Navigate to="/admin"/>}/>
    <Route path="/checkdata" element={<CheckData/>}/>
    <Route path="/consult" element={<Consult/>}/>
    <Route path="/payment/:userId" element={<PayNow/>}/>
    <Route path="/terms" element={<Terms/>}/>
    //admin routes
    <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login"/>} />
    <Route path="/addblogs" element={isAuthenticated ? <AddBlogs /> : <Navigate to="/login"/>} />
    <Route path="/viewblogs" element={isAuthenticated ? <ViewBlogs /> : <Navigate to="/login"/>} />
    <Route path="/updateblog/:id" element={isAuthenticated ? <UpdateBlogs/> : <Navigate to="/login"/>} />
    <Route path="/addvariation" element={isAuthenticated ? <AddVariation /> : <Navigate to="/login"/>} />
    <Route path="/viewvariations" element={isAuthenticated ? <ViewVariation /> : <Navigate to="/login"/>} />
    <Route path="/updatevariation/:id" element={isAuthenticated ? <UpdateVariation/> : <Navigate to="/login"/>} />
    <Route path="/addpackages" element={isAuthenticated ? <AddPackages /> : <Navigate to="/login"/>} />
    <Route path="/viewpackages" element={isAuthenticated ? <ViewPackages /> : <Navigate to="/login"/>} />
    <Route path="/updatepackages/:id" element={isAuthenticated ? <UpdatePackages/> : <Navigate to="/login"/>} />
    {/* <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/login"/>} /> */}
    <Route path="/patients" element={isAuthenticated ? <CustomerDetails /> : <Navigate to="/login"/>} />
    <Route path="/updatecustomer/:id" element={isAuthenticated ? <UpdateCustomer/> : <Navigate to="/login"/>} />
    
    <Route path="/updateorder/:id" element={isAuthenticated ? <UpdateOrder/> : <Navigate to="/login"/>} />
    {/* Redirect any unmatched routes to home */}
    </Routes>
    </>
  )
}

export default App

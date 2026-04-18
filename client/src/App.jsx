import {Home,AboutUs,Contact,Packagepage,
Policy,Blogs,CompleteBlog,PackageShow,Checkout,CheckData,
Consult,PayNow,Terms,TestimonialMain,OurPrograms,CompleteProgram,
PaySuccess,
} from './components/index';
import {
  AdminDashboard,AddBlogs,ViewBlogs,UpdateBlogs,AddVariation,
  ViewVariation,UpdateVariation,UpdateOrder,CustomerDetails,
  UpdateCustomer,AddTestimonial,ViewTestimonials,AddPrograms,
  ViewPrograms,UpdateProgram,
} from "./admin/pages/index";
import { Route,Routes,Navigate } from "react-router-dom"
import Login from "./auth/Login/Login"
import Register from "./auth/Register/Register"
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<AboutUs/>}/>
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
    <Route path="/success/:userId" element={<PaySuccess/>}/>
    <Route path="/terms" element={<Terms/>}/>
    <Route path="/testimonials" element={<TestimonialMain/>}/>
    <Route path="/programs" element={<OurPrograms/>}/>
    <Route path="/program/:id" element={<CompleteProgram />} />
    //admin routes
    <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login"/>} />
    <Route path="/addblogs" element={isAuthenticated ? <AddBlogs /> : <Navigate to="/login"/>} />
    <Route path="/viewblogs" element={isAuthenticated ? <ViewBlogs /> : <Navigate to="/login"/>} />
    <Route path="/updateblog/:id" element={isAuthenticated ? <UpdateBlogs/> : <Navigate to="/login"/>} />
    <Route path="/addvariation" element={isAuthenticated ? <AddVariation /> : <Navigate to="/login"/>} />
    <Route path="/viewvariations" element={isAuthenticated ? <ViewVariation /> : <Navigate to="/login"/>} />
    <Route path="/updatevariation/:id" element={isAuthenticated ? <UpdateVariation/> : <Navigate to="/login"/>} />
    <Route path="/addtestimonial" element={isAuthenticated ? <AddTestimonial /> : <Navigate to="/login"/>} />
    <Route path="/viewtestimonials" element={isAuthenticated ? <ViewTestimonials /> : <Navigate to="/login"/>} />
    {/* <Route path="/addpackages" element={isAuthenticated ? <AddPackages /> : <Navigate to="/login"/>} />
    <Route path="/viewpackages" element={isAuthenticated ? <ViewPackages /> : <Navigate to="/login"/>} />
    <Route path="/updatepackages/:id" element={isAuthenticated ? <UpdatePackages/> : <Navigate to="/login"/>} />
     */}
    {/* <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/login"/>} /> */}
     <Route path="/addprograms" element={isAuthenticated ? <AddPrograms /> : <Navigate to="/login"/>} />
    <Route path="/viewprograms" element={isAuthenticated ? <ViewPrograms /> : <Navigate to="/login"/>} />
    <Route path="/updateprogram/:id" element={isAuthenticated ? <UpdateProgram/> : <Navigate to="/login"/>} />

    <Route path="/patients" element={isAuthenticated ? <CustomerDetails /> : <Navigate to="/login"/>} />
    <Route path="/updatecustomer/:id" element={isAuthenticated ? <UpdateCustomer/> : <Navigate to="/login"/>} />
    
    <Route path="/updateorder/:id" element={isAuthenticated ? <UpdateOrder/> : <Navigate to="/login"/>} />
    {/* Redirect any unmatched routes to home */}
    </Routes>
    </>
  )
}

export default App

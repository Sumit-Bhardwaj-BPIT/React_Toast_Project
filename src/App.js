import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { filterData,apiUrl } from "./data";
import Spinner from "./components/Spinner";
import { toast } from "react-toastify";

const App = () => {
  const [courses,setCourses]=useState(null);
  const[loading,setLoading]=useState(true);
  const [category,setCategory]=useState(filterData[0].title);
  async function fetchData(){

    setLoading(true);

    try{
      let response=await fetch(apiUrl);
      let output=await response.json();
      setCourses(output.data);
    }
    catch(error){
      toast.error("error");
    }
    setLoading(false);
  }
  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
       <div>
        <Navbar/>
       </div>
       <div className="bg-bgDark2">
        <Filter category={category} setCategory={setCategory} filterData={filterData} />
       </div>
       <div className="w-11/12 max-w-[1200px] 
        mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
          {
            loading?(<Spinner/>):(<Cards courses={courses} category={category}/>)
          }
       </div>
    </div>
  )
};

export default App;
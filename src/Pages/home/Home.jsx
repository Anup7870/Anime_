import React from "react";
import "./home.css";
import Nav from "../../component/nav/Nav";
import Filters from "../../component/filters/Filter";
import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IconContext } from "react-icons";
export default function Home() {
  const [top, setTop] = useState();
  const [index , setIndex] = useState(1);

  useEffect(() => {
    fetch(`https://api.consumet.org/anime/gogoanime/top-airing`)
      .then((response) => response.json())
      .then((data) =>{ 
        setTop(data.results)
        if(data.hasNextPage){
          var c =parseInt(data.currentPage);
        c=c+1;
        console.log(c)
        setIndex(c);
        }
      });
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    fetch(`https://api.consumet.org/anime/gogoanime/top-airing`);
  };

  const prevData = (e) =>{
    e.preventDefault();
    const call = async () =>{
      // setIndex()
      const responce = await fetch(`https://api.consumet.org/anime/gogoanime/top-airing?page=${index}`)
      return await responce.json();
    }  
    call().then(responce=>{
      setTop(responce.results)
      var c =parseInt(responce.currentPage);
      if(responce.currentPage>1){
        c=c-1;
        console.log(c)
        setIndex(c);
      }
    });
  }

  const nextData = (e)=>{
    e.preventDefault();
    const call = async () =>{
      var c = index;
      setIndex(c=c+1)
      const responce = await fetch(`https://api.consumet.org/anime/gogoanime/top-airing?page=${index}`)
      return await responce.json();
    }
    call().then(responce=>{
      setTop(responce.results);
      // setIndex(0);
      if(responce.hasNextPage){
        var c =parseInt(responce.currentPage);
        c=c+1;
        console.log(c)
        setIndex(c);
      }
      // console.log(index);
      
    });
  }

  // console.log(top);
  return (
    <div className="mainCont">
      <Nav />
      <div className="mainBody">
        <div className="sideBar">
          <div className="sideBarWrapper">
            <div className="search">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2 bg-rgb(29,38,125) searchInp"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>
            <Filters />
          </div>
        </div>
        <div className="contentBody">
          <div className="contentBodyWrapper">
            {top?.map((data) => (
              <div className="cardBoady">
                <div className="cardWrapper">
                  <div className="img">
                    <img src={data?.image} alt="image" />
                  </div>
                  <div className="info">
                    <p className="title">{data?.title}</p>
                    <div className="genres">{data?.genres}</div>
                    <a href={data?.url}>Watch</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="navPage">
            <div className="prev  d-flex gap-3 align-items-center justify-content-center  text-center" onClick={prevData}>
              <IconContext.Provider value={{ color: "yellow", size: "20px" }}>
                <GrFormPrevious />
              </IconContext.Provider>
              <p>Prev</p>
            </div>
            <div className="next d-flex gap-3 align-items-center justify-content-center" onClick={nextData}>
              <p>next</p>
              <IconContext.Provider value={{ color: "yellow", size: "20px" }}>
                <GrFormNext color="white" />
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

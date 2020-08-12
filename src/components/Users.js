import React, { useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";

export default function Users() {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextRes, setNextRes] = useState(true);

  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=${page}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        response.data && setSearchResults([...searchResults, ...response.data]);
        response.total_pages && setTotalPages(response.total_pages);
      })
      .catch((error) => console.log(error));
  }, [page]);

  const nextHandler = () => {
    if (page < totalPages) setPage(page + 1);
    if (page + 1 === totalPages) setNextRes(false);
  };
  const location = useLocation();

  return (
    <>
    {((location && location.loginSuccess) || (document.cookie.indexOf('login')>-1)) ?  (
    <div className="users">
      <h1>Users</h1>
      {searchResults.length ? (
        <>
          {searchResults.map((u, index) => (
            <>
              {u.first_name && (
                <div className="usernameList" key={index}>
                  <div>
                    <Link to={{ pathname: "/users/" + u.id, loginSuccess:true}}>
                      <img src={u.avatar} className="avatar" alt={u.first_name}/>
                    </Link>
                  </div>
                  <Link to={{ pathname: "/users/" + u.id, loginSuccess:true}}>
                    <div className="df fdc">
                      <div className="userListName">
                        {u.first_name} {u.last_name}
                      </div>
                      <div className="userListEmail">{u.email}</div>
                    </div>
                  </Link>
                </div>
              )}
            </>
          ))}
        </>
      ) : null}
      {nextRes && searchResults.length ? (
        <button className="next" onClick={nextHandler}>
          NEXT
        </button>
      ) : null}
    </div>):(
      <Redirect to={{ pathname: "/login"}}/>
    ) }
    </>
  );
}

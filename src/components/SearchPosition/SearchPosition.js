import React from 'react'

export default function SearchPosition(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = document.querySelector('input');
    props.searchForPosition(input.value);
  }

  return (
    <div className="container p-2">
      <form className="" onSubmit={handleSubmit}>
          <input type="text" autoComplete="off" placeholder="Search by city" required/>
          <button className="btn btn-primary mx-2" type="submit">Search</button>
      </form>
    </div>
  )
}

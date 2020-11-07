import React from "react";

function Available({ teams }) {
  // console.log("teams", teams);
  return (
    <>
      <h2>List of teams that are Available</h2>
      <ul>
        {teams.map((team) => {
          console.log(team.team.uid)
          return (
            <li key={team.team.uid}>
              {team.team.displayName} ({team.team.record.items[0].summary})
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Available;

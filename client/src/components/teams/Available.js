import React from "react";
import Table from "react-bootstrap/Table";

function Available({ teams }) {
  return (
    <>
      <h2>List of available teams</h2>
      <Table size="sm">
        <thead>
          <tr>
            <th>Team</th>
            <th className="text-nowrap">W-L-T</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => {
            const teamStyle = {
              backgroundColor: `#${team.team.color}`,
              color: "white",
            };
            return (
              <tr key={team.team.uid} style={teamStyle}>
                <td>
                  <img
                    src={team.team.logos[0].href}
                    alt={team.team.abbreviation}
                    width="25"
                  />{" "}
                  {team.team.displayName}
                </td>
                <td>{team.team.record.items[0].summary}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Available;

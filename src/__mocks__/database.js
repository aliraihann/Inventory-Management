// const dbPool = {
//   query: jest.fn((sql, values) => {
//     if (sql.includes("SELECT * FROM users WHERE employee_email = ?")) {
//       if (values[0] === "existingEmail@example.com") {
//         // Simulate existing email
//         return Promise.resolve([
//           { employee_email: "existingEmail@example.com" },
//         ]);
//       } else {
//         // Simulate non-existing email
//         return Promise.resolve([]);
//       }
//     } else if (sql.includes('INSERT INTO users')) {
//         return Promise.resolve([{ insertId: 1 }]); // Simulate successful insertion
//       }
//     // Handle other queries as needed
//   }),
// };

// export default dbPool;

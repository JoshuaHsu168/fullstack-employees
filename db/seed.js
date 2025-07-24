import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
const employees = [
    {
      name: "Tupac",
      birthday: "1971-06-16",
      salary: 590,
    },
    {
      name: "Christopher",
      birthday: "1972-05-21",
      salary: 530,
    },
    {
      name: "Nasir",
      birthday: "1973-09-14",
      salary: 260,
    },
    {
      name: "Shawn",
      birthday: "1969-12-04",
      salary: 540,
    },
    {
      name: "Earl",
      birthday: "1970-12-18",
      salary: 490,
    },
    {
      name: "Lamont",
      birthday: "1974-05-30",
      salary: 50,
    },
    {
      name: "Corey",
      birthday: "1970-01-12",
      salary: 110,
    },
    {
      name: "Dennis",
      birthday: "1970-05-09",
      salary: 100,
    },
    {
      name: "Marshall",
      birthday: "1972-10-17",
      salary: 1600,
    },
    {
      name: "Curtis",
      birthday: "1975-07-06",
      salary: 600,
    },
  ];
  for (const employee of employees) {
    await createEmployee(employee);
  }
  console.log("Database seeded successfully");
}
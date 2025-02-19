const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const employeesFile = path.join(__dirname, "employees.json");
const PORT = 3000;

const getEmployees = () => {
  try {
    const data = fs.readFileSync(employeesFile, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const addEmployee = (req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const employees = getEmployees();
    const newEmployee = JSON.parse(body);
    employees.push(newEmployee);
    const writeStream = fs.createWriteStream(employeesFile);
    writeStream.write(JSON.stringify(employees, null, 2));
    writeStream.end();
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Employee added successfully" }));
  });
};

const serveStaticFile = (res, filePath, contentType) => {
  const readStream = fs.createReadStream(filePath);
  res.writeHead(200, { "Content-Type": contentType });
  readStream.pipe(res);
  readStream.on("error", () => {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("500 - Internal Server Error");
  });
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const employees = getEmployees();
    res.end(`
            <html><head><title>Employees</title>
            <link rel="stylesheet" type="text/css" href="/style.css">
            </head>
            <body><h1>Employee List</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Salary</th>
                    <th>Level</th>
                    <th>Years</th>
                </tr>
                ${employees
                  .map(
                    (emp) => `
                <tr>
                    <td>${emp.name}</td>
                    <td>${emp.email}</td>
                    <td>${emp.salary}</td>
                    <td>${emp.level}</td>
                    <td>${emp.years}</td>
                </tr>
                `
                  )
                  .join("")}
            </table>
            </body></html>
        `);
  } else if (pathname === "/style.css") {
    serveStaticFile(res, path.join(__dirname, "style.css"), "text/css");
  } else if (pathname === "/astronomy") {
    serveStaticFile(res, path.join(__dirname, "astronomy.html"), "text/html");
  } else if (pathname === "/serbal") {
    serveStaticFile(res, path.join(__dirname, "serbal.html"), "text/html");
  } else if (pathname === "/astronomy/download") {
    res.writeHead(200, {
      "Content-Disposition": "attachment; filename=astronomy.jpg",
      "Content-Type": "image/jpeg",
    });
    fs.createReadStream(path.join(__dirname, "astronomy.jpg")).pipe(res);
  } else if (pathname === "/employee" && req.method === "POST") {
    addEmployee(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Page Not Found</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

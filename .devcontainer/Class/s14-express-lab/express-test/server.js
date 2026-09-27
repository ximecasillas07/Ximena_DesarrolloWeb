import express from 'express';

const app = express();
const PORT = 3000;

// ==========================================
// 1. MIDDLEWARE CONFIGURATION
// ==========================================
// TODO: Mount built-in JSON body parser middleware (app.use(express.json()))
app.use(express.json());

// Mock In-Memory Database
const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

const initiatives = [];

// ==========================================
// 2. ROUTES & ENDPOINTS
// ==========================================

// 2a. HTML Root Landing Route
// TODO: Create GET '/' endpoint returning a basic HTML status heading string using res.send()
app.get('/', (req, res) =>{
  res.send('<h1>SustainHub Climate Action API Engine</h1>');
});

// 2b. GET All Scientists with Query Filtering (req.query)
// TODO: Create GET '/api/scientists' endpoint
// - If req.query.dept is provided, filter scientists by department
// - Return JSON response with status 200: res.json(...)
app.get('/api/scientists', (req, res) =>{
  const { dept } = req.query;

  if(dept){
    const filtered = scientists.filter(
      (s) => s.department.toLowerCase() === dept.toLowerCase()
    );
    return res.json(filtered);
  }
  res.json(scientists);
});

// 2c. GET Single Scientist by ID (req.params)
// TODO: Create GET '/api/scientists/:id' endpoint
// - Parse req.params.id as an integer
// - Find scientist matching ID
// - Return 404 JSON error if not found, or 200 JSON object if found
app.get('/api/scientists/:id',(req, res) => {
  const scientistId = parseInt(req.params.id, 10);
  const scientist = scientists.find((s) => s.id === scientistId);

  if(!scientist){
    return res.status(404).json({error: "Scientist not found" });
  }
  res.json(scientist);
});

// 2d. POST Create New Initiative (req.body)
// TODO: Create POST '/api/initiatives' endpoint
// - Extract title, budget, and department from req.body
// - Validate fields (return 400 JSON error if missing)
// - Create new initiative object, push to array
// - Return 201 Created JSON response
app.post('/api/initiatives', (req, res) => {
  const {title, budget, department} = req.body;

  if(!title || !budget || !department){
    return res.status(400).json({error: "Title, budget, and department are required"});
  }

  const newInitiative = {
    id: initiatives.length +1,
    title,
    budget,
    department
  };

  initiatives.push(newInitiative);

  res.status(201).json(newInitiative);
});

// ==========================================
// 3. SERVER INITIALIZATION
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 SustainHub API Server running at http://localhost:${PORT}`);
});

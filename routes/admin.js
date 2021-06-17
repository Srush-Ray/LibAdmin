const router = require("express").Router();
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "laexdbkuunnaor",
  host: "ec2-34-193-113-223.compute-1.amazonaws.com",
  database: "d13p2frpf0gf2h",
  password: "7899c1f0a7d2c51e62637ab2a8ccaa3656520f236d7e296dec3ecd76096c6f5c",
  port: 5432,
  ssl: true,
});
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
router.get("/", async (req, res, next) => {
  try {
    await pool.query('SELECT * FROM "query_table"', (error, results) => {
      if (error) {
        console.log(error);
        res.status(200).json({ message: "Error. Please check connection!!" });
        // throw error;
      } else {
        // console.log(results.rows);
        res.status(200).json(results.rows);
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get("/quetype", async (req, res, next) => {
  try {
    await pool.query('SELECT * FROM "questype"', (error, results) => {
      if (error) {
        console.log(error);
        res.status(200).json({ message: "Error. Please check connection!!" });
        // throw error;
      } else {
        // console.log(results.rows);
        res.status(200).json(results.rows);
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    console.log(req.body);
    await pool.query(
      "DELETE FROM query_table WHERE id=" + req.body.id,
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(200).json({ error: "Error. Please check connection!!" });
          // throw error;
        } else {
          // console.log(results);
          res.status(200).json({ message: "Question answer deleted" });
        }
      }
    );
  } catch (error) {
    next(error);
  }
});
router.post("/addnew", async (req, res, next) => {
  try {
    console.log(req.body);
    await pool.query(
      `INSERT INTO query_table values(default,'${req.body.question}','${req.body.answer}',${req.body.satisfied},${req.body.unsatisfied},${req.body.view},'${req.body.queType}');`,
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(200).json({ error: "Error. Please check connection!!" });
          // throw error;
        } else {
          // console.log(results);
          res.status(200).json({ message: "Question answer added" });
        }
      }
    );
    // res.status(200).json({ message: "Question answer deleted" });
  } catch (error) {
    next(error);
  }
});

router.post("/deleteUnsat", async (req, res, next) => {
  try {
    console.log(req.body);
    await pool.query(
      "DELETE FROM list_unsat WHERE id=" + req.body.id,
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(200).json({ error: "Error. Please check connection!!" });
          // throw error;
        } else {
          // console.log(results);
          res.status(200).json({ message: "Question answer deleted" });
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

router.get("/unsatQ", async (req, res, next) => {
  try {
    await pool.query('SELECT * FROM "list_unsat"', (error, results) => {
      if (error) {
        console.log(error);
        res.status(200).json({ message: "Error. Please check connection!!" });
        // throw error;
      } else {
        // console.log(results.rows);
        res.status(200).json(results.rows);
      }
    });
  } catch (error) {
    next(error);
  }
});
router.get("/countUnsat", async (req, res, next) => {
  try {
    await pool.query(
      "SELECT questype.typename, (SELECT COUNT(quetype) FROM query_table WHERE query_table.quetype = questype.typename) AS count FROM questype;",
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(200).json({ message: "Error. Please check connection!!" });
          // throw error;
        } else {
          // console.log(results.rows);
          res.status(200).json(results.rows);
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

router.post("/deleteQtype", async (req, res, next) => {
  console.log(req.body);
  try {
    await pool.query(
      `DELETE FROM questype WHERE typename = '${req.body.typename}';`,
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(200).json({ message: "Error. Please check connection!!" });
          // throw error;
        } else {
          // console.log(results.rows);
          res.status(200).json({ message: "Question Type deleted" });
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

router.post("/editqa", async (req, res, next) => {
  console.log(req.body);
  try {
    await pool.query(
      `UPDATE query_table SET question='${req.body.questionNew}',answer='${req.body.answerNew}' where id=${req.body.qid}`,
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(200).json({ message: "Error. Please check connection!!" });
          // throw error;
        } else {
          // console.log(results.rows);
          res.status(200).json({ message: "Update done" });
        }
      }
    );
  } catch (error) {
    next(error);
  }
});
router.post("/addquesType", async (req, res, next) => {
  console.log(req.body);
  try {
    await pool.query(
      `INSERT INTO questype values(default,'${req.body.queTypeNew}');`,
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(200).json({ error: "Error. Please check connection!!" });
          // throw error;
        } else {
          // console.log(results);
          res.status(200).json({ message: "New Question Type added" });
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;

//insert into QuesType values(1,'is_canteen');

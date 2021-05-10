const express = require('express');
// const dotenv = require("dotenv").config({ debug: process.env.DEBUG });
const mysql = require('mysql');
// const cors = require("cors");
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

// const connection = mysql.createConnection({
//     host:  process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// });


const connection = mysql.createConnection({
  host:  'localhost',
  user: 'root',
  password: 'root',
  database: 'admin_regions'
});

  // var corsOptions = {
  //   origin: ["https://uccmonitor.web.app", "http://localhost:3000"],
  //   optionsSuccessStatus: 200, // For legacy browser support
  //   methods: "GET, PUT, POST",
  // };
  
  // app.use(cors(corsOptions));
  
//Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  // render the error page
  res.status(err.status || 500);
  res.send({
    error: {
      message: res.locals.message,
    },
  });
});


//Home
app.get('/', (req, res) => {
    res.render('top.ejs');
  });

// ----------- Districts --------------------------------------
 
//Get counties
// app.get('/counties', (req, res) => {
//   connection.query(
//     'SELECT * FROM counties',
//     (error, results) => {
//       if(error){
//         console.log(error);
//         return res.status(404).send(error)
//       }else{
//         console.log(results);
//         res.render('counties.ejs', {counties: results});
//       };
//     }
//   )
// });

// get subcounties
// app.get('/subcounties', (req, res) => {
//   connection.query(
//     'SELECT * FROM subcounties LIMIT 10'
//     ,
//     (error, results) => {
//       if(error){
//         console.log(error);
//         return res.status(404).send(error)
//       }else{
//         console.log(results);
//         res.render('subcounties.ejs', {subcounties: results});        
//       };
//     }
//   );
// });

// get parishes
// app.get('/parishes', (req, res) => {
//   connection.query(
//     'SELECT * FROM parishes'
//     ,
//     (error, results) => {
//       if(error){
//         console.log(error);
//         return res.status(404).send(error)
//       }else{
//         console.log(results);
//         res.render('parishes.ejs', {parishes: results});     
//       };      
//     }
//   );
// });


// get villages
// app.get('/villages', (req, res) => {
//   connection.query(
//     'SELECT * FROM villages'
//     ,
//     (error, results) => {
//       if(error){
//         console.log(error);
//         return res.status(404).send(error)
//       }else{
//         console.log(results);
//         res.render('villages.ejs', {villages: results});   
//       };            
//     }
//   );
// });

  //route to  create new item page
  app.get('/new', (req, res) => {
    res.render('new.ejs');
  });
  

  // //route to  create new item page
  // app.get('/about', (req, res) => {
  //   res.render('about.ejs');
  // });

  // app.post('/create', (req, res) => {
  //     //create item in db
  //   connection.query(
  //     'INSERT INTO items (name) VALUES (?)',
  //     [req.body.itemName],
  //     (error, results) => {
  //       if(error){
  //         console.log(error);
  //         return res.status(404).send(error)
  //       }else{
  //         console.log(results);
  //         res.redirect('/index');
  //       };            
  //     }
  //   );
  // });


// searching regions

// search villages
app.post('/villages', (req, res) => {
  connection.query(
    `
      SELECT villages.*, parish, subcountyId, subcounty, countyId, county, districtId, district FROM villages 
      LEFT JOIN  parishes ON villages.parishId = parishes.id 
      LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
      LEFT JOIN counties ON subcounties.countyId = counties.id
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE villages.village LIKE '%${req.body.village}%';
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.render('villages.ejs', {villages: results});     
      };                  
    }
  );
});

// search villages by parish with id
app.get('/view/parishes/:id/villages', (req, res) => {
  connection.query(
    `
    SELECT villages.*, parish, subcountyId, subcounty, countyId, county, districtId, district FROM villages 
    LEFT JOIN  parishes ON villages.parishId = parishes.id 
    LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
    LEFT JOIN counties ON subcounties.countyId = counties.id
    LEFT JOIN districts ON counties.districtId = districts.id 
    WHERE parishes.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.render('villages.ejs', {villages: results});     
      };                  
    }
  );
});

// search parishes
app.post('/parishes', (req, res) => {
  connection.query(
    `
      SELECT parishes.*, parish, subcountyId, subcounty, countyId, county, districtId, district FROM parishes 
      LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
      LEFT JOIN counties ON subcounties.countyId = counties.id
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE parishes.parish LIKE '%${req.body.parish}%';
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.render('parishes.ejs', {parishes: results});      
      };                        
    }
  );
});



// search parishes by subcounty
app.get('/view/subcounties/:id/parishes', (req, res) => {
  connection.query(
    `
      SELECT parishes.*, subcountyId, subcounty, countyId, county, districtId, district FROM parishes 
      LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
      LEFT JOIN counties ON subcounties.countyId = counties.id
      LEFT JOIN districts ON counties.districtId = districts.id

      WHERE subcounties.id = ${req.params.id};
    `,
    // [req.params.id],
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.render('parishes.ejs', {parishes: results});      
      };                    
    }
  );
});


// search subcounties
app.post('/subcounties', (req, res) => {
  connection.query(
    `
      SELECT subcounties.*, subcounty, countyId, county, districtId, district FROM subcounties 
      LEFT JOIN counties ON subcounties.countyId = counties.id
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE subcounties.subcounty LIKE '%${req.body.subcounty}%';
    `,
    [req.body.subcounty],
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.render('subcounties.ejs', {subcounties: results});
      };               
    }
  );
});

// search subcounties by county
app.get('/view/counties/:id/subcounties', (req, res) => {
  connection.query(
    `
      SELECT subcounties.*, subcounty, countyId, county, districtId, district FROM subcounties 
      LEFT JOIN counties ON subcounties.countyId = counties.id
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE counties.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.render('subcounties.ejs', {subcounties: results});
      };                   
    }
  );
});

// search counties
app.post('/counties', (req, res) => {
  connection.query(
    `
    SELECT counties.*, districtId, district FROM counties 
    LEFT JOIN districts ON counties.districtId = districts.id
    
    WHERE counties.county LIKE '%${req.body.county}%';
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.render('counties.ejs', {counties: results});
      };          
    }
  );
});

// view counties by by district
app.get('/view/districts/:id/counties', (req, res) => {
  connection.query(
    `
      SELECT counties.*, district FROM counties 
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE districts.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.render('counties.ejs', {counties: results}); 
      };              
    }
  );
});

// view  all districts

app.get('/view/districts/all', (req, res) => {
  connection.query(
    `
      SELECT * FROM districts 
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.render('districts.ejs', {districts: results});
      };                  
    }
  );
    });
// search districts
app.post('/districts', (req, res) => {
  connection.query(
    `
      SELECT * FROM districts 
      WHERE districts.district LIKE '%${req.body.district}%';
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.render('districts.ejs', {districts: results});
      };                  
    }
  );
});

// search 1 district
app.get('/view/districts/:id', (req, res) => {
  connection.query(
    `
      SELECT districts.* FROM districts 
      WHERE districts.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.render('districts.ejs', {districts: results});
      };                         
    }
  );
});

// search 1 county
app.get('/view/counties/:id', (req, res) => {
  connection.query(
    `
    SELECT counties.*,  county, district FROM counties 
    LEFT JOIN districts ON counties.districtId = districts.id
    WHERE counties.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.render('counties.ejs', {counties: results}); 
      };                  
    }
  );
});

// search 1 subcounty
app.get('/view/subcounties/:id', (req, res) => {
  connection.query(
    `
      SELECT subcounties.*, subcounty, countyId, county, districtId, district FROM subcounties 
      LEFT JOIN counties ON subcounties.countyId = counties.id
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE subcounties.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.render('subcounties.ejs', {subcounties: results});  
      };              
    }
  );
});



// search 1 parish
app.get('/view/parishes/:id', (req, res) => {
  connection.query(
    `
      SELECT parishes.*, subcountyId, subcounty, countyId, county, districtId, district FROM parishes 
      LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
      LEFT JOIN counties ON subcounties.countyId = counties.id
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE parishes.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.render('parishes.ejs', {parishes: results});  
      };           
    }
  );
});

// search 1 village
app.get('/view/villages/:id', (req, res) => {
  connection.query(
    `
      SELECT villages.*, parish, subcountyId, subcounty, countyId, county, districtId, district FROM villages 
      LEFT JOIN  parishes ON villages.parishId = parishes.id 
      LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
      LEFT JOIN counties ON subcounties.countyId = counties.id
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE villages.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.render('villages.ejs', {villages: results});      
      };          
    }
  );
});

  // app.post('/delete/:id', (req, res) => {
  //     //delete item
  //   connection.query(
  //     'DELETE FROM items WHERE id = ?',
  //     [req.params.id],
  //     (error, results) => {
  //       res.redirect('/index');
  //     }
  //   );
  // });
  
  // app.get('/edit/:id', (req, res) => {
  //     //select item, take it to edit page
  //   connection.query(
  //     'SELECT * FROM items WHERE id = ?',
  //     [req.params.id],
  //     (error, results) => {
  //       res.render('edit.ejs', {disrict: results[0]});
  //     }
  //   );
  // });
  
  // app.post('/update/:id', (req, res) => {
  //   // update the selected item
  //   connection.query(
  //       'UPDATE items SET name=? WHERE id =?',
  //       [req.body.itemName, req.params.id],

  //       (error, results) => {
  //       res.redirect('/index');
  //       }
  //       ); 
  // });



  // --------------------------------------------------------------------------------------------------

  // ----------API CALLS ------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------------------------
  
  app.post('/api/villages/search', (req, res) => {
    connection.query(
      `
        SELECT villages.*, parish, subcountyId, subcounty, countyId, county, districtId, district FROM villages 
        LEFT JOIN  parishes ON villages.parishId = parishes.id 
        LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
        LEFT JOIN counties ON subcounties.countyId = counties.id
        LEFT JOIN districts ON counties.districtId = districts.id
        WHERE villages.village LIKE '%${req.body.village}%';
      `,
      (error, results) => {
        if(error){
          console.log(error);
          return res.status(404).send(error)
        }else{
          console.log(results);
          res.send( {villages: results});     
        };                  
      }
    );
  });

  
// search villages by parish with id
app.get('/api/parishes/:id/villages', (req, res) => {
  connection.query(
    `
    SELECT villages.*, parish, subcountyId, subcounty, countyId, county, districtId, district FROM villages 
    LEFT JOIN  parishes ON villages.parishId = parishes.id 
    LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
    LEFT JOIN counties ON subcounties.countyId = counties.id
    LEFT JOIN districts ON counties.districtId = districts.id 
    WHERE parishes.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.send( {villages: results});     
      };                  
    }
  );
});

// search parishes by name
app.post('/api/parishes/search', (req, res) => {
  connection.query(
    `
      SELECT parishes.*, parish, subcountyId, subcounty, countyId, county, districtId, district FROM parishes 
      LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
      LEFT JOIN counties ON subcounties.countyId = counties.id
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE parishes.parish LIKE '%${req.body.parish}%';
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.send({parishes: results});      
      };                        
    }
  );
});

// search parishes by subcounty
app.get('/api/subcounties/:id/parishes', (req, res) => {
  connection.query(
    `
      SELECT parishes.*, subcountyId, subcounty, countyId, county, districtId, district FROM parishes 
      LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
      LEFT JOIN counties ON subcounties.countyId = counties.id
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE subcounties.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.send({parishes: results});      
      };                    
    }
  );
});


// search subcounties
app.post('/api/subcounties/search', (req, res) => {
  connection.query(
    `
      SELECT subcounties.*, subcounty, countyId, county, districtId, district FROM subcounties 
      LEFT JOIN counties ON subcounties.countyId = counties.id
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE subcounties.subcounty LIKE '%${req.body.subcounty}%';
    `,
    [req.body.subcounty],
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.send({subcounties: results});
      };               
    }
  );
});

// search subcounties by county
app.get('/api/counties/:id/subcounties', (req, res) => {
  connection.query(
    `
      SELECT subcounties.*, subcounty, countyId, county, districtId, district FROM subcounties 
      LEFT JOIN counties ON subcounties.countyId = counties.id
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE counties.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.send({subcounties: results});
      };                   
    }
  );
});

// search counties
app.post('/api/counties/search', (req, res) => {
  connection.query(
    `
    SELECT counties.*, districtId, district FROM counties 
    LEFT JOIN districts ON counties.districtId = districts.id
    
    WHERE counties.county LIKE '%${req.body.county}%';
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.send({counties: results});
      };          
    }
  );
});

// view counties by by district
app.get('/api/districts/:id/counties', (req, res) => {
  connection.query(
    `
      SELECT counties.*, district FROM counties 
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE districts.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.send({counties: results}); 
      };              
    }
  );
});

// view  all districts

app.get('/api/districts/all', (req, res) => {
  connection.query(
    `
      SELECT * FROM districts 
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.send({districts: results});
      };                  
    }
  );
});

// search districts
app.post('/api/districts/search', (req, res) => {
  connection.query(
    `
      SELECT * FROM districts 
      WHERE districts.district LIKE '%${req.body.district}%';
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.send({districts: results});
      };                  
    }
  );
});

// search 1 district
app.get('/api/districts/:id', (req, res) => {
  connection.query(
    `
      SELECT districts.* FROM districts 
      WHERE districts.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.send({districts: results});
      };                         
    }
  );
});

// search 1 county
app.get('/api/counties/:id', (req, res) => {
  connection.query(
    `
    SELECT counties.*,  county, district FROM counties 
    LEFT JOIN districts ON counties.districtId = districts.id
    WHERE counties.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.send({counties: results}); 
      };                  
    }
  );
});

// search 1 subcounty
app.get('/api/subcounties/:id', (req, res) => {
  connection.query(
    `
      SELECT subcounties.*, subcounty, countyId, county, districtId, district FROM subcounties 
      LEFT JOIN counties ON subcounties.countyId = counties.id
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE subcounties.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.send({subcounties: results});  
      };              
    }
  );
});



// search 1 parish
app.get('/api/parishes/:id', (req, res) => {
  connection.query(
    `
      SELECT parishes.*, subcountyId, subcounty, countyId, county, districtId, district FROM parishes 
      LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
      LEFT JOIN counties ON subcounties.countyId = counties.id
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE parishes.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.send({parishes: results});  
      };           
    }
  );
});

// search 1 village
app.get('/api/villages/:id', (req, res) => {
  connection.query(
    `
      SELECT villages.*, parish, subcountyId, subcounty, countyId, county, districtId, district FROM villages 
      LEFT JOIN  parishes ON villages.parishId = parishes.id 
      LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
      LEFT JOIN counties ON subcounties.countyId = counties.id
      LEFT JOIN districts ON counties.districtId = districts.id
      WHERE villages.id = ${req.params.id};
    `,
    (error, results) => {
      if(error){
        console.log(error);
        return res.status(404).send(error)
      }else{
        console.log(results);
        res.send({villages: results});      
      };          
    }
  );
});



// Start the server on port 3000
// app.listen(3000, '127.0.0.1');
// console.log('Node server running on port 3000');
module.exports = app;

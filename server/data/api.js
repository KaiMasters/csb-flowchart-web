const CONFIG = require('../CONFIG.json');
const fetch = require("node-fetch");
const fs = require('fs');

/* Construct the url for the path */
const url = function (sheet) {
  return CONFIG.BASE_URL + CONFIG.ID + '/' + sheet + CONFIG.BACK_URL;
}

/* UPDATE VIA URL RETURN JSON UNFORMATTED */
const updateViaURL = async function (url) {

  let resp = await fetch(url);
  let data = await resp.json();

  if (!data) {
    return "Error: blank object returned."
  } else if (!data.feed) {
    return "Error: blank feed returned."
  } else if (!data.feed.entry) {
    return "Error: blank data returned."
  }

  let responseObj = {};
  let rows = [];
  let useIntegers = false;

  for (let i = 0; i < data.feed.entry.length; i++) {
    let entry = data.feed.entry[i];
    let keys = Object.keys(entry);
    let newRow = {};
    for (var j = 0; j < keys.length; j++) {
      let gsxCheck = keys[j].indexOf('gsx$');
      if (gsxCheck > -1) {
        let key = keys[j];
        let name = key.substring(4);
        let content = entry[key];
        let value = content.$t;
        if (useIntegers === true && !isNaN(value)) {
          value = Number(value);
        }
        newRow[name] = value;
      }
    }
    rows.push(newRow);
  }  
  responseObj['rows'] = rows;
  return responseObj;
}

/* TEMPLATE FOR SAVING JSON VIA URL */
const updateTemplate = async function (url, name, modifier, write = false) {
  return updateViaURL(url).then(function (data) {
    
    data = modifier(data);
    
    if (write) {
      fs.writeFile("./db/" + name + ".json", JSON.stringify(data), function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    }
  
    return data;
  });
}

/* Takes in semiformatted COLLEGE_REF data and correctly outputs it */
const collegeRefMod = function (data) {
  return data.rows;
};

/* Takes in semiformatted DEPT_REF data and correctly outputs it */
const deptRefMod = function (data) {
  return data.rows;
};

/* Takes in semiformatted ELECTIVES data and correctly outputs it */
const electivesMod = function (data) {
  return data.rows;
};

/* Takes in semiformatted TRANSFER_CREDIT data and correctly outputs it */
const transferCreditMod = function (data) {
  data = data.rows;
  for (let i = 0; i < data.length; i++) {
    // Join the data to be more readable
    data[i].transfer = [];
    // Format for different categories
    data[i].categories = data[i].categories.split(",");
    data[i].credits = data[i].credits.split(",");
    for (let j = 0; j < data[i].categories.length; j++) {
      data[i].transfer.push(
        { 
          "categories": data[i].categories[j].trim(),
          "credits": data[i].credits[j].trim() !== "-" ? data[i].credits[j].trim().split("&") : null
        }
      );
    }
    // Clear out unnecessary values
    data[i].categories = undefined;
    data[i].credits = undefined;
  }

  return data;
}

/* Takes in semiformatted MINOR data and correctly outputs it */
const minorMod = function (data) {
  return data.rows;
}

/* Takes in semiformatted CURRICULUM data and correctly outputs it */
const curriculumMod = function (data) {
  data = data.rows;
  let d;

  const info = [
    "dept", 
    "coursenum", 
    "title", 
    "coursedesc", 
    "coursenotes", 
    "credits", 
    "recprofs", 
    "fall", 
    "winter", 
    "spring", 
    "summer", 
    "prereqs2018", 
    "prereqs2019", 
    "attributes"
  ];

  for (let i = 0; i < data.length; i++) {
    d = data[i];
    // Get id with no spaces
    d.id = d.id.split(" ").join("");

    // Add heirarchical structure to data
    d.information = {};

    // Encapsulate data better
    for (let j = 0; j < info.length; j++) {
      d.information[info[j]] = d[info[j]] ? d[info[j]] : null;

      if (d.information[info[j]] === "TRUE") {
        d.information[info[j]] = true;
      }

      d[info[j]] = undefined;
    }

    // Treat credits as a number
    d.information.credits = +d.information.credits;

    // Add structure to schedule
    d.information.schedule = {
      "winter": d.information.winter,
      "fall": d.information.fall,
      "spring": d.information.spring,
      "summer": d.information.summer
    };
    d.information.summer = undefined;
    d.information.spring = undefined;
    d.information.winter = undefined;
    d.information.fall = undefined;
  
    // Add structure to prereqs, make them arrays for iteration purposes
    d.information.prereqs = {
      "_2018": d.information.prereqs2018 ? d.information.prereqs2018 : [],
      "_2019": d.information.prereqs2019 ? d.information.prereqs2019 : []
    }
    d.information.prereqs2018 = undefined;
    d.information.prereqs2019 = undefined;
    
    // Add structure to prereqs for traversal purposes
    d.information.prereqs._2018 = structureCoursePrereqs(d.information.prereqs._2018);
    d.information.prereqs._2019 = structureCoursePrereqs(d.information.prereqs._2019);

  }

  return data;
}

/* Helper for structuring curriculum prereqs */
const structureCoursePrereqs = function (prereqString) {
  let p = prereqString;
  if (typeof p === "string") {
    p = p.split(",").map(function (prereq) {
      if (prereq.indexOf("|") > -1) {
        return prereq.split("|");
      }
      return prereq;
    });
  }
  return p;
}

const update = async function (write = false) {
  const modifers = [curriculumMod, collegeRefMod, deptRefMod, electivesMod, transferCreditMod, minorMod];
  let db = {};
  for (let sheet = 0; sheet < CONFIG.SHEETS.length; sheet++) {
    db[CONFIG.SHEETS[sheet]] = await updateTemplate(url(sheet + 1), CONFIG.SHEETS[sheet], modifers[sheet], write);
  }

  fs.writeFile("./db/DATA.json", JSON.stringify(db), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The big data file was saved!");

  });

}

update(true);
